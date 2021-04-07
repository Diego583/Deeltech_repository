//console.log("Entre");
function totalCasesChart(ctx) {
    const chart = new Chart(ctx, {
        type: 'line',
        data:{
            labels: [1, 20, 50, 60],
            datasets: [
                {
                    label: 'Valor Ganado Acumulado (VGA)',
                    data: [1,20,30,40],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ]
                },
                {
                    label: 'Valor Planeado Acumulado (VPA)',
                    data: [3,50,70,90],
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)'
                    ]
                },
                {
                    label: 'Costo Real Acumulado (CRA)',
                    data: [5,60,80,100],
                    borderColor: [
                        'rgba(255, 206, 86, 1)'
                    ],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)'
                    ]
                },
                {
                    label: 'Valor Planeado Ajustado',
                    data: [8,110,120,130],
                    borderColor: [
                        'rgba(75, 192, 192, 1)'
                    ],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)'
                    ]
                }
            ]
        }
    })
}

function renderCharts(){
    const ctx = document.getElementById('chart').getContext('2d');
    totalCasesChart(ctx);
}
renderCharts();