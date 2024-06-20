// ajouter les categories filters au portfolio
async function addFilters(portfolioSection, categories) {
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
