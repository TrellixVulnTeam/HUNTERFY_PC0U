var searchButton = document.querySelector("#searchbutton")
var areaCards = document.querySelector(".area-cards")
var rootEditArea = document.querySelector(".root-edit")

searchButton.addEventListener("click", async()=>{
    console.log('searched')
    var result = await postSearchParcel(parcelToJson())
    renderResult(result)
})

function renderResult(element){
    var searchedCard = document.createElement('div')
    searchedCard.innerHTML = `
    <div class="card" style="background-image: url('./img/antique-texture.jpg');">
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
            <div class="info-card info-text"><h2>MARKET VALUE</h2> <h2>${element.marketvalue}</h2></div>
            <div class="info-card info-text"><h2>LATITUDE:</h2> <h2>${element.latitude}</h2></div>
            <div class="info-card info-text"><h2>LONGITUDE:</h2> <h2>${element.longitude}</h2></div>
            <div class="info-card info-text"><h2>ACRES:</h2> <h2>${element.acres}</h2></div>
            <div class="info-card info-text"><h2>ADRESS:</h2> <h2>${element.adress}</h2></div>
            <div class="info-card info-text"><h2>ADRESS NEIGHBOOR 1:</h2> <h2>${element.n1adress}</h2></div>
            <div class="info-card info-text"><h2>ADRESS NEIGHBOOR 2:</h2> <h2>${element.n2adress}</h2></div>
            <div class="info-card info-text"><h2>ADRESS NEIGHBOOR 3:</h2> <h2>${element.n3adress}</h2></div>
            <div class="info-card info-text"><h2>ADRESS NEIGHBOOR 4:</h2> <h2>${element.n4adress}</h2></div>
            <div class="info-card info-text"><h2>RANK:</h2> <h2>${element.rank1}</h2></div>
            <div class="info-card info-text"><h2>OBS:</h2> <h2>${element.obs1}</h2></div>
        </div>
        <button class="edit" onclick="editarCard(this.parentElement)"><i class="fas fa-pen-square"></i></button>
        <button class="exclude" onclick="excluirCard(this.parentElement)"><i class="fas fa-trash"></i></i></button> 
        <button class="send" onclick="postJson(this.parentElement)" style="margin-right:2vw"><i class="fas fa-share"></i></button>   
        
    </div>  
    `
    areaCards.append(searchedCard)
}

function parcelToJson(){
    var parcel = document.querySelector('#searchinputapp').value

    var parcelStr = `{"parcelid":"${parcel}"}`
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