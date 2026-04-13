document.addEventListener("DOMContentLoaded", function () {
  var slides = document.querySelectorAll(".hero-slide");
  var currentIndex = 0;

  if (!slides.length) {
    return;
  }

  window.setInterval(function () {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  }, 5000);
});
