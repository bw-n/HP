// ✅ DONNÉES DES MEMBRES
window.members = [
  {
    nom: "Blaze Aurélien",
    role: "Smart Contract Dev",
    metier: "Blockchain & Smart Contract",
    image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
    fiche: "blaze.html"
  },
  {
    nom: "Sarah Green",
    role: "UX Designer",
    metier: "UX / UI Design",
    image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
    fiche: "sarah.html"
  },
  {
    nom: "Michael Johnson",
    role: "Cybersecurity Specialist",
    metier: "Cybersécurité",
    image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
    fiche: "michael.html"
  },
  // (... les autres membres — garde ton tableau tel quel ici)
];

// ✅ LOGIQUE DU HUB
document.addEventListener("DOMContentLoaded", function () {
  const membersData = window.members;
  const filtersDiv = document.getElementById("filters");
  const memberGrid = document.getElementById("member-grid");
  const backButton = document.getElementById("backButton");

  // Cacher la grille au départ
  memberGrid.style.display = "none";
  backButton.style.display = "none";

  // Extraire les métiers uniques
  const allMetiers = membersData.flatMap(m =>
    Array.isArray(m.metier) ? m.metier : [m.metier]
  );
  const uniqueFilters = [...new Set(allMetiers)].sort();

  // Création des boutons métiers
  uniqueFilters.forEach(metier => {
    const btn = document.createElement("button");
    btn.textContent = metier;
    btn.onclick = () => filterBy(metier);
    filtersDiv.appendChild(btn);
  });

  // Affiche les membres filtrés
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

  // Affiche tous les membres (retour)
  function showAll() {
    memberGrid.innerHTML = "";
    filtersDiv.style.display = "flex";
    memberGrid.style.display = "none";
    backButton.style.display = "none";

    // Scroll vers les filtres
    const y = filtersDiv.getBoundingClientRect().top + window.scrollY;
    const offset = window.innerWidth > 768 ? 100 : 20;
    window.scrollTo({ top: y - offset, behavior: "smooth" });
  }

  backButton.addEventListener("click", showAll);

  // Injection des fiches
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

    if (window.innerWidth <= 768) {
      const y = memberGrid.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y - 20, behavior: "smooth" });
    }
  }
});
