document.addEventListener("DOMContentLoaded", function () {
    generarAnios();
    document.getElementById("studyOption").addEventListener("change", toggleEnergyType);
    document.getElementById("yearStart").addEventListener("change", updateYearEnd);
    document.getElementById("continentSelect").addEventListener("change", function() {
        updateCountrySelect('continentSelect', 'countrySelect');
    });
    document.getElementById("continentSelect1").addEventListener("change", function() {
        updateCountrySelect('continentSelect1', 'countrySelect1');
    });
    document.getElementById("consultarBtn").addEventListener("click", actualizarTitulo);
    
    inicializarGrafica();
});

// ✅ Generar los años en los select
function generarAnios() {
    const yearStart = document.getElementById("yearStart");
    const yearEnd = document.getElementById("yearEnd");

    for (let year = 1995; year <= 2022; year++) {
        let optionStart = new Option(year, year);
        let optionEnd = new Option(year, year);
        yearStart.appendChild(optionStart);
        yearEnd.appendChild(optionEnd);
    }
}

// ✅ Actualizar los años finales según la selección de año inicial
function updateYearEnd() {
    let startYear = parseInt(document.getElementById("yearStart").value);
    let yearEndSelect = document.getElementById("yearEnd");

    yearEndSelect.innerHTML = '<option value="">Selecciona un año</option>';

    if (!isNaN(startYear)) { 
        for (let year = startYear; year <= 2022; year++) {
            let option = new Option(year, year);
            yearEndSelect.appendChild(option);
        }
    }
}

// ✅ Mostrar u ocultar "Tipo de Energía" según la opción seleccionada
function toggleEnergyType() {
    let studyOption = document.getElementById("studyOption").value;
    let energyContainer = document.getElementById("energyContainer");
    let energyTypeSelect = document.getElementById("energyType");

    if (studyOption === "Capacidad Solar" || studyOption === "Energía Renovable") {
        energyContainer.style.display = "none";
        energyTypeSelect.value = "";
    } else {
        energyContainer.style.display = "block";
    }
}




// ✅ Actualizar el selector de país según el continente seleccionado


document.addEventListener("DOMContentLoaded", function () {
    const searchType = document.getElementById("searchType");
    const countrySelects = document.querySelectorAll("#countries");
    const continentSelects = document.querySelectorAll("#continentSelect, #continentSelect1");

    const countries = [
        "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita",
        "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés",
        "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia",
        "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi",
        "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China",
        "Chipre", "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil",
        "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador",
        "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos",
        "Estonia", "Esuatini", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón",
        "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guinea", "Guinea-Bisáu",
        "Guinea Ecuatorial", "Guyana", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak",
        "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia", "Jamaica",
        "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos",
        "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo",
        "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Marruecos", "Mauricio",
        "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro",
        "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega",
        "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea",
        "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricana",
        "República Checa", "República del Congo", "República Democrática del Congo", "República Dominicana",
        "Ruanda", "Rumania", "Rusia", "San Cristóbal y Nieves", "San Marino", "Santa Lucía",
        "San Vicente y las Granadinas", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles",
        "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Sudáfrica", "Sudán", "Sudán del Sur",
        "Suecia", "Suiza", "Surinam", "Tailandia", "Tayikistán", "Timor Oriental", "Togo", "Tonga",
        "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda",
        "Uruguay", "Uzbekistán", "Vanuatu", "Vaticano", "Venezuela", "Vietnam", "Yemen", "Yibuti",
        "Zambia", "Zimbabue"
    ];

    function populateCountries(selectElement) {
        selectElement.innerHTML = "<option value=''>Selecciona un país</option>";
        countries.forEach(country => {
            let option = document.createElement("option");
            option.value = country;
            option.textContent = country;
            selectElement.appendChild(option);
        });
    }

    searchType.addEventListener("change", function () {
        if (this.value === "country") {
            countrySelects.forEach(select => {
                select.disabled = false;
                populateCountries(select);
            });
            continentSelects.forEach(select => select.disabled = true);
        } else if (this.value === "continent") {
            countrySelects.forEach(select => select.disabled = true);
            continentSelects.forEach(select => select.disabled = false);
        } else {
            countrySelects.forEach(select => select.disabled = true);
            continentSelects.forEach(select => select.disabled = true);
        }
    });
});





