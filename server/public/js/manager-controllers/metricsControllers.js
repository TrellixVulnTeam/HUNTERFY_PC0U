import * as metricsProgram from '/js/manager-programs/metrics.js'
import * as chartsProgram from '/js/manager-programs/charts.js'
document.querySelector('.search-button').addEventListener('click', async(event)=>{
    event.preventDefault()
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