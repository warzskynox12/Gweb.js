document.addEventListener('DOMContentLoaded', () => {
    loadPage('./html/main.html'); // Charge la page principale au démarrage
});

function loadPage(pageName) {
    fetch(pageName)
        .then(response => {
            if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
            closeNav(); // Ferme le menu après le chargement
        })
        .catch(error => console.error('Erreur de chargement de la page :', error));
}

const sidenav = document.getElementById("mySidenav");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.addEventListener('click', () => sidenav.classList.add("active"));
closeBtn.addEventListener('click', () => sidenav.classList.remove("active"));

function closeNav() {
    sidenav.classList.remove("active");
}