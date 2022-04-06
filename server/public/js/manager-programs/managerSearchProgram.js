import * as path from "./paths.js"


export async function postDataManager(json, path){
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

export async function postwithoutconvert(json, path){
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch(path, options)
        return rawResponse
    }
    catch(error){
        console.log(error)
    }
}

export function buttonsOnTopOfParcelList(title, subtitle, id){
    var novoCard = document.createElement("button")

    novoCard.innerHTML = `
            
                <h2>${title}</h2>
                <h3 style="font-size:1.2vh;">${subtitle}</h3>
        
    `

    novoCard.classList.add(`parcellist-button`)
    novoCard.setAttribute('id', id)
    
    const container = document.querySelector('#parcels-container')
    container.append(novoCard)
    //novoCard.classList.add(`${formatString(element.parcelid)}`)
}

export function showParcelList(element){
    console.log(element)
    var novoCard = document.createElement("div")
    
    if(element.rank1 == null){
        element.rank1 = ''
    }
    if(element.rank2 == null){
        element.rank2 = ''
    }
    if(element.rank3 == null){
        element.rank3 = ''
    }
    novoCard.innerHTML = `
            <h2>Parcel ID: ${element.parcelid}</h2>
            <h2>Rank1: ${element.rank1}</h2>
            <h2>Rank2: ${element.rank2}</h2>
            <h2>Rank3: ${element.rank3}</h2>
            <h2>Flow: ${element.flow}</h2>
            <h2 style="display:none;" class="parcelid-searchProgram">${element.parcelid}<h2>
        
    `

    novoCard.classList.add(`parcellist-parcel`)
    
    const container = document.querySelector('#parcels-container')
    container.append(novoCard)

    novoCard.addEventListener('click', ()=>{
        novoCard.classList.add('clicked')
        openParcelBox(element.parcelid)
    })
}

export function toClipboard(arr){
    var str = ''
        for (var i = 0; i <arr.length; i++){
            var parcelindex = arr[i]
            str = str + `\n${parcelindex.innerHTML}`
        }
        navigator.clipboard.writeText(str);
}

export function mmddyyyyFormat(dateCont){
    const date = new Date(dateCont)
    const day = ("" + date.getDate()).slice(-2)
    const month = ("" + (date.getMonth() + 1)).slice(-2)
    const mmddyyyy = `${month}/${day}/${date.getFullYear()}`

    if (mmddyyyy == '12/31/1969'){
        return 'none'
    }else{
        return mmddyyyy
    }
}

export async function sendRank2(parcelid, state, county){
    const superusername = document.querySelector('#username').innerHTML
    const rank2 = document.querySelector('#select-rank2').value
    const obs2 = document.querySelector('#input-obs2').value
    const flow = document.querySelector('#select-flow-rank2').value
    let date = new Date()
    date = mmddyyyyFormat(date)

    const str = `
        {
            "rank2":"${rank2}",
            "obs2":"${obs2}",
            "flow":"${flow}",
            "parcelid":"${parcelid}",
            "state":"${state}",
            "county":"${county}",
            "userrank2":"${superusername}",
            "rank2date":"${date}"
        }
    `

    const item = document.getElementsByClassName(`${parcelid}`)
    const json = JSON.parse(str)
    const result = await postDataManager(json, path.postRank2).then(alert('success'))
    const clickedItens = document.querySelectorAll('.clicked')
    
    for(var i = 0; i < clickedItens.length; i++) {
        var clickedIndex = clickedItens[i]
        console.log(clickedIndex.children[5].innerHTML)
        console.log(parcelid)
        if(clickedIndex.children[5].innerHTML == parcelid){
            clickedIndex.style.backgroundColor = '#A6CF98'
            clickedIndex.children[2].innerHTML = `Rank2: ${rank2}`
            clickedIndex.children[4].innerHTML = `Flow: ${flow}`
        }
    }
}

