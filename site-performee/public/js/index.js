const navbar = document.getElementById("Nav")
    , target = document.querySelectorAll("[element-anime]")
    , menuHamburguer = document.getElementById("MenuMobile")
    , navbarOptions = document.querySelector(".navbar-options")
    , line1 = document.getElementById("Line1")
    , line2 = document.getElementById("Line2")
    , line3 = document.getElementById("Line3");

const rolagem = () => {
    const windowTop = window.pageYOffset + (window.innerHeight * 0.9);
    navbar.classList.toggle("ativa", scrollY > 0);
    // line1.classList.toggle("ative", scrollY > 0);
    // line2.classList.toggle("ative", scrollY > 0);
    // line3.classList.toggle("ative", scrollY > 0);

    target.forEach(e => {
        const elementTop = e.getBoundingClientRect().top + window.pageYOffset;
        if (windowTop > elementTop) {
            e.classList.add("animate");
        } else {
            e.classList.remove("animate");
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const servicosInfoElements = document.querySelectorAll(".servicos-info");
    const cards = document.querySelector(".cards");

    servicosInfoElements.forEach((element) => {
        element.addEventListener("mouseover", function () {
            cards.classList.add("hovered");
        });

        element.addEventListener("mouseout", function () {
            cards.classList.remove("hovered");
        });
    });
});


const menuMobile = () => {
    navbarOptions.classList.toggle('clicked');
    line1.classList.toggle('clicked');
    line2.classList.toggle('clicked');
    line3.classList.toggle('clicked');
}

window.addEventListener('load', rolagem);
window.addEventListener('scroll', rolagem);
menuHamburguer.addEventListener('click', menuMobile);