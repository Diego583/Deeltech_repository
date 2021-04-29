function totalCasesChart(ctx, data) {
    let arrData = [2,20,40,50];
    let arrData2 = [4,40,23];
    let arrData3 = [5,50,24];

    

    const chart = new Chart(ctx, {
        type: 'line',
        data:{
            labels: data[0],
            datasets: [
                {
                    label: 'Valor Ganado Acumulado (VGA)',
                    data: data[2],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 2)'
                    ]
                },
                {
                    label: 'Valor Planeado Acumulado (VPA)',
                    data: data[1],
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    backgroundColor: [
                        'rgba(54, 162, 235, 2)'
                    ]
                },
                {
                    label: 'Costo Real Acumulado (CRA)',
                    data: data[3],
                    borderColor: [
                        'rgba(255, 206, 86, 1)'
                    ],
                    backgroundColor: [
                        'rgba(255, 206, 86, 2)'
                    ]
                },
            ]
        },
        options: {
            maintainAspectRatio: false,
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

function renderCharts(data){
    const ctx = document.getElementById('chart').getContext('2d');
    totalCasesChart(ctx, data);
}

function fetchGrafica(proyecto_id) {
    const id_iteracion = document.getElementById('IT').value;
    const fechaInicio = document.getElementById('i' + id_iteracion).value;
    const fechaFin = document.getElementById('f' + id_iteracion).value;
    const nombre_iteracion = document.getElementById('n' + id_iteracion).value;

    //El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;

    let data = {nombre_iteracion: nombre_iteracion, fechaInicio: fechaInicio, fechaFin: fechaFin};

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
        console.log(data);

        let html = '';

        html+= '<div class="chart-container">'+ 
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

        renderCharts(data);

    }).catch(err => {
        console.error(err);
    });
}