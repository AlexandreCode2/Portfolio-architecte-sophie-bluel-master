// ----------- AFFICHAGE DES CATÉGORIES & FILTRES ----------- //

let workContainer = document.querySelector('.gallery');
let categoriesContainer = document.querySelector('.categories');

let dropdownMenu = document.querySelector('.dropdown-menu');
let chevron = document.querySelector('.fa-chevron-down');

// Variables pour stocker les catégories et les travaux
let categories = [];
let works = [];

fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        displayCategorie(data); // Affiche les catégories
        categories = data.map(categorie => categorie.name); // Met à jour de la variable
        populateDropdown(categories); // Met les catégories dans le menu déroulant
    });


// ---------- FONCTION POUR CRÉER UNE CATÉGORIE DANS LE DOM ---------- //

function createCategoryElement(categorie) {
  const h3Categories = document.createElement('h3');
  h3Categories.innerHTML = categorie.name;
  h3Categories.addEventListener('click', () => {
      // Filtre et affiche les travaux selon la catégorie cliquée
      let worksFiltered = works.filter(work => work.categoryId === categorie.id);
      displayWork(worksFiltered);
      // Gestion changement de style de la catégorie sélectionnée
      let categorieActive = categoriesContainer.querySelector('.active');
      if (categorieActive) categorieActive.classList.remove('active');
      h3Categories.classList.add('active');
  });
  return h3Categories;
}

// ---------- FONCTION POUR AFFICHER LES CATÉGORIES ---------- //

function displayCategorie(categories) {
  categoriesContainer.innerHTML = "";

  const h3All = document.createElement('h3');
  // Ajout de l'option de filtre "Tous"
  h3All.innerHTML = "Tous";
  h3All.classList.add('active');
  h3All.addEventListener('click', () => {
      // Affichage de tous les travaux
      displayWork(works);
      let categorieActive = categoriesContainer.querySelector('.active');
      if (categorieActive) categorieActive.classList.remove('active');
      h3All.classList.add('active');
  });
  categoriesContainer.appendChild(h3All);
  // Ajout des autres catégories de filtre
  for (const categorie of categories) {
      categoriesContainer.appendChild(createCategoryElement(categorie));
  }
}

// ---------- FONCTION POUR CRÉER UN TRAVAIL DANS LE DOM ---------- //

function createWorkElement(work) {
  const workFigure = document.createElement('figure');
  workFigure.innerHTML = `<img src="${work.imageUrl}"><figcaption>${work.title}</figcaption>`;
  return workFigure;
}

// ---------- FONCTION POUR AFFICHER LES TRAVAUX ---------- //

function displayWork(worksToDisplay) {
  workContainer.innerHTML = "";
  for (const work of worksToDisplay) {
      workContainer.appendChild(createWorkElement(work));
  }
}

// ---------- GESTION DU MENU DÉROULANT POUR LES CATÉGORIES ---------- // 

// ---------- FONCTION POUR CRÉER UN ÉLÉMENT DU MENU DÉROULANT ---------- //

function createDropdownElement(category, i) {
  let div = document.createElement('div');
  div.innerText = category;
  div.setAttribute('data-id', i + 1);
  div.onclick = function() {
      // Met à jour la valeur et l'attribut data-id du champ de catégorie dans la modal
      document.querySelector('.categorie-modal').value = category;
      document.querySelector('.categorie-modal').setAttribute('data-id', i + 1);
      dropdownMenu.style.display = 'none';
  };
  return div;
}

// ---------- FONCTION QUI REMPLIT LE MENU DÉROULANT AVEC LES CATÉGORIES ---------- //

function populateDropdown(categoriesList) {
  categoriesList.forEach((category, i) => {
      dropdownMenu.appendChild(createDropdownElement(category, i));
  });
}

// ---------- FONCTION QUI PERMET D'AFFICHER LES CATÉGORIES AU CLICK SUR LE CHEVRON ---------- //
chevron.onclick = function() {
    if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
        dropdownMenu.style.display = 'block';
    } else {
        dropdownMenu.style.display = 'none';
    }
};

// ---------- AFFICHAGE DES TRAVAUX AVEC FETCH ---------- //

fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(data => {
    works = data; // Stockage des données dans la variable "works"
    displayWork(works); // Affiche les travaux
})

// ---------- FONCTION UTILISATEUR CONNECTÉ ---------- //

function userConnected() {
    // Vérification de l'existence du token dans le local storage
    if(localStorage.getItem('token')) {
        let navBar = document.querySelector('.navbar');
        let modif1 = document.querySelector('.modif-icon-1');
        let modif2 = document.querySelector('.modif-icon-2');
        let login = document.getElementById('login');
        let logout = document.getElementById('logout');
        let categoriesFilter = document.querySelector('.categories');
        let mesProjets = document.querySelector('.projets-login')

        navBar.style.display = 'flex';
        modif1.style.visibility = 'visible';
        modif2.style.visibility = 'visible';
        login.style.display = 'none';
        logout.style.display = 'block';
        categoriesFilter.style.display = 'none';
        mesProjets.style.paddingBottom = '60px';
    }
}

