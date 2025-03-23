const selectStudyOption = document.getElementById("studyOption");

const divEnergyType = document.getElementById("energyContainer");
const selectEnergyType = document.getElementById("energyType");

const searchType = document.getElementById("searchType");

const selectFirstRegion = document.getElementById("continentSelect");
const selectSecondRegion = document.getElementById("continentSelect1");
const regionsSelect = [selectFirstRegion, selectSecondRegion];

const selectFirstLocation = document.getElementById("countrySelect");
const selectSecondLocation = document.getElementById("countrySelect1");
const locationsSelect = [selectFirstLocation, selectSecondLocation];

const firstCountryDiv = document.getElementById("firstCountry");
const secondCountryDiv = document.getElementById("secondCountry");
const firstCountryByRegionDiv = document.getElementById("firstCountryByRegion");
const secondCountryByRegionDiv = document.getElementById(
  "secondCountryByRegion"
);

const yearStart = document.getElementById("yearStart");
const yearEnd = document.getElementById("yearEnd");

const btnConsultar = document.getElementById("consultarBtn");
const h1TitleStudio = document.querySelector("div h1");
const myChart = document.getElementById("myChart");

document.addEventListener("DOMContentLoaded", function () {
  // Evento StudyOption
  selectStudyOption.addEventListener("change", toggleEnergyType);

  //Evento Year Start
  selectYearStart.addEventListener("change", updateYearEnd);

  // Eventos de selección de país
  selectFirstRegion.addEventListener("change", function (e) {
    updateCountrySelect(e, selectFirstLocation);
  });
  selectSecondRegion.addEventListener("change", function (e) {
    updateCountrySelect(e, selectSecondLocation);
  });

  // Eventos BtnConsultar
  btnConsultar.addEventListener("click", actualizarTitulo);
  btnConsultar.addEventListener("click", actualizarGrafica);
  btnConsultar.addEventListener("click", function () {
    let infoType = selectStudyOption.value;
    let energyType = document.getElementById("energyType").value;
    let titleElement = document.getElementById("dynamicHeading");

    if (infoType && energyType) {
      titleElement.textContent = `${infoType} - ${energyType}`;
      //actualizarGrafica();
    } else {
      titleElement.textContent = "Completa el formulario";
    }
  });

  /* ################################ Estructurar con API ###################################### */

  // Evento de seleccionar tipo de búsqueda
  searchType.addEventListener("change", function () {
    if (this.value === "country") {
      locationsSelect.forEach((select) => {
        select.disabled = false;
        //populateCountries(select);
      });
      regionsSelect.forEach((select) => (select.disabled = true));
      firstCountryDiv.style.display = "flex";
      secondCountryDiv.style.display = "flex";
      firstCountryByRegionDiv.style.display = "none";
      secondCountryByRegionDiv.style.display = "none";
    } else if (this.value === "continent") {
      locationsSelect.forEach((select) => (select.disabled = true));
      regionsSelect.forEach((select) => (select.disabled = false));
      firstCountryDiv.style.display = "none";
      secondCountryDiv.style.display = "none";
      firstCountryByRegionDiv.style.display = "flex";
      secondCountryByRegionDiv.style.display = "flex";
    } else {
      locationsSelect.forEach((select) => (select.disabled = true));
      regionsSelect.forEach((select) => (select.disabled = true));
    }
  });

  /* ######################################### Fin estructura con API ################################## */

  firstCountryDiv.style.display = "none";
  secondCountryDiv.style.display = "none";
  firstCountryByRegionDiv.style.display = "none";
  secondCountryByRegionDiv.style.display = "none";

  // Configuraciones iniciales
  fillRegions();
  //inicializarGrafica();
});

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
  if (
    selectStudyOption === "Capacidad Solar" ||
    selectStudyOption === "Energía Renovable"
  ) {
    divEnergyType.style.display = "none";
    selectEnergyType.value = "";
  } else {
    divEnergyType.style.display = "flex";
  }
}

// ✅ Cambiar el título al hacer clic en el botón
function actualizarTitulo() {
  let selectedOption = selectStudyOption.value;
  h1TitleStudio.textContent = selectedOption || "Completa el formulario";
}

/* ################################### API ####################################### */
async function getData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Retorna los datos obtenidos
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return null; // Retorna null si hay un error
  }
}

