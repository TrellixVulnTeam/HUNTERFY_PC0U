document.querySelector('.search-button').addEventListener("click", (event)=>{
    event.preventDefault()
    runUser()
})

async function runUser(){
function getJson(){
    var rank = document.querySelector('#rank').value
    var date = document.querySelector('#date').value

    var jsonModelRank = `{"rank":"${rank}", "date":"${date}"}`
    const userDatejson = JSON.parse(jsonModelRank)
    
    return userDatejson
    }

    async function postUserRank(json) {
        try{
            console.log(json)
            const options = {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(json)
            }
            const rawResponse = await fetch('/searchbyrankone', options)
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
await getJson()	
buildPage(getJson());
await postUserRank(getJson())
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
                    <li>${element.rank1}</li>
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
                <div>
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
                        <div><button class="sendrank2" onclick="editRank2(this.parentElement)">SEND</button></div>
                    </div>
                </div>
                <div>
                    <button class="addrank3" onclick="accordion(this.parentElement)">ADD RANK 3</button>
                    <div class="rank3data" style="display: none;">
                        <div>
                            <label for="rank3">Rank 3</label>
                            <input type="text" name="rank3" id="rank3input">
                        </div>
                        <div>
                            <label for="obs3">OBS 3</label>
                            <input type="text" name="obs3" id="obs3input">
                        </div>
                        <div><button class="sendrank3" onclick="editRank3(this.parentElement)">SEND</button></div>
                <div>
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
    
    async function editRank2(item){
        var ulFirstRow = item.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1]
        var itemParcelId = ulFirstRow.children[0].children[1].innerHTML
        console.log(itemParcelId)
        var superusername = await document.querySelector('#username').innerHTML
        var rank2 = await item.parentElement.parentElement.children[1].children[0].children[1].value
        console.log(rank2)
        var obs2 = await item.parentElement.parentElement.children[1].children[1].children[1].value
        
    
        infoString = `
        {
            "parcelid":"${itemParcelId}",
            "userrank2":"${superusername}",
            "rank2":"${rank2}",
            "obs2":"${obs2}"
        }
        `
        var rank2Json = JSON.parse(infoString)
        await postJsonRank2(rank2Json)
        ulFirstRow.parentElement.parentElement.innerHTML = ''
        
        alert("Rank inserido com sucesso!")
    }
    
    async function editRank3(item){
        var ulFirstRow = item.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1]
        var itemParcelId = ulFirstRow.children[0].children[1].innerHTML
        console.log(itemParcelId)
        var superusername = await document.querySelector('#username').innerHTML
        var rank3 = await item.parentElement.parentElement.children[1].children[0].children[1].value
        var obs3 = await item.parentElement.parentElement.children[1].children[1].children[1].value
        
    
        infoString = `
        {
            "parcelid":"${itemParcelId}",
            "userrank3":"${superusername}",
            "rank3":"${rank3}",
            "obs3":"${obs3}"
        }
        `
        var rank3Json = JSON.parse(infoString)
        await postJsonRank3(rank3Json)
        ulFirstRow.parentElement.parentElement.innerHTML = ''
        
        alert("Rank inserido com sucesso!")
    }
    
    async function postJsonRank2(json) {
        try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        fetch('/editrank2', options)
        }
        catch(error){
            console.log(error)
        }
    }
    
    async function postJsonRank3(json) {
        try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        fetch('/editrank3', options)
        }
        catch(error){
            console.log(error)
        }
    }
    