export async function sendRank3(parcelid, state, county){
    const superusername = document.querySelector('#username').innerHTML
    const rank3 = document.querySelector('#select-rank3').value
    const obs3 = document.querySelector('#input-obs3').value
    const flow = document.querySelector('#select-flow-rank3').value
    const buyopt = document.querySelector('#select-buyopt').value
    let date = new Date()
    date = mmddyyyyFormat(date)

    const str = `
        {
            "rank3":"${rank3}",
            "obs3":"${obs3}",
            "flow":"${flow}",
            "parcelid":"${parcelid}",
            "state":"${state}",
            "county":"${county}",
            "userrank3":"${superusername}",
            "buyopt":"${buyopt}",
            "rank3date":"${date}"
        }
    `

    
    const json = JSON.parse(str)
    const result = await postDataManager(json, path.postRank3).then(alert('success'))
    const clickedItens = document.querySelectorAll('.clicked')
    
    for(var i = 0; i < clickedItens.length; i++) {
        var clickedIndex = clickedItens[i]
        console.log(clickedIndex.children[5].innerHTML)
        console.log(parcelid)
        if(clickedIndex.children[5].innerHTML == parcelid){
            clickedIndex.style.backgroundColor = '#A6CF98'
            clickedIndex.children[3].innerHTML = `Rank3: ${rank3}`
            clickedIndex.children[4].innerHTML = `Flow: ${flow}`
        }
    }
}

export async function sendAcqData(parcelid, county, state, pdf){
    const offerValue = document.querySelector('#offervalue-input').value
    const offerDate = document.querySelector('#offerdate-input').value
    const counterOfferValue = document.querySelector('#counteroffervalue-input').value
    const counterOfferDate = document.querySelector('#counterofferdate-input').value
    const deedDate = document.querySelector('#deeddate-input').value
    
    const str = `
        {
            "parcelid":"${parcelid}",
            "state":"${state}",
            "county":"${county}",
            "offervalue":"${offerValue}",
            "offerdate":"${offerDate}",
            "counteroffervalue":"${counterOfferValue}",
            "counterofferdate":"${counterOfferDate}",
            "pdf":"${pdf}",
            "deeddate":"${deedDate}"
        }
    `
    const json= JSON.parse(str)
    console.log(json)
    postDataManager(json, path.postAcqData).then(alert('success'))
}

export async function loadTemplates(element){
    try{
        console.log(element)
        const templates = await fetch(path.getTemplates)
        const content = await templates.json();
        element.innerHTML = ''
        for(var i = 0; i < content.rows.length; i++) {
            var contentIndex = content.rows[i]
            var option = document.createElement('option')
            option.innerHTML = contentIndex.templatename
            option.value = contentIndex.templatename
            element.append(option)
        }
    }   
    catch(err){console.log(err)}
}

export function createOption(inner, value, container){
    var opt = document.createElement("option")
    opt.innerHTML = inner
    opt.value = value
    container.append(opt)
}

export async function loadCounties(){
    const stateNumber = document.querySelector('#select-state').value
    
    const stateStr = `
    {
        "stateNumber":"${stateNumber}"
    }
    `
    const json = JSON.parse(stateStr)
    console.log(json)
    const container = document.querySelector('#select-county')
    container.innerHTML = ''
    createOption('all', 'all', container)
    const response = await postDataManager(json, path.searchCounties)
    for (var i = 0; i < response.data.length; i++) {
        var index = response.data[i]
        createOption(index.name, index.name, container)
    }  

    sortSelect(container)
}

