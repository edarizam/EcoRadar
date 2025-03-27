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

const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", async () => {
  const username = inputUsername.value.trim();
  const password = inputPassword.value.trim();

  if (!username) {
    alert("El nombre de usuario es obligatorio");
    return;
  }

  try {
    // Validar nombre de usuario
    const user = await getData(
      `http://localhost:8080/user/username/${username}`
    );

    if (!user || user.password !== password) {
      alert("El nombre de usuario o contraseña es incorrecto");
      return;
    }

    // Si las credenciales son correctas:
    inputUsername.placeholder = "👤 Nombre de Usuario";
    inputPassword.placeholder = "🔒 Contraseña";
    localStorage.setItem("usuario", JSON.stringify(user)); // Guarda el usuario en localStorage
    window.location.href = "/coming-soon";
  } catch (error) {
    alert("Ha ocurrido un error con el servidor, por favor intente más tarde");
    return;
  }
});
