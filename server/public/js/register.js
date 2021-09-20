var form = document.querySelector(".register")
var button = document.querySelector(".submit-register")
button.addEventListener("click", async (event)=> {
    event.preventDefault()
    var userInput = document.querySelector("#newusername").value
    var passwordInput = document.querySelector("#newpassword").value
    var confInput = document.querySelector("#confpassword").value
    var supervisor = document.querySelector('#supervisor').value

    infologin = `
        {
            "newusername":"${userInput}",
            "newpassword":"${passwordInput}",
            "supervisor":"${supervisor}"
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
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        fetch('/register', options)
        alert('Done!')

    }
    catch(error){
            console.log(error)
    }
}