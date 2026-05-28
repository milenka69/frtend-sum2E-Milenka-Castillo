document.addEventListener('DOMContentLoaded', function () {
	const especialidad = document.getElementById('especialidad');
	const medico = document.getElementById('medico');
	const modalidad = document.getElementById('modalidad');
	const plataformaLabel = document.getElementById('plataformaLabel');
	const cobertura = document.getElementById('cobertura');
	const credencialLabel = document.getElementById('credencialLabel');
	const planLabel = document.getElementById('planLabel');
	const turnoForm = document.getElementById('turnoForm');
	const primeraVisita = document.getElementById('primeraVisita');
	const conocioLabel = document.getElementById('conocioLabel');
	const estudiosPrevios = document.getElementById('estudiosPrevios');
	const descEstudiosLabel = document.getElementById('descEstudiosLabel');

	const medicosPorEspecialidad = {
		'Clínica General': ['Dr. Carlos Ruiz','Dra. Marta López'],
		'Cardiología': ['Dr. Martín Gómez','Dra. Elena Ríos'],
		'Pediatría': ['Dra. Ana Pérez','Dr. Pablo Díaz'],
		'Ginecología': ['Dra. Lucía Torres','Dra. Carla Méndez'],
		'Traumatología': ['Dr. Juan Ramírez','Dr. Nicolás Vega'],
		'Neurología': ['Dra. Sofía Álvarez','Dr. Andrés Molina']
	};

	function clearMedicos() {
		medico.innerHTML = '';
		medico.appendChild(new Option('Seleccione médico...',''));
		medico.value = '';
		medico.disabled = true;
	}

	function populateMedicos(especial) {
		clearMedicos();
		const lista = medicosPorEspecialidad[especial] || [];
		lista.forEach(name => medico.appendChild(new Option(name,name)));
		if (lista.length) medico.disabled = false;
	}

	especialidad.addEventListener('change', function () {
		const val = especialidad.value;
		if (!val) {
			clearMedicos();
		} else {
			populateMedicos(val);
		}
	});

	modalidad.addEventListener('change', function () {
		if (modalidad.value === 'Videoconsulta') {
			plataformaLabel.style.display = '';
			document.getElementById('plataforma').setAttribute('required','');
		} else {
			plataformaLabel.style.display = 'none';
			document.getElementById('plataforma').removeAttribute('required');
			document.getElementById('plataforma').value = '';
		}
	});

	cobertura.addEventListener('change', function () {
		if (cobertura.value && cobertura.value !== 'Particular') {
			credencialLabel.style.display = '';
			planLabel.style.display = '';
			document.getElementById('numeroCredencial').setAttribute('required','');
			document.getElementById('plan').setAttribute('required','');
		} else {
			credencialLabel.style.display = 'none';
			planLabel.style.display = 'none';
			document.getElementById('numeroCredencial').removeAttribute('required');
			document.getElementById('numeroCredencial').value = '';
			document.getElementById('plan').removeAttribute('required');
			document.getElementById('plan').value = '';
		}
	});

	// Initial state
	clearMedicos();
	plataformaLabel.style.display = 'none';
	credencialLabel.style.display = 'none';
	planLabel.style.display = 'none';

	// Primera visita / Cómo nos conoció
	primeraVisita.addEventListener('change', function () {
		if (primeraVisita.checked) {
			conocioLabel.style.display = '';
			document.getElementById('conocio').setAttribute('required','');
		} else {
			conocioLabel.style.display = 'none';
			document.getElementById('conocio').removeAttribute('required');
			document.getElementById('conocio').value = '';
		}
	});

	// Estudios previos
	estudiosPrevios.addEventListener('change', function () {
		if (estudiosPrevios.checked) {
			descEstudiosLabel.style.display = '';
			document.getElementById('descEstudios').setAttribute('required','');
		} else {
			descEstudiosLabel.style.display = 'none';
			document.getElementById('descEstudios').removeAttribute('required');
			document.getElementById('descEstudios').value = '';
		}
	});

	turnoForm.addEventListener('submit', function (e) {
		e.preventDefault();
		if (!turnoForm.checkValidity()) {
			turnoForm.reportValidity();
			return;
		}
		// aquí se podría enviar por fetch a un backend
		alert('Solicitud enviada. Nos comunicaremos pronto.');
		turnoForm.reset();
		resetState();
	});

	// Reset handler to restore initial UI state
	function resetState() {
		clearMedicos();
		plataformaLabel.style.display = 'none';
		credencialLabel.style.display = 'none';
		planLabel.style.display = 'none';
		conocioLabel.style.display = 'none';
		descEstudiosLabel.style.display = 'none';
		// remove required attributes that may have been set
		document.getElementById('plataforma').removeAttribute('required');
		document.getElementById('numeroCredencial').removeAttribute('required');
		document.getElementById('plan').removeAttribute('required');
		document.getElementById('conocio').removeAttribute('required');
		document.getElementById('descEstudios').removeAttribute('required');
	}

	turnoForm.addEventListener('reset', function () {
		setTimeout(resetState, 0);
	});
});

