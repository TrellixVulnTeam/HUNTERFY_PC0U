document.querySelector('.search-button').addEventListener("click", (event)=>{
    event.preventDefault()
    runUser()
})

async function runUser(){
    function getJson(){
        var user = document.querySelector('#user').value
        var date = document.querySelector('#date').value

        var jsonModel = `{"user":"${user}", "date":"${date}"}`
        const userDatejson = JSON.parse(jsonModel)
        
        return userDatejson
        
    }

    async function postUserDate(json) {
        try{
            const options = {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(json)
            }
            const rawResponse = await fetch('/searchbyuser', options)
            const content = await rawResponse.json();
            const rows = content.rows
            console.log(rows)
            var itensContainer = document.querySelector('.itens-container')
            itensContainer.innerHTML = ''
            var loadingH2 = document.createElement('h2')
            loadingH2.innerHTML = 'Loading...'
            itensContainer.append(loadingH2)
            for (var i = 0; i < rows.length; i++) {
                var contentIndex = rows[i]
                createItem(contentIndex)
                var contagem = document.querySelector('.production-count')
                contagem.innerHTML = `Total: ${i+1}`
            }
        }
        catch(error){
            console.log(error)
        }
}
await getJson()	
buildPage(getJson());
await postUserDate(getJson())
}

async function buildPage(json){
    var createItem = `
    <h2 class="username">${json.user}</h2>
    <h2 class="date">${json.date}</h2>
    <h2 class="production-count"></h2>

        <div class="itens-container">
            
            
        </div>
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}
