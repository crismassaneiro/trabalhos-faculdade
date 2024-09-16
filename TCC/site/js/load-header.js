document.addEventListener('DOMContentLoaded', function() {
    var headerUrl = '../html/header.html';
    var headerElement = document.querySelector('header-placeholder');

    fetch(headerUrl)
        .then(response => response.text())
        .then(data => {
            headerElement.innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar o cabeçalho:', error);
        });
});
