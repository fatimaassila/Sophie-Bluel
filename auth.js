function checkAuthentication() {
  // recuperation du token dans le localstorage
  const token = localStorage.getItem("token");
  // recuperation de l'element login dans le DOM
  const loginElement = document.getElementById("login");
  // verification si le token existe dans le localstorage
  if (token !== null) {
    loginElement.innerText = "Logout";
    // edition.js
    addEditionButtons();
  } else {
    loginElement.innerText = "Login";
  }
  loginElement.addEventListener("click", function () {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
    } else {
      window.location.href = "login.html";
    }
  });
}
