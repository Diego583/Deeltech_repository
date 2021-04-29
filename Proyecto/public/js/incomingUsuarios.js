function incomingUsuarios (id) {
    const csrf = document.getElementById('_csrf').value;

    let data = {id: id};
    
    fetch('/proyectos/' + id + '/incomingUsuarios', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'csrf-token': csrf,
            'Content-Type': 'application/json'
          },
    }).then(result => {
        return result.json(); //Regresa otra promesa
    }).then(data => {
        let tf;
        let sel_users = [];
        let html = '';

        html+= '<select class="form-control" id="s' + id + '" multiple data-live-search="true">';

        for (let usuario of data) {
            if (usuario.id_proyecto == id) {
                html+= '<option selected value="' + usuario.id_usuario + '">' + usuario.nombre_usuario + '</option>';
                sel_users.push(usuario.id_usuario);
            } 
        }
        for (usuario of data) {
            if (!sel_users.includes(usuario.id_usuario)) {
                html+= '<option value="' + usuario.id_usuario + '">' + usuario.nombre_usuario + '</option>';
            }
        }
        html+= '</select>';
        document.getElementById("iusuarios"+id).innerHTML = html;


        $('select').selectpicker();
        
    }).catch(err => {
        console.error(err);
    });
}