document.querySelector('.search-button').addEventListener("click", (event)=>{
    event.preventDefault()
    runUser()
})

async function runUser(){
function getJson(){
    var user = document.querySelector('#user').value
    var date = document.querySelector('#date').value

    var jsonModel = `{"user":"${user}", "date":"${date}"}`
    const UserDatejson = JSON.parse(jsonModel)
    
    return UserDatejson
    
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
        for (var i = 0; i < content.length; i++) {
            var contentIndex = content[i]
            createItem(contentIndex)
            console.log(contentIndex.username)
            var contagem = document.querySelector('.production-count')
            contagem.innerHTML = `Total: ${i+1}`
        }
    }
    catch(error){
        console.log(error)
    }
}
await getJson()	
buildPage(getJson());
await postUserDate(getJson())
}

async function buildPage(json){
var createItem = `
<h2 class="username">${json.user}</h2>
<h2 class="date">${json.date}</h2>
<h2 class="production-count"></h2>

       <div class="itens-container">
           
           
       </div>
`
var sectionPrograma = document.querySelector('.program')
sectionPrograma.innerHTML = createItem
}

async function createItem(element){
var itensContainer = document.querySelector('.itens-container')
var div = document.createElement('div')
var item = `
<!--item-->
<ul class="item">
    <!--campo1-->
    <button class="accordion" onclick="accordion(this.parentElement)">
    <li class="title">
        <ul class="columns">
            <li>date</li>
            <li>PARCELID</li>
            <li>GIS IMAGE</li>
            <li>FLOODZONE IMAGE</li>
            <li>MAPS IMAGE</li>
            <li>STREETVIEW</li>
        </ul>
    </li>
    <li class="values">
        <ul class="columns" id="firstcolumn">
            <li>${element.dateandtime}</li>
            <li>${element.parcelid}</li>
            <li><img src="${element.gisimg}"></li>
            <li><img src="${element.floodzoneimg}"></li>
            <li><img src="${element.mapsimg}"></li>
            <li><img src="${element.streetviewimg}"></li>
        </ul>
    </li>
    </button>
    <div style="display: none;">
        <!--campo2-->
        <li class="title">
            <ul class="columns">
                <li>FLOODZONE</li>
                <li>MAPS LINK</li>
                <li>TAX OWNED</li>
                <li>MARKET VALUE</li>
                <li>ACRES</li>
                <li>ADRESS</li>
            </ul>
        </li>
        <li class="values">
            <ul class="columns">
                <li>${element.floodzonetext}</li>
                <li>${element.mapslink}</li>
                <li>${element.taxowned}</li>
                <li>${element.marketvalue}</li>
                <li>${element.acres}</li>
                <li>${element.adress}</li>
            </ul>
        </li>
        <!--campo3-->
        <li class="title">
            <ul class="columns">
                <li>LATITUDE</li>
                <li>LONGITUDE</li>
                <li>N1 ADRESS</li>
                <li>N2 ADRESS</li>
                <li>N3 ADRESS</li>
                <li>N4 ADRESS</li>
            </ul>
        </li>
        <li class="values">
            <ul class="columns">
                <li>${element.latitude}</li>
                <li>${element.longitude}</li>
                <li>${element.n1adress}</li>
                <li>${element.n2adress}</li>
                <li>${element.n3adress}</li>
                <li>${element.n4adress}</li>
            </ul>
        </li>
        <!--campo4-->
        <li class="title">
            <ul class="columns">
                <li>RANK LEVEL1</li>
                <li>OBS (LV1)</li>
                <li>RANK LEVEL 2</li>
                <li>RL2 USER</li>
                <li>RL2 OBS</li>
                <li>RANK LEVEL3</li>
                
            </ul>
        </li>
        <li class="values">
            <ul class="columns">
                <li>${element.rank1}}</li>
                <li>${element.obs1}</li>
                <li>${element.rank2}</li>
                <li>${element.userrank2}</li>
                <li>${element.obs2}</li>
                <li>${element.rank3}</li>
            </ul>
        </li>
        <li class="title">
        <ul class="columns">
            <li>RL3 USER</li>
            <li>RL3 OBS</li>
        </ul>
    </li>
    <li class="values">
        <ul class="columns">
            <li>${element.userrank3}</li>
            <li>${element.obs3}</li>
        </ul>
    </li>

    <div class="ranks-container">
        <div class="addrankcontainer">
        <button class="addrank2" onclick="accordion(this.parentElement)">ADD RANK 2</button>
        <div class="rank2data" style="display: none;">
            <div>
                <label for="rank2">Rank 2</label>
                <input type="text" name="rank2" id="rank2input">
            </div>
            <div>
                <label for="obs2">OBS 2</label>
                <input type="text" name="obs2" id="obs2input">
            </div>
            <div><button class="sendrank2" onclick="editItem(this.parentElement)">SEND</button></div>
        </div>

        


    </div>

</ul><!--item-->
`
div.innerHTML = item
itensContainer.append(div)
}

function accordion(item){
var hide = item.children[1]    
if (hide.style.display === "block") {
    hide.style.display = "none";
  } else {
    hide.style.display = "block";
  }
}

async function editItem(item){
    var ulFirstRow = item.parentElement.parentElement.parentElement.parentElement.children[0].children[1]
    var itemParcelId = ulFirstRow.children[0].children[1].innerHTML
    var superusername = await document.querySelector('#superusername').value
    var rank2 = await item.parentElement.children[0].children[1].value
    var obs2 = await item.parentElement.children[1].children[1].value
    console.log(itemParcelId, rank2, obs2)

    infoString = `
    {
        "parcelid":"${itemParcelId}",
        "userrank2":"${superusername}",
        "rank2":"${rank2}",
        "obs2":"${obs2}"
    }
    `
    var rank2Json = JSON.parse(infoString)
    await postJson(rank2Json)
    ulFirstRow.parentElement.parentElement.innerHTML = ''
    
    alert("Rank inserido com sucesso!")
}

async function postJson(json) {
    try{
    const options = {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(json)
    }
    fetch('/editrank', options)
    }
    catch(error){
        console.log(error)
    }
}
