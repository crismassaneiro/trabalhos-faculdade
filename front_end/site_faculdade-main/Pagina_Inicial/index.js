document.addEventListener("DOMContentLoaded", function() {
    var slides = document.querySelectorAll(".slide");
    var currentSlide = 0;
  
    function nextSlide() {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }
  
    setInterval(nextSlide, 3000); // Altera para o próximo slide a cada 3 segundos (3000ms)
  });
  