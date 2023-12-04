const btnExpandir = document.getElementById('Expand')
    , nav = document.getElementById('Nav')
    , alerta = document.getElementById('AlertaStatus')
    , quemUsa = document.getElementById('QuemUsa')
    , btnSairDash = document.getElementById('BtnSair');

function limparSessao() {
    sessionStorage.clear();
}

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

function conversorCep(cep) {
    cep = cep.replace(/\D/g, '')
    cep = cep.replace(/(\d{5})(\d)/, '$1-$2')
    return cep
}

function abrirModal() {
    document.getElementById('ModalContent').classList.remove('center');
    document.getElementById('Modal').classList.toggle('ative');
}

function abrirAlerta() {
    let intervalSumir = setTimeout(fecharAlerta, 3500);
    if (alerta.classList.contains("ative")) {
        fecharAlerta();
        clearTimeout(intervalSumir);
    }
    alerta.classList.add("ative");
}

function fecharAlerta() {
    alerta.classList.remove("ative");
}

if (sessionStorage.PERMISSAO_USUARIO != 1) {
    quemUsa.innerText = `Cliente`

} else {
    quemUsa.innerText = `Administrador`
};

function formatarData(date) {
    date = date.replaceAll('-', '/');
    date = date.replace('T', ' ');
    date = date.replace(/\..*$/, '');
    return date;
}

btnExpandir.addEventListener('click', expandirNav);
btnSairDash.addEventListener('click', limparSessao)