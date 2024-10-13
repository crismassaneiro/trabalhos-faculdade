document.addEventListener('DOMContentLoaded', function() {
    var headerUrl;
    var isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');

    // Define o caminho correto para o header
    if (isRoot) {
        headerUrl = 'html/header.html'; // Caminho para o header no index.html na raiz
    } else {
        headerUrl = '../html/header.html'; // Caminho para páginas dentro da subpasta html
    }

    var headerElement = document.querySelector('header-placeholder');

    fetch(headerUrl)
        .then(response => response.text())
        .then(data => {
            headerElement.innerHTML = data;

            // Após carregar o cabeçalho, ajustar os links do menu
            var logoLink = headerElement.querySelector('a[href="index.html"]');
            var treineLink = headerElement.querySelector('a[href="treine.html"]');
            var sobreLink = headerElement.querySelector('a[href="sobre.html"]');
            var contatoLink = headerElement.querySelector('a[href="contato.html"]');
            var logoImage = headerElement.querySelector('.logo img'); // Seleciona a imagem do logo

            // Ajusta links de acordo com a localização (raiz ou subpasta)
            if (isRoot) {
                // Se estivermos na raiz, ajustar os links para a pasta html
                treineLink.setAttribute('href', 'html/treine.html');
                sobreLink.setAttribute('href', 'html/sobre.html');
                contatoLink.setAttribute('href', 'html/contato.html');
                logoLink.setAttribute('href', 'index.html'); // Logo aponta para o index na raiz

                // Ajustar o caminho da imagem do logo para a raiz
                logoImage.setAttribute('src', './imgs/header/logo_clouds.png');
            } else {
                // Se estivermos dentro da subpasta 'html', ajustar os links relativos
                treineLink.setAttribute('href', '../html/treine.html');
                sobreLink.setAttribute('href', '../html/sobre.html');
                contatoLink.setAttribute('href', '../html/contato.html');
                logoLink.setAttribute('href', '../index.html'); // Logo aponta para o index na raiz

                // Ajustar o caminho da imagem do logo para a subpasta
                logoImage.setAttribute('src', '../imgs/header/logo_clouds.png');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o cabeçalho:', error);
        });
});
