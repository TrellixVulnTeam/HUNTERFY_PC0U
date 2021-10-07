document.querySelector('.search-button').addEventListener("click", (event)=>{
    event.preventDefault()
    runUser()
})

async function runUser(){
    await getJson()	
    buildPage(getJson());
    await getChecked(getJson())
}

function getJson(){
    var state = document.querySelector('#stateinput').value
    var county = document.querySelector('#countyinput').value


    var jsonModelParcel = `
    {
        "county":"${county}",
        "state":"${state}"
    }`

    const parceljson = JSON.parse(jsonModelParcel)
    
    return parceljson
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
        console.log(content)
        for (var i = 0; i < content.length; i++) {
            var contentIndex = content[i]
            console.log(contentIndex)
            createItem(contentIndex)
            var contagem = document.querySelector('.production-count')
            contagem.innerHTML = `Total: ${i+1}`
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
               
           </div>
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}