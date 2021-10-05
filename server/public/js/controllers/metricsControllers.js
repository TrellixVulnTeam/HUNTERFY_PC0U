import * as metricsProgram from '/js/programs/metrics.js'
import * as chartsProgram from '/js/programs/charts.js'
document.querySelector('.search-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    const date = new Date(document.querySelector('#date').value)
    const day = date.getDate()+1
    const json = await metricsProgram.getDomInfo()
    const result = await metricsProgram.postSearchData(json)
    const dailyResult = await metricsProgram.postSearchDataByDay(json)

    const perHourProdCount = await metricsProgram.readCountHour(dailyResult)
    const perDayProdCount = await metricsProgram.readCountDay(result)
    const perDayRank1 = await metricsProgram.readDataRank1(dailyResult)
    console.log(perDayRank1)

    chartsProgram.buildChartProdPerHour(perHourProdCount)
    chartsProgram.buildPizzaPerDay(perDayRank1)
})