
async function postDataManager(json, path){
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

async function editRank2(item){
    const superusername = document.querySelector('#username').innerHTML
    const thisCard = item.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    const parcel = thisCard.children[0].children[0].children[0].children[1].innerHTML
    const rank2Area = thisCard.children[0].children[1].children[1].children[1]
    const rank2Value = rank2Area.children[2].children[1].value
    const rank2Obs = rank2Area.children[3].children[1].value
    const flow = rank2Area.children[4].children[1].value
    const state = thisCard.children[0].children[1].children[0].children[0].children[3].children[1].innerHTML
    const county = thisCard.children[0].children[1].children[0].children[0].children[4].children[1].innerHTML
        
    infoString = `
    {
        "parcelid":"${parcel}",
        "userrank2":"${superusername}",
        "rank2":"${rank2Value}",
        "obs2":"${rank2Obs}",
        "flow":"${flow}",
        "state":"${state}",
        "county":"${county}"
    }
    `
    const json = JSON.parse(infoString)
    console.log(json)
    await postDataManager(json, '/editrank2').then(alert("success")).then(()=>{
        thisCard.children[0].style.backgroundColor = 'green'
    })
    
        
    
}
    
async function editRank3(item){
    const superusername = document.querySelector('#username').innerHTML
    const thisCard = item.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    const parcel = thisCard.children[0].children[0].children[0].children[1].innerHTML
    const rank3Area = thisCard.children[0].children[1].children[1].children[2]
    const rank3Value = rank3Area.children[2].children[1].value
    const rank3Obs = rank3Area.children[3].children[1].value
    const buyOpt = rank3Area.children[4].children[1].value
    const flow = rank3Area.children[5].children[1].value
    const state = thisCard.children[0].children[1].children[0].children[0].children[3].children[1].innerHTML
    const county = thisCard.children[0].children[1].children[0].children[0].children[4].children[1].innerHTML
     
    infoString = `
    {
        "parcelid":"${parcel}",
        "userrank3":"${superusername}",
        "rank3":"${rank3Value}",
        "obs3":"${rank3Obs}",
        "buyopt":"${buyOpt}",
        "flow":"${flow}",
        "state":"${state}",
        "county":"${county}"
    }
    `
    console.log(infoString)
    const json = JSON.parse(infoString)
    console.log(json)
    await postDataManager(json, '/editrank3').then(alert("Success!")).then(()=>{
        thisCard.children[0].style.backgroundColor = 'green'
    })
}

async function editStatus(item){
    const thisCard = item.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    const parcel = thisCard.children[0].children[0].children[0].children[1].innerHTML
    const statusArea = thisCard.children[0].children[1].children[1].children[3]
    const status = statusArea.children[1].children[1].value
     
    infoString = `
    {
        "status":"${status}",
        "parcelid":"${parcel}"
    }
    `
    const json = JSON.parse(infoString)
    await postDataManager(json, '/editstatus').then(alert("Success!"))
    
}

function accordion(item){
    var hide = item.children[1]    
    if (hide.style.display === "block") {
        hide.style.display = "none";
    }else{
        hide.style.display = "block";
    }
}

function flexAccordion(item){
    var hide = item.children[1]    
    if (hide.style.display === "flex") {
        hide.style.display = "none";
    }else{
        hide.style.display = "flex";
    }
}

async function createItem(element){
    var itensContainer = document.querySelector('.itens-container')
    var div = document.createElement('div')
    var item = `
    <div class="manager-item"><!--item-->  
                <div class="accordion" onclick="accordion(this.parentElement)">
                    <div class="title"><h1>Parcel ID:&nbsp;</h1><h2 class="parcelid" name='parcelidvalue'>${element.parcelid}</h2><h2>&nbsp; on &nbsp;${element.flow}</h2></div>
                    <div class="images-row contrast">
                        <div class="image-row"><h2>GIS Image:</h2><img src="${element.gisimg}" alt=""></div>
                        <div class="image-row"><h2>Google Image:</h2><img src="${element.mapsimg}" alt=""></div>
                        <div class="image-row"><h2>Street View:&nbsp;</h2><img src="${element.streetviewimg}" alt=""></div>
                        <div class="image-row"><h2>Floodzone Image:</h2><img src="${element.floodzoneimg}" alt=""></div>
                    </div>
                </div>
                <div class="hide">
                    <div class="item-columns">   
                        <div class="column contrast">
                            <div><h2>GIS Link:&nbsp;</h2><h3 class="value"><a href="${element.gislink}">${element.gislink}</a></h3></div>
                            <div><h2>Tax Value:&nbsp;</h2><h3 class="value">${element.taxowned}</h3></div>
                            <div><h2>Land Value:&nbsp;</h2><h3 class="value">${element.marketvalue}</h3></div>
                            <div><h2>State:&nbsp;</h2><h3 class="value">${element.state}</h3></div>
                            <div><h2>County:&nbsp;</h2><h3 class="value">${element.county}</h3></div>
                            <div><h2>List Type:&nbsp;</h2><h3 class="value">${element.listtype}</h3></div>
                            <div><h2>Minimal Bid:&nbsp;</h2><h3 class="value">${element.minimalbid}</h3></div>
                        </div>
                        <div class="column contrast">
                            <div><h2>Maps Link:&nbsp;</h2><h3 class="value"><a href="${element.mapslink}">${element.mapslink}</a></h3></div>
                            <div><h2>Address:&nbsp;</h2><h3 class="value">${element.adress}</h3></div>
                            <div><h2>Latitude:&nbsp;</h2><h3 class="value">${element.latitude}</h3></div>
                            <div><h2>Longitude:&nbsp;</h2><h3 class="value">${element.longitude}</h3></div>
                            <div><h2>Lot Size:&nbsp;</h2><h3 class="value">${element.acres}</h3></div>
                            <div><h2>Water Supply:&nbsp;</h2><h3 class="value">${element.watersupply}</h3></div>
                        </div>
                        <div class="column contrast">
                            <div><h2>Neighboor 1:&nbsp;</h2><h3 class="value">${element.n1name}</h3><h3 class="value">${element.n1adress}</h3></div>
                            <div><h2>Neighboor 2:&nbsp;</h2><h3 class="value">${element.n2name}</h3><h3 class="value">${element.n2adress}</h3></div>
                            <div><h2>Neighboor 3:&nbsp;</h2><h3 class="value">${element.n3name}</h3><h3 class="value">${element.n3adress}</h3></div>
                            <div><h2>Neighboor 4:&nbsp;</h2><h3 class="value">${element.n4name}</h3><h3 class="value">${element.n4adress}</h3></div>
                            <div><h2>Buy Status:&nbsp;</h2><h3 class="value">${element.buyopt}</h3></div>
                            <div><h2>Electricity Supply:&nbsp;</h2><h3 class="value">${element.electricitysupply}</h3></div>
                        </div>
                        <div class="column contrast">
                            <div><h2>Floodzone Link:&nbsp;</h2><h3 class="value"><a href="${element.floodzonelink}">${element.floodzonelink}</a></h3></div>
                            <div><h2>Floodzone Status:&nbsp;</h2><h3 class="value">${element.floodzonetext}</h3></div>
                            <div><h2>HOA:&nbsp;</h2><h3 class="value">${element.hoa}</h3></div>
                            <div><h2>Zestimate:&nbsp;</h2><h3 class="value">${element.zestimate}</h3></div>
                            <div><h2>Zillow Link:&nbsp;</h2><h3 class="value"><a href="${element.zillowlink}">${element.zillowlink}</a></h3></div>
                            <div><h2>Sewerage:&nbsp;</h2><h3 class="value">${element.sewerage}</h3></div>
                            <div><h2>Status:&nbsp;</h2><h3 class="value">${element.status}</h3></div>
                        </div>
                    </div>
                    <div class="item-menu">
                        <div class="rank1 contrast">
                            <h1>Rank 1</h1>
                            <div><h2>User:</h2><h3>${element.username}</h3></div>
                            <div><h2>Rank:</h2><h3>${element.rank1}</h3></div>
                            <div><h2>Obs:</h2><h3>${element.obs1}</h3></div>
                            <div><h2>Date/Time:</h2><h3>${element.dateandtime}</h3></div>
                            
                        </div>
                        <div class="rank contrast">
                            <h1>Rank 2</h1>
                            <div><h2>User:</h2><h3>${element.userrank2}</h3></div>
                            <div><label for="">Rank:</label><input type="text" value="${element.rank2}"></div>
                            <div><label for="">Obs:</label><input type="text" value="${element.obs2}"></div>
                            <div>
                                <label for="">Flow status:</label>
                                <select>
                                    <option value="Stage 1">Stage 1</option>
                                    <option value="Stage 2">Stage 2</option>
                                    <option value="Stage 3">Stage 3</option>
                                    <option value="Purchased">Purchased property</option>
                                    <option value="Sold">Property sold</option>
                                </select>
                            </div>

                            <div class="rank-button"><button onclick="editRank2(this)">Send rank</button></div>
                        </div>
                         <div class="rank contrast">
                            <h1>Rank 3</h1>
                            <div><h2>User:</h2><h3>${element.userrank3}</h3></div>
                            <div><label for="">Rank:</label><input type="text" value="${element.rank3}"></div>
                            <div><label for="">Obs:</label><input type="text" value="${element.obs3}"></div>
                            <div class="buyopt"><h2>BUY?</h2> <select class="buyopt"><option value="undefined">UNDEFINED</option><option value="yes">Yes</option><option value="no">No</option></select></div>
                            <div>
                                <label for="">Flow status:</label>
                                <select>
                                    <option value="Stage 1">Stage 1</option>
                                    <option value="Stage 2">Stage 2</option>
                                    <option value="Stage 3">Stage 3</option>
                                    <option value="Purchased">Purchased property</option>
                                    <option value="Sold">Property sold</option>
                                </select>
                            </div>
                            <div class="rank-button"><button onclick="editRank3(this)">Send rank</button></div>
                        </div>
                        <div class="letters">
                            <h1>Letters</h1>
                            <div>
                                <h2>Status:</h2>
                                <select class="status">
                                    <option>--</option>
                                    <option value="Completed search">Completed search</option>
                                    <option value="Letter has been sent">Letter has been sent</option>
                                    <option value="Customer is interested">Customer is interested</option>
                                    <option value="Customer isnt interested">Customer isn't interested</option>
                                </select>
                                <button onclick="editStatus(this)"><i class="fas fa-share"></i></button>

                            </div>
                            <div>
                                <h2>Generate Letters:</h2>
                                <select class="template-options" onfocus="loadTemplates(this)">
                                    <option>--</option>
                                </select>
                                <button class="download-pdf" onclick='runDocx(this.parentElement.parentElement.parentElement.parentElement.parentElement)'><i class="fas fa-envelope"></i></button>
                            </div>
                            <div class="letterlogs">
                                <h2>Letter Logs:</h2>
                                <div class="letterlogscontainer">
                                
                                </div>
                                <button onclick='getLetterLogs(this)'><i class="fas fa-clock"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="accordions-menu">
                        <div>
                            <div class="accordionbutton" onclick="flexAccordion(this.parentElement)"><i class="fas fa-home"></i></div>
                            <div class="item-columns plusDiv" style="display: none;">
                                <div class="column contrast">
                                    <div><h2>Owner Name</h2><h3 class="value">${element.ownername}</h3></div>
                                    <div><h2>Propstream Market Value</h2><h3 class="value">${element.propstream}</h3></div>
                                    <div><h2>Estimated ARV</h2><h3 class="value">${element.estimatedarv}</h3></div>
                                    <div><h2>Google Maps Date</h2><h3 class="value">${element.gmapdate}</h3></div>
                                    <div><h2>Google Earth Link</h2><h3 class="value">${element.gearthlink}</h3></div>
                                </div>

                                <div class="column contrast">
                                    
                                    <div><h2>Showing Building</h2><h3 class="value">${element.showingbuilding}</h3></div>
                                    <div><h2>Building Size</h2><h3 class="value">${element.buildingsize}</h3></div>
                                    <div><h2>Year Built</h2><h3 class="value">${element.yearbuilt}</h3></div>
                                    <div><h2>Structure Type</h2><h3 class="value">${element.structuretype}</h3></div>
                                    <div><h2>Number Of Bedrooms</h2><h3 class="value">${element.bedrooms}</h3></div>
                                    
                                    
                                </div>

                                <div class="column contrast">
                                    
                                    <div><h2>Number Of Bathrooms</h2><h3 class="value">${element.bathrooms}</h3></div>
                                    <div><h2>Garage Size</h2><h3 class="value">${element.garage}</h3></div>
                                    <div><h2>Taxes Per Year</h2><h3 class="value">${element.taxesperyear}</h3></div>
                                    <div><h2>Cad Land Value</h2><h3 class="value">${element.cadlandvalue}</h3></div>
                                    <div><h2>Cad Building Value</h2><h3 class="value">${element.cadbuildingvalue}</h3></div>
                                </div>
                                <div class="column contrast">
                                    
                                    <div><h2>Cad Total Value</h2><h3 class="value">${element.cadtotalvalue}</h3></div>
                                    <div><h2>Need To Confirm</h2><h3 class="value">${element.needtoconfirm}</h3></div>
                                    <div class="image-row"><h2>Cad Info From GIS</h2><img src="${element.cadimage}" alt=""></div>
                                
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="accordionbutton" onclick="flexAccordion(this.parentElement)"><i class="fas fa-shopping-cart"></i></div>
                            <div class="acq plusDiv" style="display: none;">
                                
                                <div class="contrast">
                                    <h1>Acquisition</h1>
                                    <div><label for="">Offer Value:</label><input type="text" value="${element.offervalue}"></div>
                                    <div><label for="">Offer Date:</label><input type="text" value="${element.offerdate}"></div>
                                    <div><label for="">Counter Offer Value:</label><input type="text" value="${element.counteroffervalue}"></div>
                                    <div><label for="">Counter Offer Date:</label><input type="text" value="${element.counterofferdate}"></div>
                                    <div><label for="">Deed Date:</label><input type="text" value="${element.deeddate}"></div>
                                    <div><label for="">Send PDF:</label><label for="pdf" class="pdf-up"><i class="fas fa-upload"></i></label><input style="display:none;" type="file" onchange="convertToBase64(this);" name="pdf" id="pdf"></div>
                                    <button onclick="getPDF(this)">Download PDF</button>
                                    <button onclick="sendAcqData(this)">Send Data</button>
                                </div>
                                <div class="contrast">
                                    <div>&nbsp;</div>
                                </div>
                                <div class="contrast">
                                    <div>&nbsp;</div>

                                </div>
                                <div class="contrast">
                                    <div>&nbsp;</div>

                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="accordionbutton" onclick="flexAccordion(this.parentElement)"><i class="fas fa-at"></i></div>
                            <div class="acq plusDiv" style="display: none;">
                                
                                <div class="contrast">
                                    <h1>Neighboor 1</h1>
                                    <div><h2>Name:&nbsp;</h2><h3 class="value">${element.n1name}</h3></div>
                                    <div><h2>Adress:&nbsp;</h2><h3 class="value">${element.n1adress}</h3></div>
                                    <div><h2>Number:&nbsp;</h2><h3 class="value">${element.n1number}</h3></div>
                                    <div><h2>Email:&nbsp;</h2><h3 class="value">${element.n1email}</h3></div>
                                </div>
                                <div class="contrast">
                                    <h1>Neighboor 2</h1>
                                    <div><h2>Name:&nbsp;</h2><h3 class="value">${element.n2name}</h3></div>
                                    <div><h2>Adress:&nbsp;</h2><h3 class="value">${element.n2adress}</h3></div>
                                    <div><h2>Number:&nbsp;</h2><h3 class="value">${element.n2number}</h3></div>
                                    <div><h2>Email:&nbsp;</h2><h3 class="value">${element.n2email}</h3></div>
                                </div>
                                <div class="contrast">
                                    <h1>Neighboor 3</h1>
                                    <div><h2>Name:&nbsp;</h2><h3 class="value">${element.n3name}</h3></div>
                                    <div><h2>Adress:&nbsp;</h2><h3 class="value">${element.n3adress}</h3></div>
                                    <div><h2>Number:&nbsp;</h2><h3 class="value">${element.n3number}</h3></div>
                                    <div><h2>Email:&nbsp;</h2><h3 class="value">${element.n3email}</h3></div>
                                </div>
                                <div class="contrast">
                                    <h1>Neighboor 4</h1>
                                    <div><h2>Name:&nbsp;</h2><h3 class="value">${element.n4name}</h3></div>
                                    <div><h2>Adress:&nbsp;</h2><h3 class="value">${element.n4adress}</h3></div>
                                    <div><h2>Number:&nbsp;</h2><h3 class="value">${element.n4number}</h3></div>
                                    <div><h2>Email:&nbsp;</h2><h3 class="value">${element.n4email}</h3></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                
            </div><!--item-->
    `
    div.innerHTML = item
    itensContainer.append(div)
}

async function createResumedItem(element){
    var itensContainer = document.querySelector('.itens-container')
    var div = document.createElement('div')
    var item = `
    <div class="manager-item resumed-manager-item"><!--item-->  
                <div class="accordion resumed-accordion" onclick="accordion(this.parentElement)">
                    <div class="title"><h1>Parcel ID:&nbsp;</h1><h2 class="parcelid">${element.parcelid}</h2></div>
                    
                </div>
                <div class="hide">
                    <div class="item-columns">   
                        <div class="column contrast">
                            <div><h2>GIS Link:&nbsp;</h2><h3 class="value">${element.gislink}</h3></div>
                            <div><h2>Tax Value:&nbsp;</h2><h3 class="value">${element.taxowned}</h3></div>
                            <div><h2>Land Value:&nbsp;</h2><h3 class="value">${element.marketvalue}</h3></div>
                            <div><h2>State:&nbsp;</h2><h3 class="value">${element.state}</h3></div>
                            <div><h2>County:&nbsp;</h2><h3 class="value">${element.county}</h3></div>
                            <div><h2>HOA:&nbsp;</h2><h3 class="value">${element.hoa}</h3></div>
                        </div>
                        <div class="column contrast">
                            <div><h2>Maps Link:&nbsp;</h2><h3 class="value">${element.mapslink}</h3></div>
                            <div><h2>Address:&nbsp;</h2><h3 class="value">${element.adress}</h3></div>
                            <div><h2>Latitude:&nbsp;</h2><h3 class="value">${element.latitude}</h3></div>
                            <div><h2>Longitude:&nbsp;</h2><h3 class="value">${element.longitude}</h3></div>
                            <div><h2>Lot Size:&nbsp;</h2><h3 class="value">${element.acres}</h3></div>
                            <div><h2>Water Supply:&nbsp;</h2><h3 class="value">${element.watersupply}</h3></div>
                        </div>
                        <div class="column contrast">
                            <div><h2>N1 Address:&nbsp;</h2><h3 class="value">${element.n1adress}</h3></div>
                            <div><h2>N2 Address:&nbsp;</h2><h3 class="value">${element.n2adress}</h3></div>
                            <div><h2>N3 Address:&nbsp;</h2><h3 class="value">${element.n3adress}</h3></div>
                            <div><h2>N4 Address:&nbsp;</h2><h3 class="value">${element.n4adress}</h3></div>
                            <div><h2>Buy Status:&nbsp;</h2><h3 class="value">${element.buyopt}</h3></div>
                            <div><h2>Electricity Supply:&nbsp;</h2><h3 class="value">${element.electricitysupply}</h3></div>
                        </div>
                        <div class="column contrast">
                            <div><h2>Floodzone Link:&nbsp;</h2><h3 class="value">${element.floodzonelink}</h3></div>
                            <div><h2>Floodzone Status:&nbsp;</h2><h3 class="value">${element.floodzonetext}</h3></div>
                            <div><h2>List Type:&nbsp;</h2><h3 class="value">${element.listtype}</h3></div>
                            <div><h2>Zestimate:&nbsp;</h2><h3 class="value">${element.zestimate}</h3></div>
                            <div><h2>Zillow Link:&nbsp;</h2><h3 class="value">${element.zillowlink}</h3></div>
                            <div><h2>Sewerage:&nbsp;</h2><h3 class="value">${element.sewerage}</h3></div>
                        </div>
                    </div>
                    <div class="item-menu">
                        <div class="rank1 contrast">
                            <h1>Rank 1</h1>
                            <div><h2>User:</h2><h3>${element.username}</h3></div>
                            <div><h2>Rank:</h2><h3>${element.rank1}</h3></div>
                            <div><h2>Obs:</h2><h3>${element.obs1}</h3></div>
                            <div><h2>Date/Time:</h2><h3>${element.dateandtime}</h3></div>
                            
                        </div>
                        <div class="rank contrast">
                            <h1>Rank 2</h1>
                            <div><h2>User:</h2><h3>${element.userrank2}</h3></div>
                            <div><label for="">Rank:</label><input type="text" value="${element.rank2}"></div>
                            <div><label for="">Obs:</label><input type="text" value="${element.obs2}"></div>
                            <div class="rank-button"><button onclick="editRank2(this)">Send rank</button></div>
                        </div>
                         <div class="rank contrast">
                            <h1>Rank 3</h1>
                            <div><h2>User:</h2><h3>${element.userrank3}</h3></div>
                            <div><label for="">Rank:</label><input type="text" value="${element.rank3}"></div>
                            <div><label for="">Obs:</label><input type="text" value="${element.obs3}"></div>
                            <div class="buyopt"><h2>BUY?</h2><input type="radio" name="buyopt" value="yes"><label>yes/</label><input type="radio" name="buyopt" value="no"><label>no/</label><input type="radio" name="buyopt" value="undefined"><label>undefined</label></div>
                            <div class="rank-button"><button onclick="editRank3(this)">Send rank</button></div>
                        </div>
                        <div>
                            <h2>&nbsp;</h2>
                            
                        </div>
                    </div>
                    <div>
                        <div onclick="flexAccordion(this.parentElement)"><i class="fas fa-home"></i></div>
                        <div class="item-columns" style="display: none;">
                            <div class="column contrast">
                                <div><h2>Owner Name</h2><h3 class="value">${element.ownername}</h3></div>
                                <div><h2>Propstream Market Value</h2><h3 class="value">${element.propstream}</h3></div>
                                <div><h2>Estimated ARV</h2><h3 class="value">${element.estimatedarv}</h3></div>
                                <div><h2>Google Maps Date</h2><h3 class="value">${element.gmapdate}</h3></div>
                                <div><h2>Google Earth Link</h2><h3 class="value">${element.gearthlink}</h3></div>
                            </div>

                            <div class="column contrast">
                                <div><h2>Showing Building</h2><h3 class="value">${element.showingbuilding}</h3></div>
                                <div><h2>Building Size</h2><h3 class="value">${element.buildingsize}</h3></div>
                                <div><h2>Year Built</h2><h3 class="value">${element.yearbuilt}</h3></div>
                                <div><h2>Structure Type</h2><h3 class="value">${element.structuretype}</h3></div>
                                <div><h2>Number Of Bedrooms</h2><h3 class="value">${element.bedrooms}</h3></div>
                            </div>

                            <div class="column contrast">
                                
                                <div><h2>Number Of Bathrooms</h2><h3 class="value">${element.bathrooms}</h3></div>
                                <div><h2>Garage Size</h2><h3 class="value">${element.garage}</h3></div>
                                <div><h2>Taxes Per Year</h2><h3 class="value">${element.taxesperyear}</h3></div>
                                <div><h2>Cad Land Value</h2><h3 class="value">${element.cadlandvalue}</h3></div>
                                <div><h2>Cad Building Value</h2><h3 class="value">${element.cadbuildingvalue}</h3></div>
                            </div>
                            <div class="column contrast">  
                                <div><h2>Cad Total Value</h2><h3 class="value">${element.cadtotalvalue}</h3></div>
                                <div><h2>Need To Confirm</h2><h3 class="value">${element.needtoconfirm}</h3></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!--item-->
    `
    div.innerHTML = item
    itensContainer.append(div)
}

async function loadTemplates(element){
    try{
        const templates = await fetch('/gettemplates')
        const content = await templates.json();
        element.innerHTML = ''
        for(var i = 0; i < content.rows.length; i++) {
            var contentIndex = content.rows[i]
            var option = document.createElement('option')
            option.innerHTML = contentIndex.templatename
            option.value = contentIndex.templatename
            //console.log(select)
            element.append(option)
        }
    }   
    catch(err){console.log(err)}
}

async function getLetterLogs(item){
    const thisCard = item.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    const parcel = thisCard.children[0].children[0].children[0].children[1].innerHTML
    const lettersArea = thisCard.children[0].children[1].children[1].children[3]
    const logsContainer = lettersArea.children[3].children[1]
    console.log(logsContainer)
    infoString = `
    {
        "parcelid":"${parcel}"
    }
    `
    const json = JSON.parse(infoString)
    const result = await postDataManager(json, '/letterlogs')
    console.log(result.rows)
    for(var i = 0; i < result.rows.length; i++) {
        var index = result.rows[i]
        console.log(index)
        showLetterLog(index, logsContainer)
        
    }
}
function showLetterLog(element, container){
        var div = document.createElement('div')
        div.classList.add('letterlogitem')
        var item = `
            <h3>${element.template}</h3>
            <h3>${element.date}</h3>
        `
        div.innerHTML = item
        container.append(div)
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

async function sendAcqData(element){
    const parcelid = element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[1].innerHTML
    const county = element.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[4].children[1].innerHTML
    const state = element.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[3].children[1].innerHTML
    const offerValue = element.parentElement.children[1].children[1].value
    const offerDate = element.parentElement.children[2].children[1].value
    const counterOfferValue = element.parentElement.children[3].children[1].value
    const counterOfferDate = element.parentElement.children[4].children[1].value
    const deedDate = element.parentElement.children[5].children[1].value
    const pdf = element.parentElement.children[6].children[1].src
    
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
    postDataManager(json, '/postacqdata').then(alert('success'))
}

async function getPDF(element){
    const parcelid = element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[1].innerHTML
    const county = element.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[4].children[1].innerHTML
    const state = element.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[3].children[1].innerHTML
    const str = `
        {
            "parcelid":"${parcelid}",
            "state":"${state}",
            "county":"${county}"
        }
    `
    const json= JSON.parse(str)
    const result = await postDataManager(json, '/downloadpdf')
    const b64Pdf = result.rows[0].deedpdf
    downloadPDF(b64Pdf, parcelid)
}

function downloadPDF(pdf, parcelid) {
    const linkSource = `${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName =`${parcelid}-deed.pdf`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

function yyyymmdd(){
    const date = new Date()
    const day = ("0" + date.getDate()).slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const yyyymmdd = `${date.getFullYear()}-${month}-${day}`
    
    return yyyymmdd
}

function createOption(element, path){
    const opt = document.createElement('option')
    opt.value = element.username
    opt.innerHTML = element.username

    path.append(opt)
}

function mmddyyyyFormat(dateCont){
    const date = new Date(dateCont)
    const day = ("" + date.getDate()).slice(-2)
    const month = ("" + (date.getMonth() + 1)).slice(-2)
    const mmddyyyy = `${month}/${day}/${date.getFullYear()}`
    
    return mmddyyyy
}
