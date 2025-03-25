const defaultTitlesEnergyTypes = {
  Hidráulica: "hydro",
  Solar: "solar",
  Eólica: "wind",
  Biomasa: "bio",
};

const energyMapping = {
  Hidráulica: "hydroData",
  Solar: "solarData",
  Eólica: "windData",
  Biomasa: "bioAndOtherData",
};

const traductor = {
  consumption: "consumo",
  production: "producción",
};

let charts = {};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".ordenar").forEach((button) => {
    button.addEventListener("click", function () {
      actualizarDatos(this.dataset.energia, this.dataset.orden);
    });
  });

  async function getData(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return null;
    }
  }

  async function obtenerDatos(energia, tipo, anio, orden) {
    const url = `http://localhost:8080/${tipo}/${defaultTitlesEnergyTypes[energia]}/ranking/${anio}`;
    return await getData(url);
  }

  async function actualizarDatos(
    selecttype,
    selectyear,
    energia,
    orden = "desc"
  ) {
    const tipo = selecttype.value;
    const anio = selectyear.value;
    if (!tipo || !anio) return;

    const data = await obtenerDatos(energia, tipo, anio, orden);
    const energyKey = energyMapping[energia];

    actualizarGrafico(energia, data, energyKey);
    actualizarTabla(selecttype, energia, data, energyKey);
    actualizarTitulos(energia, traductor[tipo], anio, orden);
    manejarPlaceholder(energia, true);
  }

  function actualizarGrafico(energia, data, tipo) {
    const ctx = document.getElementById(`chart${energia}`).getContext("2d");
    if (!ctx) return;

    const labels = data.map((d) => d.location);
    const valores = data.map((d) => d[tipo]);

    if (charts[energia]) {
      charts[energia].destroy();
    }

    charts[energia] = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: tipo.charAt(0).toUpperCase() + tipo.slice(1),
            data: valores,
          },
        ],
      },
    });
  }

  function actualizarTabla(selecttype, energia, data, tipo) {
    const table = document.getElementById(`energyTable-${energia}`);
    const tbody = table.querySelector("tbody");

    if (!tbody) return;

    if (data.length === 0) {
      table.style.display = "none";
      return;
    }

    tbody.innerHTML = data
      .map(
        (d, index) => `
                      <tr>
                          <td>${index + 1}</td>
                          <td>${d.location}</td>
                          <td>${d[tipo].toFixed(2)}</td>
                      </tr>
                      `
      )
      .join("");

    table.style.display = "table";

    document.getElementById(`columna-${energia}`).textContent =
      traductor[selecttype.value][0].toUpperCase() +
      traductor[selecttype.value].substring(1);
  }

  function actualizarTitulos(energia, tipo, anio, orden) {
    const chartTitle = document.getElementById(`chartTitle-${energia}`);
    const tableTitle = document.getElementById(`tableTitle-${energia}`);

    chartTitle.innerText = `Top 10 países con mayor ${tipo} de energía ${energia} en ${anio}`;
    chartTitle.style.display = "block";

    tableTitle.innerText = `Lista completa de países con mayor ${tipo} de energía ${energia} en ${anio}`;
    tableTitle.style.display = "block";
  }

  function manejarPlaceholder(energia, mostrar) {
    const placeholder = document.getElementById(`placeholder-${energia}`);
    placeholder.style.display = mostrar ? "none" : "block";
  }

  // ################################ Hydro ##################
  const selectHydro = [...document.getElementsByClassName("tipoEnergia")].find(
    (select) => select.dataset.energia === "Hidráulica"
  );

  const selectHydroYear = [
    ...document.getElementsByClassName("anioEnergia"),
  ].find((select) => select.dataset.energia === "Hidráulica");

  console.log(selectHydro);
  console.log(selectHydroYear);

  selectHydroYear.disabled = true;

  selectHydro.addEventListener("change", async function () {
    const energytype = selectHydro.value;
    const years =
      (await getData(`http://localhost:8080/${energytype}/year`)) || [];
    years.forEach((year) => {
      let option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      selectHydroYear.appendChild(option);
    });
    selectHydroYear.disabled = false;
  });

  selectHydroYear.addEventListener("change", function () {
    actualizarDatos(selectHydro, selectHydroYear, selectHydro.dataset.energia);
  });

  // ############################### Wind ##############
  const selectWind = [...document.getElementsByClassName("tipoEnergia")].find(
    (select) => select.dataset.energia === "Eólica"
  );

  const selectWindYear = [
    ...document.getElementsByClassName("anioEnergia"),
  ].find((select) => select.dataset.energia === "Eólica");
  selectWindYear.disabled = true;

  selectWind.addEventListener("change", async function () {
    const energytype = selectWind.value;
    const years =
      (await getData(`http://localhost:8080/${energytype}/year`)) || [];
    years.forEach((year) => {
      let option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      selectWindYear.appendChild(option);
    });
    selectWindYear.disabled = false;
  });

  selectWindYear.addEventListener("change", function () {
    actualizarDatos(selectWind, selectWindYear, selectWind.dataset.energia);
  });

  // #################################### solar ########################

  const selectSolar = [...document.getElementsByClassName("tipoEnergia")].find(
    (select) => select.dataset.energia === "Solar"
  );

  const selectSolarYear = [
    ...document.getElementsByClassName("anioEnergia"),
  ].find((select) => select.dataset.energia === "Solar");
  selectSolarYear.disabled = true;

  selectSolar.addEventListener("change", async function () {
    const energytype = selectSolar.value;
    const years =
      (await getData(`http://localhost:8080/${energytype}/year`)) || [];
    years.forEach((year) => {
      let option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      selectSolarYear.appendChild(option);
    });
    selectSolarYear.disabled = false;
  });

  selectSolarYear.addEventListener("change", function () {
    actualizarDatos(selectSolar, selectSolarYear, selectSolar.dataset.energia);
  });

  // ################################# bio ##################################
  const selectBio = [...document.getElementsByClassName("tipoEnergia")].find(
    (select) => select.dataset.energia === "Biomasa"
  );

  const selectBioYear = [
    ...document.getElementsByClassName("anioEnergia"),
  ].find((select) => select.dataset.energia === "Biomasa");
  selectBioYear.disabled = true;

  selectBio.addEventListener("change", async function () {
    const energytype = selectBio.value;
    const years =
      (await getData(`http://localhost:8080/${energytype}/year`)) || [];
    years.forEach((year) => {
      let option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      selectBioYear.appendChild(option);
    });
    selectBioYear.disabled = false;
  });

  selectBioYear.addEventListener("change", function () {
    actualizarDatos(selectBio, selectBioYear, selectBio.dataset.energia);
  });
});
