import * as metricsProgram from '/js/manager-programs/metrics.js'
import * as chartsProgram from '/js/manager-programs/charts.js'
document.querySelector('.search-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    resetPage()
    buildChartsPage()
})

async function buildChartsPage(){
    const date = new Date(document.querySelector('#date').value)
    const day = date.getDate()+1
    const json = await metricsProgram.getDomInfo()
    const result = await metricsProgram.postSearchData(json)//resultado do mes inteiro
    const dailyResult = await metricsProgram.postSearchDataByDay(json)//resultado do dia especifico

    const perHourProdCount = await metricsProgram.readCountHour(dailyResult)//função que trata o numero de parcels por hora
    const perDayRank1 = await metricsProgram.readDataRank1(dailyResult)//função que trata a separação dos ranks por dia
    const perDayRank2 = await metricsProgram.readDataRank2(dailyResult)
    const perDayRank3 = await metricsProgram.readDataRank3(dailyResult)

    chartsProgram.buildChartProdPerHour(perHourProdCount, 'count-per-day')//grafico parcels por hora
    chartsProgram.buildPizzaPerDay(perDayRank1, 'count-rank1-per-day')//grafico pizza do rank diario
    chartsProgram.buildPizzaPerDay(perDayRank2, 'count-rank2-per-day')
    chartsProgram.buildPizzaPerDay(perDayRank3, 'count-rank3-per-day')
    
    const perDayProdCount = await metricsProgram.readCountDay(result)//função que trata o numero de parcels por dia
    const perMonthRank1 = await metricsProgram.readDataRank1(result)//função que trata a separação de ranks por dia do mes inteiro
    const perMonthRank2 = await metricsProgram.readDataRank2(result)
    const perMonthRank3 = await metricsProgram.readDataRank3(result)

    chartsProgram.buildChartProdPerDay(perDayProdCount,'count-per-month')//grafico parcels por dia
    chartsProgram.buildPizzaPerDay(perMonthRank1, 'count-rank1-per-month')//grafico pizza do rank mensal
    chartsProgram.buildPizzaPerDay(perMonthRank2, 'count-rank2-per-month')
    chartsProgram.buildPizzaPerDay(perMonthRank3, 'count-rank3-per-month')
}

function resetPage(){
    const container = document.querySelector('.program')
    const page = document.createElement('div')
    page.innerHTML = `
    <div class="dailyranks-container">      
        <h1>Metrics by daily production:</h1>
        <div>
            <h2>Production count per hour:</h2>
            <canvas id="count-per-day"></canvas>
        </div>
        <h2>Rank count per day: rank1/rank2/rank3</h2>
        <div class="pizzas">
            <canvas id="count-rank1-per-day"></canvas>
            <canvas id="count-rank2-per-day"></canvas>
            <canvas id="count-rank3-per-day"></canvas>
        </div>
    </div>
    <div class="monthlyranks-container">
        <h1>Metrics by month production:</h1>
        <div>
            <h2>Production count per day:</h2>
            <canvas id="count-per-month"></canvas>
        </div>
        <h2>Rank count per month: rank1/rank2/rank3</h2>
        <div class="pizzas">
            <canvas id="count-rank1-per-month"></canvas>
            <canvas id="count-rank2-per-month"></canvas>
            <canvas id="count-rank3-per-month"></canvas>
        </div>
    </div>  
    `

    container.innerHTML = ''
    container.append(page)

}

const selectUser = document.querySelector('#selectuser-parcellist')
selectUser.addEventListener('focus', async()=>{
    const result = await fetch('/getallusers')
    const json = await result.json()
    selectUser.innerHTML = ""
    for (let i = 0; i < json.length; i++) {
        var usersIndex = json[i]
        createOption(usersIndex, selectUser)
    }
})