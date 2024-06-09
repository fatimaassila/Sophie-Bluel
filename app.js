
// recupérer les works
async function fetchWorks() {
  const worksReponse = await fetch("http://localhost:5678/api/works");
  return await worksReponse.json();
}
// recupere les categories a partir des works
function getCategories(works) {
  const categories = [];
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    categories.push(work.category)
  }
  let uniqueCategories = 
    [...new Set(categories.map(JSON.stringify))].map(JSON.parse);
  
  return uniqueCategories;
}
// create figure element
function createFigureElement(url, title) {
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  img.src = url;
  img.alt = title;
  let figcaption = document.createElement("figcaption");
  figcaption.innerText = title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  return figure;
}
// ajouter les works au portfolio
async function addWorksToPortfolio(portfolioSection, works) {
  let galleryDiv = document.createElement("div");
  galleryDiv.className = "gallery";
  galleryDiv.id = "gallery";
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    const figure = createFigureElement(work.imageUrl, work.title);
    galleryDiv.appendChild(figure);
  }
  portfolioSection.appendChild(galleryDiv);
}

// ajouter les categories au portfolio
async function addGategoriesToPortfolio(portfolioSection, categories) {
  let filtersDiv = document.createElement("div");
  filtersDiv.className = "filters";
  filtersDiv.id = "filters";
  const defaultButton = document.createElement("button");
  defaultButton.innerText = "Tous";
  defaultButton.id = "default-button";
  filtersDiv.appendChild(defaultButton);
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const filterButton = document.createElement("button");
    filterButton.innerText = category.name;
    filterButton.id = category.id;
    filterButton.addEventListener("click", function () {
      console.log(`Vous avez cliqué sur le bouton avec l'id ${category.id}`)
  });
    filtersDiv.appendChild(filterButton);
  }
  portfolioSection.appendChild(filtersDiv);
}

// supprimer les works
function deleteWorks() {  
  let portfolioSection = document.getElementById("portfolio");
  let galleryDiv = document.getElementById("gallery");
  portfolioSection.removeChild(galleryDiv);
}


async function createPortfolioSection() {
  // recupérer l'element secion profolio
  const portfolioSection = document.getElementById("portfolio");
  // recupérer les works
  const works = await fetchWorks();
  // recupérer les categories
  const categories = getCategories(works);
  // ajouter les filters au portfolio
  addGategoriesToPortfolio(portfolioSection, categories);
  // ajouter les works au portfolio
  addWorksToPortfolio(portfolioSection, works);
  // recupere l'element button Tous
  let defaultButton = document.getElementById("default-button");
  // ajouter lisner l'evenement au bouton Tous 
  defaultButton.addEventListener("click", function () {
    deleteWorks(portfolioSection);
    addWorksToPortfolio(portfolioSection, works);
  });
  // recupere les boutons filters
  // et ajouter des lisner l'evenement au boutons filters
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const filterButton = document.getElementById(category.id);
    filterButton.addEventListener("click", function () {
      deleteWorks();
      let newWorks = works.filter((work) => work.categoryId === category.id);
      addWorksToPortfolio(portfolioSection, newWorks);
  });
}
}


// executer la fonction createPortfolioSection
createPortfolioSection();

// nombre d filters = 1 + n // n = categories.lenght 
// 

