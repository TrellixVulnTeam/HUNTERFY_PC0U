async function postJsonRank2(json){
    try{
    const options = {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(json)
        }
    fetch('/editrank2', options)
    }
    catch(error){
        console.log(error)
    }
}
    
async function postJsonRank3(json){
    try{
    const options = {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(json)
    }
    fetch('/editrank3', options)
    }
    catch(error){
        console.log(error)
    }
}

async function editRank2(item){
    const superusername = await document.querySelector('#username').innerHTML
    const thisCard = item.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    const parcel = thisCard.children[0].children[0].children[0].children[1].innerHTML
    const rank2Area = thisCard.children[0].children[1].children[1].children[1]
    const rank2Value = rank2Area.children[2].children[1].value
    const rank2Obs = rank2Area.children[3].children[1].value
        
    infoString = `
    {
        "parcelid":"${parcel}",
        "userrank2":"${superusername}",
        "rank2":"${rank2Value}",
        "obs2":"${rank2Obs}"
    }
    `
    var rank2Json = JSON.parse(infoString)
    console.log(rank2Json)
    await postJsonRank2(rank2Json)
    thisCard.innerHTML = ''
        
    alert("Rank inserido com sucesso!")
}
    
async function editRank3(item){
    const superusername = await document.querySelector('#username').innerHTML
    const thisCard = item.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    const parcel = thisCard.children[0].children[0].children[0].children[1].innerHTML
    const rank3Area = thisCard.children[0].children[1].children[1].children[2]
    const rank3Value = rank3Area.children[2].children[1].value
    const rank3Obs = rank3Area.children[3].children[1].value
    var buyOpt = document.querySelector('input[name="buyopt"]:checked').value
     
    infoString = `
    {
        "parcelid":"${parcel}",
        "userrank3":"${superusername}",
        "rank3":"${rank3Value}",
        "obs3":"${rank3Obs}",
        "buyopt":"${buyOpt}"
    }
    `
    var rank3Json = JSON.parse(infoString)
    await postJsonRank3(rank3Json)
    thisCard.innerHTML = ''
        
    alert("Rank inserido com sucesso!")
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
                    <div class="title"><h1>Parcel ID:&nbsp;</h1><h2 class="parcelid">${element.parcelid}</h2></div>
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
                            <div><h2>GIS Link:&nbsp;</h2><h3 class="value">${element.gislink}</h3></div>
                            <div><h2>Tax Value:&nbsp;</h2><h3 class="value">${element.taxowned}</h3></div>
                            <div><h2>Property Value:&nbsp;</h2><h3 class="value">${element.marketvalue}</h3></div>
                            <div><h2>State:&nbsp;</h2><h3 class="value">${element.state}</h3></div>
                            <div><h2>County:&nbsp;</h2><h3 class="value">${element.county}</h3></div>
                            <div><h2>HOA:&nbsp;</h2><h3 class="value">${element.hoa}</h3></div>
                        </div>
                        <div class="column contrast">
                            <div><h2>Maps Link:&nbsp;</h2><h3 class="value">${element.mapslink}</h3></div>
                            <div><h2>Adress:&nbsp;</h2><h3 class="value">${element.adress}</h3></div>
                            <div><h2>Latitude:&nbsp;</h2><h3 class="value">${element.latitude}</h3></div>
                            <div><h2>Longitude:&nbsp;</h2><h3 class="value">${element.longitude}</h3></div>
                            <div><h2>Acres:&nbsp;</h2><h3 class="value">${element.acres}</h3></div>
                            <div><h2>Water Supply:&nbsp;</h2><h3 class="value">${element.watersupply}</h3></div>
                        </div>
                        <div class="column contrast">
                            <div><h2>N1 Adress:&nbsp;</h2><h3 class="value">${element.n1adress}</h3></div>
                            <div><h2>N2 Adress:&nbsp;</h2><h3 class="value">${element.n2adress}</h3></div>
                            <div><h2>N3 Adress:&nbsp;</h2><h3 class="value">${element.n3adress}</h3></div>
                            <div><h2>N4 Adress:&nbsp;</h2><h3 class="value">${element.n4adress}</h3></div>
                            <div><h2>Buy Status:&nbsp;</h2><h3 class="value">${element.buyopt}</h3></div>
                            <div><h2>Electricity Supply:&nbsp;</h2><h3 class="value">${element.electricitysupply}</h3></div>
                        </div>
                        <div class="column contrast">
                            <div><h2>Floodzone Link:&nbsp;</h2><h3 class="value">${element.floodzonelink}</h3></div>
                            <div><h2>Floodzone Status:&nbsp;</h2><h3 class="value">${element.floodzonetext}</h3></div>
                            <div><h2>Actual Image:&nbsp;</h2><h3 class="value"></h3></div>
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
                            <div class="buyopt"><h2>&nbsp;</h2><h2>&nbsp;</h2></div>
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
                                <div class="image-row"><h2>Cad Info From GIS</h2><img src="${element.cadimage}" alt=""></div>
                            
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
                            <div><h2>Property Value:&nbsp;</h2><h3 class="value">${element.marketvalue}</h3></div>
                            <div><h2>State:&nbsp;</h2><h3 class="value">${element.state}</h3></div>
                            <div><h2>County:&nbsp;</h2><h3 class="value">${element.county}</h3></div>
                            <div><h2>HOA:&nbsp;</h2><h3 class="value">${element.hoa}</h3></div>
                        </div>
                        <div class="column contrast">
                            <div><h2>Maps Link:&nbsp;</h2><h3 class="value">${element.mapslink}</h3></div>
                            <div><h2>Adress:&nbsp;</h2><h3 class="value">${element.adress}</h3></div>
                            <div><h2>Latitude:&nbsp;</h2><h3 class="value">${element.latitude}</h3></div>
                            <div><h2>Longitude:&nbsp;</h2><h3 class="value">${element.longitude}</h3></div>
                            <div><h2>Acres:&nbsp;</h2><h3 class="value">${element.acres}</h3></div>
                            <div><h2>Water Supply:&nbsp;</h2><h3 class="value">${element.watersupply}</h3></div>
                        </div>
                        <div class="column contrast">
                            <div><h2>N1 Adress:&nbsp;</h2><h3 class="value">${element.n1adress}</h3></div>
                            <div><h2>N2 Adress:&nbsp;</h2><h3 class="value">${element.n2adress}</h3></div>
                            <div><h2>N3 Adress:&nbsp;</h2><h3 class="value">${element.n3adress}</h3></div>
                            <div><h2>N4 Adress:&nbsp;</h2><h3 class="value">${element.n4adress}</h3></div>
                            <div><h2>Buy Status:&nbsp;</h2><h3 class="value">${element.buyopt}</h3></div>
                            <div><h2>Electricity Supply:&nbsp;</h2><h3 class="value">${element.electricitysupply}</h3></div>
                        </div>
                        <div class="column contrast">
                            <div><h2>Floodzone Link:&nbsp;</h2><h3 class="value">${element.floodzonelink}</h3></div>
                            <div><h2>Floodzone Status:&nbsp;</h2><h3 class="value">${element.floodzonetext}</h3></div>
                            <div><h2>Actual Image:&nbsp;</h2><h3 class="value"></h3></div>
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