userConnected();


// ---------- FONCTION POUR METTRE À JOUR LES TRAVAUX DANS LE DOM ---------- //

function fetchAndUpdateWorks() {
  fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(data => {
          displayWork(data); // Affiche les travaux
      })
      .catch(error => {
          console.error('Une erreur s\'est produite:', error);
      });
}

// ---------- MODAL ---------- //

let modal = null

// ---------- OUVRIR LA MODAL ---------- //
const openModal = function(e) {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    const target = document.querySelector(href);
    target.style.display = 'flex';
    target.removeAttribute('aria-hidden');
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal)
    modal.querySelector('.js-stop-modal').addEventListener('click', stopPropagation)
}

// ---------- FERMER LA MODAL ---------- //
const closeModal = function() {
    if (modal === null) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal)
    modal.querySelector('.js-stop-modal').removeEventListener('click', stopPropagation)
    modal = null
}

// Empêche la propagation de l'événement click pour les éléments à l'intérieur de la modal
const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

// ---------- FONCTION POUR AJOUTER DES TRAVAUX ET ICONS DANS LA MODAL ---------- //

function addImagesAndIcons(images) {
    const worksModal = document.querySelector('.works-modal');
    worksModal.innerHTML = '';

      images.forEach(image => {
      const imgContainer = document.createElement('div');
      imgContainer.className = 'img-container';
  
      const img = document.createElement('img');
      img.src = image.imageUrl;
      img.alt = image.title;
      img.className = 'img-modal';
      imgContainer.appendChild(img);
  
      const arrowsIcon = document.createElement('i');
      arrowsIcon.className = 'fa-solid fa-arrows-up-down-left-right';
      imgContainer.appendChild(arrowsIcon);

// ---------- SUPPRIMER UNE IMAGE ---------- //
  
      const trashIcon = document.createElement('i');
      trashIcon.className = 'fa-solid fa-trash-can';
      trashIcon.addEventListener('click', (e) => {
        e.preventDefault()
        deleteImage(image.id);
      });
      imgContainer.appendChild(trashIcon);
  
      const editText = document.createElement('p');
      editText.className = 'edit-text';
      editText.textContent = 'éditer';
      imgContainer.appendChild(editText);

      worksModal.appendChild(imgContainer);
    });
  }

// ---------- FETCH POUR AJOUTER LES IMAGES DANS LA MODAL ---------- //

function fetchImages() {
    fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(data => {
        // Ajout des travaux dans la modal
        addImagesAndIcons(data);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite:', error);
      });
}
// Appel de la fonction pour récupérer les travaux
fetchImages();

// ---------- FONCTION POUR SUPPRIMER UNE IMAGE ---------- //

function deleteImage(imageId) {
    const url = `http://localhost:5678/api/works/${imageId}`;
    const token = localStorage.getItem('token');
  
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      // Si la suppression est réussie, ferme la modal et met à jour les travaux
      if (response.status === 204) {
          closeModal();
          fetchAndUpdateWorks();
      } else {
          console.error('Erreur lors de la suppression de l\'image :', response.statusText);
      }
  })
  .catch(error => {
      console.error('Une erreur s\'est produite lors de la suppression de l\'image :', error);
  });
}

// ---------- MODAL POUR AJOUTER UNE IMAGE ---------- //

const uploadImageButton = document.getElementById('send')

function replaceModal() {
  uploadImageButton.addEventListener('click', () => {
    let modalTitle = document.querySelector('.modal-title')
    const modalWorks = document.querySelector('.works-modal')
    const deleteWorks = document.querySelector('.delete-all-works')
    const returnArrow = document.querySelector('.fa-arrow-left')
    const addPicture = document.querySelector('#addPicture')
    const uploadFile = document.querySelector('.input-container')
    const labelsInput = document.querySelectorAll('.label-input')
    const errorMessage = document.querySelector('.error-message')

    modalTitle.textContent = "Ajout photo";
    modalWorks.style.display = 'none';
    deleteWorks.style.display = 'none';
    returnArrow.style.display = 'flex';
    uploadImageButton.textContent = "Valider";
    uploadImageButton.style.backgroundColor = "#A7A7A7";
    uploadImageButton.style.width = "237px";
    addPicture.style.display = "block";
    uploadFile.style.display = "flex";
    labelsInput.forEach(label => {
      label.style.display = "block";
    });
    errorMessage.style.display = "block"
  } )
}
// Appel de la fonction pour remplacer la modal
replaceModal()

