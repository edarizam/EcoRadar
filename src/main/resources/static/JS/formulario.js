// Elementos del DOM
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

const selectFirstOnlyLocation = document.getElementById("countries");
const selectSecondOnlyLocation = document.getElementById("countries1");
const onlyLocationsSelect = [selectFirstOnlyLocation, selectSecondOnlyLocation];

const firstCountryDiv = document.getElementById("firstCountry");
const secondCountryDiv = document.getElementById("secondCountry");

const firstCountryByRegionDiv = document.getElementById("firstCountryByRegion");
const secondCountryByRegionDiv = document.getElementById(
  "secondCountryByRegion"
);

const divYearStart = document.getElementById("divYearStart");
const yearStart = document.getElementById("yearStart");

const divYearEnd = document.getElementById("divYearEnd");
const yearEnd = document.getElementById("yearEnd");

const btnConsultar = document.getElementById("consultarBtn");
/* const h1TitleStudio = document.querySelector("div h1"); */
const dynamicHeading = document.getElementById("dynamicHeading");

const myChart = document.getElementById("myChart");

let yearsGetted = {};
let queryResult1 = {};
let queryResult2 = {};

/* ########################## Funciones Auxiliares ########################### */

// Resetea un select con una opción por defecto
const resetSelect = (selectElement, defaultOption, letEmpty = true) => {
  if (letEmpty)
    selectElement.innerHTML = `<option value="">${defaultOption}</option>`;
  selectElement.disabled = true;
  selectElement.selectedIndex = 0;
};

// Actualiza el estado de la UI en función del tipo de búsqueda
function updateSearchTypeUI() {
  if (searchType.value === "country") {
    // Habilitar búsqueda por país
    selectFirstOnlyLocation.disabled = false;
    resetSelect(selectSecondOnlyLocation, "Selecciona un país");
    populateCountries(selectFirstOnlyLocation);

    firstCountryDiv.style.display = "flex";
    secondCountryDiv.style.display = "flex";
    firstCountryByRegionDiv.style.display = "none";
    secondCountryByRegionDiv.style.display = "none";

    locationsSelect.forEach((reset) =>
      resetSelect(reset, "Selecciona un país")
    );
    regionsSelect.forEach((select) => {
      select.disabled = true;
      select.selectedIndex = 0;
    });
    selectFirstRegion.disabled = false;
    selectSecondRegion.disabled = true;
  } else if (searchType.value === "continent") {
    // Habilitar búsqueda por continente
    locationsSelect.forEach((reset) =>
      resetSelect(reset, "Selecciona un país")
    );
    regionsSelect.forEach((select) => {
      select.disabled = false;
      select.selectedIndex = 0;
    });
    firstCountryDiv.style.display = "none";
    secondCountryDiv.style.display = "none";
    firstCountryByRegionDiv.style.display = "flex";
    secondCountryByRegionDiv.style.display = "flex";

    // Asegurarse de que solo el primero esté habilitado inicialmente
    selectFirstRegion.disabled = false;
    selectSecondRegion.disabled = true;
  } else {
    // Deshabilitar todos
    locationsSelect
      .concat(regionsSelect, onlyLocationsSelect)
      .forEach((select) => {
        select.disabled = true;
      });
  }
}

// Muestra u oculta el contenedor de tipo de energía según la opción de estudio
function toggleEnergyType() {
  const studyValue = selectStudyOption.value;
  if (studyValue === "solar" || studyValue === "renewable") {
    divEnergyType.style.display = "none";
    selectEnergyType.value = "";
  } else {
    divEnergyType.style.display = "flex";
  }
}

function toggleYearsDiv(show) {
  divYearStart.style.display = show ? "flex" : "none";
  divYearEnd.style.display = show ? "flex" : "none";
}

// Actualiza el título dinámico basado en la opción de estudio
function actualizarTitulo() {
  h1TitleStudio.textContent =
    selectStudyOption.value || "Completa el formulario";
}

// Función genérica para obtener datos de la API
async function getData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return null;
  }
}

// Función para rellenar regiones
async function fillRegions() {
  resetSelect(selectFirstRegion, "Selecciona una región");
  resetSelect(selectSecondRegion, "Selecciona una región");
  const data = await getData("http://localhost:8080/region");
  if (data) {
    data.forEach((region) => {
      const optionHTML = `<option value="${region.id}">${region.name}</option>`;
      selectFirstRegion.innerHTML += optionHTML;
      selectSecondRegion.innerHTML += optionHTML;
    });
    selectFirstRegion.disabled = false;
  } else {
    console.error("No se pudo obtener los datos de las regiones.");
  }
}

