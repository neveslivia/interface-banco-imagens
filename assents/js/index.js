let modoEdicaoId = null;

function listar() {
  fetch('http://localhost:8080/api/imagens')
    .then(response => response.json())
    .then(data => addcard(data))
    .catch(error => console.error('Erro ao listar imagens:', error));
}

document.getElementById('formCadastroImagem').addEventListener('submit', cadastrar);

function cadastrar(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const url = document.getElementById('url').value.trim();

  if (nome && url) {
    fetch('http://localhost:8080/api/imagens', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ nome, url })
    })
    .then(response => response.json())
    .then(() => {
      Swal.fire('Sucesso!', 'Cadastro feito com sucesso', 'success');
      listar();
      document.getElementById('formCadastroImagem').reset();
    })
    .catch(error => {
      Swal.fire('Erro!', 'Falha no cadastro: ' + error.message, 'error');
    });
  } else {
    Swal.fire('Atenção!', 'Preencha todos os campos antes de cadastrar.', 'warning');
  }
}


function atualizarImagem() {
  if (!modoEdicaoId) {
    Swal.fire('Atenção!', 'Selecione uma imagem para editar primeiro', 'warning');
    return;
  }

  const nome = document.getElementById('nome').value.trim();
  const url = document.getElementById('url').value.trim();

  if (nome && url) {
    fetch(`http://localhost:8080/api/imagens/${modoEdicaoId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ nome, url })
    })
      .then(response => {
        if (response.ok) {
          Swal.fire('Atualizado!', 'Imagem editada com sucesso', 'success');
          listar();
          document.getElementById('formCadastroImagem').reset();
          modoEdicaoId = null;
        } else {
          Swal.fire('Erro!', 'Falha ao atualizar imagem', 'error');
        }
      });
  }
}

function editarImagem(id) {
  fetch(`http://localhost:8080/api/imagens/${id}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('nome').value = data.nome;
      document.getElementById('url').value = data.url;
      modoEdicaoId = data.id;
    });
}

function removerImagem(id) {
  Swal.fire({
    icon: 'question',
    title: 'Você tem certeza?',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não'
  }).then(result => {
    if (result.isConfirmed) {
      fetch(`http://localhost:8080/api/imagens/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            Swal.fire('Removida!', 'Imagem excluída com sucesso!', 'success');
            listar();
          } else {
            Swal.fire('Erro!', 'Falha ao excluir imagem.', 'error');
          }
        });
    }
  });
}

function addcard(dadosAPI) {
  const container = document.getElementById('conteudo-img');
  container.innerHTML = '';

  dadosAPI.forEach(imagem => {
    const card = document.createElement('div');
    card.className = 'card m-2';
    card.style.width = '18rem';

    card.innerHTML = `
    <img src="http://localhost:8080/api/imagens/proxy?url=${encodeURIComponent(imagem.url)}" 
    class="card-img-top" alt="${imagem.nome}">
    <div class="card-body">
    <h5 class="card-title">${imagem.nome}</h5>
    <button class="btn btn-warning me-2" onclick="editarImagem(${imagem.id})">Editar</button>
    <button class="btn btn-danger" onclick="removerImagem(${imagem.id})">Remover</button>
  </div>
  `;
    container.appendChild(card);
  });
}

window.onload = listar;
