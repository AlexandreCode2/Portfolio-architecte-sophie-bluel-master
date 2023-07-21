const userForm = document.getElementById('login');

userForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let emailInput = document.getElementById('name').value;
    let passwordInput = document.getElementById('password').value;

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
        } else {
            throw new Error("Email ou mot de passse incorect");
        }
    }).then(data => {
        if (data.token) {
            localStorage.setItem('user', data.token);
            window.location.href = 'http://127.0.0.1:5501/FrontEnd/index.html';
        } else {
            throw new Error("Erreur de connexion");
        }
    }).catch(error => {
        throw new Error("Erreur : " + error.message);
    });
});
