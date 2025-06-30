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
  }
];

// ✅ LOGIQUE DU HUB PREMIUM
document.addEventListener("DOMContentLoaded", function () {
  const metierGrid = document.getElementById("metierGrid");
  const hubGrid = document.getElementById("hubGrid");
  const backBtn = document.getElementById("backToMetiers");
  const membersData = window.members;

  if (!metierGrid || !hubGrid || !backBtn || !Array.isArray(membersData)) {
    console.warn("⚠️ Composants manquants ou données incorrectes");
    return;
  }

  // Extraire les métiers uniques
  const uniqueMetiers = [...new Set(
    membersData.flatMap(m =>
      Array.isArray(m.metier) ? m.metier : [m.metier]
    )
  )];

  // Créer les boutons de métiers
  uniqueMetiers.forEach((metier, index) => {
    const btn = document.createElement("div");
    btn.className = "metier-btn";
    btn.textContent = metier;
    if (index === 0) btn.id = "firstMetier";
    btn.onclick = () => filterBy(metier);
    metierGrid.appendChild(btn);
  });

  // Afficher les membres filtrés
  function filterBy(metier) {
    const filtered = membersData.filter(m =>
      Array.isArray(m.metier)
        ? m.metier.includes(metier)
        : m.metier === metier
    );

    renderMembers(filtered);
    hubGrid.style.display = "grid";
    hubGrid.classList.add("hub-visible");
  }

  // Générer les cartes membres
  function renderMembers(list) {
    hubGrid.innerHTML = "";
    list.forEach(m => {
      const bloc = document.createElement("div");
      bloc.className = "member-block";
      bloc.innerHTML = `
        <div class="member-photo" style="background-image:url('${m.image}')"></div>
        <div class="member-name">${m.nom}</div>
        <div class="member-role">${m.role}</div>
        <a href="${m.fiche}" class="view-link" target="_blank">Voir la fiche</a>
      `;
      hubGrid.appendChild(bloc);
    });

    if (window.innerWidth <= 768) {
      const y = hubGrid.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y - 20, behavior: "smooth" });
    }
  }

  // Bouton retour
  backBtn.addEventListener("click", function () {
    hubGrid.innerHTML = "";
    hubGrid.style.display = "none";
    hubGrid.classList.remove("hub-visible");

    const y = metierGrid.getBoundingClientRect().top + window.scrollY;
    const offset = window.innerWidth > 768 ? 100 : 30;
    window.scrollTo({ top: y - offset, behavior: "smooth" });
  });
});
