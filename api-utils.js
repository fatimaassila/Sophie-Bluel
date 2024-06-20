// recupérer les works
async function fetchWorks() {
  const worksReponse = await fetch("http://localhost:5678/api/works");
  return await worksReponse.json();
}
async function fetchCategories() {
  const worksReponse = await fetch("http://localhost:5678/api/categories");
  return await worksReponse.json();
}
// recupere les categories a partir des works
function getCategories(works) {
  const categories = [];
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    categories.push(work.category);
  }
  let uniqueCategories = [...new Set(categories.map(JSON.stringify))].map(
    JSON.parse
  );

  return uniqueCategories;
}
