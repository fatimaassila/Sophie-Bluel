// ajouter les works au portfolio
async function addWorks(portfolioSection, works) {
  createGalleryDiv(portfolioSection, works, "gallery-works");
}
// create gallery div
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

