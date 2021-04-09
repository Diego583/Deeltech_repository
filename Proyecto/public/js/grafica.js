//console.log("Entre");
function totalCasesChart(ctx) {
    const chart = new Chart(ctx, {
        type: 'line',
        data:{
            labels: [1, 20],
            datasets: [
                {
                    label: 'Done',
                    data: [1,20],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ]
                },
                {
                    label: 'Rejected',
                    data: [3,50],
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)'
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