// Variables // 

const body = document.getElementsByTagName("body");
const images = document.querySelectorAll('.image');
let currentImage;
let nextImage;
let prevImage;
let scrollTimeout;

// Functions //

function isElementInViewport (el) {
    let rect = el.getBoundingClientRect();
    return (rect.bottom >= 0 && rect.top < window.innerHeight) || 
    (rect.top <=0 && rect.bottom > window.innerHeight)
};

function updateImagesToNext() {
    prevImage = currentImage;
    currentImage = nextImage;
    nextImage = nextImage.nextElementSibling;
};

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
        };
    });
};

function goToNextImage(){
    if(nextImage === null) {
        console.log('No next image');
    } else {
        nextImage.scrollIntoView({behavior: 'smooth'});
        updateImagesToNext();
    }  
};

function goToPrevImage(){
    if(prevImage === null) {
        console.log('No previous image');
    } else {
        prevImage.scrollIntoView({behavior: 'smooth'});
        updateImagesToPrev();
    }
};

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

    if (e.keyCode == '37') {
        e.preventDefault();
        goToPrevImage();
    }
    else if (e.keyCode == '39') {
        e.preventDefault();
        goToNextImage();
    }
};

// Initialization //

openFullscreen();

getElementInViewport();

document.onkeydown = checkKey;
