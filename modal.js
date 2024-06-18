
const displayModal = document.querySelector(".btn-modification");
const modalContent = document.querySelector(".modal-content")
const close = document.querySelector(".fa-solid");
// afficher la modale
function displayCloseModal(){
    displayModal.addEventListener("click", function () {
        modalContent.style.display = "flex";
    })
    close.addEventListener("click", function () {
        modalContent.style.display = "none";
    })
    modalContent.addEventListener("click", (event)=> {
        console.log(event.target);
        if (event.target === modalContent) {
            modalContent.style.display = "none";
        }
    })
}
displayCloseModal()
