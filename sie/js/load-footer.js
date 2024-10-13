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

            // Após carregar o rodapé, ajustar os links e a imagem
            var treineLink = footerElement.querySelector('a[href="treine.html"]');
            var sobreLink = footerElement.querySelector('a[href="sobre.html"]');
            var contatoLink = footerElement.querySelector('a[href="contato.html"]');
            var footerLogo = footerElement.querySelector('.footer-logo-img');

            // Ajusta links e o caminho da imagem de acordo com a localização (raiz ou subpasta)
            if (isRoot) {
                // Se estivermos na página index, ajustar links para a subpasta
                treineLink.setAttribute('href', 'html/treine.html');
                sobreLink.setAttribute('href', 'html/sobre.html');
                contatoLink.setAttribute('href', 'html/contato.html');
                footerLogo.setAttribute('src', './imgs/footer/logo_clouds_branco.png'); // Ajusta o caminho da logo
            } else {
                // Se estivermos dentro da subpasta 'html', ajustar links e imagem para a raiz
                treineLink.setAttribute('href', '../treine.html');
                sobreLink.setAttribute('href', '../sobre.html');
                contatoLink.setAttribute('href', '../contato.html');
                footerLogo.setAttribute('src', '../imgs/footer/logo_clouds_branco.png'); // Ajusta o caminho da logo
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o rodapé:', error);
        });
});
