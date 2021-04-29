function modificar_proyecto(id_proyecto, nombre_proyecto, descripcion) {

	const mod_nombre_proyecto = document.getElementById('mod_nombre_proyecto'+id_proyecto);
	mod_nombre_proyecto.setAttribute('value', nombre_proyecto);
	const mod_descripcion = document.getElementById('mod_descripcion'+id_proyecto);
	mod_descripcion.setAttribute('value', descripcion);
    
	const modError = document.getElementById('modError'+id_proyecto);
	const csrf = document.getElementById('_csrf').value;
	const mod_ingresar = document.getElementById('mod_ingresar'+id_proyecto);

	mod_ingresar.onclick = () => {
        const selectUsuarios = document.getElementById('s'+id_proyecto);
        const vec_u = [];
        for(let i = 0; i < selectUsuarios.length; i++){
            if(selectUsuarios.options[i].selected){
                vec_u.push(selectUsuarios.options[i].value);
            }
        }   
        let s_img;
		if (mod_nombre_proyecto.value.length < 1 || mod_descripcion.value.length < 1) {
			let html = '<strong>Llena los campos.</strong>'
			modError.innerHTML = html;
		} else {
			let data = {id_proyecto: id_proyecto, nombre_proyecto: mod_nombre_proyecto.value, 
            descripcion: mod_descripcion.value, usuarios: vec_u};
	    
		    fetch('/proyectos/' + id_proyecto + '/modificar_proyecto' + '/' + 
                mod_nombre_proyecto.value + '/' + mod_descripcion.value + '/' + 
		    	vec_u + '/', {
		        method: 'POST',
		        body: JSON.stringify(data),
		        headers: {
		            'csrf-token': csrf,
		            'Content-Type': 'application/json'
		        },
		    }).then(result => {
		        return result.json(); 
		    }).then(data => { 
			    let html = '';
        for (let proyecto of data) {
          html += '<div class="col-sm-12 col-md-6 col-lg-4">' + 
                    '<div><br></div>' + 
                    '<div class="card bg-dark" style="height: 30rem; width: 20rem;">' + 
                        '<img src="'+ proyecto.imagen +'" class="card-img-top" alt="'+ proyecto.imagen +'" id = "imgauxiliar">' + 
                        '<div class="card-body">' + 
                            '<h5 class="card-title text-success">'+ proyecto.nombre_proyecto +'</h5>' + 
                            '<p class="card-text" id = "scroll">'+ proyecto.descripcion +'</p>' + 
                            '<div>' +
                            '<a href="/proyectos/'+ proyecto.id_proyecto +'/reportes" class="btn btn-secondary">Ir a proyecto</a>&nbsp&nbsp' +
                            '<a onMouseover=' + "this.style.cursor='pointer'" + ' role="button" title="Modificar" data-toggle="tooltip" data-placement="top" onclick="incomingUsuarios('+ "'" + proyecto.id_proyecto + "'" + '), modificar_proyecto('+ "'" + proyecto.id_proyecto + "'"  + ',' + "'" + proyecto.nombre_proyecto + "'"+ ',' + "'" + proyecto.descripcion + "'" +')">' +
                            '<i style="color: white;" data-toggle="modal" data-target="#mod' + proyecto.id_proyecto + '"' + " onMouseover=" + "this.style.color='red'" + " onMouseout=" + "this.style.color='white'" + ' class="fas fa-edit"></i>' + " </a> &nbsp" +
                            '<a onMouseover=' + "this.style.cursor='pointer'" + ' role="button" title="Eliminar" data-toggle="tooltip" data-placement="top" onclick="eliminar_proyecto('+ "'" + proyecto.id_proyecto + "'" + ',' + "'" + proyecto.nombre_proyecto + "'" + ')">' +
                            '<i style="color: white;" data-toggle="modal" data-target="#eliminarProyecto"' + " onMouseover=" + "this.style.color='red'" + " onMouseout=" + "this.style.color='white'" + ' class="fas fa-trash-alt"></i>' + " </a>" +
                            '</div>' + 
                        '</div>' + 
                    '</div>' + 
                    '<div><br></div>' + 
                  '</div>'+
                  '<div class="modal fade" id="mod' + proyecto.id_proyecto + '"  data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">'+
                  '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >'+
                  '<div class="modal-content bg-dark text-white">'+
                  '<div class="modal-header">'+
                  '<h5 class="modal-title" id="staticBackdropLabel">Modificar Proyecto</h5>'+
                  '<button class="btn btn-danger" type="button" class="close" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">&times;</span></button></div>'+
                  '<div class="modal-body">'+
                  '<input type="hidden" id= "d_csrf" name="d_csrf" value="'+csrf+'" >'+
                  '<div class="mb-3" id="modError' + proyecto.id_proyecto + '" style="color: red"></div>'+
                  '<div class="mb-3">'+ '<label for="mod_nombre_proyecto' + proyecto.id_proyecto + '" class="form-label text-success">Nombre:</label>' +
                  '<input type="text" class="form-control" id="mod_nombre_proyecto' + proyecto.id_proyecto + '" name="mod_nombre_proyecto"></div>'+
                  '<div class="mb-3"><label for="mod_descripcion' + proyecto.id_proyecto + '" class="form-label text-success">Descripción:</label>'+
                  '<input type="text" class="form-control" id="mod_descripcion' + proyecto.id_proyecto + '" name="mod_descripcion"></div>' +
                  '<label class="form-label text-success">Usuarios:</label><div class="mb-3" id="iusuarios' + proyecto.id_proyecto + '"></div>'+
                  '<div class="modal-footer"><button id="mod_ingresar' + proyecto.id_proyecto + '" type="button" class="btn btn-success">Guardar cambios</button></div>'+
                  '</div></div></div></div>';
        }
        $('#mod' + id_proyecto).modal('hide');
        document.getElementById("resultados").innerHTML = html;
	    	}).catch(err => {
	        	console.error(err);
	    	});
		}
	}
}