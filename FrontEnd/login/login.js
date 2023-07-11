let user = {
    email : "",
    password : "",
};

fetch('http://localhost:5678/api/users/login')
.then(response => response.json())
.then(data => {
    displayUser(data);
    user = data;
    console.log(data);
})