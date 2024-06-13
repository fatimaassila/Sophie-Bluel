function addEventListenerAuth() {
    const formLogin = document.getElementById('form-login');
    formLogin.addEventListener('submit', async function (event) {
        event.preventDefault();
        // creation de l'objet de nouvel user 
        const user= {
            email:event.target.querySelector('#login-email').value,
            password:event.target.querySelector('#login-password').value
        }
            // Création de la charge utile au format JSON
        const body = JSON.stringify(user);
            // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch('http://localhost:5678/api/users/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: body
        })
        .then( async function(response) {
            if (response.ok) {
                const body = await response.json();
                localStorage.setItem("token", body.token);
                window.location.href = "file:///C:/dev_fatima/projects/sophie-bluel-front-end/index.html";
            } else if (response.status === 401) {
                errorMessage("Email ou mot de passe incorrect");
            } else if (response.status === 404) {
                errorMessage("Compte inexistant");
            } else {
                errorMessage("Unkhnowen error");
            }
        });
    });
};
/*
email: sophie.bluel@test.tld

password: S0phie 
*/
function errorMessage(msg) {
    const divErrors = document.getElementById('errors');
    const errorElement = document.querySelector('#error-message');
    if(!errorElement) {
        const errorSpan = document.createElement('span');
        errorDiv.id = 'error-message';
        errorDiv.innerText = msg;
        divErrors.appendChild(errorSpan);
        return;
    } else {
        errorElement.innerText = msg;
        return;
    }
}
addEventListenerAuth();

