// Script para destacar a página ativa no menu
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('header nav ul li a');

  navLinks.forEach(link => {
    // Obtemos o caminho relativo do href do link e o normalizamos para comparação
    const linkPath = new URL(link.getAttribute('href'), window.location.origin).pathname;
    
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
});

// Script para menu "hambúrguer" em dispositivos móveis
document.addEventListener('DOMContentLoaded', function() {
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navMenu = document.querySelector('header nav ul');

if (mobileMenuButton && navMenu) {
  mobileMenuButton.addEventListener('click', function() {
    navMenu.classList.toggle('show');
  });
}
});
