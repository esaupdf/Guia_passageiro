const result2 = document.querySelector(".result");
const result = document.querySelector(".invisivel");

function descricao() {
    result2.classList.toggle('escondidinho')

}

function formasPagamento(event) {
    // Previne o comportamento padrão do botão (submit)
    event.preventDefault();

    // Obtém a referência à div com a classe subir-formaspagamento
    var formasPagamentoDiv = document.querySelector('.subir-formaspagamento');

    // Altera o estilo da div para torná-la visível
    formasPagamentoDiv.style.display = 'block';
}
