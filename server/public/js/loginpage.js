
function getUserJson(event){
    event.preventDefault()
    var user = document.querySelector('#user').value
    var pass = document.querySelector('#pass').value

    var jsonModel = `{"user":"${user}", "pass":"${pass}"}`
    const UserPassJson = JSON.parse(jsonModel)
     
    console.log(UserPassJson)
    //return UserDatejson
        
}