// afficher la modale
function addEventListenersToModal() {
  const modalContent = document.querySelector(".modal-content");
  const editionButton = document.querySelector(".btn-modification");
  const close = document.querySelector("#close-home");
  const modal = document.querySelector("#home-step");
  const modalAddImg = document.querySelector("#add-step");
  const addWorkButton = document.querySelector("#btn-add-work");
  const goHomeButton = document.querySelector("#btn-go-home");
  const closeAddWorkButton = document.querySelector("#close-add-work");


  if (editionButton) {
    editionButton.addEventListener("click", function () {
      modalContent.style.display = "flex";
      createModalContent();
    });
  }
  if (close) {
    close.addEventListener("click", function () {
      modalContent.style.display = "none";
      removeAllFigures();
    });
  }
  
  if (modalContent) {
    modalContent.addEventListener("click", (event) => {
      if (event.target === modalContent) {
        modalContent.style.display = "none";
        modal.style.display = "flex";
        modalAddImg.style.display = "none";
        removeAllFigures();
      }
    });
  }
  addWorkButton.addEventListener("click", function () {
      if (modal && modalAddImg) {
        modal.style.display = "none";
        modalAddImg.style.display = "flex";
    }
  });
  goHomeButton.addEventListener("click", function(){
      if (modal && modalAddImg) {
        modal.style.display = "flex";
        modalAddImg.style.display = "none";
    }
  });
  closeAddWorkButton.addEventListener("click", function(){
    if (modalContent && modal && modalAddImg) {
        modalContent.style.display = "none";
        modal.style.display = "flex";
        modalAddImg.style.display = "none";
        removeAllFigures();
    }
  });
}

// async function addWorksToModal(modalParent, works) {
//     createGalleryDiv(modalParent, works, "gallery-modal");
// }
// injecter les works dans le portfolio modal
async function createModalContent() {
  const works = await fetchWorks();
  displayWorksModal(works);
  addEventListenerOnDelete(works);
}

function displayWorksModal(works) {
  const modal = document.querySelector(".portfolio-modal");
  while (modal.firstChild) {
    modal.firstChild.remove();
  }
  works.forEach((work) => {
    const figureModal = document.createElement("figure");
    figureModal.className = "figure-modal";
    figureModal.id = `figure-${work.id}`;
    const imgModal = document.createElement("img");
    imgModal.src = work.imageUrl;
    const span = document.createElement("span");
    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    trash.id = `trash-${work.id}`;
    span.appendChild(trash);
    figureModal.appendChild(imgModal);
    figureModal.appendChild(span);
    modal.appendChild(figureModal);
  });
}
// suppretion des travaux a l'aide de poubelle
async function deleteWorkModal() {
  const trashAll = document.querySelectorAll(".fa-trash-can");
  trashAll.forEach((trash) => {
    trash.addEventListener("click", (event) => {
      event.preventDefault();
      const workId = trash.id;
      const init = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch("http://localhost:5678/api/works/" + workId, init)
        .then((response) => {
          if (!response.ok) {
            console.log("le delete n'a pas marché!");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          fetchWorks();
          createModalContent();
        });
    });
  });
}
function addEventListenerOnDelete(works) {
  if (works) {
    // recupere les boutons filters
    // et ajouter des lisner l'evenement au boutons filters
    for (let i = 0; i < works.length; i++) {
      const work = works[i];
      const trashElement = document.getElementById(`trash-${work.id}`);
      if (trashElement) {
        trashElement.addEventListener("click", async function (event) {
          event.preventDefault();
          await deleteWork(work.id);
        });
      }
    }
  }
}
async function deleteWork(workId) {
  const token = localStorage.getItem("token");
  fetch("http://localhost:5678/api/works/" + workId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then(async function (response) {
    if (response.ok) {
      console.log(response.ok);
      await createModalContent();
    }
  });
}
async function deleteFigureElement(workId) {
  const figureModal = document.querySelector(`#figure-${workId}`);
  figureModal.remove();
}
// 2 eme modale add photo
function addEventListenerModalAdd() {
  const displayModalAdd = document.querySelector(".btn-modal");
  const modalAddImg = document.querySelector(".modalAddImg");
  const modal = document.querySelector(".modal");

  displayModalAdd.addEventListener("click", function () {
    modal.style.display = "flex";
  });
}
function removeAllFigures() {
  const modal = document.querySelector(".portfolio-modal");
  while (modal.firstChild) {
    modal.firstChild.remove();
  }
}
async function addCategoriesToSelect() {
  const select = document.querySelector("#category");
  const categories = await fetchCategories();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    select.appendChild(option);
  });
} 

addEventListenersToModal();
addCategoriesToSelect();