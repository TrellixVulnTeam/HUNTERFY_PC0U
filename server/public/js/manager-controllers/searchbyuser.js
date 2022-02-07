import * as manager from "../manager-programs/managerSearchProgram.js";
import * as path from "../manager-programs/paths.js"

const selectUser = document.querySelector('#select-user')
window.addEventListener('load', async()=>{
    const result = await fetch(path.allusers)
    const json = await result.json()
    selectUser.innerHTML = ""
    for (let i = 0; i < json.length; i++) {
        var usersIndex = json[i]
        manager.createOption(usersIndex.username, usersIndex.username, selectUser)
    }
})

document.querySelector('#search-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    const json = getJson()
    const result = await manager.postDataManager(json, path.postUserDate)
    //console.log(result)
    const container = document.querySelector('#parcels-container')
    container.innerHTML = ""
    manager.buttonsOnTopOfParcelList('Copy All Parcel IDs', 'Then CTRL+V Anywhere', 'copy-parcels')
    for (let i = 0; i < result.rows.length; i++) {
        var resultIndex = result.rows[i]
        manager.showParcelList(resultIndex)
        //console.log(resultIndex)
    }

    document.querySelector('#parcels-container').style.display = 'block'

    const infoContainer = document.querySelector('#search-info')
    infoContainer.children[1].innerHTML = `User: ${json.user}`
    infoContainer.children[2].innerHTML = `Date: ${json.date}`
    infoContainer.children[3].innerHTML = `Results: ${result.rows.length}`
    infoContainer.style.display = 'flex'

    document.querySelector('#copy-parcels').addEventListener('click', (event)=>{
        event.preventDefault()
        const allParcels = document.querySelectorAll('.parcelid-searchProgram')
        manager.toClipboard(allParcels)
    })
})

function getJson(){
    const user = document.querySelector('#select-user').value
    const date = document.querySelector('#date-input').value

    var jsonModel = `{"user":"${user}", "date":"${date}"}`
    const json = JSON.parse(jsonModel)
    return json
}