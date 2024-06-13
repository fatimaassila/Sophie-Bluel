document.addEventListener(DOMContentLoaded,function () {
const formulaireLogin=document.querySelector('form');
formulaireLogin.addEventListener('submit',function(event){
    event.preventDefault();
    const user= {
        email:event.target.querySelector('#email').value,
        password:event.target.querySelector('#password').value
    }
    const chargeUser= JSON.stringify(user)
    fetch('http://localhost:5678/api/users/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:chargeUser})
})
.then(repense => {})


});
















const formulaireLogin = document.querySelector('form');
formulaireLogin.addEventListener('submit',function(event){
    event.defaultPrevented;
    // creation de l'objet de nouvel user 
    const user= {
        email:event.target.querySelector('#email').value,
        password:event.target.querySelector('#password').value
    }
    // Création de la charge utile au format JSON
    const chargeUser= JSON.stringify(user)
    // Appel de la fonction fetch avec toutes les informations nécessaires
    fetch('http://localhost:5678/api/users/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:chargeUser
    })
.then(Response=>{

})
)


    
    
})
if (id ===1) {

}
}
