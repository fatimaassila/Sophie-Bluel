function checkAuthentication() {
  let isAuthentified = false;
  // recuperation du token dans le localstorage
  const token = localStorage.getItem("token");
  // recuperation de l'element login dans le DOM
  const loginElement = document.getElementById("login");
  // verification si le token existe dans le localstorage
  if (token !== null) {
    isAuthentified = true;
    loginElement.innerText = "Logout";
    addEditionButtons();
  } else {
    loginElement.innerText = "Login";
  }
  loginElement.addEventListener("click", function () {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    } else {
      window.location.href = "login.html";
    }
  });
  return isAuthentified;
}
function addEditionButtons() {
  const body = document.querySelector("body");
  body.insertAdjacentElement("afterbegin", createNavButtonEditionMode());
  const headerDivOfPortfolioSection = document.querySelector("#header");
  const btnEdit = createPortfolioEditionButton();
  headerDivOfPortfolioSection.appendChild(btnEdit);
}
// creation des elements mode d'adition 

/**
 * <nav class="mod-conection">
		<button>
			<i class="fa-regular fa-pen-to-square fa-xl"></i>
      <span>Mode édition</span>
		</button>
	</nav>
 */
function createNavButtonEditionMode() {
  const nav = document.createElement("nav");
  nav.className = "mod-conection";
  const button = document.createElement("button");
  const i = document.createElement("i");
  i.className = "fa-regular fa-pen-to-square fa-xl";
  const span = document.createElement("span");
  span.innerText = "Mode édition";
  button.appendChild(i);
  button.appendChild(span);
  nav.appendChild(button);
  return nav;
}
/**
 * <button class="btn-modification">
     <i class="fa-regular fa-pen-to-square fa-lg"></i>
    <span>modifier</span>
  * </button>
*/
function createPortfolioEditionButton() {
  const button = document.createElement("button");
  button.className = "btn-modification";
  const i = document.createElement("i");
  i.className = "fa-regular fa-pen-to-square fa-lg";
  const span = document.createElement("span");
  span.innerText = "modifier";
  button.appendChild(i);
  button.appendChild(span);
  return button;
}

