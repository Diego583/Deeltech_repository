function buscar() {
    const valor_busqueda = document.getElementById('buscar').value;
    //El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;

    let data = {valor_busqueda: valor_busqueda};
    //console.log(valor_busqueda);
    //función que manda la petición asíncrona
    fetch('/proyectos/buscar', {
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
        for (let proyecto of data) {
          html += '<div class="col-sm-12 col-md-6 col-lg-4">' + 
                    '<div><br></div>' + 
                    '<div class="card bg-dark" style="height: 30rem; width: 20rem;">' + 
                        '<img src="'+ proyecto.imagen +'" class="card-img-top" alt="'+ proyecto.imagen +'">' + 
                        '<div class="card-body">' + 
                            '<h5 class="card-title text-success">'+ proyecto.nombre_proyecto +'</h5>' + 
                            '<p class="card-text ">'+ proyecto.descripcion +'</p>' + 
                            '<form action="/proyectos" method="POST">' + 
                                '<input type="hidden" name="_csrf" value="'+ csrf +'" >' + 
                                '<input type="hidden" name="id_proyecto" value="'+ proyecto.id_proyecto +'" >' + 
                                '<input type="submit" class="btn btn-secondary" value="Ir a proyecto">' + 
                            '</form>' + 
                        '</div>' + 
                    '</div>' + 
                    '<div><br></div>' + 
                  '</div>';
        }
        document.getElementById("resultados").innerHTML = html;

    }).catch(err => {
        console.error(err);
    });
}