document.querySelector('.search-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    const user = document.querySelector('#selectuser-parcellist').value
    //console.log(user)
    const json = getUserJson(user)
    buildPage(json)
    const ul = document.querySelector('#ul-parcel-list')
    const result = await postDataManager(json, '/getlistinfo') 
    for (let i = 0; i < result.rows.length; i++) {
        var resultIndex = result.rows[i]
        createLi(resultIndex, ul)
    }
})

const selectUser = document.querySelector('#selectuser-parcellist')
selectUser.addEventListener('focus', async()=>{
    const result = await fetch('/getallmanagers')
    const json = await result.json()
    selectUser.innerHTML = ""
    for (let i = 0; i < json.length; i++) {
        var usersIndex = json[i]
        createOption(usersIndex, selectUser)
    }
})

async function postParcels(){ 
    const textAreaCont = document.querySelector('#parcelsList')
    const str = textAreaCont.value
    const supervisor = document.querySelector('#list-title').innerHTML
    const state = document.querySelector('#state').value
    const county = document.querySelector('#county').value
    const date = document.querySelector('#auc-date').value
    const users = await fetch('/getallusers')
    const json = await users.json()
    
    var selUsersArr = []
    for (let i = 0; i < json.length; i++) {
        var index = json[i]
        if(index.supervisor == supervisor){
            selUsersArr.push(index.username)
        }
    }    
    const arr = str.split('\n')

    var n = arr.length/selUsersArr.length //tweak this to add more items per line
    console.log(n)
    const result = new Array(Math.ceil(arr.length / n))
    .fill()
    .map(_ => arr.splice(0, n))
    console.log(result)

    var lista = []
    for (let i = 0; i < result.length; i++) {
        var user = selUsersArr[i]
        var index = result[i]
        for (let i = 0; i < index.length; i++) {
            var indexIndex = index[i]
            var item = getList(indexIndex, user, state, county)
            lista.push(item)
        }
        
    }
    console.log(lista)
    postDataManager(lista, '/newlist').then(alert('Success'))
    saveEventOnCalendar(state, county, date)
}

async function clearList(){
    const user = document.querySelector('#list-title').innerHTML
    const json = getUserJson(user)
    const ul = document.querySelector('#ul-parcel-list')
    ul.innerHTML = ''
    await postDataManager(json, '/clearlist').then(alert('success'))
}

function createLi(element, path){
    const li = document.createElement('li')
    const thisDate = yyyymmdd()
    const content = `
        <div>${element.parcel}</div>
        <div>${element.county}</div>
        <div>${element.state}</div>
        <div>${element.date}</div>
    `
    li.innerHTML = content
    path.append(li)
}

function getList(parcel, user, state, county){
    const str = `
        {
            "parcel":"${parcel}",
            "user":"${user}",
            "state":"${state}",
            "county":"${county}"
        }
    `
    const json = JSON.parse(str)
    //console.log(json)
    return json
}

function buildPage(json){
    const root = document.querySelector('.parcellist')
    root.innerHTML = ''
    const container = document.createElement('div')
    container.classList.add('itens-container')
    const content = `
            <!--<h1 id="list-title">${json.user}</h1>
            <div class="list-container">
                <h2>Parcel List Of ${json.user}</h2>
                <div id="get-parcel-list">
                    <ul id="ul-parcel-list">
                        <li>
                            <div>Parcel</div>
                            <div>County</div>
                            <div>State</div>
                            <div>Date</div>
                        
                        </li>

                    </ul>
                </div>
                <button onclick="clearList()">CLEAR LIST</button>
            </div>-->
            <div class="list-container">
                <h2>Insert New Parcels For "${json.user}" users</h2>
                <textarea name="" id="parcelsList" cols="30" rows="10"></textarea>
                <div><label>County</label><input type="text" id="county"></div>
                <div><label>State</label><input type="text" id="state"></div>
                <div><label>Auction Date</label><input type="date" id="auc-date"></div>
                <div><label>Upload PDF</label><label for="pdf"><i class="fas fa-upload"></i></label><input type="file" id="pdf"></div>

                <button id="insert-parcels" onclick="postParcels()">INSERT</button>
            </div>
    `
    container.innerHTML = content
    root.append(container)
}

function getUserJson(user){
    
    const str = `
        {
            "user":"${user}"
        }
    ` 
    const json = JSON.parse(str)
    return json
}

function createOption(element, path){
    const opt = document.createElement('option')
    opt.value = element.username
    opt.innerHTML = element.username

    path.append(opt)
}

async function getEvents(){
    const result = await fetch('/getCalendar')
    const json = await result.json()
    const info = json.rows[0].info
    const obj = JSON.parse(info);
    console.log(typeof(obj))
    return obj
  }

async function saveEventOnCalendar(state, county, dateinput) {
    var events = await getEvents()
    events.push({
      date: mmddyyyyFormat(dateinput),
      title: `${state}, ${county}`,
    });
    console.log(typeof(events))
    //localStorage.setItem('events', JSON.stringify(events));
    await postDataManager(events, '/saveCalendar').then(alert('Event saved on calendar'))
  }