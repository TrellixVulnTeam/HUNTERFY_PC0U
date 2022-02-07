import * as manager from "../manager-programs/managerSearchProgram.js";
import * as path from "../manager-programs/paths.js"

const selectState = document.querySelector('#select-state')
window.addEventListener('load', async()=>{
    const result = await fetch(path.getStates)
    const json = await result.json()
    const container = document.querySelector('#select-state')
    //console.log(json)
    selectState.innerHTML = ""
    for (let i = 0; i < json.features.length; i++) {
        var statesIndex = json.features[i]
        //console.log(statesIndex.properties)
        
        manager.createOption(statesIndex.properties.NAME, statesIndex.properties.STATE, container)
    }
})

selectState.addEventListener('change', async()=>{
    manager.loadCounties()
})

document.querySelector('#search-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    const json = getJson()
    const result = await manager.postDataManager(json, path.postChecked)
    const container = document.querySelector('#parcels-container')
    console.log(result)
    container.innerHTML = ""
    for (let i = 0; i < result.rows.length; i++) {
        var resultIndex = result.rows[i]
        manager.showParcelList(resultIndex)
        if(resultIndex.parcelid.length > 40){
            console.log(resultIndex)
        }
    }

    document.querySelector('#parcels-container').style.display = 'block'
    const infoContainer = document.querySelector('#search-info')
    infoContainer.children[1].innerHTML = `State: ${json.state}`
    infoContainer.children[2].innerHTML = `County: ${json.county}`
    infoContainer.children[3].innerHTML = `Results: ${result.rows.length}`
    infoContainer.style.display = 'flex'
})

//////////////////////////////////////////////////////////////////////////////

function getJson(){
    const stateSelect = document.querySelector('#select-state')
    const state = stateSelect.options[stateSelect.selectedIndex].innerHTML
    const county = document.querySelector('#select-county').value

    var jsonModel = `{"county":"${county}", "state":"${state}"}`
    const json = JSON.parse(jsonModel)
    return json
}

