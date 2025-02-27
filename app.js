document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validarFormulario()) {
      alert("Enviado com sucesso!");
      window.location.href = "https://www.google.com.br/?hl=pt-BR";
    }
  });

  document.getElementById("cep").addEventListener("blur", buscarCEP);
});

function validarFormulario() {
  let valido = true;

  valido &= validarCampo("nome", "Preencha o nome");
  valido &= validarCampo("email", "É obrigatório um email");
  valido &= validarCampo("numero", "É obrigatório um número");
  valido &= validarCampo("cep", "Informe o CEP");
  valido &= validarCampo("senha", "Digite uma senha");
  valido &= validarConfirmacaoSenha();

  return valido;
}

function validarCampo(id, mensagem) {
  const campo = document.getElementById(id);
  const erroMsg = campo.nextElementSibling;

  if (campo.value.trim() === "") {
    erroMsg.textContent = mensagem;
    erroMsg.style.display = "block";
    return false;
  } else {
    erroMsg.style.display = "none";
    return true;
  }
}

function validarConfirmacaoSenha() {
  const senha = document.getElementById("senha").value;
  const senhaCon = document.getElementById("senha-con");
  const erroMsg = senhaCon.nextElementSibling;

  if (senhaCon.value.trim() === "") {
    erroMsg.textContent = "Confirme a senha";
    erroMsg.style.display = "block";
    return false;
  } else if (senha !== senhaCon.value) {
    erroMsg.textContent = "As senhas não coincidem";
    erroMsg.style.display = "block";
    return false;
  } else {
    erroMsg.style.display = "none";
    return true;
  }
}

function buscarCEP() {
  const cep = document.getElementById("cep").value;
  const enderecoLabel = document.getElementById("endereco");

  if (cep.length !== 8) {
    enderecoLabel.textContent = "CEP inválido";
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((data) => {
      if (data.erro) {
        enderecoLabel.textContent = "CEP não encontrado";
      } else {
        enderecoLabel.textContent = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
      }
    })
    .catch(() => {
      enderecoLabel.textContent = "Erro ao buscar o CEP";
    });
}
