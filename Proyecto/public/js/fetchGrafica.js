function totalCasesChart(ctx) {
    let arrData = [2,20,40,50];
    let arrData1 = [3,30,44,65];
    let arrData2 = [4,40,23];
    let arrData3 = [5,50,24];

    const chart = new Chart(ctx, {
        type: 'line',
        data:{
            labels: [20,1,15,5],
            datasets: [
                {
                    label: 'Valor Ganado Acumulado (VGA)',
                    data: arrData,
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 2)'
                    ]
                },
                {
                    label: 'Valor Planeado Acumulado (VPA)',
                    data: arrData1,
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    backgroundColor: [
                        'rgba(54, 162, 235, 2)'
                    ]
                },
                {
                    label: 'Costo Real Acumulado (CRA)',
                    data: arrData2,
                    borderColor: [
                        'rgba(255, 206, 86, 1)'
                    ],
                    backgroundColor: [
                        'rgba(255, 206, 86, 2)'
                    ]
                },
                {
                    label: 'Valor Planeado Ajustado',
                    data: arrData3,
                    borderColor: [
                        'rgba(75, 192, 192, 1)'
                    ],
                    backgroundColor: [
                        'rgba(75, 192, 192, 2)'
                    ]
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Costo',
                    padding: 10,
                    color: 'rgba(255, 255, 255)',
                    font: {
                        size: 30
                    }
                },
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 14
                        },
                        color: 'rgba(255, 255, 255)'
                    }
                }
            }
        }
    })
}

function renderCharts(){
    const ctx = document.getElementById('chart').getContext('2d');
    totalCasesChart(ctx);
}

function fetchGrafica(proyecto_id) {
    const iteracion = document.getElementById('IT').value;
    //El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;

    let data = {iteracion: iteracion};
    console.log(iteracion);

    //función que manda la petición asíncrona
    fetch('/proyectos/' + proyecto_id + '/reportes', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'csrf-token': csrf,
            'Content-Type': 'application/json'
          },
    }).then(result => {
        return result.json(); //Regresa otra promesa
    }).then(data => {
        //Modificamos el DOM de nuestra página de acuerdo a los datos de la segunda promesa
        //console.log(data);
        let html = '';

        html+= '<div class="chart-container" style="position: relative; height: 50%; width: 100%">'+ 
                    '<canvas id="chart"></canvas>'+ 
                '</div>';

        let alertas = '';

        alertas+= '<div class="alert alert-success alert-dismissible fade show" role="alert">'+ 
                    '<strong>Excelsior!</strong> Tareas obtenidas exitosamente. 😁👍'+ 
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="closeAlert()">' +
                        '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                '</div>';

        document.getElementById("grafica").innerHTML = html;

        document.getElementById("alerta").innerHTML = alertas;

        renderCharts();

    }).catch(err => {
        console.error(err);
    });
}