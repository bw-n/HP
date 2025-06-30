// DONNÉES DES MEMBRES
window.members = [
  // (tes 20 membres ici, comme tu l'as déjà écrit)
];

// Logique du Hub
document.addEventListener("DOMContentLoaded", function() {
  const membersData = window.members;

  const allMetiers = membersData.flatMap(m =>
    Array.isArray(m.metier) ? m.metier : [m.metier]
  );
  const uniqueFilters = [...new Set(allMetiers)].sort();

  const filtersDiv = document.getElementById("filters");
  const memberGrid = document.getElementById("member-grid");
  const backButton = document.getElementById("backButton");

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

  function showAll() {
    renderMembers(membersData);
    filtersDiv.style.display = "flex";
    backButton.style.display = "none";

    const y = filtersDiv.getBoundingClientRect().top + window.scrollY;
    const offset = window.innerWidth > 768 ? 100 : 20;
    window.scrollTo({ top: y - offset, behavior: "smooth" });
  }

  function filterBy(metier) {
    const filtered = membersData.filter(m =>
      Array.isArray(m.metier) ? m.metier.includes(metier) : m.metier === metier
    );
    renderMembers(filtered);
    filtersDiv.style.display = "none";
    backButton.style.display = "block";
  }

  uniqueFilters.forEach(metier => {
    const btn = document.createElement("button");
    btn.textContent = metier;
    btn.onclick = () => filterBy(metier);
    filtersDiv.appendChild(btn);
  });

  backButton.addEventListener("click", showAll);

  console.log("✅ script-V2.js chargé avec", window.members.length, "membres");
});
