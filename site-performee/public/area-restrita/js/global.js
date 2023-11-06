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

function conversorCpf(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
}

function conversorCnpj(cnpj) {
    cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    return cnpj;
}

function conversorTel(tel) {
    tel = tel.replace(/\D/g, '')
    tel = tel.replace(/(\d{2})(\d)/, "($1) $2")
    tel = tel.replace(/(\d)(\d{4})$/, "$1-$2")
    return tel;
}

function abrirModal() {
    document.getElementById('Modal').classList.toggle('ative');
}

btnExpandir.addEventListener('click', expandirNav);