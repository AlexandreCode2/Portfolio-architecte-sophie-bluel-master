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
        } else if (response.status === 401) {
            throw new Error("Email ou mot de passe incorect");
        } else if (response.status === 404){
            throw new Error("Email ou mot de passe incorect");
        } else {
            throw new Error("Erreur de connexion");
        }
    }).then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'http://127.0.0.1:5501/FrontEnd/index.html';
        }
    }).catch(error => {
        alert("Erreur : " + error.message);
    });
});
