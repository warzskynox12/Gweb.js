// Cette fonction sera appelée pour initialiser le formulaire
function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const forminit = new Forminit();
    const FORM_ID = "myjd8vfr9aq"; // Ton ID Forminit

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const result = document.getElementById("result-mc");
        result.textContent = "Envoi en cours...";

        const formData = new FormData(e.target);
        const { data, error } = await forminit.submit(FORM_ID, formData);

        if (error) {
            result.textContent = "Erreur : " + error.message;
            result.style.color = "red";
            return;
        }

        result.textContent = "Message envoyé avec succès !";
        result.style.color = "green";
        e.target.reset();
    });
}