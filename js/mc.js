// Ce code s'assure d'intercepter la soumission du formulaire
document.addEventListener('submit', function(event) {
    if (event.target && event.target.id === 'contactForm') {
        event.preventDefault(); // Empêche le rechargement de la page
        
        // Tu peux récupérer les valeurs ici si besoin
        // const nom = document.getElementById('nom').value;
        
        alert("Merci pour votre message ! (Ceci est une démo, le message n'est pas réellement envoyé sans backend).");
        event.target.reset(); // Vide le formulaire après l'envoi
    }
});