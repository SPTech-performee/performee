const alerta = document.getElementById('AlertaStatus');

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