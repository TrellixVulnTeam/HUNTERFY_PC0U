window.addEventListener('load', async()=>{
    loadStates()
})

async function postData(json, path){
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch(path, options)
        const responseJson = await rawResponse.json();
        return responseJson
    }
    catch(error){
        console.log(error)
    }
}

async function loadStates(){
    const result = await fetch('/getUsStates')
    const json = await result.json()
    const conteudo = json.features

    for (var i = 0; i < json.features.length; i++) {
        var index = json.features[i]
        var stateIndex = index.properties
        createStateDiv(stateIndex)
    }
}

function createStateDiv(element){
    var novoCard = document.createElement("div")
    novoCard.innerHTML = `
        <div class="state" onclick="loadCounties(this)">
            <h2>${element.NAME}</h2>
            <h2 style="display:none;">${element.STATE}</h2>
        </div>
    `

    const container = document.querySelector('.states-container')
    container.append(novoCard)
}

function createCountyDiv(county, state, count, container){
    var novoCard = document.createElement("div")
    novoCard.innerHTML = `
        <div class="county" onclick="loadCountyInfo(this)">
            <h2>${county}</h2>
            <h2>${count}</h2>
            <h2 style="display:none;">${state}</h2>
        </div>
    `
    container.append(novoCard)
    if(count > 15){
        novoCard.children[0].style.backgroundColor = '#FFBD35'
    }

}

async function loadCounties(element){
    const state = element.children[0].innerHTML
    const stateNumber = element.children[1].innerHTML

    const stateStr = `
    {
        "stateNumber":"${stateNumber}",
        "state":"${state}"
    }
    `
    const json = JSON.parse(stateStr)
    const container = document.querySelector('.counties-container')
    container.innerHTML = ''
    
    const response = await postData(json, '/getUsCounties')
    for (var i = 0; i < response.data.length; i++) {
        var index = response.data[i]

        var indexStr = `
        {
            "county":"${index.name}",
            "state":"${state}"
        }
        `
        var indexJson = JSON.parse(indexStr)
        var countyCount = await postData(indexJson, '/dailyCountyCount')
        //var checkIfDone = await postData(indexJson, '/seeifisdone')

        createCountyDiv(index.name, state, countyCount, container)
    }

}

async function loadCountyInfo(element){

    const state = element.children[2].innerHTML
    const total = element.children[1].innerHTML
    const county = element.children[0].innerHTML

    var novoCard = document.createElement("div")
    novoCard.innerHTML = `
        <div class="county-window">
            <div class="county-window-line"><h2>State: </h2><h2 id="state-content">${state}</h2></div>
            <div class="county-window-line"><h2>County: </h2> <h2 id="county-content">${county}</h2></div>
            <div><h2>Total: ${total}</h2></div>
            <div class="insert-file">
                <div><h2>Insert PDF title:</h2><div>
                <div class="insert-file-menu">
                    <input type="text" id="title-input">
                    
                    <div style="margin-top:1vh;"><h2>Source link:</h2><input type="text" id="link-input"></div>
                    <div style="margin-top:1vh;">
                        <input type="file" style="display:none;" name="pdf-input" id="pdf-input" onchange="convertToBase64(this)">
                        
                            <button>
                                <label class="directory-button" style="width:12vw;" for="pdf-input">
                                <i class="far fa-file"></i>
                                </label>
                            </button>
                        
                        <button class="directory-button" onclick="sendPdf(this)"><i class="fas fa-share"></i></button>
                    </div>
                </div>
                
            </div>
            <div class="check-done">
                <div><h2>County Status:</h2></div>
                <div>
                    <button class="directory-button" onclick="checkDone()">CHECK DONE</button>
                    <button class="directory-button" onclick="uncheckDone()">UNCHECK DONE</button>
                </div>
            </div>
            <div class="directory">
                <h2>PDF Directory:</h2>
                <div class="pdf-directory-container"></div>
            </div>
        </div>
    `
    const container = document.querySelector('.county-info')
    container.innerHTML = ''
    container.append(novoCard)
    showDirectoryList()
}

