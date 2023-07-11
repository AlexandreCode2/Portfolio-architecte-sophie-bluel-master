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
    for (let categorie of categories) {
        let h3Categories = document.createElement('h3');
        h3Categories.innerHTML = categorie.name;
        h3Categories.addEventListener('click', () => {
            let worksFiltered = works.filter(work => work.categoryId === categorie.id);
            displayWork(worksFiltered);
            
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































// let workContainer = document.querySelector('.gallery')
// console.log(workContainer);
// let categoriesContainer = document.querySelector('.categories');
// console.log(categoriesContainer);

// let categories = []

// fetch('http://localhost:5678/api/categories')
// .then(response => response.json())
// .then(data => {
//     displayCategorie(data)
//     categories = data
//     console.log(categories);
// })

// function displayCategorie(categories) {
//     for (let categorie of categories) {
//         console.log(categorie.id);
//         let h3Categories = document.createElement('h3');
//         h3Categories.innerHTML = categorie.name;
//         h3Categories.addEventListener('click', () => {
//             console.log(categorie.id);
//         })
//         categoriesContainer.appendChild(h3Categories);
//     }
// }


// fetch('http://localhost:5678/api/works')
// .then(response => response.json())
// .then(data => {
//     displayWork(data)
//     works = data
//     console.log(data);
// })


// function displayWork(works) {
//     for (let work of works) {
//         console.log(work.categoryId);
//         let workFigure = document.createElement('figure');
//         workFigure.innerHTML = `<img src="${work.imageUrl}"><figcaption>${work.title}</figcaption>`;
//         workContainer.appendChild(workFigure);
//     }
// }




// // let categoriesContainer = document.querySelector('.categories');
// // let worksContainer = document.querySelector('.gallery');

// // let categories = [];
// // let works = [];

// // fetch('http://localhost:5678/api/categories')
// // .then(response => response.json())
// // .then(data => {
// //     displayCategorie(data);
// //     categories = data;
// //     console.log(data);
// // })

// function displayCategorie(categories) {
//     let div = document.createElement('div');
//     div.className = "filtre"; // Une seule div "filtre"

//     let h3Tous = document.createElement('h3'); // Créer et ajouter le filtre "Tous"
//     h3Tous.innerHTML = "Tous";
//     h3Tous.classList.add('active'); // "Tous" est actif par défaut
//     h3Tous.addEventListener('click', () => {
//         displayWork(); // Affiche tous les travaux
//         let active = document.querySelector('.filtre .active');
//         if (active) active.classList.remove('active');
//         h3Tous.classList.add('active');
//     });
//     div.appendChild(h3Tous);

//     for (let categorie of categories) {
//         let h3 = document.createElement('h3');
//         h3.innerHTML = categorie.name;
//         h3.addEventListener('click', () => {
//             displayWork(categorie.id);
//             console.log(categorie.id);
//             let active = document.querySelector('.filtre .active');
//             if (active) active.classList.remove('active');
//             h3.classList.add('active');
//         });
//         div.appendChild(h3); // Ajout des h3 à la div "filtre"
//     }
//     categoriesContainer.appendChild(div); // Ajout de la div "filtre" à categoriesContainer
// }

// // fetch('http://localhost:5678/api/works')
// // .then(response => response.json())
// // .then(data => {
// //     works = data;
// //     displayWork(); // Affiche tous les travaux au chargement initial
// //     console.log(data);
// // })

// // function displayWork(categoryId) {
// //     worksContainer.innerHTML = ""; // Efface les travaux précédents
// //     let worksToDisplay = categoryId ? works.filter(work => work.categoryId === categoryId) : works;
// //     for (let work of worksToDisplay) {
// //         let figure = document.createElement('figure');
// //         figure.innerHTML = `<img src="${work.imageUrl}"><figcaption>${work.title}</figcaption>`;
// //         worksContainer.appendChild(figure);
// //     }
// // }
