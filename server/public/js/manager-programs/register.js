document.querySelector('.add-button').addEventListener("click", async(event)=>{
    event.preventDefault()
    const json = await getJson()
    const userType = document.querySelector('#user-type').value

    if(userType == 'va'){
        postData(json, '/registerva')   
    }
    if(userType == 'manager'){
        postData(json, '/registermanager')
    }
})  

document.querySelector('.manage-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    buildPage()
    const vaResults = await fetch('/getallusers')
    const vaJson = await vaResults.json()
    for(var i = 0; i < vaJson.length; i++) {
        var vaJsonIndex =  vaJson[i]
        showUser(vaJsonIndex)
    }
    
    const managerResults = await fetch('/getallmanagers')
    const managerJson = await managerResults.json()
    for(var i = 0; i < managerJson.length; i++) {
        var managerJsonIndex =  managerJson[i]
        showManager(managerJsonIndex)
    }
})

function getJson(){
    const user = document.querySelector('#user').value
    const pass = document.querySelector('#password').value
    const supervisor = document.querySelector('#supervisor').value

    const jsonModel = `{"user":"${user}", "password":"${pass}", "supervisor":"${supervisor}"}`
    const json = JSON.parse(jsonModel)

   return json
}

async function deleteUser(element){
    const card = element.parentElement
    const user = card.children[0].innerHTML
    const jsonModel = `{"user":"${user}"}`
    const json = JSON.parse(jsonModel)
    await postData(json, '/deleteva').then(
        card.style.backgroundColor = "rgb(151, 30, 0)"
    )  
}

async function deleteManager(element){
    const card = element.parentElement
    const user = card.children[0].innerHTML
    const jsonModel = `{"user":"${user}"}`
    const json = JSON.parse(jsonModel)
    await postData(json, '/deletemanager').then(
        card.style.backgroundColor = "rgb(151, 30, 0)"
    )  
}

async function postData(json, path) {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        await fetch(path, options)  
    }
    catch(error){
        console.log(error)
    }
}

async function buildPage(){
    var createItem = `
    <div class="manager-window">
        <div class="va-users">
            <h2>VA USERS</h2>
        </div>
        <div class="manager-users" style="margin-top:5vh;">
            <h2>MANAGER USERS</h2>
        </div>

    </div>
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}

function showUser(json){
    const itensContainer = document.querySelector('.va-users')
    const div = document.createElement('div')
    const item = `
        <div class="user-item">
            <h2>${json.username}</h2>
            <h3>${json.password}</h3>
            <h3>${json.supervisor}</h3>
            <h3>${json.creationdate}</h3>
            <button onclick="deleteUser(this)"><i class="fas fa-trash"></i></button>
        </div>
    `
    div.innerHTML = item
    itensContainer.append(div)
}

function showManager(json){
    const itensContainer = document.querySelector('.manager-users')
    const div = document.createElement('div')
    const item = `
        <div class="user-item">
            <h2>${json.username}</h2>
            
            <button onclick="deleteManager(this)"><i class="fas fa-trash"></i></button>
        </div>
    `
    div.innerHTML = item
    itensContainer.append(div)
}
