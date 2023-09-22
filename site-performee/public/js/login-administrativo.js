const target = document.querySelectorAll("[element-anime]")
    , esquerda = document.getElementById("Esquerda")
    , direita = document.getElementById("Direita")
    , btnChange = document.querySelectorAll(".change");

    const changeLogin = () => {
        esquerda.classList.toggle("showing");
        direita.classList.toggle("hide")
    }
    
    const rolagem = () => {
        const windowTop = window.pageYOffset + (window.innerHeight * 0.9);

    target.forEach(e => {
        const elementTop = e.getBoundingClientRect().top + window.pageYOffset;
        if (windowTop > elementTop) {
            e.classList.add("animate");
        } else {
            e.classList.remove("animate");
        }
    });
}

window.addEventListener('load', rolagem);
btnChange.forEach(e => {
    e.addEventListener('click', changeLogin);
});