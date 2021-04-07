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
        
        /*
        console.log(data);
        let html = '';
        for (let CasoUso of data) {
          html += '<tr>' +
          '<td id="nombre_caso" value ="' + CasoUso.id_caso_de_uso + '">' + CasoUso.nombre_caso_de_uso + '</td>' +
          '<td>' +
              '<select class="form-control" name="status" id="status">' +
                  '<option selected value="' + CasoUso.status_caso + '" class="font-weight-bold">' + CasoUso.status_caso + '</option>' +
                  '<option style="color:rgb(0, 255, 55)" value="Terminado" class="font-weight-bold" onclick="status()">Terminado</option>' +
                  '<option style="color:rgb(211, 22, 22)" value="Pendiente" class="font-weight-bold" onclick="status()">Pendiente</option>' +

                '</select>' +
          '</td>' +

      '</tr>';

        }
        document.getElementById("resultados").innerHTML = html;*/

    }).catch(err => {
        console.error(err);
    });
}