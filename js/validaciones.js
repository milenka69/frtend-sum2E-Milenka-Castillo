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
		'clinica': ['Dr. Gomez, Carlos', 'Dra. Lopez, Maria'],
		'cardiologia': ['Dr. Perez, Juan', 'Dra. Torres, Ana'],
		'pediatria': ['Dra. Diaz, Laura', 'Dr. Soto, Pablo'],
		'ginecologia': ['Dra. Romero, Valeria', 'Dra. Castro, Elena'],
		'traumatologia': ['Dr. Ramos, Sergio', 'Dr. Herrera, Diego'],
		'neurologia': ['Dr. Molina, Andres', 'Dra. Vargas, Cecilia']
	};

	const nombre = document.getElementById('nombre');
	const apellido = document.getElementById('apellido');
	const dni = document.getElementById('dni');
	const email = document.getElementById('email');
	const telefono = document.getElementById('telefono');
	const nacimiento = document.getElementById('nacimiento');
	const genero = document.getElementById('genero');
	const tipoConsulta = document.getElementById('tipoConsulta');
	const fechaTurno = document.getElementById('fechaTurno');
	const horaTurno = document.getElementById('horaTurno');
	const plataforma = document.getElementById('plataforma');
	const numeroCredencial = document.getElementById('numeroCredencial');
	const plan = document.getElementById('plan');
	const motivo = document.getElementById('motivo');
	const confirmacion = document.getElementById('confirmacion');

	function getErrorElement(field) {
		let el = field.nextElementSibling;
		while (el && !(el.classList && el.classList.contains('mensaje-error'))) {
			el = el.nextElementSibling;
		}
		if (!el) {
			el = document.createElement('div');
			el.className = 'mensaje-error';
			field.insertAdjacentElement('afterend', el);
		}
		return el;
	}

	function setFieldFeedback(field, valid, message) {
		field.classList.remove('campo-error', 'campo-ok');
		const errorEl = getErrorElement(field);
		if (valid) {
			field.classList.add('campo-ok');
			errorEl.textContent = '';
			errorEl.style.display = 'none';
		} else {
			field.classList.add('campo-error');
			errorEl.textContent = message;
			errorEl.style.display = 'block';
		}
	}

	function clearFeedback(field) {
		field.classList.remove('campo-error', 'campo-ok');
		const errorEl = field.nextElementSibling;
		if (errorEl && errorEl.classList.contains('mensaje-error')) {
			errorEl.textContent = '';
			errorEl.style.display = 'none';
		}
	}

	function clearAllFeedback() {
		document.querySelectorAll('.campo-error, .campo-ok').forEach(el => el.classList.remove('campo-error', 'campo-ok'));
		document.querySelectorAll('.mensaje-error').forEach(el => {
			el.textContent = '';
			el.style.display = 'none';
		});
	}

	function formatConfirmacion(nombrePaciente, especialidadPaciente, fecha, hora, turnoNumero) {
		return `<strong>Turno generado</strong><br>
		Paciente: ${nombrePaciente}<br>
		Especialidad: ${especialidadPaciente}<br>
		Fecha: ${fecha}<br>
		Hora: ${hora}<br>
		Número de turno: <strong>${turnoNumero}</strong>`;
	}

	function generarNumeroTurno() {
		return 'TURN-' + Math.floor(Math.random() * 90000 + 10000);
	}

	function clearConfirmation() {
		confirmacion.textContent = '';
		confirmacion.classList.add('hidden');
	}

	function mostrarConfirmacion() {
		const turnoNumero = generarNumeroTurno();
		confirmacion.innerHTML = formatConfirmacion(
			`${nombre.value.trim()} ${apellido.value.trim()}`,
			especialidad.value,
			fechaTurno.value,
			horaTurno.value,
			turnoNumero
		);
		confirmacion.classList.remove('hidden');
		confirmacion.style.display = 'block';
		confirmacion.scrollIntoView({ behavior: 'smooth' });
	}

	function calcularEdad(fecha) {
		const nacimientoDate = new Date(fecha);
		const ahora = new Date();
		let edad = ahora.getFullYear() - nacimientoDate.getFullYear();
		const mes = ahora.getMonth() - nacimientoDate.getMonth();
		if (mes < 0 || (mes === 0 && ahora.getDate() < nacimientoDate.getDate())) {
			edad--;
		}
		return edad;
	}

	function validarTurnoEnFechaHora() {
		if (!fechaTurno.value || !horaTurno.value) {
			return { valid: true, message: '' };
		}
		const turno = new Date(`${fechaTurno.value}T${horaTurno.value}:00`);
		const ahora = new Date();
		if (isNaN(turno.getTime())) {
			return { valid: false, message: 'Fecha u hora inválida.' };
		}
		if (turno.getTime() < ahora.getTime() + 24 * 60 * 60 * 1000) {
			return { valid: false, message: 'El turno debe solicitarse con al menos 24 horas de anticipación.' };
		}
		const dia = turno.getDay();
		if (dia === 0 || dia === 6) {
			return { valid: false, message: 'El turno debe solicitarse en un día hábil (lunes a viernes).' };
		}
		return { valid: true, message: '' };
	}

	function validarCampo(field) {
		if (field.disabled) {
			clearFeedback(field);
			return true;
		}

		const value = field.value.trim();
		const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/;
		const dniRegex = /^\d{7,8}$/;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^[+\d\s-]+$/;
		const credentialRegex = /^[A-Za-z0-9]{5,}$/;

		switch (field.id) {
			case 'nombre':
			case 'apellido':
				if (!value) {
					setFieldFeedback(field, false, 'Este campo es obligatorio.');
					return false;
				}
				if (!nameRegex.test(value)) {
					setFieldFeedback(field, false, 'Solo se permiten letras y espacios.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'dni':
				if (!dniRegex.test(value)) {
					setFieldFeedback(field, false, 'DNI obligatorio de 7 u 8 dígitos.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'email':
				if (!emailRegex.test(value)) {
					setFieldFeedback(field, false, 'Ingrese un correo válido.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'telefono':
				if (!phoneRegex.test(value) || (value.match(/\d/g) || []).length < 8) {
					setFieldFeedback(field, false, 'Teléfono inválido. Debe tener al menos 8 dígitos.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'nacimiento':
				if (!value) {
					setFieldFeedback(field, false, 'La fecha de nacimiento es obligatoria.');
					return false;
				}
				const fecha = new Date(value);
				const ahora = new Date();
				if (fecha.getTime() > ahora.getTime()) {
					setFieldFeedback(field, false, 'La fecha no puede ser futura.');
					return false;
				}
				const edad = calcularEdad(value);
				if (edad < 0 || edad > 120) {
					setFieldFeedback(field, false, 'La edad debe ser entre 0 y 120 años.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'especialidad':
				if (!value) {
					setFieldFeedback(field, false, 'Seleccione una especialidad.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'medico':
				if (especialidad.value && !value) {
					setFieldFeedback(field, false, 'Seleccione un médico.');
					return false;
				}
				clearFeedback(field);
				return true;
			case 'tipoConsulta':
				if (!value) {
					setFieldFeedback(field, false, 'Seleccione el tipo de consulta.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'fechaTurno':
				if (!value) {
					setFieldFeedback(field, false, 'Indique la fecha del turno.');
					return false;
				}
				const fechaSeleccionada = new Date(value + 'T00:00:00');
				const hoy = new Date();
				hoy.setHours(0,0,0,0);
				if (fechaSeleccionada.getTime() < hoy.getTime()) {
					setFieldFeedback(field, false, 'La fecha no puede ser pasada.');
					return false;
				}
				const validacion = validarTurnoEnFechaHora();
				if (!validacion.valid && horaTurno.value) {
					setFieldFeedback(field, false, validacion.message);
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'horaTurno':
				if (!value) {
					setFieldFeedback(field, false, 'Indique la hora del turno.');
					return false;
				}
				const [hora, minuto] = value.split(':').map(Number);
				if (hora < 8 || hora > 20 || (hora === 20 && minuto > 0)) {
					setFieldFeedback(field, false, 'La hora debe estar entre 08:00 y 20:00.');
					return false;
				}
				const validacionFechaHora = validarTurnoEnFechaHora();
				if (!validacionFechaHora.valid && fechaTurno.value) {
					setFieldFeedback(field, false, validacionFechaHora.message);
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'modalidad':
				if (!value) {
					setFieldFeedback(field, false, 'Seleccione la modalidad.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'plataforma':
				if (!value) {
					setFieldFeedback(field, false, 'Seleccione la plataforma.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'cobertura':
				if (!value) {
					setFieldFeedback(field, false, 'Seleccione una cobertura.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'numeroCredencial':
				if (!credentialRegex.test(value)) {
					setFieldFeedback(field, false, 'Número de credencial obligatorio de al menos 5 caracteres.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'plan':
				if (!value) {
					setFieldFeedback(field, false, 'Indique el plan.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'conocio':
				if (!value) {
					setFieldFeedback(field, false, 'Indique cómo nos conoció.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'motivo':
				if (value.length < 20) {
					setFieldFeedback(field, false, 'El motivo debe tener al menos 20 caracteres.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			case 'descEstudios':
				if (value.length < 20) {
					setFieldFeedback(field, false, 'La descripción debe tener al menos 20 caracteres.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
			default:
				if (field.required && !value) {
					setFieldFeedback(field, false, 'Este campo es obligatorio.');
					return false;
				}
				setFieldFeedback(field, true, '');
				return true;
		}
	}

	function validateForm() {
		clearAllFeedback();
		clearConfirmation();
		const fields = [
			nombre, apellido, dni, email, telefono, nacimiento, genero,
			especialidad, medico, tipoConsulta, fechaTurno, horaTurno, modalidad, plataforma,
			cobertura, numeroCredencial, plan, conocio, motivo, descEstudios
		];
		let valid = true;
		fields.forEach(field => {
			if (!validarCampo(field)) {
				valid = false;
			}
		});
		const turnoValidacion = validarTurnoEnFechaHora();
		if (!turnoValidacion.valid && fechaTurno.value && horaTurno.value) {
			setFieldFeedback(fechaTurno, false, turnoValidacion.message);
			setFieldFeedback(horaTurno, false, turnoValidacion.message);
			valid = false;
		}
		return valid;
	}

	function clearCondicionales() {
		modalidad.dispatchEvent(new Event('change'));
		cobertura.dispatchEvent(new Event('change'));
		primeraVisita.dispatchEvent(new Event('change'));
		estudiosPrevios.dispatchEvent(new Event('change'));
	}

	function clearMedicos() {
		medico.innerHTML = '';
		medico.appendChild(new Option('Seleccione médico...', ''));
		medico.value = '';
		medico.disabled = true;
		medico.classList.add('disabled');
	}

	function populateMedicos(especial) {
		clearMedicos();
		const lista = medicosPorEspecialidad[especial] || [];
		lista.forEach(name => medico.appendChild(new Option(name, name)));
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
		if (modalidad.value === 'Videoconsulta') {
			plataformaLabel.style.display = 'block';
			plataforma.style.display = 'block';
			plataforma.disabled = false;
			plataforma.required = true;
		} else {
			plataformaLabel.style.display = 'none';
			plataforma.style.display = 'none';
			plataforma.required = false;
			plataforma.value = '';
			plataforma.disabled = true;
			clearFeedback(plataforma);
		}
	});

	cobertura.addEventListener('change', function () {
		if (cobertura.value && cobertura.value !== 'Particular') {
			credencialLabel.style.display = 'block';
			numeroCredencial.style.display = 'block';
			numeroCredencial.disabled = false;
			numeroCredencial.required = true;
			planLabel.style.display = 'block';
			plan.style.display = 'block';
			plan.disabled = false;
			plan.required = true;
		} else {
			credencialLabel.style.display = 'none';
			numeroCredencial.style.display = 'none';
			numeroCredencial.required = false;
			numeroCredencial.value = '';
			numeroCredencial.disabled = true;
			clearFeedback(numeroCredencial);
			planLabel.style.display = 'none';
			plan.style.display = 'none';
			plan.required = false;
			plan.value = '';
			plan.disabled = true;
			clearFeedback(plan);
		}
	});

	primeraVisita.addEventListener('change', function () {
		if (primeraVisita.checked) {
			conocioGroup.style.display = 'block';
			conocio.disabled = false;
			conocio.required = true;
		} else {
			conocioGroup.style.display = 'none';
			conocio.required = false;
			conocio.value = '';
			conocio.disabled = true;
			clearFeedback(conocio);
		}
	});

	estudiosPrevios.addEventListener('change', function () {
		if (estudiosPrevios.checked) {
			descEstudiosGroup.style.display = 'block';
			descEstudios.disabled = false;
			descEstudios.required = true;
		} else {
			descEstudiosGroup.style.display = 'none';
			descEstudios.required = false;
			descEstudios.value = '';
			descEstudios.disabled = true;
			clearFeedback(descEstudios);
		}
	});

	// Initial state
	clearMedicos();
	plataformaLabel.style.display = 'none';
	plataforma.style.display = 'none';
	plataforma.disabled = true;
	credencialLabel.style.display = 'none';
	numeroCredencial.style.display = 'none';
	numeroCredencial.disabled = true;
	planLabel.style.display = 'none';
	plan.style.display = 'none';
	plan.disabled = true;
	conocioGroup.style.display = 'none';
	conocio.disabled = true;
	descEstudiosGroup.style.display = 'none';
	descEstudios.disabled = true;

	turnoForm.addEventListener('submit', function (e) {
		e.preventDefault();
		if (validateForm()) {
			mostrarConfirmacion();
			return;
		}
		const primerError = document.querySelector('.campo-error');
		if (primerError) {
			primerError.scrollIntoView({ behavior: 'smooth' });
		}
	});

	function resetState() {
		clearMedicos();
		plataformaLabel.style.display = 'none';
		plataforma.style.display = 'none';
		plataforma.disabled = true;
		plataforma.required = false;
		plataforma.value = '';
		credencialLabel.style.display = 'none';
		numeroCredencial.style.display = 'none';
		numeroCredencial.disabled = true;
		numeroCredencial.required = false;
		numeroCredencial.value = '';
		planLabel.style.display = 'none';
		plan.style.display = 'none';
		plan.disabled = true;
		plan.required = false;
		plan.value = '';
		conocioGroup.style.display = 'none';
		conocio.disabled = true;
		conocio.required = false;
		conocio.value = '';
		descEstudiosGroup.style.display = 'none';
		descEstudios.disabled = true;
		descEstudios.required = false;
		descEstudios.value = '';
		clearAllFeedback();
		clearConfirmation();
	}

	turnoForm.addEventListener('reset', function () {
		setTimeout(resetState, 0);
	});
});

