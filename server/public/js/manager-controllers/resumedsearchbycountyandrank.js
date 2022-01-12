document.querySelector('.search-button').addEventListener("click", async(event)=>{
    event.preventDefault()

    const json = await getJson()	
    buildPage(getJson());
    await getTotal(json)
    const content = await postDataManager(json, '/resumedsearchbycountyandrank')
    document.querySelector('.loading-text').style.display = 'none'
    for (var i = 0; i < content.length; i++) {
        var contentIndex = content[i]
        createResumedItem(contentIndex)
    }
})

document.querySelector('.copy-button').addEventListener('click', (event)=>{
    event.preventDefault()
    const allParcels = document.querySelectorAll('.parcelid')
    var arr = []
    var str = ''
    for (var i = 0; i < allParcels.length; i++){
        parcelindex = allParcels[i]
        arr.push(parcelindex.innerHTML)
        str = str + `\n${parcelindex.innerHTML} `
    }
    console.log(str)
    //arr.select();
    //arr.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(str);
    //console.log(allParcels)
})

async function getTotal(json){
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch('/countyandrankcount', options)
        const content = await rawResponse.json();

        const totalH2 = document.querySelector('.production-count')
        const pageCount = document.querySelector('.page-count')

        totalH2.innerHTML = `Total:${content}`
        pageCount.innerHTML = `${Math.ceil(content/100)} pages`
    }
    catch(err){
        console.log(err)
    }
}

function getJson(){
    const state = document.querySelector('#stateinput').value
    const county = document.querySelector('#countyinput').value
    const rank = document.querySelector('#rank').value
    const ranktype = document.querySelector('input[name="ranktype"]:checked').value
    const page = document.querySelector('#page').value

    const jsonModelRank = `{"state":"${state}", "rank":"${rank}", "county":"${county}", "page":"${page}", "ranktype":"${ranktype}"}`
    const json = JSON.parse(jsonModelRank)
    return json
}

async function buildPage(json){
    var createItem = `
    <div class="manager-window">
        <h2 class="username">County: ${json.county}</h2>
        <h2 class="production-count"></h2>
        <h2>Displaying 10 itens</h2>
        <h2 class="page-count"></h2>
        <h2 class="loading-text">Loading...</h2>
           <div class="itens-container">
                
           </div>
    </div>
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}
    