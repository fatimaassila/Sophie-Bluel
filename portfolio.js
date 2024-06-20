async function createPortfolioSection() {
  // recupérer l'element section profolio
  const portfolioSection = document.getElementById("portfolio");
  // api-utils.js recupérer les works de l'api 
  const works = await fetchWorks();
  // api-utils.js recupérer les categories
  const categories = getCategories(works);
  // filters.js ajouter les filters au portfolio
  addFilters(portfolioSection, categories);
  // works.js ajouter les works au portfolio
  addWorks(portfolioSection, works);
  // filters.js ajouter les evenements au portfolio
  addEventListenerTofilters(portfolioSection, works, categories);
}
