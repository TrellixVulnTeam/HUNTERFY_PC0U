document.querySelector('.search-button').addEventListener("click", (event)=>{
    event.preventDefault()
    runUser()
})

async function runUser(){
await getJson()	
buildPage(getJson());
await postUserRank(getJson())
}

async function postUserRank(json) {
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
        for (var i = 0; i < content.length; i++) {
            var contentIndex = content[i]
            createItem(contentIndex)
            var contagem = document.querySelector('.production-count')
            contagem.innerHTML = `Total: ${i+1}`
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

    var jsonModelRank = `{"rank":"${rank}", "date":"${date}", "ranktype":"${ranktype}"}`
    const userDatejson = JSON.parse(jsonModelRank)
    return userDatejson
}

async function buildPage(json){
    var createItem = `
        <h2 class="username">Rank: ${json.rank}</h2>
        <h2 class="date">${json.date}</h2>
        <h2 class="production-count"></h2>
           <div class="itens-container">
               
               
           </div>
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}
    