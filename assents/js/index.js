fetch('http://localhost:8080/api/imagens',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    //Provavelmente aqui irei adiconar um método para adicionar as imagens
})

function cadastrar(){
    event.preventDefault();
    const nome = document.getElementById('nome').ariaValueMax.trim();
    const url = document.getElementById('url')

    if(nome && url){
        fetch('http://localhost:8080/api/imagens', {
            method: 'POST',
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nome, url})
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire('Sucesso!', 'Cadastro feito com sucesso', 'success');
        })
    }
}
  function addcard(dadosAPI) {
  const tabela = document.getElementById('ocnteudo-img');
  tabela.innerHTML = ''; // limpa antes de adicionar

  dadosAPI.forEach(element => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td class="px-4 py-2">${element.id}</td>
      <td class="px-4 py-2">${element.nome}</td>
      <td class="px-4 py-2">${element.email}</td>
      <td class="px-4 py-2 space-x-2">
        <button class="bg-yellow-500 text-white px-2 py-1 rounded" onclick="prepararEdicao(${element.id}, '${element.nome}', '${element.email}')">Editar</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="removerAluno(${element.id})">Remover</button>
      </td>
    `;
    tabela.appendChild(linha);
  });
}
function editarImagem(id){
    const nome = document.getElementById('nome'.value.trim());
    const url = document.getElementById('url'.value.trim());

    if (nome && url) {
    fetch(`http://localhost:8080/api/imagens/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({nome, url })
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
    })
    .catch(error => {
      console.error("Erro ao atualizar:", error);
    });
  }
}
function removerImagem(id){
    Swal.fire({
    icon: 'question',
    title: 'Você tem certeza?',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não'
  }).then((result) => {
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
      })
      .catch(error => {
        Swal.fire('Erro!', 'Erro de conexão com o servidor.', 'error');
      });
    } else {
      Swal.fire('Cancelado', '', 'info');
    }
  });

}

