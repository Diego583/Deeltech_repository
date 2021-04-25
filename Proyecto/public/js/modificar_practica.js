function modificar_practica(id_proyecto, id_fase, nombre_fase, id_tarea, nombre_tarea) {

	const mod_nombrePractica = document.getElementById('mod_nombrePractica');
	mod_nombrePractica.setAttribute('value', nombre_tarea);
	const mod_fase = document.getElementById('mod_fase');
	$('#mod_fase').val(nombre_fase); 
	$('#mod_fase').change();
	const modError = document.getElementById('modError');

	const csrf = document.getElementById('_csrf').value;
	const mod_ingresar = document.getElementById('mod_ingresar');

	mod_ingresar.onclick = () => {
		if (mod_nombrePractica.value.length < 1) {
			let html = '<strong>Llena los campos.</strong>'
			modError.innerHTML = html;
		} else {

			let data = {id_proyecto: id_proyecto, id_fase: id_fase, 
			nombre_fase: mod_fase.value, id_tarea: id_tarea, 
			nombre_tarea: mod_nombrePractica.value};
	    
		    fetch('/proyectos/' + id_proyecto + '/modificar_practica' + '/' + 
		    	id_fase + '/' + mod_fase.value + '/' + id_tarea + '/' + 
		    	mod_nombrePractica.value + '/', {
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
}