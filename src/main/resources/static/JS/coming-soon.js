const indexBtn = document.getElementById("indexBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
const deleteModal = document.getElementById("deleteModal");
const deleteCancelBtn = document.getElementById("deleteCancelBtn");
const deleteConfirmBtn = document.getElementById("deleteConfirmBtn");
const updateModal = document.getElementById("updateModal");
const updateCancelBtn = document.getElementById("updateCancelBtn");
const updateConfirmBtn = document.getElementById("updateConfirmBtn");
const updateInputFullName = document.getElementById("fullName");
const updateInputEmail = document.getElementById("email");
const updateInputUsername = document.getElementById("username");
const updateInputPassword = document.getElementById("password");

/* Funciones auxiliares */
const returnHome = () => {
  localStorage.removeItem("usuario");
  window.location.href = "/";
};

async function getData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Indica que no se encontró el usuario (lo usamos para validaciones)
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error; // Relanza el error para ser manejado en el formulario
  }
}

/* Eventos */

// Index
indexBtn.addEventListener("click", returnHome);

// Delete
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

// Update
updateBtn.addEventListener("click", () => {
  const currentUser = JSON.parse(localStorage.getItem("usuario"));

  updateInputFullName.value = currentUser.fullName;
  updateInputEmail.value = currentUser.email;
  updateInputUsername.value = currentUser.username;
  updateInputPassword.value = currentUser.password;

  updateModal.classList.remove("hidden");
});

updateCancelBtn.addEventListener("click", () => {
  updateModal.classList.add("hidden");
});

updateConfirmBtn.addEventListener("click", async function () {
  const currentUser = JSON.parse(localStorage.getItem("usuario"));

  const userFullName = updateInputFullName.value.trim();
  const email = updateInputEmail.value.trim();
  const username = updateInputUsername.value.trim();
  const password = updateInputPassword.value.trim();

  if (!userFullName) {
    alert("El nombre es obligatorio");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Correo inválido");
    return;
  }

  if (password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres");
    return;
  }

  try {
    // Validar si el correo ya está en uso
    const emailExists = await getData(
      `http://localhost:8080/user/email/${email}`
    );
    if (emailExists && emailExists.id !== currentUser.id) {
      alert("El correo ingresado ya está asociado a otra cuenta");
      return;
    }

    // Validar si el nombre de usuario ya está en uso
    const usernameExists = await getData(
      `http://localhost:8080/user/username/${username}`
    );
    if (usernameExists && usernameExists.username !== currentUser.username) {
      alert("El nombre de usuario ya está en uso");
      return;
    }

    // Crear el objeto user
    const user = {
      fullName: userFullName,
      username: username,
      password: password,
      email: email,
    };

    // Enviar datos al servidor
    const response = await fetch(
      `http://localhost:8080/user/update/${currentUser.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    if (!response.ok) {
      alert(`Error al registrar usuario. Código: ${response.status}`);
      return;
    }

    const data = await response.json();
    console.log("Usuario actualizado correctamente:", data);
    alert("Actualización exitosa");

    localStorage.setItem("usuario", JSON.stringify(data)); // Guarda el usuario en localStorage
    updateModal.classList.add("hidden");
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error al registrar el usuario. Inténtalo más tarde.");
  }
});
