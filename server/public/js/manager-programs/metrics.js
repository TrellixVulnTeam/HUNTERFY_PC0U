//program used on /metrics
export async function getDomInfo(){
    const user = document.querySelector('#user').value 
    const date = document.querySelector('#date').value

    const infoString = `
    {
        "user":"${user}",
        "date":"${date}"
    }`
    const infojson = await JSON.parse(infoString)
    return infojson
}

export async function postSearchData(json){//permonth
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch('/metrics', options)
        const content = await rawResponse.json();
        return content
    }
    catch(error){
        console.log(error)
    }
}

export async function postSearchDataByDay(json){//perday
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        const rawResponse = await fetch('/dailymetrics', options)
        const content = await rawResponse.json();
        return content
    }
    catch(error){
        console.log(error)
    }
}



export async function readDataRank1(content){//separa os parcels por rank pelo rank1
    try{
        var rankACount = 0
        var rankBCount = 0
        var rankCCount = 0
        var rankBcasaCount = 0
        var rankUndefinedCount = 0
        for (let i = 0; i < content.length; i++) {
            var contentIndex = content[i]
            var rank1 = contentIndex.rank1
            if(rank1!=='A' && rank1!=='B' && rank1!=='C' && rank1!=='B CASA'){
                rankUndefinedCount = rankUndefinedCount + 1
            }
            if(rank1 == 'A'){
                rankACount = rankACount + 1
            }
            if(rank1 == 'B'){
                rankBCount = rankBCount + 1
            }     
            if(rank1 == 'C'){
                rankCCount = rankCCount + 1
            }   
            if(rank1 == 'B CASA'){
                rankBcasaCount = rankBcasaCount + 1
            }   
        }
        const infoArr = [rankACount, rankBCount, rankCCount, rankUndefinedCount, rankBcasaCount]
        return infoArr
    }
    catch(error){
        console.log(error)
    }
}

export async function readDataRank2(content){//separa os parcels por rank pelo rank2
    try{
        var rankACount = 0
        var rankBCount = 0
        var rankCCount = 0
        var rankBcasaCount = 0
        var rankUndefinedCount = 0
        for (let i = 0; i < content.length; i++) {
            var contentIndex = content[i]
            var rank2 = contentIndex.rank2
            if(rank2!=='A' && rank2!=='B' && rank2!=='C' && rank2!=='B CASA'){
                rankUndefinedCount = rankUndefinedCount + 1
            }
            if(rank2 == 'A'){
                rankACount = rankACount + 1
            }
            if(rank2 == 'B'){
                rankBCount = rankBCount + 1
            }     
            if(rank2 == 'C'){
                rankCCount = rankCCount + 1
            }   
            if(rank2 == 'B CASA'){
                rankBcasaCount = rankBcasaCount + 1
            }   
        }
        const infoArr = [rankACount, rankBCount, rankCCount, rankUndefinedCount, rankBcasaCount]
        return infoArr
    }
    catch(error){
        console.log(error)
    }
}

export async function readDataRank3(content){//separa os parcels por rank pelo rank3
    try{
        var rankACount = 0
        var rankBCount = 0
        var rankCCount = 0
        var rankBcasaCount = 0
        var rankUndefinedCount = 0
        for (let i = 0; i < content.length; i++) {
            var contentIndex = content[i]
            var rank3 = contentIndex.rank3
            if(rank3!=='A' && rank3!=='B' && rank3!=='C' && rank3!=='B CASA'){
                rankUndefinedCount = rankUndefinedCount + 1
            }
            if(rank3 == 'A'){
                rankACount = rankACount + 1
            }
            if(rank3 == 'B'){
                rankBCount = rankBCount + 1
            }     
            if(rank3 == 'C'){
                rankCCount = rankCCount + 1
            }   
            if(rank3 == 'B CASA'){
                rankBcasaCount = rankBcasaCount + 1
            }   
        }
        const infoArr = [rankACount, rankBCount, rankCCount, rankUndefinedCount, rankBcasaCount]
        return infoArr
    }
    catch(error){
        console.log(error)
    }
}

export async function readCountHour(content){//separa os parcels por hora do dia
    try{
        var hoursArr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]//starts 00H, ends on 23H 
        for (let i = 0; i < content.length; i++) {
            var contentIndex = content[i]
            var infodate = new Date(contentIndex.dateandtime)
            var n = infodate.getHours()
            if (infodate.getHours() == n){
                hoursArr[n+3] = hoursArr[n+3]+1
            }
        }
        console.log('hours array:', hoursArr)
        return hoursArr
    }
    catch(error){
        console.log(error)
    }
}

export async function readCountDay(content){//separa os parcels por dia do mes
    try{
        var daysArr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]//starts on day "zero" of every month, ends on 31
        for (let i = 0; i < content.length; i++) {
            var contentIndex = content[i]
            var infodate = new Date(contentIndex.dateandtime)
            var y = infodate.getDate()
            if (infodate.getDate() == y){
                daysArr[y] = daysArr[y]+1
            }
        }
        console.log('days arr:', daysArr)
        return daysArr
    }
    catch(error){
        console.log(error)
    }
}