document.addEventListener('DOMContentLoaded', function() {
    var footerUrl;
    var isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');

    // Define o caminho correto para o footer
    if (isRoot) {
        footerUrl = 'html/footer.html'; // Caminho para o footer no index.html na raiz
    } else {
        footerUrl = '../html/footer.html'; // Caminho para páginas dentro da subpasta html
    }

    var footerElement = document.querySelector('footer-placeholder');

    fetch(footerUrl)
        .then(response => response.text())
        .then(data => {
            footerElement.innerHTML = data;

            // Após carregar o rodapé, ajustar os caminhos das imagens
            var footerLogos = footerElement.querySelectorAll('.footer-logo-img');

            // Ajusta o caminho das imagens de acordo com a localização (raiz ou subpasta)
            footerLogos.forEach(function(logo) {
                if (isRoot) {
                    logo.setAttribute('src', './imgs/footer/logo_clouds_branco.png'); // Ajusta o caminho da logo na raiz
                } else {
                    logo.setAttribute('src', '../imgs/footer/logo_clouds_branco.png'); // Ajusta o caminho da logo na subpasta
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar o rodapé:', error);
        });
});
