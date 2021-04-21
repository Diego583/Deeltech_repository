function incomingTareaCasoUso(caso_id, proyecto_id) {
    //El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;
    
    const id = document.getElementById(caso_id).value;

    console.log("id:" + id);

    let data = {id: id};
    //console.log(valor_busqueda);
    //función que manda la petición asíncrona
    fetch('/proyectos/' + proyecto_id + '/incomingTareaCasoUso', {
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

        html+= '<select class="form-control" id="s' + id + '" multiple data-live-search="true">';

        for (let tarea of data) {
            html+= '<option value="' + tarea.id_tarea + '"> ' + tarea.nombre_tarea + '</option>';
        
        }

        html+= '</select>';
        console.log(html)
        document.getElementById(id + "tareas").innerHTML = html;

        $('select').selectpicker();
        
    }).catch(err => {
        console.error(err);
    });
}