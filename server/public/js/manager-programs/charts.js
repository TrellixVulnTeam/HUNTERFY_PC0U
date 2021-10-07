export function buildChartProdPerHour(content, domelement){
    var countPerDay = document.getElementById(domelement);
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

export function buildChartProdPerDay(content, domelement){
    var countPerDay = document.getElementById(domelement);
    countPerDay.innerHTML = ''
    var countPerDayChart = new Chart(countPerDay, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24','25','26',
        '27','28','29', '30', '31'],
            datasets: [{
                label: '# of parcels',
                data: [content[1],content[2],content[3],content[4],content[5],content[6],content[7],content[8],
                content[9],content[10],content[11],content[12],content[13],content[14],content[15],content[16],content[17],
                content[18],content[19],content[20],content[21],content[22],content[23],content[24],content[25]
                ,content[26],content[27],content[28],content[29],content[30],content[31]],
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

export function buildPizzaPerDay(content, domelement){
    var countRankPerDay = document.getElementById(domelement);
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
    countPerDayChart.canvas.parentNode.style.height = '50vh';
    countPerDayChart.canvas.parentNode.style.width = '50vh';
}