// Actualiza el select de países según la región seleccionada
async function updateCountrySelect(event, locationSelect) {
  const regionId = event.target.value;
  resetSelect(locationSelect, "Selecciona un país");

  if (regionId) {
    const locationsByRegion = await getData(
      `http://localhost:8080/location/region/${regionId}`
    );
    if (locationsByRegion) {
      locationsByRegion.forEach((location) => {
        // Evita duplicar si es la misma selección en el primer select
        if (
          !(
            selectFirstRegion.value === selectSecondRegion.value &&
            parseFloat(selectFirstLocation.value) === location.id
          )
        ) {
          locationSelect.innerHTML += `<option value="${location.id}">${location.name}</option>`;
        }
      });
      locationSelect.disabled = false;
    }
  }
}

// Rellena el select de países para búsqueda por país
async function populateCountries(selectElement) {
  resetSelect(selectElement, "Selecciona un país");
  const countries = await getData("http://localhost:8080/location");
  if (countries) {
    countries.forEach((country) => {
      if (selectFirstOnlyLocation.value !== country.id) {
        selectElement.innerHTML += `<option value="${country.id}">${country.name}</option>`;
      }
    });
    selectElement.disabled = false;
  }
}

// Genera los años disponibles según la opción de estudio y país seleccionado
async function generarAnios() {
  let location1Id = selectFirstLocation.value || selectFirstOnlyLocation.value;
  const studyOption = selectStudyOption.value;
  let url = "";

  yearsGetted = {};
  if (
    ["solar", "renewable", "production", "consumption"].includes(studyOption)
  ) {
    url = `http://localhost:8080/${studyOption}/year/${location1Id}`;
    yearsGetted = await getData(url);
  }

  resetSelect(yearStart, "Selecciona un año");
  if (yearsGetted) {
    yearsGetted.forEach((year) => {
      yearStart.innerHTML += `<option value="${year.year}">${year.year}</option>`;
    });
    yearStart.disabled = false;
  }
  resetSelect(yearEnd, "Selecciona un año");
}

// Actualiza el select de año final basado en el año de inicio seleccionado
function updateYearEnd() {
  const startYear = parseFloat(yearStart.value);
  resetSelect(yearEnd, "Selecciona un año");

  if (startYear && yearsGetted) {
    yearsGetted.forEach((year) => {
      if (year.year >= startYear) {
        yearEnd.innerHTML += `<option value="${year.year}">${year.year}</option>`;
      }
    });
    yearEnd.disabled = false;
  }
}

// Valida el formulario y realiza las consultas
async function enviarFormulario() {
  const infoType = selectStudyOption.value;
  const energyType = selectEnergyType.value;
  const startYear = yearStart.value;
  const endYear = yearEnd.value;
  const firstLocation = selectFirstLocation.value;
  const secondLocation = selectSecondLocation.value;

  queryResult1 = {};
  queryResult2 = {};

  if (infoType && firstLocation && startYear && endYear) {
    dynamicHeading.textContent = `${infoType} - ${energyType}`;
    let url = `http://localhost:8080/${infoType}/compare/${firstLocation}/${startYear}/${endYear}`;
    queryResult1 = await getData(url);
    console.log(queryResult1);

    if (secondLocation) {
      url = `http://localhost:8080/${infoType}/compare/${secondLocation}/${startYear}/${endYear}`;
      queryResult2 = await getData(url);
      console.log(queryResult2);
    }

    inicializarGrafica();
  } else {
    dynamicHeading.textContent = "Completa el formulario";
  }
}

