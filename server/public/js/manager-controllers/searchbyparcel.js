import * as manager from "../manager-programs/managerSearchProgram.js";
import * as path from "../manager-programs/paths.js"

document.querySelector('#search-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    const json = getJson()
    const result = await manager.postDataManager(json, path.postParcel)
    //console.log(result)
    const container = document.querySelector('#parcels-container')
    container.innerHTML = ""
    for (let i = 0; i < result.length; i++) {
        var resultIndex = result[i]
        manager.showParcelList(resultIndex)
        //console.log(resultIndex)
    }

    document.querySelector('#parcels-container').style.display = 'block'
})

function getJson(){
    const parcel = document.querySelector('#parcel-input').value
    var jsonModel = `{"parcel":"${parcel}"}`
    const json = JSON.parse(jsonModel)
    return json
}