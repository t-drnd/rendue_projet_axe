const username = document.getElementById("username");

const fetchuser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "./index.html";
    return;
  }

  const response = await fetch("http://localhost:3000/getMyProfile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401 || response.status === 403) {
    window.location.href = "./index.html";
  }

  const data = await response.json();

  username.innerHTML = data.name;
};

fetchuser();

document.addEventListener("DOMContentLoaded", function () {
  async function fetchCards() {
    const url = "https://hp-api.lainocs.fr/characters";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async function initSlider() {
    const cards = await fetchCards();
    const slider = $("#slider");

    cards.forEach((card) => {
      const slide = $("<div class='card'>");
      slide.append(`<img src="${card.image}" alt="${card.name}"/>`);
      slide.append(`<h2>${card.name}</h2>`);
      slide.append(`<p>${card.house}</p>`);

      // Créer un élément de lien pour les détails et l'ajouter à la slide
      const detailsLink = $(
        `<a class='card-details-link' href='details.html?id=${card.slug}'>Détails</a>`
      );
      slide.append(detailsLink);

      slider.append(slide);
    });
  }

  initSlider();
});

const btnUp = document.querySelector(".btnUp");

btnUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

const menu = document.querySelector(".menu");

toggleBtn.onclick = function () {
  menu.classList.toggle("open");
  const isOpen = menu.classList.contains("open");

  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};
