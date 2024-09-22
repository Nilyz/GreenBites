document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('presupuestoForm');
    const platoPrincipalSelect = document.getElementById('platoPrincipal');
    const platoSecundarioSelect = document.getElementById('platoSecundario');
    const extras = document.querySelectorAll('input[type="checkbox"]');
    const presupuestoFinal = document.getElementById('presupuestoFinal');

    formulario.addEventListener('input', calcularPresupuesto);

    // Validaciones de Contacto
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');

    nombreInput.addEventListener('input', () => validarTexto(nombreInput, 15));
    apellidosInput.addEventListener('input', () => validarTexto(apellidosInput, 40));
    telefonoInput.addEventListener('input', validarTelefono);
    emailInput.addEventListener('input', validarEmail);

    formulario.addEventListener('submit', function(e) {
        if (!validarFormulario()) {
            e.preventDefault();
        }
    });


    function validarTexto(input, maxLength) {
        const valor = input.value;
        const regex = /^[a-zA-Z\s]+$/; 

        if (!regex.test(valor) || valor.length > maxLength) {
            input.setCustomValidity('Solo letras y máximo ' + maxLength + ' caracteres.');
        } else {
            input.setCustomValidity('');
        }
    }


    function validarTelefono() {
        const valor = telefonoInput.value;
        const regex = /^[0-9]{9}$/;

        if (!regex.test(valor)) {
            telefonoInput.setCustomValidity('Debe contener 9 dígitos numéricos.');
        } else {
            telefonoInput.setCustomValidity('');
        }
    }


    function validarEmail() {
        const valor = emailInput.value;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(valor)) {
            emailInput.setCustomValidity('Debe ser un correo electrónico válido.');
        } else {
            emailInput.setCustomValidity('');
        }
    }

    // Para validar el formulario completo
    function validarFormulario() {
        return formulario.checkValidity();
    }

    // Función para calcular el presupuesto
    function calcularPresupuesto() {
        let total = 0;

        const platoPrincipalSeleccionado = platoPrincipalSelect.options[platoPrincipalSelect.selectedIndex];
        total += parseFloat(platoPrincipalSeleccionado.getAttribute('data-precio'));

        const platoSecundarioSeleccionado = platoSecundarioSelect.options[platoSecundarioSelect.selectedIndex];
        total += parseFloat(platoSecundarioSeleccionado.getAttribute('data-precio'));

        extras.forEach(extra => {
            if (extra.checked) {
                total += parseFloat(extra.value);
            }
        });

        // Actualizar presupuesto en el HTML
        presupuestoFinal.textContent = total.toFixed(2);
    }
});