export async function openParcelBox(parcelid){
    const str = `
        {
            "parcel":"${parcelid}"
        }
    `
    const json = JSON.parse(str)

    const result = await postDataManager(json, path.postParcel)
    console.log(result)

    const parcelBox = document.createElement('section')
    parcelBox.classList.add('parcelbox')

    parcelBox.innerHTML = `
        
            <div class="parcel-content">
                <h2>Parcel ID: ${parcelid} on ${result[0].flow}</h2>
                <h2>State: ${result[0].state}</h2>
                <h2>County: ${result[0].county}</h2>
                <h2>List Type: ${result[0].listtype}</h2>
            </div>
            <div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>Images:</h3></div>
                <div style="display:none;">
                    <h3>GIS Image:</h3>
                    <img src='${result[0].gisimg}'/>

                    <h3>Streetview Image:</h3>
                    <img src='${result[0].streetviewimg}'/>

                    <h3>Floodzone Image:</h3>
                    <img src='${result[0].floodzoneimg}'/>

                    <h3>Maps Image:</h3>
                    <img src='${result[0].mapsimg}'/>
                </div>
            </div>

            <div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>Links:</h3></div>
                <div style="display:none;">
                    <h3>GIS Link:</h3>
                    <h4>${fixLink(result[0].gislink)}</h4>

                    <h3>Maps Link:</h3>
                    <h4>${fixLink(result[0].mapslink)}</h4>

                    <h3>Floodzone Link:</h3>
                    <h4>${fixLink(result[0].floodzonelink)}</h4>

                    <h3>Zillow/Realtor Link:</h3>
                    <h4>${fixLink(result[0].zillowlink)}</h4>
                </div>
            </div>

            <div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>Location:</h3></div>
                <div style="display:none;">
                    <h3>Address:</h3>
                    <h4>${result[0].adress}</h4>

                    <h3>Latitude:</h3>
                    <h4>${result[0].latitude}</h4>

                    <h3>Longitude:</h3>
                    <h4>${result[0].longitude}</h4>
                </div>
            </div>

            <div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>Values:</h3></div>
                <div style="display:none;">
                    <h3>Tax Value:</h3>
                    <h4>${result[0].taxowned}</h4>

                    <h3>Land Value:</h3>
                    <h4>${result[0].marketvalue}</h4>

                    <h3>Minimal Bid:</h3>
                    <h4>${result[0].minimalbid}</h4>
                </div>
            </div>

            <div class="new-accordion parcel-content">
                <div  onclick="accordion(this)"><h2>Additional Info:</h3></div>
                <div style="display:none;">
                    <h3>Lot Size:</h3>
                    <h4>${result[0].acres}</h4>

                    <h3>Floodzone:</h3>
                    <h4>${result[0].floodzonetext}</h4>
                   
                    <h3>Water Supply:</h3>
                    <h4>${result[0].watersupply}</h4>

                    <h3>Electricity Supply:</h3>
                    <h4>${result[0].electricitysupply}</h4>

                    <h3>Sewerage:</h3>
                    <h4>${result[0].sewerage}</h4>

                    <h3>HOA:</h3>
                    <h4>${result[0].hoa}</h4>

                    <h3>Zestimate:</h3>
                    <h4>${result[0].zestimate}</h4>

                    <h3>Status:</h3>
                    <h4>${result[0].status}</h4>
                </div>
            </div>

            <div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>Neighboor 1:</h3></div>
                <div style="display:none;">
                    <h3>Name:</h3>
                    <h4>${result[0].n1name}</h4>

                    <h3>Address:</h3>
                    <h4>${result[0].n1adress}</h4>

                    <h3>Email:</h3>
                    <h4>${result[0].n1email}</h4>
                    
                    <h3>Number:</h3>
                    <h4>${result[0].n1number}</h4>
                </div>
            </div>

            <div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>Neighboor 2:</h3></div>
                <div style="display:none;">
                    <h3>Name:</h3>
                    <h4>${result[0].n2name}</h4>

                    <h3>Address:</h3>
                    <h4>${result[0].n2adress}</h4>

                    <h3>Email:</h3>
                    <h4>${result[0].n2email}</h4>
                    
                    <h3>Number:</h3>
                    <h4>${result[0].n2number}</h4>
                </div>
            </div>

            <div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>Neighboor 3:</h3></div>
                <div style="display:none;">
                    <h3>Name:</h3>
                    <h4>${result[0].n3name}</h4>

                    <h3>Address:</h3>
                    <h4>${result[0].n3adress}</h4>

                    <h3>Email:</h3>
                    <h4>${result[0].n3email}</h4>
                    
                    <h3>Number:</h3>
                    <h4>${result[0].n3number}</h4>
                </div>
            </div>

            <div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>Neighboor 4:</h3></div>
                <div style="display:none;">
                    <h3>Name:</h3>
                    <h4>${result[0].n4name}</h4>

                    <h3>Address:</h3>
                    <h4>${result[0].n4adress}</h4>

                    <h3>Email:</h3>
                    <h4>${result[0].n4email}</h4>
                    
                    <h3>Number:</h3>
                    <h4>${result[0].n4number}</h4>
                </div>
            </div>

            <div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>House Info:</h3></div>
                <div style="display:none;">
                    <h3>Owner Name</h3>
                    <h4>${result[0].ownername}</h4>

                    <h3>Propstream Market Value</h3>
                    <h4>${result[0].propstream}</h4>

                    <h3>Estimated ARV</h3>
                    <h4>${result[0].estimatedarv}</h4>

                    <h3>Google Maps Date</h3>
                    <h4>${result[0].gmapdate}</h4>

                    <h3>Google Earth Link</h3>
                    <h4>${result[0].gearthlink}</h4>

                    <h3>Showing Building</h3>
                    <h4>${result[0].showingbuilding}</h4>

                    <h3>Building Size</h3>
                    <h4>${result[0].buildingsize}</h4>
                   
                    <h3>Year Built</h3>
                    <h4>${result[0].yearbuilt}</h4>
                    
                    <h3>Structure Type</h3>
                    <h4>${result[0].structuretype}</h4>
                    
                    <h3>Number Of Bedrooms</h3>
                    <h4>${result[0].bedrooms}</h4>

                    <h3>Number Of Bathrooms</h3>
                    <h4>${result[0].bathrooms}</h4>

                    <h3>Garage Size</h3>
                    <h4>${result[0].garage}</h4>

                    <h3>Taxes Per Year</h3>
                    <h4>${result[0].taxesperyear}</h4>

                    <h3>Cad Land Value</h3>
                    <h4>${result[0].cadlandvalue}</h4>

                    <h3>Cad Building Value</h3>
                    <h4>${result[0].cadbuildingvalue}</h4>

                    <h3>Cad Total Value</h3>
                    <h4>${result[0].cadtotalvalue}</h4>

                    <h3>Need To Confirm</h3>
                    <h4>${result[0].needtoconfirm}</h4>

                    <h3>Cad Info From GIS</h3>
                    <img src="${result[0].cadimage}" alt=""/>
                </div>
            </div>

            <div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>Rank 1: ${result[0].rank1}</h3></div>
                <div style="display:none;">
                    <h3>User 1:</h3>
                    <h4>${result[0].username}</h4>

                    <h3>Date:</h3>
                    <h4>${mmddyyyyFormat(result[0].dateandtime)}</h4>

                    <h3>User Edit:</h3>
                    <h4>${result[0].username2}</h4>
                    
                    <h3>Edit Date:</h3>
                    <h4>${mmddyyyyFormat(result[0].dateandtime2)}</h4>

                    <h3>Rank 1:</h3>
                    <h4>${result[0].rank1}</h4>

                    <h3>Rank 1 Date:</h3>
                    <h4>${mmddyyyyFormat(result[0].rank1date)}</h4>

                    <h3>Obs:</h3>
                    <h4>${result[0].obs1}</h4>
                </div>
            </div>

            <div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>Rank 2: ${result[0].rank2}</h3></div>
                <div style="display:none;">

                    <h3>User:</h3>
                    <h4>${result[0].userrank2}</h4>

                    <h3>Rank 2 Date:</h3>
                    <h4>${mmddyyyyFormat(result[0].rank2date)}</h4>
                
                    <h3>Rank 2:</h3>
                    <select id="select-rank2" class="select-parcelbox">
                        <option value="">--</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="HOUSE">HOUSE</option>
                    </select>

                    <h3>Obs:</h3>
                    <input type="text" id="input-obs2" value="${result[0].obs2}"/>

                    <h3>Flow:</h3>
                    <select id="select-flow-rank2" class="select-parcelbox">
                        <option value="Stage 1">--</option>
                        <option value="Stage 1">Stage 1</option>
                        <option value="Stage 2">Stage 2</option>
                        <option value="Stage 3">Stage 3</option>
                        <option value="Purchased property">Purchased property</option>
                        <option value="Property sold">Property sold</option>
                    </select>
                    
                    <button id="send-rank2">Send Rank 2</button>
                </div>
            </div>

            <div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>Rank 3: ${result[0].rank3}</h3></div>
                <div style="display:none;">
                    <h3>User:</h3>
                    <h4>${result[0].userrank3}</h4>

                    <h3>Rank 3 Date:</h3>
                    <h4>${mmddyyyyFormat(result[0].rank3date)}</h4>

                    <h3>Rank 3:</h3>
                    <select id="select-rank3" class="select-parcelbox">
                        <option value="">--</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="HOUSE">HOUSE</option>
                    </select>

                    <h3>Obs:</h3>
                    <input type="text" id="input-obs3" value="${result[0].obs3}"/>

                    <h3>Flow:</h3>
                    <select id="select-flow-rank3" class="select-parcelbox">
                        <option value="Stage 1">--</option>
                        <option value="Stage 1">Stage 1</option>
                        <option value="Stage 2">Stage 2</option>
                        <option value="Stage 3">Stage 3</option>
                        <option value="Purchased property">Purchased property</option>
                        <option value="Property sold">Property sold</option>
                    </select>

                    <h3>Buy option:</h3>
                    <select id="select-buyopt" class="select-parcelbox">
                        <option value="undefined">--</option>
                        <option value="yes">BUY</option>
                        <option value="no">DONT BUY</option>
                    </select>
                    
                    <button id="send-rank3">Send Rank 3</button>
                </div>
            </div>

            <div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>Acquisition:</h3></div>
                <div style="display:none;">
                    <h3>Offer Value:</h3>
                    <input type="text" value="${result[0].offervalue}" id="offervalue-input"/>

                    <h3>Offer Date:</h3>
                    <input type="text" value="${result[0].offerdate}" id="offerdate-input"/>

                    <h3>Counter Offer Value:</h3>
                    <input type="text" value="${result[0].counteroffervalue}" id="counteroffervalue-input"/>

                    <h3>Counter Offer Date:</h3>
                    <input type="text" value="${result[0].counterofferdate}" id="counterofferdate-input"/>

                    <h3>Deed Date:</h3>
                    <input type="text" value="${result[0].deeddate}" id="deeddate-input"/>

                    
                    <div class="acq-menu">
                        <h3>Send PDF:</h3>
                        <label for="pdf" class="pdf-up"><i class="fas fa-upload"></i></label>
                        <input style="display:none;" type="file" onchange="convertToBase64(this);" name="pdf" id="pdf">

                        <button id="send-acq-data">Send Data</button>
                        <button id="download-acq-pdf">Download Pdf File</button>
                    </div>
                </div>
            </div>

            <!--<div class="new-accordion parcel-content">
                <div onclick="accordion(this)"><h2>Letters:</h3></div>
                <div style="display:none;">
                    <h3>Generate Letters:</h3>
                    <select id="template-select" class="select-parcelbox">
                        <option>--</option>
                    </select>
                </div>
            </div>-->

    `
    const container = document.querySelector('#result-container')
    container.innerHTML = ''
    container.append(parcelBox)

    document.querySelector('#send-rank2').addEventListener('click', async(event)=>{
        event.preventDefault()
        await sendRank2(parcelid, result[0].state, result[0].county)
    })

    document.querySelector('#send-rank3').addEventListener('click', async(event)=>{
        event.preventDefault()
        await sendRank3(parcelid, result[0].state, result[0].county)
    })

    const pdfButton = document.querySelector('#pdf')
    pdfButton.addEventListener('change', async(event)=>{
        event.preventDefault()
        convertToBase64(pdfButton)
    })

    document.querySelector('#send-acq-data').addEventListener('click', async(event)=>{
        event.preventDefault()
        await sendAcqData(parcelid, result[0].county, result[0].state, pdfButton.src)
    })

    //const templateSelect = document.querySelector('#template-select')
    //templateSelect.addEventListener('focus', async()=>{
    //loadTemplates(templateSelect)
    //})
}

export function sortSelect(selElem) {
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }
    return;
}

function fixLink(str){
    let a
    if(str.length > 1 && str !== 'undefined'){
        const arr = str.split('//')
        a = `<a href="https://${arr[1]}">Link</a>`
    }else{
        a = 'none'
    }
    return a
    
}