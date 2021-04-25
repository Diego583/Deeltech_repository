function eliminar_practica(id_proyecto, id_fase, id_tarea, nombre_tarea) {

	document.getElementById('delNombrePractica').innerHTML = nombre_tarea;

	const csrf = document.getElementById('_csrf').value;
	const deleteButton = document.getElementById('delete');

	deleteButton.onclick = () => {
		let data = {id_proyecto: id_proyecto, id_fase: id_fase, id_tarea: id_tarea, nombre_tarea: nombre_tarea};
	    
	    fetch('/proyectos/' + id_proyecto + '/eliminar_practica' + '/' + id_fase 
	    	+ '/' + id_tarea + '/' + nombre_tarea + '/', {
	        method: 'POST',
	        body: JSON.stringify(data),
	        headers: {
	            'csrf-token': csrf,
	            'Content-Type': 'application/json'
	        },
	    }).then(result => {
	        return result.json(); 
	    }).then(data => { 
		    location.reload();
    	}).catch(err => {
        	console.error(err);
    	});
	}
}