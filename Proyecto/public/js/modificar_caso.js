function modificar_caso(id_proyecto, id_caso, nombre_caso, iteracion_caso, epic_caso, ap_caso) {

	const mod_nombre_caso = document.getElementById('mod_nombre_caso');
	mod_nombre_caso.setAttribute('value', nombre_caso);
	const mod_iteracion = document.getElementById('mod_iteracion');
	mod_iteracion.setAttribute('value', iteracion_caso);
	const mod_epic = document.getElementById('mod_epic');
	mod_epic.setAttribute('value', epic_caso);
	const mod_ap = document.getElementById('mod_ap');
	$('#mod_ap').val(ap_caso); 
	$('#mod_ap').change();
	const modError = document.getElementById('modError');

	const csrf = document.getElementById('_csrf').value;
	const mod_ingresar = document.getElementById('mod_ingresar');

	mod_ingresar.onclick = () => {
		if (mod_nombre_caso.value.length < 1 || mod_iteracion.value.length < 1 || 
			mod_epic.value.length < 1) {
			let html = '<strong>Llena los campos.</strong>'
			modError.innerHTML = html;
		} else {
			let data = {id_proyecto: id_proyecto, id_caso: id_caso, 
				nombre_caso: mod_nombre_caso.value, iteracion_caso: mod_iteracion.value, 
				epic_caso: mod_epic.value, ap_caso: mod_ap.value};
		    
		    fetch('/proyectos/' + id_proyecto + '/modificar_caso_de_uso' + '/' + 
		    	id_caso + '/' + mod_nombre_caso.value + '/' + mod_iteracion.value + '/' + 
		    	mod_epic.value + '/' + mod_ap.value + '/', {
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