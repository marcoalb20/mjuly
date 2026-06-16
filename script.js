// //  DOM completamente cargado para evitar errores
// document.addEventListener('DOMContentLoaded', () => {

//     const botonF = document.getElementById('botonF');
//     const botonS = document.getElementById('botonS');
//     const botonT = document.getElementById('botonT');
//     const sectionF = document.getElementById('sectionF');
//     const sectionS = document.getElementById('sectionS');
//     const sectionT = document.getElementById('sectionT');

//     botonF.addEventListener('click', () => {
//         sectionF.classList.toggle('abierta');
//     });
//     botonS.addEventListener('click', () => {
//         sectionS.classList.toggle('abierta');
//     });
//     botonT.addEventListener('click', () => {
//         sectionT.classList.toggle('abierta');
//     });

// });

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