function getUserJson(){
    var user = document.querySelector('#user').value
    var pass = document.querySelector('#pass').value  
    var jsonModel = `{"user":"${user}", "pass":"${pass}"}`
    const json = JSON.parse(jsonModel)
    return json

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
        if(content){
            window.location.replace('./app');
        }
        else{
            alert('incorrect info')
        }
            
    }
    catch(error){
        console.log(error)
    }
}



document.querySelector(".login-button").addEventListener("click", (event) => {
    event.preventDefault()
    var userPassJson = getUserJson()
    //if(userPassJson == undefined){
    //    console.log("falta algo")
    //}else{
        //console.log(userPassJson)
        checkUserPass(userPassJson)
        
    //}
})