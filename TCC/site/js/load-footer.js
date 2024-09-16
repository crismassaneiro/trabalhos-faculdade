document.addEventListener('DOMContentLoaded', function() {
    var footerUrl = '../html/footer.html';
    var footerElement = document.querySelector('footer-placeholder');

    fetch(footerUrl)
        .then(response => response.text())
        .then(data => {
            footerElement.innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar o rodapé:', error);
        });
});
