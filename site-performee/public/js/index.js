const navbar = document.getElementById("Nav");

function rolagem() {
    navbar.classList.toggle("ativa", scrollY > 0);
}

window.addEventListener('scroll', rolagem);