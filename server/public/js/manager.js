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

    function postUserDate(json) {
        try{
        console.log(json)
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        fetch('/manager', options)
        }
        catch(error){
            console.log(error)
        }
    }


    await getJson()
    await postUserDate(getJson())
    buildPage(getJson());
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

async function createItem(){
    var itensContainer = document.querySelector('.itens-container')
    var item = `
        <!--item-->
        <ul class="item">
            <!--campo1-->
            <li class="title">
                <ul class="columns">
                    <li>user</li>
                    <li>date</li>
                    <li>PARCELID</li>
                    <li>GIS IMAGE</li>
                    <li>FLOODZONE</li>
                    <li>FLOODZONE IMAGE</li>
                    
                </ul>
            </li>
            <li class="values">
                <ul class="columns">
                    <li>gvmolinadmin</li>
                    <li>date</li>
                    <li>4567890-5678</li>
                    <li>GIS IMAGE</li>
                    <li>FLOODZONE</li>
                    <li>FLOODZONE IMAGE</li>
                </ul>
            </li>
            <!--campo2-->
            <li class="title">
                <ul class="columns">
                    <li>MAPS LINK</li>
                    <li>MAPS IMAGE</li>
                    <li>STREETVIEW IMAGE</li>
                    <li>TAX OWNED</li>
                    <li>MARKET VALUE</li>
                    <li>ACRES</li>
                    
                </ul>
            </li>
            <li class="values">
                <ul class="columns">
                    <li></li>
                    <li>loremipsun</li>
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
                    <li>loremipsun</li>
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
                    <li>loremipsun</li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </li>
            
        </ul><!--item-->
    `
    itensContainer.append(item)
}

