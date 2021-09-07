async function cardToJson(card){
    var cardInfo = card.children[0]

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

    var cardString = `{
        "parcelid":"${parcelid.innerHTML}",
        "gis":[{
            "linkgis":"${linkgis.innerHTML}"
        }],
        "floodzone":[{
            "floodzonetext":"${floodzonetext.innerHTML}"
        }],
        "maps":[{
            "mapslink":"${mapslink.innerHTML}"
        }],
        "streetview":[{
            "streetviewimg":""
        }],
        "taxowned":"${taxowned.innerHTML}"

    }`

    var cardJson = JSON.parse(cardString)
    console.log(cardString)
    console.log(cardJson)


}