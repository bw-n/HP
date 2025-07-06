document.addEventListener("DOMContentLoaded", function () {
  const filtersDiv = document.getElementById("filters");
  const memberGrid = document.getElementById("member-grid");
  const backButton = document.getElementById("backButton");

  if (!filtersDiv || !memberGrid || !backButton) {
    console.warn("Certains éléments HTML manquent : vérifie l'existence des IDs filters, member-grid et backButton.");
    return;
  }

  // Charger les membres depuis un fichier JSON externe
  fetch("members.json")
    .then(response => response.json())
    .then(membersData => {
      const allMetiers = membersData.flatMap(m =>
        Array.isArray(m.metier) ? m.metier : [m.metier]
      );
      const uniqueFilters = [...new Set(allMetiers)].sort();

      function renderMembers(list) {
        memberGrid.innerHTML = "";
        if (list.length === 0) {
          memberGrid.innerHTML = "<p>Aucun membre trouvé.</p>";
          return;
        }
        list.forEach(m => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <img src="${m.image}" alt="Photo de ${m.nom}">
            <div class="nom">${m.nom}</div>
            <div class="role">${m.role}</div>
            <a href="${m.fiche}" target="_blank" rel="noopener noreferrer">Voir la fiche</a>
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
      showAll();

      console.log("✅ script.js chargé avec", membersData.length, "membres");
    })
    .catch(error => {
      console.error("❌ Erreur lors du chargement des membres :", error);
    });
});
