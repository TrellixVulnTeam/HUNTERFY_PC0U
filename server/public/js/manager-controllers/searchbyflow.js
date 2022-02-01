import * as manager from "../manager-programs/managerSearchProgram.js";
import * as path from "../manager-programs/paths.js"

document.querySelector('#search-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    const json = getJson()
    const result = await manager.postDataManager(json, path.postFlow)
    //console.log(result)
    const container = document.querySelector('#parcels-container')
    container.innerHTML = ""
    for (let i = 0; i < result.length; i++) {
        var resultIndex = result[i]
        manager.showParcelList(resultIndex)
        if(resultIndex.parcelid.length > 40){
            console.log(resultIndex)
        }
        //console.log(resultIndex)
    }

    document.querySelector('#parcels-container').style.display = 'block'

    const infoContainer = document.querySelector('#search-info')
    infoContainer.children[1].innerHTML = `Flow: ${json.flow}`
    infoContainer.children[2].innerHTML = `Results: ${result.length}`
    infoContainer.style.display = 'flex'
})

function getJson(){
    const stage = document.querySelector('#select-stage').value

    var jsonModel = `{"flow":"${stage}"}`
    const json = JSON.parse(jsonModel)
    console.log(json)
    return json
}