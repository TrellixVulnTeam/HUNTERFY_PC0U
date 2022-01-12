var searchButton = document.querySelector("#searchbutton")
var areaCards = document.querySelector(".area-cards")
var rootEditArea = document.querySelector(".root-edit")

searchButton.addEventListener("click", async()=>{
    //console.log('searched')
    const result = await postSearchParcel(parcelToJson())
    for (let i = 0; i < result.length; i++) {
        var resultIndex = result[i]
        renderResult(resultIndex)
    } 
})

function renderResult(element){
    var searchedCard = document.createElement('div')
    searchedCard.innerHTML = `
    <div class="card" style="background-image: url('./img/antique-texture.jpg');">
        <div class="options">
            <button class="send" onclick="postJson(this.parentElement.parentElement)"><i class="fas fa-share"></i></button>   
            <button class="edit" onclick="editarCard(this.parentElement.parentElement)"><i class="fas fa-pen-square"></i></button>
            <button class="house-edit" onclick="editarHouse(this.parentElement.parentElement)"><i class="fas fa-home"></i></button>
            <button class="neigh-edit" onclick="editarNeighboorInfo(this.parentElement.parentElement)"><i class="fas fa-at"></i></button>  
            <button class="exclude" onclick="excluirCard(this.parentElement.parentElement)"><i class="fas fa-trash"></i></i></button> 
        </div>
        <div class="infos">
            <div class="info-card info-text"><h2>PARCEL ID:</h2> <h2>${element.parcelid}</h2></div>
            <div class="info-card info-img"><h2>GIS IMAGE:</h2> <img src="${element.gisimg}"></img></div>
            <div class="info-card info-text"><h2>LINK GIS:</h2> <h2>${element.gislink}</h2></div>
            <div class="info-card info-img"><h2>FLOODZONE IMAGE:</h2> <img src="${element.floodzoneimg}"></img></div>
            <div class="info-card info-text"><h2>FLOODZONE:</h2> <h2>${element.floodzonetext}</h2></div>
            <div class="info-card info-img"><h2>MAPS IMAGE:</h2> <img src="${element.mapsimg}"></div>
            <div class="info-card info-text"><h2>MAPS LINK:</h2> <h2>${element.mapslink}</h2></div>
            <div class="info-card info-img"><h2>STREETVIEW IMAGE</h2> <img src="${element.streetviewimg}"></div>
            <div class="info-card info-text"><h2>TAX OWNED:</h2> <h2>${element.taxowned}</h2></div>
            <div class="info-card info-text"><h2>LAND VALUE</h2> <h2>${element.marketvalue}</h2></div>
            <div class="info-card info-text"><h2>LATITUDE:</h2> <h2>${element.latitude}</h2></div>
            <div class="info-card info-text"><h2>LONGITUDE:</h2> <h2>${element.longitude}</h2></div>
            <div class="info-card info-text"><h2>LOT SIZE:</h2> <h2>${element.acres}</h2></div>
            <div class="info-card info-text"><h2>ADDRESS:</h2> <h2>${element.adress}</h2></div>
            <div class="info-card info-text"><h2>ADDRESS NEIGHBOOR 1:</h2> <h2>${element.n1adress}</h2></div>
            <div class="info-card info-text"><h2>ADDRESS NEIGHBOOR 2:</h2> <h2>${element.n2adress}</h2></div>
            <div class="info-card info-text"><h2>ADDRESS NEIGHBOOR 3:</h2> <h2>${element.n3adress}</h2></div>
            <div class="info-card info-text"><h2>ADDRESS NEIGHBOOR 4:</h2> <h2>${element.n4adress}</h2></div>
            <div class="info-card info-text"><h2>RANK:</h2> <h2>${element.rank1}</h2></div>
            <div class="info-card info-text"><h2>OBS:</h2> <h2>${element.obs1}</h2></div>
            <div class="info-card info-text"><h2>FLOODZONE LINK:</h2> <h2>${element.floodzonelink}</h2></div>
            <div class="info-card info-text"><h2>ZESTIMATE:</h2> <h2>${element.zestimate}</h2></div>
            <div class="info-card info-text"><h2>ZILLOW LINK:</h2> <h2>${element.zillowlink}</h2></div>
            <div class="info-card info-text"><h2>HOA:</h2> <h2>${element.hoa}</h2></div>
            <div class="info-card info-text"><h2>WATER SUPPLY:</h2> <h2>${element.watersupply}</h2></div>
            <div class="info-card info-text"><h2>ELECTRICITY SUPPLY:</h2> <h2>${element.electricitysupply}</h2></div>
            <div class="info-card info-text"><h2>SEWERAGE:</h2> <h2>${element.sewerage}</h2></div>
            <div class="info-card info-text"><h2>MINIMAL BID:</h2> <h2>${element.minimalbid}</h2></div>
            <div class="info-card info-text"><h2>NEIGHBOOR 1 NAME:</h2> <h2>${element.n1name}</h2></div>
            <div class="info-card info-text"><h2>NEIGHBOOR 2 NAME:</h2> <h2>${element.n2name}</h2></div>
            <div class="info-card info-text"><h2>NEIGHBOOR 3 NAME:</h2> <h2>${element.n3name}</h2></div>
            <div class="info-card info-text"><h2>NEIGHBOOR 4 NAME:</h2> <h2>${element.n4name}</h2></div>
        </div>
        <div class="infos">
            <div class="house-button" onclick="accordion(this.parentElement)"><i class="fas fa-home"></i></div>
            <div style="display: none;">
                <div class="info-card info-text"><h2>OWNER NAME:</h2> <h2>${element.ownername}</h2></div>
                <div class="info-card info-text"><h2>PROPSTREAM MARKET VALUE:</h2> <h2>${element.propstream}</h2></div>
                <div class="info-card info-text"><h2>ESTIMATED ARV:</h2> <h2>${element.estimatedarv}</h2></div>
                <div class="info-card info-text"><h2>GOOGLE MAPS DATE:</h2> <h2>${element.gmapdate}</h2></div>
                <div class="info-card info-text"><h2>GOOGLE EARTH LINK:</h2> <h2>${element.gearthlink}</h2></div>
                <div class="info-card info-text"><h2>SHOWING BUILDING?:</h2> <h2>${element.showingbuilding}</h2></div>
                <div class="info-card info-text"><h2>BUILDING SIZE:</h2> <h2>${element.buildingsize}</h2></div>
                <div class="info-card info-text"><h2>YEAR BUILT:</h2> <h2>${element.yearbuilt}</h2></div>
                <div class="info-card info-text"><h2>STRUCTURE TYPE:</h2> <h2>${element.structuretype}</h2></div>
                <div class="info-card info-text"><h2>NUMBER OF BEDROOMS:</h2> <h2>${element.bedrooms}</h2></div>
                <div class="info-card info-text"><h2>NUMBER OF BATHROOMS:</h2> <h2>${element.bathrooms}</h2></div>
                <div class="info-card info-text"><h2>GARAGE SIZE:</h2> <h2>${element.garage}</h2></div>
                <div class="info-card info-text"><h2>TAXES PER YEAR:</h2> <h2>${element.taxesperyear}</h2></div>
                <div class="info-card info-text"><h2>CAD LAND VALUE:</h2> <h2>${element.cadlandvalue}</h2></div>
                <div class="info-card info-text"><h2>CAD BUILDING VALUE:</h2> <h2>${element.cadbuildingvalue}</h2></div>
                <div class="info-card info-text"><h2>CAD TOTAL VALUE:</h2> <h2></h2>${element.cadtotalvalue}</div>
                <div class="info-card info-text"><h2>NEED TO CONFIRM CONDITION:</h2> <h2>${element.needtoconfirm}</h2></div>
                <div class="info-card info-text"><h2>CAD INFO FROM GIS:</h2> <img src="${element.cadimage}"></img></div>
            </div>
        </div>

        <div class="infos">
            <div class="house-button at-button" onclick="accordion(this.parentElement)"><i class="fas fa-at"></i></div>
            <div style="display: none;">
                <div class="info-card info-text"><h2>NEIGHBOOR 1 EMAIL:</h2> <h2>${element.n1email}</h2></div>
                <div class="info-card info-text"><h2>NEIGHBOOR 1 NUMBER:</h2> <h2>${element.n1number}</h2></div>

                <div class="info-card info-text"><h2>NEIGHBOOR 2 EMAIL:</h2> <h2>${element.n2email}</h2></div>
                <div class="info-card info-text"><h2>NEIGHBOOR 2 NUMBER:</h2> <h2>${element.n2number}</h2></div>

                <div class="info-card info-text"><h2>NEIGHBOOR 3 EMAIL:</h2> <h2>${element.n3email}</h2></div>
                <div class="info-card info-text"><h2>NEIGHBOOR 3 NUMBER:</h2> <h2>${element.n3number}</h2></div>

                <div class="info-card info-text"><h2>NEIGHBOOR 4 EMAIL:</h2> <h2>${element.n4email}</h2></div>
                <div class="info-card info-text"><h2>NEIGHBOOR 4 NUMBER:</h2> <h2>${element.n4number}</h2></div>
            </div>
        </div>
    </div>  
    `
    areaCards.append(searchedCard)
}

function parcelToJson(){
    var parcel = document.querySelector('#searchinputapp').value
    //console.log(parcel)
    var parcelStr = `{"parcelid":"${formatStringPlus(parcel)}"}`
    const parcelJson = JSON.parse(parcelStr)
    
    return parcelJson
}

async function postSearchParcel(json) {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const parcelResponse = await fetch('/searchbyparcelapp', options)
        const parcelContent = await parcelResponse.json();
        return parcelContent
        
    }
    catch(error){
        console.log(error)
    }
}