// ---------- RETOURNER EN ARRIÈRE SUR LA MODAL ---------- // 

const returnArrow = document.querySelector('.fa-arrow-left')

// Revenir à la modal initiale
function returnModal () {
  returnArrow.addEventListener('click', () => {
    let modalTitle = document.querySelector('.modal-title')
    const modalWorks = document.querySelector('.works-modal')
    const deleteWorks = document.querySelector('.delete-all-works')
    const returnArrow = document.querySelector('.fa-arrow-left')
    const addPicture = document.querySelector('#addPicture')
    const uploadFile = document.querySelector('.input-container')
    const labelsInput = document.querySelectorAll('.label-input')
    const errorMessage = document.querySelector('.error-message')

    modalTitle.textContent = "Galerie photo";
    modalWorks.style.display = 'flex';
    deleteWorks.style.display = "flex";
    returnArrow.style.display = "none";
    uploadImageButton.textContent = "Ajouter une photo";
    uploadImageButton.style.backgroundColor = "#1D6154";
    addPicture.style.display = "none";
    uploadFile.style.display = "none";
    labelsInput.forEach(label => {
      label.style.display = "none";
    });
    errorMessage.style.display = "none"
  })
}

// Appel de la fonction pour revenir à la modal initiale
returnModal()


let input = document.querySelector('#addPicture');
let previewDiv = document.querySelector('.preview');
let titleInput = document.querySelector('.titre-modal');
let categoryInput = document.querySelector('.categorie-modal');
let validateButton = document.querySelector('#send');

// ---------- AJOUT FICHIER DANS LA MODAL ---------- //

input.addEventListener('change', function() {
    // Prévisualisation de l'image importée
    let imgModal = document.querySelector('.img-add-modal');
    let btnArea = document.querySelector('.btn-wrapper');
    let imgInfos = document.querySelector('.img-infos');

    imgModal.style.opacity = '0';
    btnArea.style.opacity = '0';
    imgInfos.style.opacity = '0';

    // Objet qui permet de lire le contenu du fichier image
    let reader = new FileReader();

    reader.onload = function(e) {
        let img = previewDiv.querySelector('img') || document.createElement('img');
        img.src = e.target.result;

        if (!previewDiv.contains(img)) {
            previewDiv.appendChild(img);
        }
        checkAllConditions();
        previewDiv.style.display = 'block';
    }

    reader.readAsDataURL(this.files[0]);
});

titleInput.addEventListener('input', checkAllConditions);
categoryInput.addEventListener('input', checkAllConditions);

let errorMessageElement = document.querySelector('#error-message');
let selectedCategory = null;

dropdownMenu.addEventListener('click', function(event) {
  if (event.target.tagName === 'DIV') {
    selectedCategory = event.target.innerText;
    checkAllConditions();
  }
});

// ---------- FONCTION DE VERIFICATION DES CONDITIONS POUR VALIDER L'AJOUT DE L'IMAGE ---------- //

function checkAllConditions() {
  let isImageVisible = previewDiv.querySelector('img') !== null;
  let isTitleFilled = titleInput.value.trim() !== "";
  let isCategorySelected = selectedCategory !== null;

  if (isImageVisible && isTitleFilled && isCategorySelected) {
    validateButton.style.backgroundColor = '#1D6154';
    errorMessageElement.innerText = "";
  } else {
    validateButton.style.backgroundColor = '#A7A7A7';
    errorMessageElement.innerText = "Veuillez remplir tous les champs: image, titre et catégorie.";
  }
}

// ---------- DEBOGAGE INPUT FONCTIONNEL ---------- //
document.querySelector('.add-photo-btn').addEventListener('click', function() {
  input.click();
});

// ---------- AJOUT D'UN NOUVEAU TRAVAIL AVEC POST ---------- //

validateButton.addEventListener('click', () => {
  checkAllConditions();
  if (input.files.length > 0 && titleInput.value.trim() !== "" && categoryInput.value.trim() !== "") {
      // Récupération de l'ID de la catégorie
      const categoryId = document.querySelector('.categorie-modal').getAttribute('data-id');
      // Création d'un objet FormData pour stocker les données de l'image, du titre et de la catégorie
      const formData = new FormData();
      formData.append('image', input.files[0]);
      formData.append('title', titleInput.value);
      formData.append('category', categoryId);

      // Récupération du token pour l'authentification
      const token = localStorage.getItem('token');

      // Envoi de la requête POST pour ajouter l'image
      fetch('http://localhost:5678/api/works', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          console.log('Travail ajouté avec succès :', data);
          closeModal();
          fetchAndUpdateWorks();
      })
      .catch(error => {
          console.error('Une erreur s\'est produite lors de l\'ajout du travail :', error);
      });
  }
});