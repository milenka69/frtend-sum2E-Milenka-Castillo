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
	const conocioGroup = document.getElementById('conocioGroup');
	const conocio = document.getElementById('conocio');
	const estudiosPrevios = document.getElementById('estudiosPrevios');
	const descEstudiosGroup = document.getElementById('descEstudiosGroup');
	const descEstudios = document.getElementById('descEstudios');

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
		medico.classList.add('disabled');
	}

	function populateMedicos(especial) {
		clearMedicos();
		const lista = medicosPorEspecialidad[especial] || [];
		lista.forEach(name => medico.appendChild(new Option(name,name)));
		if (lista.length) {
			medico.disabled = false;
			medico.classList.remove('disabled');
		}
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
		const plt = document.getElementById('plataforma');
		if (modalidad.value === 'Videoconsulta') {
			plataformaLabel.classList.remove('hidden');
			plt.classList.remove('hidden');
			plt.disabled = false;
			plt.setAttribute('required','');
		} else {
			plataformaLabel.classList.add('hidden');
			plt.classList.add('hidden');
			plt.removeAttribute('required');
			plt.value = '';
			plt.disabled = true;
		}
	});

	cobertura.addEventListener('change', function () {
		const num = document.getElementById('numeroCredencial');
		const pl = document.getElementById('plan');
		if (cobertura.value && cobertura.value !== 'Particular') {
			credencialLabel.classList.remove('hidden');
			num.classList.remove('hidden');
			num.disabled = false;
			num.setAttribute('required','');
			planLabel.classList.remove('hidden');
			pl.classList.remove('hidden');
			pl.disabled = false;
			pl.setAttribute('required','');
		} else {
			credencialLabel.classList.add('hidden');
			num.classList.add('hidden');
			num.removeAttribute('required');
			num.value = '';
			num.disabled = true;
			planLabel.classList.add('hidden');
			pl.classList.add('hidden');
			pl.removeAttribute('required');
			pl.value = '';
			pl.disabled = true;
		}
	});

	// Initial state
	clearMedicos();
	plataformaLabel.classList.add('hidden');
	document.getElementById('plataforma').classList.add('hidden');
	document.getElementById('plataforma').disabled = true;
	credencialLabel.classList.add('hidden');
	document.getElementById('numeroCredencial').classList.add('hidden');
	document.getElementById('numeroCredencial').disabled = true;
	planLabel.classList.add('hidden');
	document.getElementById('plan').classList.add('hidden');
	document.getElementById('plan').disabled = true;
	conocioGroup.classList.add('hidden');
	conocio.disabled = true;
	descEstudiosGroup.classList.add('hidden');
	descEstudios.disabled = true;

	// Primera visita / Cómo nos conoció
	primeraVisita.addEventListener('change', function () {
		if (primeraVisita.checked) {
			conocioGroup.classList.remove('hidden');
			conocio.disabled = false;
			conocio.setAttribute('required','');
		} else {
			conocioGroup.classList.add('hidden');
			conocio.removeAttribute('required');
			conocio.value = '';
			conocio.disabled = true;
		}
	});

	// Estudios previos
	estudiosPrevios.addEventListener('change', function () {
		if (estudiosPrevios.checked) {
			descEstudiosGroup.classList.remove('hidden');
			descEstudios.disabled = false;
			descEstudios.setAttribute('required','');
		} else {
			descEstudiosGroup.classList.add('hidden');
			descEstudios.removeAttribute('required');
			descEstudios.value = '';
			descEstudios.disabled = true;
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
		plataformaLabel.classList.add('hidden');
		document.getElementById('plataforma').classList.add('hidden');
		document.getElementById('plataforma').disabled = true;
		credencialLabel.classList.add('hidden');
		document.getElementById('numeroCredencial').classList.add('hidden');
		document.getElementById('numeroCredencial').disabled = true;
		planLabel.classList.add('hidden');
		document.getElementById('plan').classList.add('hidden');
		document.getElementById('plan').disabled = true;
		conocioGroup.classList.add('hidden');
		conocio.disabled = true;
		descEstudiosGroup.classList.add('hidden');
		descEstudios.disabled = true;
		// remove required attributes that may have been set
		document.getElementById('plataforma').removeAttribute('required');
		document.getElementById('numeroCredencial').removeAttribute('required');
		document.getElementById('plan').removeAttribute('required');
		conocio.removeAttribute('required');
		descEstudios.removeAttribute('required');
	}

	turnoForm.addEventListener('reset', function () {
		setTimeout(resetState, 0);
	});
});

