let workContainer = document.querySelector('.gallery');
let categoriesContainer = document.querySelector('.categories');

let categories = [];
let works = [];

fetch('http://localhost:5678/api/categories')
.then(response => response.json())
.then(data => {
    displayCategorie(data);
    categories = data;
})

function displayCategorie(categories) {
    let h3All = document.createElement('h3');
    h3All.innerHTML = "Tous";
    h3All.classList.add('active');
    h3All.addEventListener('click', () => {
        displayWork(works);
        console.log("Tous");
        console.log(works);

        let categorieActive = categoriesContainer.querySelector('.active');
        if (categorieActive) categorieActive.classList.remove('active');
        h3All.classList.add('active');
    });
    categoriesContainer.appendChild(h3All);

    for (let categorie of categories) {
        let h3Categories = document.createElement('h3');
        h3Categories.innerHTML = categorie.name;
        h3Categories.addEventListener('click', () => {
            let worksFiltered = works.filter(work => work.categoryId === categorie.id);
            displayWork(worksFiltered);
            console.log(categorie.name);
            console.log(worksFiltered);
            
            let categorieActive = categoriesContainer.querySelector('.active');
            if (categorieActive) categorieActive.classList.remove('active');
            h3Categories.classList.add('active');
        });
        categoriesContainer.appendChild(h3Categories);
    }
}

fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(data => {
    works = data;
    displayWork(works);
})

function displayWork(worksToDisplay) {
    workContainer.innerHTML = "";
    for (let work of worksToDisplay) {
        let workFigure = document.createElement('figure');
        workFigure.innerHTML = `<img src="${work.imageUrl}"><figcaption>${work.title}</figcaption>`;
        workContainer.appendChild(workFigure);
    }
}

function userConnected() {
    if(localStorage.getItem('token')) {
        let navBar = document.querySelector('.navbar');
        let modif1 = document.querySelector('.modif-icon-1');
        let modif2 = document.querySelector('.modif-icon-2');
        let login = document.getElementById('login');
        let logout = document.getElementById('logout');
        navBar.style.display = 'flex';
        modif1.style.visibility = 'visible';
        modif2.style.visibility = 'visible';
        login.style.display = 'none';
        logout.style.display = 'block'
    }
}

userConnected();