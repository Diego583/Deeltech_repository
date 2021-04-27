function status(caso_id, proyecto_id) {
    const status = document.getElementById('s' + caso_id).value;
    //El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;
    
    const id = document.getElementById(caso_id).value;

    console.log("id:" + id);
    console.log("status:" + status);

    let data = {status: status, id: id};
    //console.log(valor_busqueda);
    //función que manda la petición asíncrona
    fetch('/proyectos/' + proyecto_id + '/status', {
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
        //html += '<div style="color: rgb(16, 204, 16);" class="content" id = "mensaje">Actualizado correctamente</div>';
        //document.getElementById("mensaje").innerHTML = html;

        html+= '<div id="toast3" class="toast bg-dark" role="alert" aria-live="assertive" aria-atomic="true" data-delay="1500">'+
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


        let tabla = '';
        for (let iteracion of data[1]) {
            let i = new Date(iteracion.fechaInicio);
            let inicio = i.getDate() + '/' + (i.getMonth() + 1) + '/' + i.getFullYear();
            let f = new Date(iteracion.fechaFin);
            let fin = f.getDate() + '/' + (f.getMonth() + 1) + '/' + f.getFullYear();

            let totalCasos = 0;
            let totalTerminados = 0;
            for (let CasoUso of data[0]) {
                if(CasoUso.nombre_iteracion == iteracion.nombre_iteracion){
                    totalCasos++;
                    if(CasoUso.status_caso == "Terminado"){
                        totalTerminados++;
                    }
                }
            }

            if(totalCasos == 0 && totalTerminados == 0){
                var progreso = 0;
            }
            else{
                var progreso = Math.round((totalTerminados / totalCasos)*100,2);
            }

            tabla += '<tr>' + 
                        '<td class = "text-center" style="width: 15rem"> '+ iteracion.nombre_iteracion +' </td>' + 
                        '<td class = "text-center" style="width: 10rem"style="width: 10rem"> '+ inicio +' </td>' + 
                        '<td class = "text-center" style="width: 10rem"> '+ fin +' </td>' + 
                        '<td class = "text-center" style="width: 10rem">' + 
                            '<div class="progress">' + 
                                '<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="'+ progreso +'" aria-valuemin="0" aria-valuemax="100" style="width: '+ progreso +'%">'+ progreso +'%</div>' + 
                            '</div>' + 
                        '</td>' + 
                    '</tr>';
        }
        document.getElementById("tablaIteraciones").innerHTML = tabla;
        
        $(document).ready(function(){
            $('.toast').toast('show'); 
        });

            

        
    }).catch(err => {
        console.error(err);
    });
}