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

const inputFullName = document.getElementById("fullName");
const inputEmail = document.getElementById("email");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const form = document.getElementById("userForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Evita el envío predeterminado

  const userFullName = inputFullName.value.trim();
  const email = inputEmail.value.trim();
  const username = inputUsername.value.trim();
  const password = inputPassword.value.trim();

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
    if (emailExists) {
      alert("El correo ingresado ya está asociado a otra cuenta");
      return;
    }

    // Validar si el nombre de usuario ya está en uso
    const usernameExists = await getData(
      `http://localhost:8080/user/username/${username}`
    );
    if (usernameExists) {
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
    const response = await fetch("http://localhost:8080/user/   ", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      alert(`Error al registrar usuario. Código: ${response.status}`);
      return;
    }

    const data = await response.json();
    console.log("Usuario registrado correctamente:", data);
    alert("Registro exitoso");

    // Limpiar el formulario
    form.reset();
    localStorage.setItem("usuario", JSON.stringify(data)); // Guarda el usuario en localStorage
    window.location.href = "/coming-soon";
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error al registrar el usuario. Inténtalo más tarde.");
  }
});
