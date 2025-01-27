// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCN81xPJLHv36xqcgelTubqQAmipn9iu2E",
    authDomain: "guia-passageiro-38e3c.firebaseapp.com",
    projectId: "guia-passageiro-38e3c",
    storageBucket: "guia-passageiro-38e3c.appspot.com",
    messagingSenderId: "847813698216",
    appId: "1:847813698216:web:3e9c6eea42956ddbff589d"
};

// Inicializando o Firebase
firebase.initializeApp(firebaseConfig);

// Referência ao provedor de autenticação do Google
const provider = new firebase.auth.GoogleAuthProvider();

// Forçar o usuário a escolher uma conta toda vez
provider.setCustomParameters({
    prompt: 'select_account'
});

// Função de login com Google
function loginWithGoogle() {
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            // Armazenar a URL da foto e o nome do usuário no localStorage
            localStorage.setItem('userPhotoURL', user.photoURL);
            localStorage.setItem('userName', user.displayName);
            localStorage.setItem('userEmail', user.email);
            window.location.href = "selecao.html";  // Redireciona para a tela de seleção
        })
        .catch((error) => {
            console.error("Erro ao realizar login com o Google:", error);
        });
}

// Adicionando ouvintes de evento aos botões de login com Google
document.getElementById('googleLoginButton').addEventListener('click', loginWithGoogle);
document.getElementById('googleLoginButton2').addEventListener('click', loginWithGoogle);

// Código para carregar e adicionar carros no Firestore

const db = firebase.firestore();

function carregarCarros() {
    const selectCarros = document.getElementById("carrosSelect");
    selectCarros.innerHTML = "<option>Carregando...</option>"; // Mensagem enquanto carrega

    db.collection("carrosPopulares")
        .get()
        .then((querySnapshot) => {
            selectCarros.innerHTML = ""; // Limpa a mensagem de "Carregando..."
            querySnapshot.forEach((doc) => {
                const carro = doc.data();
                const option = document.createElement("option");
                option.value = carro.nome;
                option.textContent = carro.nome;
                selectCarros.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Erro ao carregar carros:", error);
        });
}

function adicionarCarro(event) {
    event.preventDefault();
    const novoCarroInput = document.getElementById("novoCarroInput").value;

    if (!novoCarroInput.trim()) {
        alert("Por favor, insira um nome válido para o carro.");
        return;
    }

    db.collection("carrosPopulares")
        .add({ nome: novoCarroInput })
        .then(() => {
            alert("Carro adicionado com sucesso!");
            carregarCarros();
            document.getElementById("novoCarroInput").value = ""; // Limpa o campo de input
        })
        .catch((error) => {
            console.error("Erro ao adicionar carro:", error);
        });
}

// Chamar a função para carregar os carros ao carregar a página
document.addEventListener("DOMContentLoaded", carregarCarros);
document.getElementById("adicionarCarroButton").addEventListener("click", adicionarCarro);
