function getUserJson(){
    var user = document.querySelector('#user').value
    var pass = document.querySelector('#pass').value

    if(user.length !== 8){
        alert("usuario deve conter 8 digitos")
    }else{
        if(pass.length !== 8){
            alert('senha deve conter 8 digitos')
        }else{
            var jsonModel = `{"user":"${user}", "pass":"${pass}"}`
            const UserPassJson = JSON.parse(jsonModel)
            return UserPassJson
        }
    }
}

async function checkUserPass(json) {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch('/', options)
        const content = await rawResponse.json()
        
        if(json.pass == content.password){
            console.log('senha correta!')
            window.location.replace("./app");
        }else{
            alert('Incorrect data')
        }
    }
    catch(error){
        console.log(error)
    }
}



document.querySelector(".login-button").addEventListener("click", (event) => {
    event.preventDefault()
    var userPassJson = getUserJson()
    if(userPassJson == undefined){
        console.log("falta algo")
    }else{
        //console.log(userPassJson)
        checkUserPass(userPassJson)
        
    }
})