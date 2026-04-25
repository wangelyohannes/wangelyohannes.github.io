document.addEventListener("DOMContentLoaded", function () {
  var slides = document.querySelectorAll(".hero-slide");
  var currentIndex = 0;
  var filterButtons = document.querySelectorAll(".filter-button");
  var recommendationCards = document.querySelectorAll(".recommendation-card");

  if (slides.length) {
    window.setInterval(function () {
      slides[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add("active");
    }, 5000);
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filterValue = button.getAttribute("data-filter");

      filterButtons.forEach(function (btn) {
        btn.classList.remove("active-filter");
      });

      button.classList.add("active-filter");

      recommendationCards.forEach(function (card) {
        if (filterValue === "all" || card.classList.contains(filterValue)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  if (window.jQuery && jQuery("#genre-accordion").length) {
    jQuery("#genre-accordion").accordion();
  }
});
