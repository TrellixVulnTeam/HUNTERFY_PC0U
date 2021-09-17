
function getUserJson(event){
    event.preventDefault()
    var user = document.querySelector('#user').value
    var date = document.querySelector('#pass').value

    var jsonModel = `{"user":"${user}", "pass":"${date}"}`
    const UserPassJson = JSON.parse(jsonModel)
     
    console.log(UserPassJson)
    //return UserDatejson
        
}