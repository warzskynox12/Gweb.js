document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageDemandee = urlParams.get('page');

    if (pageDemandee) {
        loadPage(pageDemandee);
    } else {
        loadPage('main');
    }
});

function loadPage(pageName) {
    const cheminFichier = `./html/${pageName}.html`;

    fetch(cheminFichier)
        .then(response => {
            if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
            closeNav(); 
            
            // Mise à jour de l'URL
            window.history.pushState({ page: pageName }, "", `?page=${pageName}`);

            // --- NOUVEAU : Initialisation de Forminit si on est sur la page contact ---
            if (pageName === 'mc') {
                initForminit();
            }
        })
        .catch(error => console.error('Erreur de chargement de la page :', error));
}

// Fonction spécifique pour activer Forminit
async function initForminit() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    // On s'assure que le SDK est chargé (il doit être dans ton index.html)
    if (typeof Forminit === 'undefined') {
        console.error("Le SDK Forminit est manquant dans index.html");
        return;
    }

    const forminit = new Forminit();
    const FORM_ID = "myjd8vfr9aq"; // Ton ID personnel

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const result = document.getElementById("result-mc");
        if(result) result.textContent = "Envoi en cours...";

        const formData = new FormData(e.target);
        const { data, error } = await forminit.submit(FORM_ID, formData);

        if (result) {
            if (error) {
                result.textContent = "Erreur : " + error.message;
                result.style.color = "#FF0000";
                return;
            }
            result.textContent = "Message envoyé avec succès !";
            result.style.color = "#008000"; // Vert pour le succès
        }
        
        e.target.reset();
    });
}

window.addEventListener('popstate', (event) => {
    const pagePrecedente = event.state ? event.state.page : 'main';
    fetch(`./html/${pagePrecedente}.html`)
        .then(res => res.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            closeNav();
            // On relance l'init si on revient sur 'mc' via les flèches du navigateur
            if (pagePrecedente === 'mc') initForminit();
        });
});

// --- TON CODE POUR LE MENU ---

const sidenav = document.getElementById("mySidenav");
const openBtn = document.getElementById("nav-icon1");
const closeBtn = document.getElementById("closeBtn"); 

if (openBtn) {
    openBtn.addEventListener('click', () => {
        sidenav.classList.toggle("active");
        openBtn.classList.toggle("open");
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        sidenav.classList.remove("active");
        openBtn.classList.remove("open");
    });
}

function closeNav() {
    if (sidenav) sidenav.classList.remove("active");
    if (openBtn) openBtn.classList.remove("open");
}

$(document).ready(function(){
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
        $(this).toggleClass('open');
    });
});