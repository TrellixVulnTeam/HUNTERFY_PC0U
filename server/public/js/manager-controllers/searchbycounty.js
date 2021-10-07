document.querySelector('.search-button').addEventListener("click", (event)=>{
    event.preventDefault()
    runUser()
})

async function runUser(){
await getJson()	
buildPage(getJson());
await postCounty(getJson())
}

function getJson(){
    const county = document.querySelector('#countyinput').value
    const jsonModelParcel = `{"county":"${county}"}`
    const parceljson = JSON.parse(jsonModelParcel)
    
    return parceljson
}

//<h2 class="username">Rank: ${json.county}</h2>
async function buildPage(json){
    var createItem = `
           <div class="itens-container" style="margin-top: 10vh">
           <h2 class="production-count"></h2>
               
           </div>
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}

async function postCounty(json) {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch('/searchbycounty', options)
        const content = await rawResponse.json();
        console.log(content)
        for (var i = 0; i < content.length; i++) {
            var contentIndex = content[i]
            managerProgram.createItem(contentIndex)
            var contagem = document.querySelector('.production-count')
            contagem.innerHTML = `Total: ${i+1}`
        }
    }
    catch(error){
        console.log(error)
    }
}



    