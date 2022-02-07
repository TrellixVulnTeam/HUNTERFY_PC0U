import * as manager from "../manager-programs/managerSearchProgram.js";
import * as path from "../manager-programs/paths.js"
import * as sheet from "../manager-programs/xlsx.js"
//import * as fileSaver from "../manager-programs/FileSaver.js"


const selectState = document.querySelector('#select-state')
window.addEventListener('load', async()=>{
    const result = await fetch(path.getStates)
    const json = await result.json()
    //console.log(json)
    selectState.innerHTML = ""
    for (let i = 0; i < json.features.length; i++) {
        var statesIndex = json.features[i]
        //console.log(statesIndex.properties)
        const container = document.querySelector('#select-state')
        manager.createOption(statesIndex.properties.NAME, statesIndex.properties.STATE, container)
    }
})

selectState.addEventListener('change', async()=>{
    manager.loadCounties()
})

document.querySelector('#search-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    const json = getJson()
    const result = await manager.postDataManager(json, path.searchCountyRankFlow)
    const container = document.querySelector('#parcels-container')
    
    container.innerHTML = ""

    if(result.length > 0){
        manager.buttonsOnTopOfParcelList('Copy All Parcel IDs', 'Then CTRL+V Anywhere', 'copy-parcels')

        document.querySelector('#copy-parcels').addEventListener('click', (event)=>{
            event.preventDefault()
            const allParcels = document.querySelectorAll('.parcelid-searchProgram')
            manager.toClipboard(allParcels)
        })
    }
    
    for (let i = 0; i < result.length; i++) {
        var resultIndex = result[i]
        manager.showParcelList(resultIndex)
        if(resultIndex.parcelid.length > 40){
            console.log(resultIndex)
        }
    }

    if(result.length > 0){
        document.querySelector('#parcels-container').style.display = 'block'
        const infoContainer = document.querySelector('#search-info')
        infoContainer.children[1].innerHTML = `State: ${json.state}`
        infoContainer.children[2].innerHTML = `County: ${json.county}`
        infoContainer.children[3].innerHTML = `Rank: ${json.rank} ${json.ranktype}`
        infoContainer.children[4].innerHTML = `Results: ${result.length}`
        infoContainer.style.display = 'flex'
    }  
})

//////////////////////////////////////////////////////////////////////////////

function getJson(){
    const stateSelect = document.querySelector('#select-state')
    const state = stateSelect.options[stateSelect.selectedIndex].innerHTML
    const county = document.querySelector('#select-county').value
    const rank = document.querySelector('#select-rank').value
    const ranktype = document.querySelector('#ranktype-select').value
    const stage = document.querySelector('#select-stage').value

    var jsonModel = `{"county":"${county}", "state":"${state}", "rank":"${rank}", "ranktype":"${ranktype}", "flow":"${stage}"}`
    const json = JSON.parse(jsonModel)
    return json
}


