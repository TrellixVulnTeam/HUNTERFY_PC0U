document.querySelector('.search-button').addEventListener("click", (event)=>{
    event.preventDefault()
    runUser()
})

async function runUser(){
    const json = await getJson()	
    buildPage(getJson());
    await getTotal(json)
    await getChecked(json)
}

function getJson(){
    var state = document.querySelector('#stateinput').value
    var county = document.querySelector('#countyinput').value
    var page = document.querySelector('#page').value


    var jsonModelParcel = `
    {
        "county":"${county}",
        "state":"${state}",
        "page":"${page}"
    }`

    const parceljson = JSON.parse(jsonModelParcel)
    
    return parceljson
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
        const rawResponse = await fetch('/dailyCheckedCount', options)
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

async function getChecked(json) {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch('/getallchecked', options)
        const content = await rawResponse.json();
        document.querySelector('.loading-text').style.display = 'none'
        for (var i = 0; i < content.length; i++) {
            var contentIndex = content[i]
            createItem(contentIndex)
        }
    }
    catch(error){
        console.log(error)
    }
}

//<h2 class="username">Rank: ${json.county}</h2>
async function buildPage(json){
    var createItem = `
            <div class="itens-container" style="margin-top: 10vh">
            <h2 class="production-count"></h2>
            <h2>Displaying 10 itens</h2>
            <h2 class="page-count"></h2>
            <h2 class="loading-text">Loading...</h2>
               
           </div>
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}