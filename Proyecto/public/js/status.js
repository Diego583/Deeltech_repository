function status(caso_id) {
    const status = document.getElementById('s' + caso_id).value;
    //El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;
    
    const id = document.getElementById(caso_id).value;

    console.log("id:" + id);
    console.log("status:" + status);

    let data = {status: status, id: id};
    //console.log(valor_busqueda);
    //función que manda la petición asíncrona
    fetch('/proyectos/status', {
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
        
        $(document).ready(function(){
            $('.toast').toast('show'); 
        });

            

        
    }).catch(err => {
        console.error(err);
    });
}