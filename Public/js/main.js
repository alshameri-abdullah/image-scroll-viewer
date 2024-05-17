// Variables //

const imageContainer = document.querySelector(".images");
const images = document.querySelectorAll(".image");
const firstImage = images[0];
const lastImage = images[images.length - 1];
let currentImage;
let nextImage;
let prevImage;
let scrollTimeout;

// Functions //

function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.bottom >= window.innerHeight / 2 && rect.top < window.innerHeight / 2
  );
}

function getElementInViewport() {
  images.forEach((image) => {
    if (isElementInViewport(image) === true) {
      currentImage = image;
      nextImage = image.nextElementSibling;
      prevImage = image.previousElementSibling;
      return;
    }
  });
}

function goToNextImage() {
  if (nextImage === null) {
    return;
  } else {
    nextImage.scrollIntoView();
  }
}

function goToPrevImage() {
  if (prevImage === null) {
    return;
  } else {
    prevImage.scrollIntoView();
  }
}

function scrollToImage(image) {
  image.scrollIntoView();
}

function fitImages() {
  images.forEach((image) => {
    image.className = "image image-fit";
  });
  scrollToImage(currentImage);
}

function fillImages() {
  images.forEach((image) => {
    image.className = "image image-fill";
  });
  scrollToImage(currentImage);
}

function changeFit() {
  if (images[0].className === "image image-fill") {
    fitImages();
  } else {
    fillImages();
  }
}

function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}

function zoomOut() {
  let padding = parseInt(imageContainer.style.paddingLeft.slice(0, -2) || 0);

  if (padding < 600)
    imageContainer.style.paddingLeft = imageContainer.style.paddingRight =
      String(padding + 100) + "px";

  scrollToImage(currentImage);
}

function zoomIn() {
  let padding = parseInt(imageContainer.style.paddingLeft.slice(0, -2) || 0);

  if (padding >= 0)
    imageContainer.style.paddingLeft = imageContainer.style.paddingRight =
      String(padding - 100) + "px";

  scrollToImage(currentImage);
}

// Event Handlers  //

function checkScroll(e) {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(function () {
    getElementInViewport();
  }, 100);
}

function checkKey(e) {
  if (e.keyCode === 37) {
    e.preventDefault();
    goToPrevImage();
  } else if (e.keyCode === 39) {
    e.preventDefault();
    goToNextImage();
  } else if (e.keyCode === 36) {
    e.preventDefault();
    scrollToImage(firstImage);
  } else if (e.keyCode === 35) {
    e.preventDefault();
    scrollToImage(lastImage);
  } else if (e.keyCode === 86) {
    e.preventDefault();
    changeFit();
  } else if (e.keyCode === 13) {
    e.preventDefault();
    toggleFullScreen();
  } else if (e.keyCode === 109) {
    e.preventDefault();
    zoomOut();
  } else if (e.keyCode === 107) {
    e.preventDefault();
    zoomIn();
  }
}

// Initialization //

function initialize() {
  toggleFullScreen();
  getElementInViewport();
  document.onkeydown = checkKey;
  document.onscroll = checkScroll;
}

window.onload = initialize;
