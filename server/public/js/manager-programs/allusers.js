document.querySelector('.search-button').addEventListener("click", (event)=>{
    event.preventDefault()
    buildPage()
    getUserData()
})

async function getUserData() {
    try{
        const rawResponse = await fetch('/getallusers')
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

async function buildPage(json){
    var createItem = `
        <h2 class="username">All users:</h2>
        <ul class="titleslog">
            <li>USERNAME</li>
            <li>PASSWORD</li>
            <li>SUPERVISOR</li>
            <li>CREATION DATE</li>
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
            <li class="usernamelog">${element.username}</li>
            <li class="login-time">${element.password}</li>
            <li class="logout-time">${element.supervisor}</li>
            <li class="logout-time">${element.creationdate}</li>
        </ul>
    `
    div.innerHTML = item
    itensContainer.append(div)
}