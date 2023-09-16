function loadPage(pageName) {
    fetch(pageName)
      .then(response => response.text())
      .then(html => {
        document.getElementById('content').innerHTML = html;
        closeNav();
      })
      .catch(error => {
        console.error('Erreur de chargement de la page :', error);
      });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    loadPage('/html/main');
  });