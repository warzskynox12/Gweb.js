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
  var sidenav = document.getElementById("mySidenav");
  var openBtn = document.getElementById("openBtn");
  var closeBtn = document.getElementById("closeBtn");
  
  openBtn.onclick = openNav;
  closeBtn.onclick = closeNav;
  
  function openNav() {
    sidenav.classList.add("active");
    sidenav.classList.remove("close-nav");
  }
  
  function closeNav() {
    sidenav.classList.remove("active");
    sidenav.classList.add("close-nav");
  }  