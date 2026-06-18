// document.addEventListener('DOMContentLoaded', () => {

//     const items = [
//         { boton: 'botonF', section: 'sectionF' },
//         { boton: 'botonS', section: 'sectionS' },
//         { boton: 'botonT', section: 'sectionT' },
//     ];

//     items.forEach(({ boton, section }) => {
//         const btn = document.getElementById(boton);
//         const sec = document.getElementById(section);
//         const icon = btn.querySelector('.icon');

//         btn.addEventListener('click', () => {
//             sec.classList.toggle('abierta');
//             const abierta = sec.classList.contains('abierta');
//             icon.className = `${abierta ? 'ri-subtract-fill' : 'ri-add-fill'} icon`;
//         });
//     });

// });

// let iconHidden = false;
let position = 55;
const firstSectionPhoto = document.getElementById('firstSectionPhoto');
const firstSectionIcon = document.getElementById('firstSectionIcon');

// 
const secondSection = document.querySelector('.second-section');
const fText = document.querySelector('.second-section .f-text');

// Separar cada letra en un span
// fText.innerHTML = fText.innerHTML.replace(/(\S)/g, '<span class="letter">$1</span>');

const words = document.querySelectorAll('.second-section .word');
const positions = [
    { x: -200, y: -150, scale: 2, opacity: 0 },
    { x: 100, y: -200, scale: 2.5, opacity: 0 },
    { x: -150, y: 100, scale: 1.8, opacity: 0 },
    { x: 50, y: -100, scale: 2.2, opacity: 0 },
    { x: 200, y: 150, scale: 3, opacity: 0 },
];

const thirdText = document.getElementById('thirdSectionText');
thirdText.innerHTML = thirdText.textContent.replace(/(\S)/g, '<span>$1</span>');

const bannerText = document.getElementById('thirdSectionBannerText');


words.forEach((word, i) => {
    const pos = positions[i];
    word.dataset.x = pos.x;
    word.dataset.y = pos.y;
    word.dataset.scale = pos.scale;
    word.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`;
    word.style.opacity = pos.opacity;
});

const fifthTexts = document.querySelectorAll('.fifth-section .text');
const counter = document.querySelector('.fifth-section .title span');
const targetNumber = 9999; // cambia esto al número que quieras

// const openMenuBtn = document.getElementById('openMenu')


// openMenuBtn.addEventListener('click', () => {
//     // menu.classList.add('abierto');
//     // overlay.classList.add('abierto');
//     // document.body.classList.add('no-scroll');
// });


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

    // 100% = empieza fuera a la derecha, 0% = llega al centro
    bannerText.style.transform = `translateX(${bannePos}%)`;

    words.forEach((word, i) => {
        const x = parseFloat(word.dataset.x) * (1 - wordProgress);
        const y = parseFloat(word.dataset.y) * (1 - wordProgress);
        const scale = 1 + (parseFloat(word.dataset.scale) - 1) * (1 - wordProgress);
        word.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        word.style.opacity = wordProgress;
    });

    fifthTexts.forEach(text => {
        const rect = text.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
            text.classList.add('revealed');
        } else {
            text.classList.remove('revealed');
        }
    });

    if (rectF.bottom <= position) {
        firstSectionIcon.style.bottom = `-100px`;
        secondSection.style.maxHeight = `200px`;
    } else {
        firstSectionIcon.style.bottom = `-30px`;
        secondSection.style.maxHeight = `100vh`;
    }
});



// contador animado
function animateCounter(target, duration = 2000) {
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

// arranca cuando el titulo es visible
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(targetNumber);
            // titleObserver.disconnect();
        }
        else {
            counter.textContent = 0;
        }
    });
}, { threshold: 0.5 });

titleObserver.observe(document.querySelector('.fifth-section .title'));



const heartAnimation = lottie.loadAnimation({
    container: document.getElementById('heartIcon'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'assets/animations/heart.json' // ruta donde guardaste el JSON
});

let liked = false;

document.getElementById('heartIcon').addEventListener('click', () => {
    if (!liked) {
        heartAnimation.playSegments([0, 60], true); // ajusta el frame final
        liked = true;
    } else {
        heartAnimation.playSegments([60, 0], true); // reversa
        liked = false;
    }
});