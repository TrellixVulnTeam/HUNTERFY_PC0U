document.querySelector('.search-button').addEventListener("click", (event)=>{
    event.preventDefault()
    runUser()
})

async function runUser(){
    const json = await getJson()	
    buildPage(getJson());
    await getTotal(json)
    await postRank(json)
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
        const rawResponse = await fetch('/dailyRankCount', options)
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

async function postRank(json) {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch('/searchbyrank', options)
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

function getJson(){
    var rank = document.querySelector('#rank').value
    var date = document.querySelector('#date').value
    var ranktype = document.querySelector('input[name="ranktype"]:checked').value
    var page = document.querySelector('#page').value

    var jsonModelRank = `{"rank":"${rank}", "date":"${date}", "ranktype":"${ranktype}", "page":"${page}"}`
    const userDatejson = JSON.parse(jsonModelRank)
    return userDatejson
}

async function buildPage(json){
    var createItem = `
        <h2 class="username">Rank: ${json.rank}</h2>
        <h2 class="date">${json.date}</h2>
        <h2 class="production-count"></h2>
        <h2>Displaying 10 itens</h2>
        <h2 class="page-count"></h2>
        <h2 class="loading-text">Loading...</h2>
           <div class="itens-container">
               
               
           </div>
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}
    