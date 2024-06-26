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
      resetFrom();
      createPortfolioSection(true);
    });
  }

  if (modalContent) {
    modalContent.addEventListener("click", (event) => {
      if (event.target === modalContent) {
        modalContent.style.display = "none";
        modal.style.display = "flex";
        modalAddImg.style.display = "none";
        removeAllFigures();
        resetFrom();
        createPortfolioSection(true);
      }
    });
  }
  addWorkButton.addEventListener("click", function () {
    if (modal && modalAddImg) {
      modal.style.display = "none";
      modalAddImg.style.display = "flex";
      resetFrom();
      createPortfolioSection(true);
    }
  });
  goHomeButton.addEventListener("click", function () {
    if (modal && modalAddImg) {
      modal.style.display = "flex";
      modalAddImg.style.display = "none";
      resetFrom();
    }
  });
  closeAddWorkButton.addEventListener("click", function () {
    if (modalContent && modal && modalAddImg) {
      modalContent.style.display = "none";
      modal.style.display = "flex";
      modalAddImg.style.display = "none";
      resetFrom();
      createPortfolioSection(true);
    }
  });
}

async function addWorksToModal(modalParent, works) {
  createGalleryDiv(modalParent, works, "gallery-modal");
}
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
function addEventListenerOnDelete(works) {
  if (works) {
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
// step 2
function addEventListenerModalAdd() {
  const displayModalAdd = document.querySelector(".btn-modal");
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

// la prevesualisation de l'image
function previewImgModale() {
  const previewImg = document.querySelector("#previow-img");
  const inputFile = document.querySelector("#file");
  const labelFile = document.querySelector("#label-file");
  const iconImg = document.querySelector(".fa-image");
  const pFile = document.querySelector("#p-file");
  // ecote les changements dans l'input file
  inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        previewImg.src = reader.result;
        previewImg.style.display = "flex";
        labelFile.style.display = "none";
        iconImg.style.display = "none";
        pFile.style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });
}

function dismissModalPostCreateNewWork() {
  const modalContent = document.querySelector(".modal-content");
  const modal = document.querySelector("#home-step");
  const modalAddImg = document.querySelector("#add-step");
  modalContent.style.display = "none";
  modal.style.display = "flex";
  modalAddImg.style.display = "none";
  removeAllFigures();
  createPortfolioSection(true);
}
function addEventListenerOnPostNewWork() {
  const token = localStorage.getItem("token");
  const formAddWork = document.querySelector("#post-work-form");
  const inputFile = document.querySelector("#file");
  formAddWork.addEventListener("submit", async function (event) {
    event.preventDefault();
    let title = event.target.querySelector("#title").value;
    let categoryId = event.target.querySelector("#category").value;
    // creation de l'objet de nouvel user
    const formData = new FormData();
    const file = inputFile.files[0];
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", categoryId);
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    }).then(async function (response) {
      if (response.ok) {
        dismissModalPostCreateNewWork();
      }
    });
  });
}
function addValidationEventListener() {
  const inputFile = document.getElementById("file");
  const title = document.getElementById("title");
  const category = document.getElementById("category");
  inputFile.addEventListener("change", function () {
    checkFormValidation(title, category, inputFile);
  });
  title.addEventListener("change", function () {
    checkFormValidation(title, category, inputFile);
  });
  category.addEventListener("change", function () {
    checkFormValidation(title, category, inputFile);
  });
}
function checkFormValidation(title, category, inputFile) {
  const file = inputFile.files[0];
  if (title && title.value && !(title.value.trim().length === 0) && 
  category && category.value && file) {
    document.getElementById("submit-work-btn").disabled = false;
  } else {
    document.getElementById("submit-work-btn").disabled = true;
  }
}

function resetFrom() {
  const labelFile = document.querySelector("#label-file");
  const iconImg = document.querySelector(".fa-image");
  const pFile = document.querySelector("#p-file");
  labelFile.style.display = "flex";
  iconImg.style.display = "flex";
  pFile.style.display = "flex";
  const previewImg = document.querySelector("#previow-img");
  previewImg.style.display = "none";
  previewImg.src = "#";
  const inputFile = document.querySelector("#file");
  inputFile.value = "";
  const title = document.querySelector("#title");
  title.value = "";
  const category = document.querySelector("#category");
  category.value = "";
}
previewImgModale();

addEventListenersToModal();
addCategoriesToSelect();
addValidationEventListener();
addEventListenerOnPostNewWork();
