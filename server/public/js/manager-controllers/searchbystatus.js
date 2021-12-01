document.querySelector('.search-button').addEventListener("click", async(event)=>{
    event.preventDefault()
    const json = await getJson()	
    buildPage(json);
    const results = await postParcel(json)
    console.log(results)
    for (let i = 0; i < results.length; i++) {
        resultIndex = results[i];
        createItem(resultIndex)
    }
    
})

document.querySelector('.generate-letter').addEventListener("click", async(event)=>{
    event.preventDefault()
    console.log('oi')
    const itens = document.querySelectorAll('.manager-item')
    for (let i = 0; i < itens.length; i++) {
        var itemIndex = itens[i]
        runDocxAll(itemIndex)
    }

})


function getJson(){
    const status = document.querySelector('.statusselect').value
    const state = document.querySelector('#stateinput').value
    const county = document.querySelector('#countyinput').value
    const page = document.querySelector('#page').value
    var jsonModelParcel = `{"status":"${status}", "state":"${state}", "county":"${county}", "page":"${page}"}`
    const json = JSON.parse(jsonModelParcel)
    console.log(json)
    return json
}

async function postParcel(json) {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch('/searchbystatus', options)
        const responseJson = await rawResponse.json();
        return responseJson 
    }
    catch(error){
        console.log(error)
    }
}

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

function accordion(item){
    var hide = item.children[1]    
    if (hide.style.display === "block") {
        hide.style.display = "none";
    }else{
        hide.style.display = "block";
    }
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
        const rawResponse = await fetch('/searchByTypeCount', options)
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