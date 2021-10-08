async function postJsonRank2(json){
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
    
async function postJsonRank3(json){
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

async function editRank2(item){
    var ulFirstRow = item.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1]
    var itemParcelId = ulFirstRow.children[0].children[1].innerHTML
    var superusername = await document.querySelector('#username').innerHTML
    var rank2 = await item.parentElement.parentElement.children[1].children[0].children[1].value
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
    var superusername = await document.querySelector('#username').innerHTML
    var rank3 = await item.parentElement.parentElement.children[1].children[0].children[1].value
    var obs3 = await item.parentElement.parentElement.children[1].children[1].children[1].value
    var buyInput = await item.parentElement.parentElement.parentElement.children[2].children[0]
    var buyOpt = false
    if(buyInput.checked){
        buyOpt = true
    }else{
        buyOpt = false
    }
    
    infoString = `
    {
        "parcelid":"${itemParcelId}",
        "userrank3":"${superusername}",
        "rank3":"${rank3}",
        "obs3":"${obs3}",
        "buyopt":"${buyOpt}"
    }
    `
    var rank3Json = JSON.parse(infoString)
    await postJsonRank3(rank3Json)
    ulFirstRow.parentElement.parentElement.innerHTML = ''
        
    alert("Rank inserido com sucesso!")
}

function accordion(item){
    console.log(item)
    var hide = item.children[1]    
    if (hide.style.display === "block") {
        hide.style.display = "none";
    }else{
        hide.style.display = "block";
    }
}

async function createItem(element){
    var itensContainer = document.querySelector('.itens-container')
    var div = document.createElement('div')
    var item = `
    <div class="manager-item"><!--item-->  
                <div class="accordion" onclick="accordion(this.parentElement)">
                    <div class="title"><h1>Parcel ID:&nbsp;</h1><h2>${element.parcelid}</h2></div>
                    <div class="images-row">
                        <div class="image-row"><h2>GIS image:</h2><img src="${element.gisimg}" alt=""></div>
                        <div class="image-row"><h2>Google image:</h2><img src="${element.mapsimg}" alt=""></div>
                        <div class="image-row"><h2>Street View:&nbsp;</h2><img src="${element.streetviewimg}" alt=""></div>
                        <div class="image-row"><h2>Floodzone image:</h2><img src="${element.floodzoneimg}" alt=""></div>
                    </div>
                </div>
                <div class="hide">
                    <div class="item-columns">   
                        <div class="column">
                            <div><h2>GIS link:&nbsp;</h2><h3 class="value">${element.gislink}</h3></div>
                            <div><h2>Tax Value:&nbsp;</h2><h3 class="value">${element.marketvalue}</h3></div>
                            <div><h2>Property value:&nbsp;</h2><h3 class="value"></h3></div>
                            <div><h2>State:&nbsp;</h2><h3 class="value">${element.state}</h3></div>
                            <div><h2>County:&nbsp;</h2><h3 class="value">${element.county}</h3></div>
                        </div>
                        <div class="column">
                            <div><h2>Maps link:&nbsp;</h2><h3 class="value">${element.mapslink}</h3></div>
                            <div><h2>Adress:&nbsp;</h2><h3 class="value">${element.adress}</h3></div>
                            <div><h2>Latitude:&nbsp;</h2><h3 class="value">${element.latitude}</h3></div>
                            <div><h2>Longitude:&nbsp;</h2><h3 class="value">${element.longitude}</h3></div>
                            <div><h2>Acres:&nbsp;</h2><h3 class="value">${element.acres}</h3></div>
                        </div>
                        <div class="column">
                            <div><h2>N1 adress:&nbsp;</h2><h3 class="value">${element.n1adress}</h3></div>
                            <div><h2>N2 adress:&nbsp;</h2><h3 class="value">${element.n2adress}</h3></div>
                            <div><h2>N3 adress:&nbsp;</h2><h3 class="value">${element.n3adress}</h3></div>
                            <div><h2>N4 adress:&nbsp;</h2><h3 class="value">${element.n4adress}</h3></div>
                        </div>
                        <div class="column">
                            <div><h2>Floodzone link:&nbsp;</h2><h3 class="value"></h3></div>
                            <div><h2>Floodzone status:&nbsp;</h2><h3 class="value">${element.floodzonetext}</h3></div>
                            <div><h2>Actual image:&nbsp;</h2><h3 class="value"></h3></div>
                            <div><h2>Zestimate:&nbsp;</h2><h3 class="value"></h3></div>
                            <div><h2>Zillow Link:&nbsp;</h2><h3 class="value"></h3></div>
                        </div>
                    </div>
                    <div class="item-menu">
                        <div class="rank1">
                            <h1>Rank 1</h1>
                            <div><h2>User:</h2><h3>${element.username}</h3></div>
                            <div><h2>Rank:</h2><h3>${element.rank1}</h3></div>
                            <div><h2>Obs:</h2><h3>${element.obs1}</h3></div>
                            <div><h2>Date/Time:</h2><h3>${element.dateandtime}</h3></div>
                            
                        </div>
                        <div class="rank">
                            <h1>Rank 2</h1>
                            <div><h2>User:</h2><h3></h3></div>
                            <div><label for="">Rank:</label><input type="text"></div>
                            <div><label for="">Obs:</label><input type="text"></div>
                            <div class="rank-button"><button>Send rank</button></div>
                        </div>
                        <div class="rank">
                            <h1>Rank 3</h1>
                            <div><h2>User:</h2><h3></h3></div>
                            <div><label for="">Rank:</label><input type="text"></div>
                            <div><label for="">Obs:</label><input type="text"></div>
                            <div class="buyopt"><h2>BUY?</h2><input type="checkbox"><label>yes/</label><input type="checkbox"><label>no</label></div>
                            <div class="rank-button"><button>Send rank</button></div>
                        </div>
                        <div>
                            <h2>&nbsp;</h2>
                            
                        </div>
                    </div>
                </div>
            </div><!--item-->
    `
    div.innerHTML = item
    itensContainer.append(div)
}
