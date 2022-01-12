window.addEventListener('load', async()=>{
    const stageCount = await fetch('/stageCount')
    const stagesJson = await stageCount.json()

    const countAll =  await fetch('/countAll')
    const allJson = await countAll.json()

    document.querySelector('#stage1-parcel-quant').innerHTML = stagesJson[0].count
    document.querySelector('#stage2-parcel-quant').innerHTML = stagesJson[1].count
    document.querySelector('#stage3-parcel-quant').innerHTML = stagesJson[2].count
    document.querySelector('#total-parcel-quant').innerHTML = allJson.rows[0].count


    const stageRankCount = await fetch('/stageRankCount')
    const stagesRankJson = await stageRankCount.json()

    document.querySelector('#stage1-rank-quant').innerHTML = `A: ${stagesRankJson[0][0].rows[0].count}<br> B:${stagesRankJson[0][1].rows[0].count}<br> C:${stagesRankJson[0][2].rows[0].count}<br> House:${stagesRankJson[0][3].rows[0].count}`
    document.querySelector('#stage2-rank-quant').innerHTML = `A: ${stagesRankJson[1][0].rows[0].count}<br> B:${stagesRankJson[1][1].rows[0].count}<br> C:${stagesRankJson[1][2].rows[0].count}<br> House:${stagesRankJson[1][3].rows[0].count}`
    document.querySelector('#stage3-rank-quant').innerHTML = `A: ${stagesRankJson[2][0].rows[0].count}<br> B:${stagesRankJson[2][1].rows[0].count}<br> C:${stagesRankJson[2][2].rows[0].count}<br> House:${stagesRankJson[2][3].rows[0].count}`

    const yesterdayTotals = await fetch('/getYesterdayTotals')
    const yestJson = await yesterdayTotals.json()

    document.querySelector('#stage1-result').innerHTML =  stagesJson[0].count - yestJson.rows[0].stage1
    document.querySelector('#stage2-result').innerHTML =  stagesJson[1].count - yestJson.rows[0].stage2
    document.querySelector('#stage3-result').innerHTML =  stagesJson[2].count - yestJson.rows[0].stage3
    document.querySelector('#total-result').innerHTML =  allJson.rows[0].count - yestJson.rows[0].total

    console.log(yestJson)
})
    
var botaoLogoff = document.querySelector('#logoff')
botaoLogoff.addEventListener('click', async()=>{
    try{
        console.log('clicado')
        const logoff = await fetch('/logoff')
        //const json = await logoff.json()
        if(logoff.ok = true){
            location.reload()
        }
    }
    catch(error){
        console.log(error)
    }
})

document.querySelector('#managerSearchButton').addEventListener('click', ()=>{
    const listContainer = document.querySelector('#searchOptions')

    if(listContainer.style.display = 'none'){
        listContainer.style.display = 'flex'
    }
})

document.querySelector('#managerListButton').addEventListener('click', ()=>{
    const listContainer = document.querySelector('#listOptions')

    if(listContainer.style.display = 'none'){
        listContainer.style.display = 'flex'
    }
})

document.querySelector('#checkProdButton').addEventListener('click', ()=>{
    const listContainer = document.querySelector('#prodOptions')

    if(listContainer.style.display = 'none'){
        listContainer.style.display = 'flex'
    }
})

document.querySelector('#metricsButton').addEventListener('click', ()=>{
    const listContainer = document.querySelector('#metricsOptions')

    if(listContainer.style.display = 'none'){
        listContainer.style.display = 'flex'
    }
})

function closeThis(element){
    const window =  element.parentElement.parentElement.parentElement
    console.log(window)
    if(window.style.display = 'flex'){
        window.style.display = "none"
    }
}

document.querySelector('#ghost-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    const stageCount = await fetch('/stageCount')
    const stagesJson = await stageCount.json()

    const countAll =  await fetch('/countAll')
    const allJson = await countAll.json()

    const stage1Count = stagesJson[0].count
    const stage2Count = stagesJson[1].count
    const stage3Count = stagesJson[2].count
    const allCount = allJson.rows[0].count

    const date = new Date()
    const day = ("0" + date.getDate()).slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const yyyymmdd = `${date.getFullYear()}-${month}-${day}`

    console.log(stage1Count, stage2Count, stage3Count, allCount, yyyymmdd)
})

