document.querySelector('.search-button').addEventListener("click", (event)=>{
    event.preventDefault()
    runUser()
})


async function runUser(){
    const json = await getJson()	
    buildPage(getJson());
    await getTotal(json)
    await postUserDate(json)
}

function getJson(){
    var user = document.querySelector('#user').value
    var date = document.querySelector('#date').value
    var page = document.querySelector('#page').value

    var jsonModel = `{"user":"${user}", "date":"${date}", "page":"${page}"}`
    const userDatejson = JSON.parse(jsonModel)
    
    return userDatejson
    
}

async function getTotal(json){
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch('/dailyUserCount', options)
        const content = await rawResponse.json();

        const totalH2 = document.querySelector('.production-count')
        const pageCount = document.querySelector('.page-count')

        totalH2.innerHTML = `Total:${content}`
        pageCount.innerHTML = `${Math.ceil(content/10)} pages`
    }
    catch(err){
        console.log(err)
    }
    
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
        const rawResponse = await fetch('/searchbyuser', options)
        const content = await rawResponse.json();
        const rows = content.rows
        document.querySelector('.loading-text').style.display = 'none'
        for (var i = 0; i < rows.length; i++) {
            var contentIndex = rows[i]
            createItem(contentIndex)
        }
    }
    catch(error){
        console.log(error)
    }
}

async function buildPage(json){
    var createItem = `
    <div class="manager-window">
        <h2 class="username">${json.user}</h2>
        <h2 class="date">${json.date}</h2>
        <h2 class="production-count"></h2>
        <h2>Displaying 10 itens</h2>
        <h2 class="page-count"></h2>
        <h2 class="loading-text">Loading...</h2>
            <div class="itens-container">

            
            
            </div>
    </div>
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}