/* ############################## Eventos ############################### */
document.addEventListener("DOMContentLoaded", () => {
  // Eventos principales
  selectStudyOption.addEventListener("change", () => {
    toggleEnergyType();
  });

  yearStart.addEventListener("change", updateYearEnd);

  btnConsultar.addEventListener("click", enviarFormulario);

  // Región y país para búsqueda por continente
  selectFirstRegion.addEventListener("change", (e) => {
    updateCountrySelect(e, selectFirstLocation);
    resetSelect(selectSecondLocation, "Selecciona un país");
    resetSelect(selectSecondRegion, "Selecciona una región", false);
    resetSelect(yearStart, "Selecciona un año");
    resetSelect(yearEnd, "Selecciona un año");
    selectSecondRegion.disabled = true;
    toggleYearsDiv(false);
  });
  selectSecondRegion.addEventListener("change", (e) => {
    updateCountrySelect(e, selectSecondLocation);
  });

  // Actualizar el segundo selector de país en función del primer país seleccionado
  selectFirstLocation.addEventListener("change", () => {
    selectSecondRegion.selectedIndex = 0;
    selectSecondRegion.disabled = !selectFirstLocation.value;
    resetSelect(selectSecondLocation, "Selecciona un país");
    resetSelect(yearStart, "Selecciona un año");
    resetSelect(yearEnd, "Selecciona un año");
    if (selectFirstLocation.value) {
      generarAnios();
      toggleYearsDiv(true);
    } else toggleYearsDiv(false);
  });

  // Evento para cambiar el tipo de búsqueda
  searchType.addEventListener("change", updateSearchTypeUI);

  // Estado inicial de divs
  [
    firstCountryDiv,
    secondCountryDiv,
    firstCountryByRegionDiv,
    secondCountryByRegionDiv,
    divYearStart,
    divYearEnd,
  ].forEach((div) => {
    div.style.display = "none";
  });

  // Cargar regiones inicialmente
  fillRegions();
});

/* ######################################################## Gráfica ###################################### */
// ✅ Inicializar la gráfica con Chart.js
let chartInstance = null; // Variable para almacenar la instancia de la gráfica

function inicializarGrafica() {
  const ctx = document.getElementById("myChart").getContext("2d");

  // Eliminar la gráfica anterior si existe
  if (chartInstance) {
    chartInstance.destroy();
  }

  const years = []; // Lista de años sin Set
  const dataLocation1 = [];
  const dataLocation2 = [];
  let location1 = "";
  let location2 = "";

  const energyMapping = {
    hydro: "hydroData",
    wind: "windData",
    solar: "solarData",
    bio: "bioData",
  };

  const energyKey = energyMapping[selectEnergyType.value]; // Clave de acceso a los datos de energía

  function processData(queryResult, dataLocation, isPrimary) {
    queryResult.forEach((data) => {
      if (isPrimary && !years.includes(data.year)) {
        years.push(data.year); // Solo agregamos años en la primera iteración
      }

      if (!location1) location1 = data.location; // Asignamos la primera ubicación

      if (energyKey && data[energyKey] !== undefined) {
        dataLocation.push(data[energyKey]);
      } else if (data.percent !== undefined) {
        dataLocation.push(data.percent);
      }
    });
  }

  processData(queryResult1, dataLocation1, true);

  if (queryResult2.length > 0) {
    processData(queryResult2, dataLocation2, false);
    location2 = queryResult2[0].location; // Asignamos la ubicación del segundo conjunto de datos
  }

  // Asegurar que ambas listas tengan la misma longitud
  while (dataLocation1.length < years.length) dataLocation1.push(null);
  while (dataLocation2.length < years.length) dataLocation2.push(null);

  console.log("Años:", years);
  console.log("Datos 1:", dataLocation1);
  console.log("Datos 2:", dataLocation2);

  const data = {
    labels: years,
    datasets: [
      {
        label: location1 || "Sin datos",
        data: dataLocation1,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: false,
      },
      {
        label: location2 || "Sin datos",
        data:
          dataLocation2.length > 0
            ? dataLocation2
            : Array(years.length).fill(null),
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        fill: false,
      },
    ],
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
            text: "Valores",
          },
        },
      },
    },
  };

  chartInstance = new Chart(ctx, config); // Guardar la instancia de la gráfica
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
    inicializarGrafica();
  } else if (tabletQuery.matches) {
    inicializarGrafica();
  } else if (miniPcQuery.matches) {
    inicializarGrafica();
  } else {
    inicializarGrafica();
  }
}

const mobileQuery = window.matchMedia("(max-width: 480px)");
const tabletQuery = window.matchMedia(
  "(min-width: 481px) and (max-width: 768px)"
);
const miniPcQuery = window.matchMedia(
  "(min-width: 769px) and (max-width: 1028px)"
);

mobileQuery.addEventListener("change", handleResize);
tabletQuery.addEventListener("change", handleResize);
miniPcQuery.addEventListener("change", handleResize);
