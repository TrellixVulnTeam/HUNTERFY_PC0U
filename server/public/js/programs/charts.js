export function buildChartProdPerHour(content){
    var countPerDay = document.getElementById('count-per-day');
    countPerDay.innerHTML = ''
    var countPerDayChart = new Chart(countPerDay, {
        type: 'bar',
        data: {
            labels: ['00h', '01h', '02h', '03h', '04h', '05h', '06h', '07h', '08h', '09h', '10h', '11h',
            '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
            datasets: [{
                label: '# of parcels',
                data: [content[0], content[1],content[2],content[3],content[4],content[5],content[6],content[7],content[8],
                content[9],content[10],content[11],content[12],content[13],content[14],content[15],content[16],content[17],
                content[18],content[19],content[20],content[21],content[22],content[23]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

export function buildPizzaPerDay(content){
    var countRankPerDay = document.getElementById('count-rank-per-day');
    countRankPerDay.innerHTML = ''
    var countPerDayChart = new Chart(countRankPerDay, {
        type: 'pie',
        data: {
            labels: ['A', 'B', 'C', 'undefined', 'B CASA'],
            datasets: [{
                label: '# of parcels',
                data: [content[0], content[1],content[2],content[3],content[4]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                hoverOffset: 3
            }]
        },
        options: {
            cutoutPercentage: 40
        }
    });
}

