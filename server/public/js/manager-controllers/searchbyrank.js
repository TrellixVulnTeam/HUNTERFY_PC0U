import * as manager from "../manager-programs/managerSearchProgram.js";
import * as path from "../manager-programs/paths.js"

document.querySelector('#search-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    const json = getJson()
    const result = await manager.postDataManager(json, path.postRank)
    //console.log(result)
    const container = document.querySelector('#parcels-container')
    container.innerHTML = ""
    manager.buttonsOnTopOfParcelList('Copy All Parcel IDs', 'Then CTRL+V Anywhere', 'copy-parcels')
    for (let i = 0; i < result.rows.length; i++) {
        var resultIndex = result.rows[i]
        manager.showParcelList(resultIndex)
        if(resultIndex.parcelid.length > 40){
            console.log(resultIndex)
        }
        //console.log(resultIndex)
    }

    document.querySelector('#parcels-container').style.display = 'block'

    const infoContainer = document.querySelector('#search-info')
    infoContainer.children[1].innerHTML = `Rank: ${json.rank}`
    infoContainer.children[2].innerHTML = `${json.ranktype}`
    infoContainer.children[3].innerHTML = `Results: ${result.rows.length}`
    infoContainer.style.display = 'flex'

    document.querySelector('#copy-parcels').addEventListener('click', (event)=>{
        event.preventDefault()
        const allParcels = document.querySelectorAll('.parcelid-searchProgram')
        manager.toClipboard(allParcels)
    })
})

function getJson(){
    const rank = document.querySelector('#select-rank').value
    const ranktype = document.querySelector('#ranktype-select').value

    var jsonModel = `{"rank":"${rank}", "ranktype":"${ranktype}"}`
    const json = JSON.parse(jsonModel)
    console.log(json)
    return json
}