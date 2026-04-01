document.addEventListener('DOMContentLoaded', () => {
    // 1. On regarde s'il y a un paramètre "?page=" dans l'URL (ex: ?page=mc)
    const urlParams = new URLSearchParams(window.location.search);
    const pageDemandee = urlParams.get('page');

    // 2. Si un paramètre existe on charge cette page, sinon on charge 'main' par défaut
    if (pageDemandee) {
        loadPage(pageDemandee);
    } else {
        loadPage('main');
    }
});

function loadPage(pageName) {
    // 3. On reconstruit le chemin complet vers ton fichier HTML
    const cheminFichier = `./html/${pageName}.html`;

    fetch(cheminFichier)
        .then(response => {
            if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
            return response.text();
        })
        .then(html => {
            // On injecte le HTML dans la page
            document.getElementById('content').innerHTML = html;
            closeNav(); // Ferme le menu après le chargement
            
            // 4. On met à jour l'URL sans recharger la page
            window.history.pushState({ page: pageName }, "", `?page=${pageName}`);
        })
        .catch(error => console.error('Erreur de chargement de la page :', error));
}

// 5. Gestion du bouton "Précédent" / "Suivant" du navigateur
window.addEventListener('popstate', (event) => {
    const pagePrecedente = event.state ? event.state.page : 'main';
    fetch(`./html/${pagePrecedente}.html`)
        .then(res => res.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            closeNav();
        });
});

// ==========================================
// --- TON CODE POUR LE MENU (INCHANGÉ) ---
// ==========================================

const sidenav = document.getElementById("mySidenav");
const openBtn = document.getElementById("nav-icon1");
// Sécurité : je déclare closeBtn au cas où pour éviter une erreur JavaScript si l'ID n'existe pas
const closeBtn = document.getElementById("closeBtn"); 

if (openBtn) {
    openBtn.addEventListener('click', () => {
        // Utilise toggle pour basculer entre ouvrir et fermer
        sidenav.classList.toggle("active");
        openBtn.classList.toggle("open"); // Ajoute ou retire la classe "open"
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        sidenav.classList.remove("active");
        openBtn.classList.remove("open"); // Retire la classe lorsque le menu est fermé
    });
}

function closeNav() {
    if (sidenav) sidenav.classList.remove("active");
    if (openBtn) openBtn.classList.remove("open"); // Retire la classe lorsque le menu est fermé
}

// Code jQuery pour l'animation de l'icône burger
$(document).ready(function(){
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
        $(this).toggleClass('open');
    });
});