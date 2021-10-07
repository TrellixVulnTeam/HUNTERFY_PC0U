document.querySelector('.search-button').addEventListener("click", (event)=>{
    event.preventDefault()
    runUser()
})

async function runUser(){
await getJson()	
buildPage(getJson());
await postParcel(getJson())
}

function getJson(){
    var parcel = document.querySelector('#parcelinput').value
    var jsonModelParcel = `{"parcel":"${parcel}"}`
    const parceljson = JSON.parse(jsonModelParcel)
    return parceljson
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
        const rawResponse = await fetch('/searchbyparcel', options)
        const responseJson = await rawResponse.json();
        createItem(responseJson)  
    }
    catch(error){
        console.log(error)
    }
}

async function buildPage(json){
    var createItem = `
           <div class="itens-container" style="margin-top:15vh;">  
               
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