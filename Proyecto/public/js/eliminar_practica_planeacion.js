function eliminar_practica(id_proyecto, id_fase, id_tarea, nombre_tarea, id_caso) {

	document.getElementById('delNombrePractica').innerHTML = nombre_tarea;

	const csrf = document.getElementById('_csrf').value;
	const deleteButton = document.getElementById('delete');
	const id = document.getElementById(id_caso).value;

	deleteButton.onclick = () => {
		let data = {id_proyecto: id_proyecto, id_fase: id_fase, id_tarea: id_tarea, nombre_tarea: nombre_tarea, id: id};
	    
	    fetch('/proyectos/' + id_proyecto + '/eliminar_practica_planeacion' + '/' + id_fase 
	    	+ '/' + id_tarea + '/' + nombre_tarea + '/' + id_caso + '/',{
	        method: 'POST',
	        body: JSON.stringify(data),
	        headers: {
	            'csrf-token': csrf,
	            'Content-Type': 'application/json'
	        },
	    }).then(result => {
	        return result.json(); 
	    }).then(data => { 
		    console.log(data);
			let count = 1;
			let sum = 0;

			let html = '';

			for (let tarea of data) {
				html+= '<tr>' + 
							'<th scope="row"> '+ count +'</th>' + 
							'<td>'+ tarea.nombre_tarea +'</td>' + 
							'<td>'+ tarea.nombre_fase +'</td>' + 
							'<td>'+ tarea.maximo +'</td>' + 
							'<td class = "text-center">' + '<a onMouseover=' + "this.style.cursor='pointer'" + ' role="button" title="Eliminar" data-toggle="tooltip" data-placement="top" onclick="eliminar_practica('+ "'" + id_proyecto + "'" + ',' + "'" + tarea.id_fase + "'" + ',' + "'" + tarea.id_tarea + "'" + ',' + "'" + tarea.nombre_tarea + "'" + ',' + "'" + tarea.id_caso_de_uso + "'" + ')">' + 
							'<i data-toggle="modal" data-target="#confirmDelete"' + " onMouseover=" + "this.style.color='red'" + " onMouseout=" + "this.style.color='black'" + ' class="fas fa-trash-alt"></i>' + " </a></td>" +
						'</tr>';
				count++;

				sum = sum + parseInt(tarea.maximo, 10);
			}

			html+= '<tr>' +
			'<td  colspan="2" class="text-center">Total:</td>' + 
			'<td  colspan="2" class="text-center">'+ sum +'</td>' +
			'</tr>';

			html+= '<tr>' +
			'<td scope="row" colspan="4" class="text-center"><button class="btn btn-secondary" data-toggle="modal" data-target="#m' + id_caso + '" id="' + id_caso + '" onclick="incomingTareaCasoUso(' + id_caso + ' , ' + id_proyecto + ')"> <i data-toggle="modal" data-target="#modificarCaso" onMouseover="this.style.color="blue"" onMouseout="this.style.color="white"" class="fas fa-plus"></i> </button> </th>' +
			'</tr>';

			let alertas = '';

			alertas+= '<div class="alert alert-success alert-dismissible fade show" role="alert">'+ 
			'<strong>Excelsior!</strong> Tarea eliminada correctamente'+ 
			'<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="closeAlert()">' +
				'<span aria-hidden="true">&times;</span>' +
			'</button>' +
			'</div>';

			$('#confirmDelete').modal('hide');
			document.getElementById(id + "registros").innerHTML = html;
			document.getElementById("alerta").innerHTML = alertas;
    	}).catch(err => {
        	console.error(err);
    	});
	}
}