document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.carrossel-control-prev');
    const nextButton = document.querySelector('.carrossel-control-next');
    const slides = document.querySelectorAll('.carrossel-slide');
    const indicators = document.querySelectorAll('.carrossel-indicators button');
    let currentIndex = 0;

    function showSlide(index) {
        const totalSlides = slides.length;
        // Garantir que o índice esteja dentro dos limites
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }

        // Mover o carrossel para o slide correto
        document.querySelector('.carrossel-slides').style.transform = `translateX(-${currentIndex * 100}%)`;

        // Atualizar indicadores
        indicators.forEach((indicator, idx) => {
            indicator.classList.toggle('active', idx === currentIndex);
        });
    }

    function showNextSlide() {
        showSlide(currentIndex + 1);
    }

    function showPrevSlide() {
        showSlide(currentIndex - 1);
    }

    prevButton.addEventListener('click', showPrevSlide);
    nextButton.addEventListener('click', showNextSlide);

    indicators.forEach((indicator, idx) => {
        indicator.addEventListener('click', () => showSlide(idx));
    });

    // Inicializar o carrossel
    showSlide(currentIndex);
});