async function showDirectoryList(){
    const state = document.querySelector('#state-content').innerHTML
    const county = document.querySelector('#county-content').innerHTML
    const str = `
        {
            "state":"${state}",
            "county":"${county}"
        }
    `
    const json = JSON.parse(str)

    const result = await postData(json, '/getdirectorylist')
    //const resultJson = await result.json()
    console.log(result)
    for (var i = 0; i < result.length; i++) {
        var directoryIndex = result[i]
        showDirectoryItem(directoryIndex.title, directoryIndex.date, directoryIndex.link)
    }


}

function showDirectoryItem(title, date, link){
    var novoItem = document.createElement("div")
    novoItem.innerHTML = `
        <div class="pdf-item">
            <div><h2>${title}</h2></div>
            <div><h2>${link}</h2></div>
            <div><h2>${mmddyyyyFormat(date)}</h2></div>
            <div class="directory-buttons-container">
                <button onclick="downloadPdf(this)"><h2><i class="fas fa-download"></i></h2></button>
                <button onclick="deletePdf(this)"><h2><i class="fas fa-trash"></i></h2></button>
            </div>
        </div>
    `
    const container = document.querySelector('.pdf-directory-container')
    container.append(novoItem)
}

function convertToBase64(element) {
    //Read File
    var selectedFile = element.files;
    //Check File is not Empty
    if (selectedFile.length > 0) {
        // Select the very first file from list
        var fileToLoad = selectedFile[0];
        // FileReader function for read the file.
        var fileReader = new FileReader();
        var base64;
        // Onload of file read the file content
        fileReader.onload = function(fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console
            element.src = `${base64}`
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
    }
}

async function sendPdf(element){
    const pdf = document.querySelector('#pdf-input').src
    const title = document.querySelector('#title-input').value
    const state = document.querySelector('#state-content').innerHTML
    const county = document.querySelector('#county-content').innerHTML
    const link = document.querySelector('#link-input').value

    const str = `
        {
            "state":"${state}",
            "county":"${county}",
            "pdf":"${pdf}",
            "title":"${title}",
            "link":"${link}"
        }
    `
    const json = JSON.parse(str)
    console.log(json)

    postData(json, '/savePDFondirectory').then(alert('SUCCESS'))
}

async function downloadPdf(element){
    console.log(element.parentElement.parentElement.parentElement)
    const title = element.parentElement.parentElement.children[0].children[0].innerHTML
    
    const state = document.querySelector('#state-content').innerHTML
    const county = document.querySelector('#county-content').innerHTML

    const str = `
    {
        "state":"${state}",
        "county":"${county}",
        "title":"${title}"
    }
`
    const json = JSON.parse(str)
    const result = await postData(json, '/downloaddirectorypdf')
    savePdfFileOnComputer(result.pdf, title)
    console.log(result)
}

function savePdfFileOnComputer(pdf, title) {
    const linkSource = `${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName =`${title}-deed.pdf`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

async function deletePdf(element){
    console.log(element.parentElement.parentElement.parentElement)
    const title = element.parentElement.parentElement.children[0].children[0].innerHTML
    
    const state = document.querySelector('#state-content').innerHTML
    const county = document.querySelector('#county-content').innerHTML

    const str = `
    {
        "state":"${state}",
        "county":"${county}",
        "title":"${title}"
    }
`
    const json = JSON.parse(str)
    const result = await postData(json, '/deletedirectorypdf').then(alert('Deleted'))
    console.log(result)
}

function mmddyyyyFormat(dateCont){
    const date = new Date(dateCont)
    const day = ("" + date.getDate()).slice(-2)
    const month = ("" + (date.getMonth() + 1)).slice(-2)
    const mmddyyyy = `${month}/${day}/${date.getFullYear()}`
    
    return mmddyyyy
}

async function checkDone(){
    const state = document.querySelector('#state-content').innerHTML
    const county = document.querySelector('#county-content').innerHTML

    const str = `
    {
        "state":"${state}",
        "county":"${county}"
    }
`
    const json = JSON.parse(str)
    const result = await postData(json, '/directorycheckdone').then(alert('Checked done!'))
}

async function uncheckDone(){
    const state = document.querySelector('#state-content').innerHTML
    const county = document.querySelector('#county-content').innerHTML

    const str = `
    {
        "state":"${state}",
        "county":"${county}"
    }
`
    const json = JSON.parse(str)
    const result = await postData(json, '/directoryuncheckdone').then(alert('Unchecked!'))

}