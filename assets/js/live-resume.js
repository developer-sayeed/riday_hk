$('[data-toggle="collapsible-nav"]').on("click", function (e) {
  var target = $(this).data("target");
  $("#" + target).toggleClass("show");
});

$(document).ready(function () {
  if (window.innerWidth >= 992) {
    $("#collapsible-nav").addClass("show"); //Show navigation menu in bigger screens by default.
  } else {
    $("#collapsible-nav").removeClass("show");
  }

  if ($(".hover-box").length) {
    setHoverBoxPerspective();
  }
});

$(window).resize(function () {
  if ($(".hover-box").length) {
    setHoverBoxPerspective();
  }
});

function setHoverBoxPerspective() {
  $(".hover-box").css({
    perspective: function () {
      return Math.max($(this).width(), $(this).height()) * 2 + 50;
    },
  });
}

var classNames = [
  "in-up",
  "in-right",
  "in-down",
  "in-left",
  "out-up",
  "out-right",
  "out-down",
  "out-left",
]; // Animation classes.

$(".hover-box").hover(
  function (event) {
    var direction = "up";
    if (jQuery.fn.entry) {
      //Check if entry js file is loaded.
      direction = $(this).entry({ e: event }); // Get mouse in direction.
    }

    $(this).removeClass(classNames.join(" ")); // Remove existing animation classes.
    $(this).addClass("in-" + direction); //Add mouse in animation
  },

  function (event) {
    var direction = "up";
    if (jQuery.fn.entry) {
      direction = $(this).entry({ e: event }); // Get mouse out direction.
    }

    $(this).removeClass(classNames.join(" "));
    $(this).addClass("out-" + direction); //Add mouse out animation
  }
);

// Slider JS

let currentIndex = 0;
let autoPlayInterval;

// Function to show the current slide based on the index
function showSlide(index) {
  const slides = document.querySelector(".slides");
  const totalSlides = slides.children.length;

  // Wrap the index if it exceeds the slide range
  if (index >= totalSlides) currentIndex = 0;
  if (index < 0) currentIndex = totalSlides - 1;

  // Update the transform to show the appropriate slide
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Function to go to the next slide
function nextSlide() {
  currentIndex++;
  showSlide(currentIndex);
}

// Function to go to the previous slide
function prevSlide() {
  currentIndex--;
  showSlide(currentIndex);
}

// Auto-play functionality
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 3 seconds
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Initialize the slider and start auto-play
showSlide(currentIndex);
startAutoPlay();

// Optional: Restart auto-play on button click
document.querySelector(".next").addEventListener("click", () => {
  nextSlide();
  stopAutoPlay();
  startAutoPlay();
});

document.querySelector(".prev").addEventListener("click", () => {
  prevSlide();
  stopAutoPlay();
  startAutoPlay();
});

// Open image in fullscreen with download option
function openFullscreen(image) {
  const modal = document.getElementById("fullscreenModal");
  const fullscreenImage = document.getElementById("fullscreenImage");
  const downloadBtn = document.getElementById("downloadBtn");

  fullscreenImage.src = image.src;
  downloadBtn.href = image.src;

  modal.style.display = "flex";
}

// Close fullscreen modal
function closeFullscreen() {
  const modal = document.getElementById("fullscreenModal");
  modal.style.display = "none";
}