// Obtener Regions y rellenar select's
async function fillRegions() {
  selectFirstRegion.innerHTML =
    "<option value=0>Selecciona una región</option>";
  selectSecondRegion.innerHTML =
    "<option value=0>Selecciona una región</option>";

  const data = await getData("http://localhost:8080/region");
  if (data) {
    data.forEach((region) => {
      const option1 = document.createElement("option");
      option1.value = region.id;
      option1.textContent = region.name;

      const option2 = option1.cloneNode(true);

      selectFirstRegion.appendChild(option1);
      selectSecondRegion.appendChild(option2);
    });
  } else {
    console.error("No se pudo obtener los datos.");
  }
}

// ✅ Actualizar el selector de país según el continente seleccionado
async function updateCountrySelect(event, locationSelect) {
  const regionId = event.target.value;

  const locationsByRegion = await getData(
    `http://localhost:8080/location/region/${regionId}`
  );

  locationSelect.innerHTML = "<option value=0> Selecciona un país </option>";
  if (regionId !== 0 && locationsByRegion[regionId]) {
    locationsByRegion.forEach((location) => {
      let option = document.createElement("option");
      option.value = location.id;
      option.textContent = location.name;
      if (
        selectFirstRegion.value === selectSecondRegion.value &&
        selectFirstLocation.value === option.value
      ) {
      } else locationSelect.appendChild(option);
    });
    locationSelect.disabled = false;
  }
}

function populateCountries(selectElement) {
  selectElement.innerHTML =
    "<option id='' value=''>Selecciona un país</option>";
  //Definir countries mediante la API
  countries.forEach((country) => {
    let option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    selectElement.appendChild(option);
  });
}

// ✅ Generar los años en los select
function generarAnios() {
  for (let year = 1995; year <= 2022; year++) {
    let optionStart = new Option(year, year);
    let optionEnd = new Option(year, year);
    yearStart.appendChild(optionStart);
    yearEnd.appendChild(optionEnd);
  }
}

/* ######################################################## Gráfica ###################################### */
// ✅ Inicializar la gráfica con Chart.js
function inicializarGrafica() {
  const ctx = document.getElementById("myChart").getContext("2d");

  const data = {
    labels: [
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
    ],
    datasets: [
      {
        label: "País 1",
        data: [30, 45, 50, 60, 70, 85, 90, 95, 100], // Datos de País 1
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: false,
      },
      {
        label: "País 2",
        data: [20, 35, 40, 55, 65, 75, 80, 85, 95], // Datos de País 2
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        fill: false,
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false, // Permite que el canvas se ajuste al contenedor
    },
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Años",
          },
        },
        y: {
          title: {
            display: true,
            text: "Tipo de Información",
          },
        },
      },
    },
  };

  new Chart(ctx, config);
}

function actualizarGrafica() {
  let infoType = document.getElementById("studyOption").value;
  let startYear = parseInt(document.getElementById("yearStart").value);
  let endYear = parseInt(document.getElementById("yearEnd").value);

  if (!infoType || isNaN(startYear) || isNaN(endYear)) {
    alert(
      "Por favor, selecciona todos los campos antes de generar la gráfica."
    );
    return;
  }

  let labels = [];
  for (let year = startYear; year <= endYear; year++) {
    labels.push(year);
  }

  let dataValues = labels.map(() => Math.floor(Math.random() * 100) + 1);

  const data = {
    labels: labels,
    datasets: [
      {
        label: infoType,
        data: dataValues,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: false,
      },
    ],
  };

  if (myChart) {
    myChart.destroy();
  }

  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
      },
      scales: {
        x: {
          title: { display: true, text: "Años" },
        },
        y: {
          title: { display: true, text: infoType },
        },
      },
    },
  });
}

// Función para manejar el cambio de media query
function handleResize() {
  if (mobileQuery.matches) {
    console.log("📱 Modo móvil activado (ancho < 480px)");
    inicializarGrafica();
  } else if (tabletQuery.matches) {
    console.log("📟 Modo tablet activado (480px - 768px)");
    inicializarGrafica();
  } else {
    console.log("🖥️ Pantalla grande activada (> 768px)");
    inicializarGrafica();
  }
}

const mobileQuery = window.matchMedia("(max-width: 480px)");
const tabletQuery = window.matchMedia(
  "(min-width: 481px) and (max-width: 768px)"
);

mobileQuery.addEventListener("change", handleResize);
tabletQuery.addEventListener("change", handleResize);
