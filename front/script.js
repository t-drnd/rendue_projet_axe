const formulaire = document.getElementById("formulaire");
const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnlink = document.querySelector(".btnLogin");
const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const menu = document.querySelector(".menu");

toggleBtn.onclick = function () {
  menu.classList.toggle("open");
  const isOpen = menu.classList.contains("open");

  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

btnlink.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

formulaire.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  const token = data.token;

  localStorage.setItem("token", token);

  window.location.href = "./profile.html";
});

// const registerform = document.getElementById("registerform");

// registerform.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   try {
//     const response = await fetch("http://localhost:3000/register", {
//       method: "POST",
//       body: JSON.stringify({ name, email, password }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       alert("Inscription réussie !");
//       window.location.href = "./index.html"; // Rediriger vers la page de connexion après l'inscription
//     } else {
//       const errorMessage = await response.text();
//       alert(`Erreur lors de l'inscription : ${errorMessage}`);
//     }
//   } catch (error) {
//     console.error("Erreur lors de la requête d'inscription :", error);
//     alert(
//       "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."
//     );
//   }
// });
