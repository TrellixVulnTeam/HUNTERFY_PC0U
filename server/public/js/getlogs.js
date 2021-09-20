document.querySelector('.search-button').addEventListener("click", (event)=>{
    event.preventDefault()
    runUser()
})

async function runUser(){
function getJson(){
    var user = document.querySelector('#user').value

    var jsonModel = `{"user":"${user}"}`
    const UserDatejson = JSON.parse(jsonModel)
    
    return UserDatejson
    
}

async function postUserDate(json) {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch('/userlogs', options)
        const content = await rawResponse.json();
        for (var i = 0; i < content.length; i++) {
            var contentIndex = content[i]
            createItem(contentIndex)
        }
    }
    catch(error){
        console.log(error)
    }
}
await getJson()	
buildPage(getJson());
await postUserDate(getJson())
}

async function buildPage(json){
    var createItem = `
    <h2 class="username">${json.user}</h2>
        <ul class="titleslog">
            <li>USERNAME</li>
            <li>LOGIN</li>
            <li>LOGOUT</li>
        </ul>
    
           <div class="logs-container">

               
               
           </div>
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}
        
async function createItem(element){
    var itensContainer = document.querySelector('.logs-container')
    var div = document.createElement('div')
    var item = `
        <ul class="log">
            <li class="usernamelog">${element.user}</li>
            <li class="login-time">${element.login}</li>
            <li class="logout-time">${element.logout}</li>
        </ul>
    `
    div.innerHTML = item
    itensContainer.append(div)
}