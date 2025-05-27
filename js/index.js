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
const openBtn = document.getElementById("nav-icon1");

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
    sidenav.classList.remove("active");
    openBtn.classList.remove("open"); // Retire la classe lorsque le menu est fermé
}
$(document).ready(function(){
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
	});
});