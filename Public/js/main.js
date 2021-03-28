// Variables // 

const images = document.querySelectorAll('.image');
const firstImage = images[0];
const lastImage = images[images.length - 1];
let currentImage;
let nextImage;
let prevImage;
let scrollTimeout;


// Functions //

function isElementInViewport (el) {
    let rect = el.getBoundingClientRect();
    return (rect.bottom >= window.innerHeight/2 && rect.top < window.innerHeight/2);
}

function updateImagesToNext() {
    prevImage = currentImage;
    currentImage = nextImage;
    nextImage = nextImage.nextElementSibling;
}

function updateImagesToPrev(){
    nextImage = currentImage;
    currentImage = prevImage;
    prevImage = prevImage.previousElementSibling;
}

function getElementInViewport() {
    images.forEach(image => {
        if(isElementInViewport(image) === true){
            currentImage = image;
            nextImage = image.nextElementSibling;
            prevImage = image.previousElementSibling;
            return;
        }
    });
}

function goToNextImage(){
    if(nextImage === null) {
        scrollToImage(lastImage);
    } else {
        nextImage.scrollIntoView();
        updateImagesToNext();
    }  
}

function goToPrevImage(){
    if(prevImage === null) {
        scrollToImage(firstImage);
    } else {
        prevImage.scrollIntoView();
        updateImagesToPrev();
    }
}

function scrollToImage(image){
    image.scrollIntoView();
}

function fitImages(){
    images.forEach(image => {
        image.className = "image image-fit";
    });
    scrollToImage(currentImage);
}

function fillImages(){
    images.forEach(image => {
        image.className = "image image-fill";
    });
    scrollToImage(currentImage);
}

function changeFit(){
    if(images[0].className === "image image-fill"){
        fitImages();
    } else {
        fillImages();
    }
}

function openFullscreen() {
    if(document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
}


// Event Listeners & Handlers  //

document.addEventListener('scroll', function(e) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        getElementInViewport();
    }, 100);
});

function checkKey(e) {
    e = e || window.event;

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
        e.preventDefault()
        changeFit();
    }
}


// Initialization //

openFullscreen();
getElementInViewport();
document.onkeydown = checkKey;
