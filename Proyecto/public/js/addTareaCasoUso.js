function addTareaCasoUso(caso_id, proyecto_id, valor) {

    //El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;
    
    const id = document.getElementById(caso_id).value;

    const ap = document.getElementById('p' + valor).value;

    console.log('s' + caso_id);
    const select_tareas = document.getElementById('s' + caso_id);
    const tareas = [];
    for(let i = 0; i < select_tareas.length; i++){
        if(select_tareas.options[i].selected){
            tareas.push(select_tareas.options[i].value);
        }
    }   
    const id_proyecto = proyecto_id;

    console.log("Tareas:" + tareas);
    console.log("id:" + id);
    console.log("ap:" + ap);
    console.log("id_proyecto:" + id_proyecto);

    let data = {id: id, tareas: tareas, ap: ap, id_proyecto: id_proyecto};
    //console.log(valor_busqueda);
    //función que manda la petición asíncrona
    fetch('/proyectos/' + proyecto_id + '/addTareaCasoUso', {
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
        let count = 1;

        let html = '';

        for (let tarea of data) {
            html+= '<tr>' + 
                        '<th scope="row"> '+ count +'</th>' + 
                        '<td>'+ tarea.nombre_tarea +'</td>' + 
                        '<td>'+ tarea.nombre_fase +'</td>' + 
                        '<td>'+ tarea.maximo +'</td>' + 
                    '</tr>';
            count++;
        }

        html+= '<tr>' +
        '<td scope="row" colspan="4" class="text-center"><button class="btn btn-secondary" data-toggle="modal" data-target="#m' + caso_id + '" id="' + caso_id + '" onclick="incomingTareaCasoUso(' + caso_id + ' , ' + proyecto_id + ')"> <i data-toggle="modal" data-target="#modificarCaso" onMouseover="this.style.color="blue"" onMouseout="this.style.color="white"" class="fas fa-plus"></i> </button> </th>' +
        '</tr>';

        console.log(html);
        console.log(id + "registros");
        document.getElementById(id + "registros").innerHTML = html;
        
    }).catch(err => {
        console.error(err);
    });
}