document.querySelector('.search-button').addEventListener("click", (event)=>{
    event.preventDefault()
    runUser()
})

async function runUser(){
    const json = await getJson()	
    buildPage(getJson());
    await postCalendar(json)
}

async function postCalendar(json) {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch('/postcalendar', options)
        const content = await rawResponse.json();
        const arr = resumirArr(content)
        const resultContainer = document.querySelector('.results')
        for (var i = 0; i < arr.length; i++) {
            arrIndex = arr[i]
            var li = document.createElement('li')
            li.innerHTML = arrIndex
            resultContainer.append(li)
        }
    }
    catch(error){
        console.log(error)
    }
}

function resumirArr(content){
    var arr = []
    
    for (var i = 0; i < content.rows.length; i++) {
        contentIndex = content.rows[i]
        arr.push(`${contentIndex.state}/${contentIndex.county}`)
    }
    var arr = arr.filter(function(este, i) {
        return arr.indexOf(este) === i;
    });
    
    return arr
    
}

function getJson(){
    var date = document.querySelector('#date').value
    const jsonModel = `{"date":"${date}"}`
    const datejson = JSON.parse(jsonModel)
    return datejson
}

async function buildPage(json){
    var createItem = `
    <div style="margin-top:11vh">
        <h2>State/County insertion on date: ${json.date}</h2>
        <div class="itens-container">
            <h2>Results:</h2>    
            <ul class="results"></ul>
                
        </div>
    </div>       
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}
    