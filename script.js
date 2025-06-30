// ✅ DONNÉES DES MEMBRES
window.members = [
  {
    nom: "Blaze Aurélien",
    role: "Smart Contract Dev",
    metier: "Blockchain & Smart Contract",
    image: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg",
    fiche: "blaze.html"
  },
  {
    nom: "Sarah Green",
    role: "UX Designer",
    metier: "UX / UI Design",
    image: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg",
    fiche: "sarah.html"
  },
  {
    nom: "Michael Johnson",
    role: "Cybersecurity Specialist",
    metier: "Cybersécurité",
    image: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg",
    fiche: "michael.html"
  },
  // ... complète avec le reste de tes membres ici
];

// ✅ LOGIQUE DU HUB PREMIUM
document.addEventListener("DOMContentLoaded", function () {
  const membersData = window.members;
  const filtersDiv = document.getElementById("filters");
  const memberGrid = document.getElementById("member-grid");
  const backButton = document.getElementById("backButton");

  // Cacher les zones au départ
  memberGrid.style.display = "none";
  backButton.style.display = "none";

  // Extraire les métiers uniques
  const allMetiers = membersData.flatMap(m =>
    Array.isArray(m.metier) ? m.metier : [m.metier]
  );
  const uniqueFilters = [...new Set(allMetiers)].sort();

  // Générer les boutons métiers
  uniqueFilters.forEach(metier => {
    const btn = document.createElement("button");
    btn.textContent = metier;
    btn.onclick = () => {
      document.querySelectorAll("#filters button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterBy(metier);
    };
    filtersDiv.appendChild(btn);
  });

  // Affiche les membres d’un métier
  function filterBy(metier) {
    const filtered = membersData.filter(m =>
      Array.isArray(m.metier)
        ? m.metier.includes(metier)
        : m.metier === metier
    );

    renderMembers(filtered);
    filtersDiv.style.display = "none";
    memberGrid.style.display = "grid";
    backButton.style.display = "block";
  }

  // Bouton retour aux métiers
  backButton.addEventListener("click", showAll);

  function showAll() {
    memberGrid.innerHTML = "";
    filtersDiv.style.display = "flex";
    memberGrid.style.display = "none";
    backButton.style.display = "none";

    document.querySelectorAll("#filters button").forEach(b => b.classList.remove("active"));

    const y = filtersDiv.getBoundingClientRect().top + window.scrollY;
    const offset = window.innerWidth > 768 ? 100 : 20;
    window.scrollTo({ top: y - offset, behavior: "smooth" });
  }

  // Injection HTML des fiches membres
  function renderMembers(list) {
    memberGrid.innerHTML = "";
    list.forEach(m => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${m.image}" alt="${m.nom}">
        <div class="nom">${m.nom}</div>
        <div class="role">${m.role}</div>
        <a href="${m.fiche}" target="_blank">Voir la fiche</a>
      `;
      memberGrid.appendChild(card);
    });

    // Scroll sur mobile vers la grille
    if (window.innerWidth <= 768) {
      const y = memberGrid.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y - 20, behavior: "smooth" });
    }
  }
});
