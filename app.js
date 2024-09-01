document.getElementById('medical-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los datos del formulario
    const rut = document.getElementById('rut').value;
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const estadoCivil = document.getElementById('estadoCivil').value;
    const comentarios = document.getElementById('comentarios').value;

    // Crear un objeto con los datos del formulario
    const record = {
        rut,
        nombres,
        apellidos,
        direccion,
        ciudad,
        telefono,
        email,
        fechaNacimiento,
        estadoCivil,
        comentarios
    };

    // Guardar el registro en localStorage
    let records = JSON.parse(localStorage.getItem('medicalRecords')) || [];
    const existingRecordIndex = records.findIndex(r => r.rut === rut);

    if (existingRecordIndex !== -1) {
        if (confirm('El registro ya existe. ¿Desea sobrescribirlo?')) {
            records[existingRecordIndex] = record;
        }
    } else {
        records.push(record);
    }

    localStorage.setItem('medicalRecords', JSON.stringify(records));

    alert('Registro guardado exitosamente');
    this.reset();
});

document.getElementById('cerrar').addEventListener('click', function() {
    window.close();
});

document.getElementById('search').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    const resultsList = document.getElementById('results');
    resultsList.innerHTML = '';

    const records = JSON.parse(localStorage.getItem('medicalRecords')) || [];

    const filteredRecords = records.filter(record => record.apellidos.toLowerCase().includes(searchQuery));

    filteredRecords.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `${record.nombres} ${record.apellidos} - ${record.rut}`;
        resultsList.appendChild(li);
    });
});