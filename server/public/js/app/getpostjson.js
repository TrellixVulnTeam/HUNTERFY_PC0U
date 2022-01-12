async function getJson(card){
    try{
        const cardInfo = card.children[1]
        const parcelid = cardInfo.children[0].children[1].innerHTML
        const linkgis = cardInfo.children[2].children[1].innerHTML
        const floodzonetext = cardInfo.children[4].children[1].innerHTML
        const mapslink = cardInfo.children[6].children[1].innerHTML
        const taxowned = cardInfo.children[8].children[1].innerHTML
        const marketvalue = cardInfo.children[9].children[1].innerHTML
        const latitude = cardInfo.children[10].children[1].innerHTML
        const longitude = cardInfo.children[11].children[1].innerHTML
        const acres = cardInfo.children[12].children[1].innerHTML
        const adress = cardInfo.children[13].children[1].innerHTML
        const adressn1 = cardInfo.children[14].children[1].innerHTML
        const adressn2 = cardInfo.children[15].children[1].innerHTML
        const adressn3 = cardInfo.children[16].children[1].innerHTML
        const adressn4 = cardInfo.children[17].children[1].innerHTML
        const rank = cardInfo.children[18].children[1].innerHTML
        const obs = cardInfo.children[19].children[1].innerHTML
        const floodzonelink = cardInfo.children[20].children[1].innerHTML
        const zestimate = cardInfo.children[21].children[1].innerHTML
        const zillow = cardInfo.children[22].children[1].innerHTML
        const hoa = cardInfo.children[23].children[1].innerHTML
        const watersupply = cardInfo.children[24].children[1].innerHTML
        const elecsupply = cardInfo.children[25].children[1].innerHTML
        const sewerage = cardInfo.children[26].children[1].innerHTML
        const minimal = cardInfo.children[27].children[1].innerHTML
        const n1name = cardInfo.children[28].children[1].innerHTML
        const n2name = cardInfo.children[29].children[1].innerHTML
        const n3name = cardInfo.children[30].children[1].innerHTML
        const n4name = cardInfo.children[31].children[1].innerHTML

        const houseInfo = card.children[2].children[1]
        const ownerName = houseInfo.children[0].children[1].innerHTML
        const propsStream = houseInfo.children[1].children[1].innerHTML
        const estimatedArv = houseInfo.children[2].children[1].innerHTML
        const gMapsDate = houseInfo.children[3].children[1].innerHTML
        const gEarthLink = houseInfo.children[4].children[1].innerHTML
        const showingBuilding = houseInfo.children[5].children[1].innerHTML
        const buildingSize = houseInfo.children[6].children[1].innerHTML
        const builtYear = houseInfo.children[7].children[1].innerHTML
        const structureType = houseInfo.children[8].children[1].innerHTML
        const bedroomsNumber = houseInfo.children[9].children[1].innerHTML
        const bathroomsNumber = houseInfo.children[10].children[1].innerHTML
        const garageSize = houseInfo.children[11].children[1].innerHTML
        const taxesPerYear = houseInfo.children[12].children[1].innerHTML
        const cadLandValue = houseInfo.children[13].children[1].innerHTML
        const cadBuildingValue = houseInfo.children[14].children[1].innerHTML
        const cadTotalValue = houseInfo.children[15].children[1].innerHTML
        const needToConfirm = houseInfo.children[16].children[1].innerHTML

        const nInfo = card.children[3].children[1]
        const n1number = nInfo.children[0].children[1].innerHTML
        const n2number = nInfo.children[1].children[1].innerHTML
        const n3number = nInfo.children[2].children[1].innerHTML
        const n4number = nInfo.children[3].children[1].innerHTML
        const n1email = nInfo.children[4].children[1].innerHTML
        const n2email = nInfo.children[5].children[1].innerHTML
        const n3email = nInfo.children[6].children[1].innerHTML
        const n4email = nInfo.children[7].children[1].innerHTML

        //--array name     --input inside info              --label            --class             --cache id
        const sateliteimage = cardInfo.children[1].children[1].src
        const floodzoneimage = cardInfo.children[3].children[1].src
        const mapsimage = cardInfo.children[5].children[1].src
        const streetviewimage = cardInfo.children[7].children[1].src

        const cadImage = houseInfo.children[17].children[1].src

        var state = document.querySelector('#states')
        var state = state.options[state.selectedIndex].innerHTML
        const county = document.querySelector('#counties').value
        const username = document.querySelector('#username').innerHTML
        const listType = document.querySelector('#list-type').value

        //console.log(state)
        //var usertype = document.querySelector('input[name="usertype"]:checked').value
        //"usertype":"${usertype}"
        var cardString = `{
            "userinfo":[{
                "username":"${username}"
            }],
            "parcelid":"${formatStringPlus(parcelid)}",
            "gis":[{
                "gisimg":"${sateliteimage}",
                "gislink":"${formatString(linkgis)}"
            }],
            "floodzone":[{
                "floodzoneimg":"${floodzoneimage}",
                "floodzonetext":"${formatString(floodzonetext)}",
                "floodzonelink":"${formatString(floodzonelink)}"
            }],
            "maps":[{
                "mapsimg":"${mapsimage}",
                "mapslink":"${formatString(mapslink)}"
            }],
            "streetviewimg":"${streetviewimage}",
            "marketvalue":"${formatString(marketvalue)}",
            "latitude":"${formatString(latitude)}",
            "longitude":"${formatString(longitude)}",
            "acres":"${formatString(acres)}",
            "adress":"${formatString(adress)}",
            "adressn1":"${formatString(adressn1)}",
            "adressn2":"${formatString(adressn2)}",
            "adressn3":"${formatString(adressn3)}",
            "adressn4":"${formatString(adressn4)}",
            "rank":"${rank}",
            "obs":"${formatString(obs)}",
            "taxowned":"${formatString(taxowned)}",
            "state":"${formatString(state)}",
            "county":"${formatString(county)}",
            "zillow":"${formatString(zillow)}",
            "zestimate":"${formatString(zestimate)}",
            "hoa":"${formatString(hoa)}",
            "watersupply":"${watersupply}",
            "elecsupply":"${elecsupply}",
            "sewerage":"${sewerage}",
            "minimalbid":"${formatString(minimal)}",
            "ownername":"${formatString(ownerName)}",
            "propsstream":"${formatString(propsStream)}",
            "estimatedarv":"${formatString(estimatedArv)}",
            "gmapsdate":"${formatString(gMapsDate)}",
            "gearthlink":"${formatString(gEarthLink)}",
            "showingbuilding":"${formatString(showingBuilding)}",
            "buildingsize":"${formatString(buildingSize)}",
            "builtyear":"${formatString(builtYear)}",
            "structuretype":"${formatString(structureType)}",
            "bedroomsnumber":"${formatString(bedroomsNumber)}",
            "bathroomsnumber":"${formatString(bathroomsNumber)}",
            "garagesize":"${formatString(garageSize)}",
            "taxesperyear":"${formatString(taxesPerYear)}",
            "cadlandvalue":"${formatString(cadLandValue)}",
            "cadbuildingvalue":"${formatString(cadBuildingValue)}",
            "cadtotalvalue":"${formatString(cadTotalValue)}",
            "needtoconfirm":"${formatString(needToConfirm)}",
            "cadimage":"${cadImage}",
            "listtype":"${listType}",
            "n1name":"${formatString(n1name)}",
            "n2name":"${formatString(n2name)}",
            "n3name":"${formatString(n3name)}",
            "n4name":"${formatString(n4name)}",
            "n1number":"${formatString(n1number)}",
            "n2number":"${formatString(n2number)}",
            "n3number":"${formatString(n3number)}",
            "n4number":"${formatString(n4number)}",
            "n1email":"${formatString(n1email)}",
            "n2email":"${formatString(n2email)}",
            "n3email":"${formatString(n3email)}",
            "n4email":"${formatString(n4email)}"
        }`
        var cardJson = JSON.parse(cardString)
        var cardJson = JSON.stringify(cardJson)
        //console.log(cardJson)
        return cardJson

    }
    catch(err){
        console.log('erro de conversao', err)
    }
}

async function postJson(card) {
    alert('Sending Data')
    try{
        var json = await getJson(card)
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: json
        }
        const rawRes = await fetch('/app', options)
        const content = await rawRes.json()
        if(rawRes.ok === true){
            if(content.message == "undefined"){
                alert('please log in again')
                location.reload()
            }else{
                card.style.backgroundImage = "url('img/antique-texture-green.jpg')"
                alert(`SUCCESS: ${content.message}`)
                attContador()
            }
        }else{
            console.log('upload error')
            alert('upload error')

        }
    }
    catch(error){
        console.log(error)
        console.log('FETCH ERROR, CHECK CONNECTION!')
    }
}


