
async function getJson(card){
    var cardInfo = card.children[1]

    var parcelid = cardInfo.children[0].children[1]
    var linkgis = cardInfo.children[2].children[1]
    var floodzonetext = cardInfo.children[4].children[1]
    var mapslink = cardInfo.children[6].children[1]
    var taxowned = cardInfo.children[8].children[1]
    var marketvalue = cardInfo.children[9].children[1]
    var latitude = cardInfo.children[10].children[1]
    var longitude = cardInfo.children[11].children[1]
    var acres = cardInfo.children[12].children[1]
    var adress = cardInfo.children[13].children[1]
    var adressn1 = cardInfo.children[14].children[1]
    var adressn2 = cardInfo.children[15].children[1]
    var adressn3 = cardInfo.children[16].children[1]
    var adressn4 = cardInfo.children[17].children[1]
    var rank = cardInfo.children[18].children[1]
    var obs = cardInfo.children[19].children[1]
     //--array name     --input inside info              --label            --class             --cache id
    var sateliteimage = cardInfo.children[1].children[1]
    var floodzoneimage = cardInfo.children[3].children[1]
    var mapsimage = cardInfo.children[5].children[1]
    var streetviewimage = cardInfo.children[7].children[1]
    var state = document.querySelector('#state').value
    var county = document.querySelector('#county').value

    console.log(state, county)

    var username = document.querySelector('#username').innerHTML

    var cardString = `{
        "userinfo":[{
            "username":"${username}"
        }],
        "parcelid":"${parcelid.innerHTML}",
        "gis":[{
            "gisimg":"${sateliteimage.src}",
            "gislink":"${linkgis.innerHTML}"
        }],
        "floodzone":[{
            "floodzoneimg":"${floodzoneimage.src}",
            "floodzonetext":"${floodzonetext.innerHTML}"
        }],
        "maps":[{
            "mapsimg":"${mapsimage.src}",
            "mapslink":"${mapslink.innerHTML}"
        }],
        "streetview":[{
            "streetviewimg":"${streetviewimage.src}"
        }],
        "marketvalue":"${marketvalue.innerHTML}",
        "latitude":"${latitude.innerHTML}",
        "longitude":"${longitude.innerHTML}",
        "acres":"${acres.innerHTML}",
        "adress":"${adress.innerHTML}",
        "adressn1":"${adressn1.innerHTML}",
        "adressn2":"${adressn2.innerHTML}",
        "adressn3":"${adressn3.innerHTML}",
        "adressn4":"${adressn4.innerHTML}",
        "rank":"${rank.innerHTML}",
        "obs":"${obs.innerHTML}",
        "taxowned":"${taxowned.innerHTML}",
        "state":"${state}",
        "county":"${county}"
    }`
    var cardJson = JSON.parse(cardString)
    return cardJson
}

async function postJson(card) {
    try{
    var json = await getJson(card)
    const options = {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(json)
    }
    fetch('/app', options)
    card.style.backgroundImage = "url('img/antique-texture-green.jpg')"
    }
    catch(error){
        console.log(error)
    }
}


