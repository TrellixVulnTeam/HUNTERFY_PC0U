var form = document.querySelector(".register")
var button = document.querySelector(".submit-register")
button.addEventListener("click", async (event)=> {
    event.preventDefault()
    //console.log('clicado')
    var userInput = document.querySelector("#newusername").value
    var passwordInput = document.querySelector("#newpassword").value
    var confInput = document.querySelector("#confpassword").value

    infologin = `
        {
            "newusername":"${userInput}",
            "newpassword":"${passwordInput}"
        }
    `
    var infoJson = JSON.parse(infologin)

    if(passwordInput !== confInput){
        alert('senhas distintas!')
    }else{
        if(userInput.length !== 8){
            alert ('usuario tem que ter 8 digitos')
        }else{
            if(passwordInput.length !== 8){
                alert ('senha deve conter 8 digitos')
            }else{
                await sendNewUserToServer(infoJson)
            }
        }
    }
      
})

async function sendNewUserToServer(json){
    try{
        console.log(json)
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        fetch('/register', options)
    }
    catch(error){
            console.log(error)
    }
}