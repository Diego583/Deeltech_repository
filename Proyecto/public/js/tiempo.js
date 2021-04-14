function tiempo(tarea_id, proyecto_id) {
    const ap_1 = document.getElementById('1' + tarea_id).value;
    const ap_2 = document.getElementById('2' + tarea_id).value;
    const ap_3 = document.getElementById('3' + tarea_id).value;
    const ap_5 = document.getElementById('5' + tarea_id).value;
    const ap_8 = document.getElementById('8' + tarea_id).value;
    const ap_13 = document.getElementById('13' + tarea_id).value;
    //El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;
    
    const id = document.getElementById(tarea_id).value;

    console.log("id:" + id);
    console.log("AP_1:" + ap_1);
    console.log("AP_2:" + ap_2);
    console.log("AP_3:" + ap_3);
    console.log("AP_5:" + ap_5);
    console.log("AP_8:" + ap_8);
    console.log("AP_13:" + ap_13);

    let data = {id: id, ap_1: ap_1, ap_2: ap_2, ap_3: ap_3, ap_5: ap_5, ap_8: ap_8, ap_13: ap_13};
    //console.log(valor_busqueda);
    //función que manda la petición asíncrona
    fetch('/proyectos/' + proyecto_id + '/wbs', {
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
        
        //alert("hola")
        
        console.log(data);
        let html = '';

        /*html+= '<div id="toast3" class="toast bg-dark" role="alert" aria-live="assertive" aria-atomic="true" data-delay="1500">'+
                    '<div class="toast-header bg-success ">'+
                        
                        '<strong class="mr-auto text-white">'+
                            '<i class="fas fa-bell"></i>'+
                            '&nbsp; Mensaje de confirmación'+
                        '</strong>'+
                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">'+
                        '<span aria-hidden="true">×</span>'+
                        '</button>'+
                    '</div>'+
                    '<div class="toast-body bg-dark text-white">'+
                        'Status actualizado correctamente'+
                    '</div>'+
                '</div>'+
                '<br>';

        document.getElementById("mensaje").innerHTML = html;
        
        $(document).ready(function(){
            $('.toast').toast('show'); 
        });*/

        html += '<th class = "text-center">Horas totales</th>' +
                '<td></td>' +
                '<td></td>' +
                '<td class = "text-center">' + data[0].Total_1 + '</td>' +
                '<td class = "text-center">' + data[0].Total_2 + '</td>' +
                '<td class = "text-center">' + data[0].Total_3 + '</td>' +
                '<td class = "text-center">' + data[0].Total_5 + '</td>' +
                '<td class = "text-center">' + data[0].Total_8 + '</td>' +
                '<td class = "text-center">' + data[0].Total_13 + '</td>';

        document.getElementById("total").innerHTML = html;


            

        
    }).catch(err => {
        console.error(err);
    });
}