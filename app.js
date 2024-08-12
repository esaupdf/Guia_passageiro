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

// Configuração para forçar o usuário a escolher uma conta toda vez
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
            window.location.href = "inicial.html"; 
        })
        .catch((error) => {
            console.error(error);
        });
}

// Adicionando ouvintes de evento aos botões de login com Google
document.getElementById('googleLoginButton').addEventListener('click', loginWithGoogle);
document.getElementById('googleLoginButton2').addEventListener('click', loginWithGoogle);
