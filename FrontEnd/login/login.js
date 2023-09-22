// ---------- CONNEXION ---------- //

const userForm = document.getElementById('login');

userForm.addEventListener('submit', (event) => {
    event.preventDefault(); // évite le rechargement de la page

    // Récupération des valeurs entrées par l'utilisateur
    let emailInput = document.getElementById('name').value;
    let passwordInput = document.getElementById('password').value;

    // Requête POST pour se connecter
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email: emailInput,
            password: passwordInput
        })
    }).then(response => {
        if (response.ok) {
            return response.json();
        // Gestion des erreurs
        } else if (response.status === 401) {
            throw new Error("Email ou mot de passe incorect");
        } else if (response.status === 404){
            throw new Error("Email ou mot de passe incorect");
        } else {
            throw new Error("Erreur de connexion");
        }
    }).then(data => {
        // Si j'ai un token, stocker ce dernier dans le localStorage + redirection vers page d'accueil de l'utilisateur
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'http://127.0.0.1:5501/FrontEnd/index.html';
        }
    }).catch(error => {
        alert("Erreur : " + error.message);
    });
});
