async function getJson(card){
    try{
        var cardInfo = card.children[1]
        var parcelid = cardInfo.children[0].children[1].innerHTML
        var linkgis = cardInfo.children[2].children[1].innerHTML
        var floodzonetext = cardInfo.children[4].children[1].innerHTML
        var mapslink = cardInfo.children[6].children[1].innerHTML
        var taxowned = cardInfo.children[8].children[1].innerHTML
        var marketvalue = cardInfo.children[9].children[1].innerHTML
        var latitude = cardInfo.children[10].children[1].innerHTML
        var longitude = cardInfo.children[11].children[1].innerHTML
        var acres = cardInfo.children[12].children[1].innerHTML
        var adress = cardInfo.children[13].children[1].innerHTML
        var adressn1 = cardInfo.children[14].children[1].innerHTML
        var adressn2 = cardInfo.children[15].children[1].innerHTML
        var adressn3 = cardInfo.children[16].children[1].innerHTML
        var adressn4 = cardInfo.children[17].children[1].innerHTML
        var rank = cardInfo.children[18].children[1].innerHTML
        var obs = cardInfo.children[19].children[1].innerHTML
        var floodzonelink = cardInfo.children[20].children[1].innerHTML
        var zestimate = cardInfo.children[21].children[1].innerHTML
        var zillow = cardInfo.children[22].children[1].innerHTML
        var hoa = cardInfo.children[23].children[1].innerHTML
        var watersupply = cardInfo.children[24].children[1].innerHTML
        var elecsupply = cardInfo.children[25].children[1].innerHTML
        var sewerage = cardInfo.children[26].children[1].innerHTML
        //--array name     --input inside info              --label            --class             --cache id
        var sateliteimage = cardInfo.children[1].children[1].src
        var floodzoneimage = cardInfo.children[3].children[1].src
        var mapsimage = cardInfo.children[5].children[1].src
        var streetviewimage = cardInfo.children[7].children[1].src

        var state = document.querySelector('#states')
        var state = state.options[state.selectedIndex].innerHTML
        var county = document.querySelector('#counties').value
        var username = document.querySelector('#username').innerHTML

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
            "sewerage":"${sewerage}"
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


