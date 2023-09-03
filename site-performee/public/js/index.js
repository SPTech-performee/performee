const navbar = document.getElementById("Nav")
    , target = document.querySelectorAll("[element-anime]");
    
    const rolagem = () => {
        const windowTop = window.pageYOffset + (window.innerHeight * 0.9);
        navbar.classList.toggle("ativa", scrollY > 0);

    target.forEach(e => {
        const elementTop = e.getBoundingClientRect().top + window.pageYOffset;
        if (windowTop > elementTop) {
            e.classList.add("animate");
        } else {
            e.classList.remove("animate");
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const servicosInfoElements = document.querySelectorAll(".servicos-info");
    const cards = document.querySelector(".cards");

    servicosInfoElements.forEach((element) => {
        element.addEventListener("mouseover", function() {
            cards.classList.add("hovered");
        });

        element.addEventListener("mouseout", function() {
            cards.classList.remove("hovered");
        });
    });
});

window.addEventListener('load', rolagem);
window.addEventListener('scroll', rolagem);