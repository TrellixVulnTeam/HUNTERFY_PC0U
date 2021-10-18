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
        console.log(content)
        var arr = []
        for (var i = 0; i < content.rows.length; i++) {
            var contentIndex = content.rows[i]
            var date = new Date(contentIndex.date)
            var day = date.getDate()
        }
        var novaArr = arr.filter(function(este, i) {
            return arr.indexOf(este) === i;
        });
        console.log(novaArr)
    }
    catch(error){
        console.log(error)
    }
}

function getJson(){
    var month = document.querySelector('#month').value
    var year = document.querySelector('#year').value
    console.log(month, year)
    
    const jsonModel = `{"month":"${month}", "year":"${year}"}`
    const datejson = JSON.parse(jsonModel)
    return datejson
}

async function buildPage(json){
    var createItem = `
        <h2 class="date">${json.date}</h2>
        <h2>Counties per day</h2>
           <div class="itens-container">
               <h2 id="1"></h2>
               <h2 id="2"></h2>
               <h2 id="3"></h2>
               <h2 id="4"></h2>
               <h2 id="5"></h2>
               <h2 id="6"></h2>
               <h2 id="7"></h2>
               <h2 id="8"></h2>
               <h2 id="9"></h2>
               <h2 id="10"></h2>
               <h2 id="11"></h2>
               <h2 id="12"></h2>
               <h2 id="13"></h2>
               <h2 id="14"></h2>
               <h2 id="15"></h2>
               <h2 id="16"></h2>
               <h2 id="17"></h2>
               <h2 id="18"></h2>
               <h2 id="19"></h2>
               <h2 id="20"></h2>
               <h2 id="21"></h2>
               <h2 id="22"></h2>
               <h2 id="23"></h2>
               <h2 id="24"></h2>
               <h2 id="25"></h2>
               <h2 id="26"></h2>
               <h2 id="27"></h2>
               <h2 id="28"></h2>
               <h2 id="29"></h2>
               <h2 id="30"></h2>
               <h2 id="31"></h2>
           </div>
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}
    