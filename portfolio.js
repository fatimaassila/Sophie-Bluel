async function createPortfolioSection(isAuthentified) {
  // recupérer l'element section profolio
  const portfolioSection = document.getElementById("portfolio");
  // api-utils.js recupérer les works de l'api 
  const works = await fetchWorks();
  // api-utils.js recupérer les categories
  const categories = getCategories(works);
  //  ajouter les filters au portfolio
  if(!isAuthentified) {
    addFilters(portfolioSection, categories);
  }
  // ajouter les works au portfolio
  addWorks(portfolioSection, works);
  // ajouter les evenements au portfolio
  addEventListenerTofilters(portfolioSection, works, categories);
}

/**
 * works
 */
// ajouter les works au portfolio
async function addWorks(portfolioSection, works) {
  createGalleryDiv(portfolioSection, works, "gallery-works");
}
// creation gallery div
async function createGalleryDiv(parent, works, divId) {
  const galleryElement = document.querySelector(`#${divId}`);
  if (!galleryElement) {
    let galleryDiv = document.createElement("div");
    galleryDiv.id = divId;
    galleryDiv.className = "gallery";
    for (let i = 0; i < works.length; i++) {
      const work = works[i];
      const figure = createFigureElement(work.imageUrl, work.title);
      galleryDiv.appendChild(figure);
    }
    parent.appendChild(galleryDiv);
    return;
  } else {
    parent.removeChild(galleryElement);
    addWorks(parent, works);
    return;
  }
}
// creation des elements html "figure element"  
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

/**
 * filters
 */
// ajouter les categories filters au portfolio
async function addFilters(portfolioSection, categories) {
  const filtersElements = document.querySelector('#filters');
  if (!filtersElements) {
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
    filterButton.id = category.id;
    filterButton.innerText = category.name;
    filtersDiv.appendChild(filterButton);
  }
  portfolioSection.appendChild(filtersDiv);
  } else {
    portfolioSection.removeChild(galleryElement);
    addFilters(portfolioSection, categories);
  }
  
}

function addEventListenerTofilters(portfolioSection, works, categories) {
  // recupere l'element button Tous
  let defaultButton = document.getElementById("default-button");
  if (defaultButton) {
    // ajouter lisner l'evenement au bouton Tous
    defaultButton.addEventListener("click", function () {
      addWorks(portfolioSection, works);
    });
  }
  if (categories) {
    // recupere les boutons filters
    // et ajouter des lisner l'evenement au boutons filters
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const filterButton = document.getElementById(category.id);
      if (filterButton) {
        filterButton.addEventListener("click", function () {
          let newWorks = works.filter(
            (work) => work.categoryId === category.id
          );
          addWorks(portfolioSection, newWorks);
        });
      }
    }
  }
}
