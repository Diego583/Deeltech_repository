function eliminar_caso(id_proyecto, id_caso, nombre_Caso) {

	html = nombre_Caso;
	document.getElementById('nombreCasoUso').innerHTML = html;


	const csrf = document.getElementById('_csrf').value;
	const deleteButton = document.getElementById('delete');

	deleteButton.onclick = () => {
		let data = {id_proyecto: id_proyecto, id_caso: id_caso};
	    
	    fetch('/proyectos/' + id_proyecto + '/eliminar_caso' + '/' + id_caso, {
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