const countriesByContinent = {
    "africa": [
        "Argelia", "Angola", "Benín", "Botsuana", "Burkina Faso", "Burundi", "Cabo Verde",
        "Camerún", "Chad", "Comoras", "Congo", "Costa de Marfil", "Egipto", "Eritrea",
        "Esuatini", "Etiopía", "Gabón", "Gambia", "Ghana", "Guinea", "Guinea-Bisáu",
        "Guinea Ecuatorial", "Kenia", "Lesoto", "Liberia", "Libia", "Madagascar", "Malawi",
        "Mali", "Marruecos", "Mauricio", "Mauritania", "Mozambique", "Namibia", "Níger",
        "Nigeria", "República Centroafricana", "República Democrática del Congo",
        "Ruanda", "Santo Tomé y Príncipe", "Senegal", "Seychelles", "Sierra Leona",
        "Somalia", "Sudáfrica", "Sudán", "Sudán del Sur", "Tanzania", "Togo", "Túnez",
        "Uganda", "Zambia", "Zimbabue"
    ],
    "north-america": [
        "Canadá", "Estados Unidos", "México", "Antigua y Barbuda", "Bahamas", "Barbados",
        "Belice", "Costa Rica", "Cuba", "Dominica", "El Salvador", "Granada", "Guatemala",
        "Haití", "Honduras", "Jamaica", "Nicaragua", "Panamá", "República Dominicana",
        "San Cristóbal y Nieves", "San Vicente y las Granadinas", "Santa Lucía",
        "Trinidad y Tobago"
    ],
    "south-america": [
        "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Ecuador", "Guyana",
        "Paraguay", "Perú", "Surinam", "Uruguay", "Venezuela"
    ],
    "asia": [
        "Afganistán", "Arabia Saudita", "Armenia", "Azerbaiyán", "Bangladés", "Baréin",
        "Birmania", "Brunéi", "Bután", "Camboya", "China", "Corea del Norte", "Corea del Sur",
        "Emiratos Árabes Unidos", "Filipinas", "Georgia", "India", "Indonesia", "Irak", "Irán",
        "Israel", "Japón", "Jordania", "Kazajistán", "Kirguistán", "Kuwait", "Laos", "Líbano",
        "Malasia", "Maldivas", "Mongolia", "Nepal", "Omán", "Pakistán", "Palestina", "Qatar",
        "Singapur", "Siria", "Sri Lanka", "Tailandia", "Tayikistán", "Timor Oriental",
        "Turkmenistán", "Turquía", "Uzbekistán", "Vietnam", "Yemen"
    ],
    "europe": [
        "Alemania", "Andorra", "Austria", "Bélgica", "Bielorrusia", "Bosnia y Herzegovina",
        "Bulgaria", "Chipre", "Croacia", "Dinamarca", "Eslovaquia", "Eslovenia", "España",
        "Estonia", "Finlandia", "Francia", "Grecia", "Hungría", "Irlanda", "Islandia", "Italia",
        "Kosovo", "Letonia", "Liechtenstein", "Lituania", "Luxemburgo", "Malta", "Moldavia",
        "Mónaco", "Montenegro", "Noruega", "Países Bajos", "Polonia", "Portugal", "Reino Unido",
        "República Checa", "Rumania", "Rusia", "San Marino", "Serbia", "Suecia", "Suiza",
        "Ucrania", "Vaticano"
    ],
    "oceania": [
        "Australia", "Fiyi", "Islas Marshall", "Islas Salomón", "Kiribati", "Micronesia",
        "Nauru", "Nueva Zelanda", "Palaos", "Papúa Nueva Guinea", "Samoa", "Tonga", "Tuvalu",
        "Vanuatu"
    ]
};

function updateCountrySelect(continentSelectId, countrySelectId) {
    const continent = document.getElementById(continentSelectId).value;
    const countrySelect = document.getElementById(countrySelectId);
    
    countrySelect.innerHTML = '<option value="">Selecciona un país</option>';
    countrySelect.disabled = true;

    if (continent && countriesByContinent[continent]) {
        countriesByContinent[continent].forEach(country => {
            let option = new Option(country, country);
            countrySelect.appendChild(option);
        });
        countrySelect.disabled = false;
    }
}

// ✅ Cambiar el título al hacer clic en el botón
function actualizarTitulo() {
    let selectedOption = document.getElementById("studyOption").value;
    let titleElement = document.querySelector('div h1');
    titleElement.textContent = selectedOption || "Completa el formulario";
}

document.getElementById("consultarBtn").addEventListener("click", function() {
    let infoType = document.getElementById("infoType").value;
    let energyType = document.getElementById("energyType").value;
    let titleElement = document.getElementById("dynamicHeading");
    
    if (infoType && energyType) {
        titleElement.textContent = `${infoType} - ${energyType}`;
    } else {
        titleElement.textContent = "Completa el formulario";
    }
});


// ✅ Inicializar la gráfica con Chart.js
function inicializarGrafica() {
    const ctx = document.getElementById('myChart').getContext('2d');

    const data = {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'País 1',
                data: [30, 45, 50, 60, 70, 85, 90, 95, 100], // Datos de País 1
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                fill: false,
            },
            {
                label: 'País 2',
                data: [20, 35, 40, 55, 65, 75, 80, 85, 95], // Datos de País 2
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                fill: false,
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Años'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Tipo de Información'
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
}



document.addEventListener("DOMContentLoaded", function () {
    generarAnios();
    document.getElementById("studyOption").addEventListener("change", toggleEnergyType);
    document.getElementById("yearStart").addEventListener("change", updateYearEnd);
    document.getElementById("consultarBtn").addEventListener("click", actualizarGrafica);
    inicializarGrafica();
});

let myChart;

function actualizarGrafica() {
    let infoType = document.getElementById("studyOption").value;
    let startYear = parseInt(document.getElementById("yearStart").value);
    let endYear = parseInt(document.getElementById("yearEnd").value);
    
    if (!infoType || isNaN(startYear) || isNaN(endYear)) {
        alert("Por favor, selecciona todos los campos antes de generar la gráfica.");
        return;
    }
    
    let labels = [];
    for (let year = startYear; year <= endYear; year++) {
        labels.push(year);
    }
    
    let dataValues = labels.map(() => Math.floor(Math.random() * 100) + 1);
    
    const data = {
        labels: labels,
        datasets: [{
            label: infoType,
            data: dataValues,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            fill: false,
        }]
    };
    
    if (myChart) {
        myChart.destroy();
    }
    
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Años' }
                },
                y: {
                    title: { display: true, text: infoType }
                }
            }
        }
    });
}


