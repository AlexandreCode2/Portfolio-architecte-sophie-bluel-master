fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: 'sophie.bluel@test.tld',
        password: 'S0phie'
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log('Error:', error));
