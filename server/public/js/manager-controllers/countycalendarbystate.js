document.querySelector('.search-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    const json = getJson()
    const results = await postData(json)
    const arr = await separarArray(results)
    buildPage()
    for (var i = 0; i < arr.length; i++) {
        var arrIndex = arr[i]
        showResults(arrIndex)
    }
    
    
    

})

function getJson(){
    const state = document.querySelector('#stateinput').value
    const jsonModel = `{"state":"${state}"}`
    const json = JSON.parse(jsonModel)
    return json
}

async function postData(json) {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch('/getstateinfo', options)
        const responseJson = await rawResponse.json();
        return responseJson
        
        //createItem(responseJson)  
    }
    catch(error){
        console.log(error)
    }
}

async function separarArray(json){
    var obj = {
        arr:[]
    }
    for (var i = 0; i < json.length; i++) {
        jsonIndex = json[i]
        //console.log(jsonIndex.state)
        var arrNew = [jsonIndex.state, jsonIndex.county, jsonIndex.date]
       obj.arr.push(arrNew)
    }

    const array = obj.arr
    var filtered = array.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))
    return filtered
    
}

async function buildPage(){
    const createItem = `
    <div class="manager-window">
    </div>
    `
    const sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}

function showResults(element){
    console.log(element)
    const itensContainer = document.querySelector('.manager-window')
    const div = document.createElement('div')
    const item = `
        <div class="user-item">
            <h2>${element[0]}</h2>
            <h3>${element[1]}</h3>
            <h3>${element[2]}</h3>
            
        </div>
    `
    div.innerHTML = item
    itensContainer.append(div)
}