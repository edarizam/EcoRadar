const indexBtn = document.getElementById("indexBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
const deleteModal = document.getElementById("deleteModal");
const deleteCancelBtn = document.getElementById("deleteCancelBtn");
const deleteConfirmBtn = document.getElementById("deleteConfirmBtn");

/* Funciones auxiliares */
const returnHome = () => {
  localStorage.removeItem("usuario");
  window.location.href = "/";
};

/* Eventos */

indexBtn.addEventListener("click", returnHome);

deleteBtn.addEventListener("click", () =>
  deleteModal.classList.remove("hidden")
);

deleteCancelBtn.addEventListener("click", () =>
  deleteModal.classList.add("hidden")
);

deleteConfirmBtn.addEventListener("click", async () => {
  const currentUser = JSON.parse(localStorage.getItem("usuario"));

  if (!currentUser || !currentUser.id) {
    alert("Error: No se encontró la cuenta del usuario.");
    return;
  }

  try {
    await fetch(`http://localhost:8080/user/delete/${currentUser.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    alert("Cuenta eliminada con éxito, regresando a la página principal");
    returnHome();
  } catch (error) {
    alert("Ha ocurrido un error con el servidor, intente de nuevo más tarde");
  }
});
