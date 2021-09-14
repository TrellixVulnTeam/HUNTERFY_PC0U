document.querySelector('.search-button').addEventListener("click", (event)=>{
        event.preventDefault()
        runUser()
    })

async function runUser(){
    function getJson(){
        var user = document.querySelector('#user').value
        var date = document.querySelector('#date').value

        var jsonModel = `{"user":"${user}", "date":"${date}"}`
        const UserDatejson = JSON.parse(jsonModel)
        
        return UserDatejson
        
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
            console.log(content)
	        for (var i = 0; i < content.length; i++) {
                var contentIndex = content[i]
                createItem(contentIndex)
                console.log(contentIndex)
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
    
           <div class="itens-container">
               
               
           </div>
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}

async function createItem(element){
    var itensContainer = document.querySelector('.itens-container')
    var div = document.createElement('div')
    var item = `
    <!--item-->
    <ul class="item">
        <!--campo1-->
        <button class="accordion" onclick="accordion(this.parentElement)">
        <li class="title">
            <ul class="columns">
                <li>user</li>
                <li>date</li>
                <li>PARCELID</li>
                <li>GIS IMAGE</li>
                <li>FLOODZONE IMAGE</li>
                <li>MAPS IMAGE</li>
            </ul>
        </li>
        <li class="values">
            <ul class="columns">
                <li>${element.user_id}</li>
                <li>${element.dateandtime}</li>
                <li>${element.parcelid}</li>
                <li><img src="${element.gisimg}"></li>
                <li><img src="${element.floodzoneimg}"></li>
                <li></li>
            </ul>
        </li>
        </button>
        <div style="display: none;">
            <!--campo2-->
            <li class="title">
                <ul class="columns">
                    <li>STREETVIEW IMAGE</li>
                    <li>FLOODZONE</li>
                    <li>MAPS LINK</li>
                    <li>TAX OWNED</li>
                    <li>MARKET VALUE</li>
                    <li>ACRES</li>
                </ul>
            </li>
            <li class="values">
                <ul class="columns">
                    <li></li>
                    <li>${element.floodzonetext}</li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </li>
            <!--campo3-->
            <li class="title">
                <ul class="columns">
                    <li>LATITUDE</li>
                    <li>LONGITUDE</li>
                    <li>ADRESS</li>
                    <li>N1 ADRESS</li>
                    <li>N2 ADRESS</li>
                    <li>N3 ADRESS</li>
                </ul>
            </li>
            <li class="values">
                <ul class="columns">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </li>
            <!--campo4-->
            <li class="title">
                <ul class="columns">
                    <li>N4 ADRESS</li>
                    <li>RANK LEVEL1</li>
                    <li>OBS (LV1)</li>
                    <li>RANK LEVEL 2</li>
                    <li>RL2 USER</li>
                    <li>RL2 OBS</li>
                </ul>
            </li>
            <li class="values">
                <ul class="columns">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li><input type="text"></li>
                    <li><input type="text"></li>
                    <li><input type="text"></li>
                </ul>
            </li>
            <li class="title">
                <ul class="columns">
                    <li>RANK LEVEL3</li>
                    <li>RL3 USER</li>
                    <li>RL3 OBS</li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </li>
            <li class="values">
                <ul class="columns">
                    <li><input type="text"></li>
                    <li><input type="text"></li>
                    <li><input type="text"></li>
                    <li></li>
                    <li></li>
                    <li><button class="submitrank" type="submit">submit</button></li>
                </ul>
            </li>
        </div>
    </ul><!--item-->
    `
    div.innerHTML = item
    itensContainer.append(div)
}
var acc = document.getElementsByClassName("accordion");
var i;


function accordion(item){
    var hide = item.children[1]    
    if (hide.style.display === "block") {
        hide.style.display = "none";
      } else {
        hide.style.display = "block";
      }
    
}
