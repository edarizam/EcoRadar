window.onload = function () {
  history.pushState(null, "", location.href);
  window.onpopstate = function () {
    history.pushState(null, "", location.href);
  };
};

window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
  localStorage.removeItem("usuario");
});

document.addEventListener("contextmenu", (event) => event.preventDefault());

document.addEventListener("keydown", (event) => {
  if (event.key === "F12" || (event.ctrlKey && event.key === "u")) {
    event.preventDefault();
  }
});

const indexBtn = document.getElementById("indexBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

indexBtn.addEventListener("click", () => {
  localStorage.removeItem("usuario");
  window.location.href = "/";
});
