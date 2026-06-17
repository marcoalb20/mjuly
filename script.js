document.addEventListener('DOMContentLoaded', () => {

    const items = [
        { boton: 'botonF', section: 'sectionF' },
        { boton: 'botonS', section: 'sectionS' },
        { boton: 'botonT', section: 'sectionT' },
    ];

    items.forEach(({ boton, section }) => {
        const btn = document.getElementById(boton);
        const sec = document.getElementById(section);
        const icon = btn.querySelector('.icon');

        btn.addEventListener('click', () => {
            sec.classList.toggle('abierta');
            const abierta = sec.classList.contains('abierta');
            icon.className = `${abierta ? 'ri-subtract-fill' : 'ri-add-fill'} icon`;
        });
    });

});

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

const banner = document.getElementById('thirdSectionBanner');


words.forEach((word, i) => {
    const pos = positions[i];
    word.dataset.x = pos.x;
    word.dataset.y = pos.y;
    word.dataset.scale = pos.scale;
    word.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`;
    word.style.opacity = pos.opacity;
});

// SCROLL //
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;

    const rectF = firstSectionPhoto.getBoundingClientRect();
    const rectS = secondSection.getBoundingClientRect();
    const rectBanner = document.querySelector('.third-section .banner').getBoundingClientRect();

    const bannePos = 100 - (bannerProgress * 150);

    let wordProgress = 1 - ((rectS.top - windowHeight * 0.15) / windowHeight);
    let bannerProgress = 1 - (rectBanner.top / windowHeight);

    firstSectionPhoto.style.backgroundPositionY = `${scroll * 0.5}px`;

    wordProgress = Math.max(0, Math.min(1, wordProgress));
    bannerProgress = Math.max(0, Math.min(1, bannerProgress));

    // 100% = empieza fuera a la derecha, 0% = llega al centro
    banner.style.transform = `translateX(${bannePos}%)`;

    words.forEach((word, i) => {
        const x = parseFloat(word.dataset.x) * (1 - wordProgress);
        const y = parseFloat(word.dataset.y) * (1 - wordProgress);
        const scale = 1 + (parseFloat(word.dataset.scale) - 1) * (1 - wordProgress);
        word.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        word.style.opacity = wordProgress;
    });

    if (rectF.bottom <= position) {
        firstSectionIcon.style.bottom = `-100px`;
        secondSection.style.maxHeight = `200px`;
    } else {
        firstSectionIcon.style.bottom = `-30px`;
        secondSection.style.maxHeight = `100vh`;
    }
});


// document.querySelectorAll('.third-section .content .text span').forEach(span => {
//     span.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
//     span.style.setProperty('--delay', `${Math.random() * 5}s`);
// });
