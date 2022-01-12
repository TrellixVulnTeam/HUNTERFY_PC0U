document.querySelector('.search-button').addEventListener("click", async(event)=>{
    event.preventDefault()
    const json = await getJson()	
    buildPage(getJson());
    await getTotal(json)
    const result = await postDataManager(json, '/searchbycounty')
    document.querySelector('.loading-text').style.display = 'none'
    for (var i = 0; i < result.length; i++) {
        var index = result[i]
        createItem(index)
    }
})

document.querySelector('.generate-letter').addEventListener("click", async(event)=>{
    event.preventDefault()
    const itens = document.querySelectorAll('.manager-item')
    for (let i = 0; i < itens.length; i++) {
        var itemIndex = itens[i]
        runDocxAll(itemIndex)
    }

})

function getJson(){
    const state = document.querySelector('#stateinput').value
    const county = document.querySelector('#countyinput').value
    const page = document.querySelector('#page').value
    const jsonModelParcel = `{"county":"${county}", "page":"${page}", "state":"${state}"}`
    const json = JSON.parse(jsonModelParcel)
    console.log(json)
    return json
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
        const rawResponse = await fetch('/dailyCountyCount', options)
        const content = await rawResponse.json();
        console.log(content)
        const totalH2 = document.querySelector('.production-count')
        const pageCount = document.querySelector('.page-count')

        totalH2.innerHTML = `Total:${content}`
        pageCount.innerHTML = `${Math.ceil(content/10)} pages`
    }
    catch(err){
        console.log(err)
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



    