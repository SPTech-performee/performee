const btnExpandir = document.getElementById('Expand')
    , nav = document.getElementById('Nav');

let navOpen = false;
const expandirNav = () => {
    nav.classList.toggle('opened');
    if (navOpen) {
        navOpen = false;
        btnExpandir.setAttribute('src', '../assets/icons/open-icone.png');
    } else {
        navOpen = true;
        btnExpandir.setAttribute('src', '../assets/icons/close-icone.png');
    }
}
btnExpandir.addEventListener('click', expandirNav);