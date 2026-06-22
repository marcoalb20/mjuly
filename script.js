

// Sections - Elements
const firstSectionPhoto = document.getElementById('firstSectionPhoto');
const firstSectionIcon = document.getElementById('firstSectionIcon');
const secondSection = document.querySelector('.second-section');
const fText = document.querySelector('.second-section .f-text');
const words = document.querySelectorAll('.second-section .word');
const thirdText = document.getElementById('thirdSectionText');
const bannerText = document.getElementById('thirdSectionBannerText');
const fifthTexts = document.querySelectorAll('.fifth-section .text');
const counter = document.querySelector('.fifth-section .title span');
const overlay = document.getElementById('darkOverlay');

// Varibles
// Variables FirstSection
let position = 55;

// Varibles SecondSection
const positions = [
    { x: -200, y: -150, scale: 2, opacity: 0 },
    { x: 100, y: -200, scale: 2.5, opacity: 0 },
    { x: -150, y: 100, scale: 1.8, opacity: 0 },
    { x: 50, y: -100, scale: 2.2, opacity: 0 },
    { x: 200, y: 150, scale: 3, opacity: 0 },
];

words.forEach((word, i) => {
    const pos = positions[i];
    word.dataset.x = pos.x;
    word.dataset.y = pos.y;
    word.dataset.scale = pos.scale;
    word.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`;
    word.style.opacity = pos.opacity;
});


// Varibles ThirdSection
const parrafosObrs = thirdText.innerHTML.split(/<br\s*\/?>/i);

const textoProcesado = parrafosObrs.map(bloque => {
    return bloque.replace(/(\S)/g, '<span>$1</span>');
}).join('<br><br>');

thirdText.innerHTML = textoProcesado;

// Varible FifthSection
const targetNumber = 698;

// Funciones
// Funcion BarNavigation (Lottie)
const heartAnimation = lottie.loadAnimation({
    container: document.getElementById('heartIcon'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'assets/animations/heart.json'
});

let liked = false;

document.getElementById('heartIcon').addEventListener('click', () => {
    if (!liked) {
        heartAnimation.playSegments([0, 60], true);
        liked = true;
    } else {
        heartAnimation.playSegments([60, 0], true);
        liked = false;
    }
});

// Funcion FifthSection (Contador)
function animateCounter(target, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
        start += step;
        if (start >= target) {
            counter.textContent = target;
            clearInterval(interval);
        } else {
            counter.textContent = Math.floor(start);
        }
    }, 16);
}

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(targetNumber);
        }
        else {
            counter.textContent = 0;
        }
    });
}, { threshold: 0.5 });

titleObserver.observe(document.querySelector('.fifth-section .title'));

// SCROLL //
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;

    const rectF = firstSectionPhoto.getBoundingClientRect();
    const rectS = secondSection.getBoundingClientRect();
    const rectBanner = document.querySelector('.third-section .banner').getBoundingClientRect();

    let wordProgress = 1 - ((rectS.top - windowHeight * 0.15) / windowHeight);
    let bannerProgress = 1 - (rectBanner.top / windowHeight);

    const bannePos = 100 - (bannerProgress * 180);
    firstSectionPhoto.style.backgroundPositionY = `${scroll * 0.5}px`;

    wordProgress = Math.max(0, Math.min(1, wordProgress));
    bannerProgress = Math.max(0, Math.min(1, bannerProgress));

    const footerSection = document.getElementById('over');
    const rectSixth = footerSection.getBoundingClientRect();
    const elementoVisibleEnPantalla = windowHeight - rectSixth.top;
    const rangoDeScrollEfecto = 450;

    let overlayProgress = elementoVisibleEnPantalla / rangoDeScrollEfecto;
    overlayProgress = Math.max(0, Math.min(1, overlayProgress));

    overlay.style.opacity = overlayProgress;

    // Funcion Overlay
    if (overlayProgress >= 1) {
        overlay.classList.add('active', 'show-content');
    } else {
        overlay.classList.remove('active', 'show-content');
    }

    // Funcion FirstSection (Icon)
    if (rectF.bottom <= position) {
        firstSectionIcon.style.bottom = `-100px`;
        secondSection.style.maxHeight = `200px`;
    } else {
        firstSectionIcon.style.bottom = `-30px`;
        secondSection.style.maxHeight = `100vh`;
    }

    // Funcion SecondSection (Texto al centro)
    words.forEach((word, i) => {
        const x = parseFloat(word.dataset.x) * (1 - wordProgress);
        const y = parseFloat(word.dataset.y) * (1 - wordProgress);
        const scale = 1 + (parseFloat(word.dataset.scale) - 1) * (1 - wordProgress);
        word.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        word.style.opacity = wordProgress;
    });

    // Funcion ThirdSection (Banner)
    bannerText.style.transform = `translateX(${bannePos}%)`;

    // Funcion FifthSection (Texto revelado)
    fifthTexts.forEach(text => {
        const rect = text.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
            text.classList.add('revealed');
        } else {
            text.classList.remove('revealed');
        }
    });
});


