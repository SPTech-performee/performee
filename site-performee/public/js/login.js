const target = document.querySelectorAll("[element-anime]")
    , esquerda = document.getElementById("Esquerda")
    , direita = document.getElementById("Direita")
    , btnChange = document.querySelectorAll(".change");

const changeLogin = () => {
    esquerda.classList.toggle("showing");
    direita.classList.toggle("hide");
    alerta.classList.toggle("changedSide");

    if (alerta.classList.contains('ative')) {
        fecharAlerta();
    }
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

if (window.screen.width <= 700) {
    const arrowRight = document.getElementById("SetaVolta");
    arrowRight.setAttribute('src', './assets/icons/arrow_back.png');
}

if (window.screen.width <= 500) {
    const submitContainer = document.querySelector(".submit-container");
    submitContainer.innerHTML = `
            <div class="esqueci-senha">
                <span>Esqueceu a senha?</span>
                <a href="#">Clique aqui</a>
            </div>
            <button class="select-disable" id="BtnClient">
                ENTRAR
            </button>
            `;
}

//Cliente
function entrarClient() {
    var regex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
    var regexCpf = "([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})";

    var identityVar = InputClientEmail.value;
    var senhaVar = InputClientSenha.value;

    if (identityVar == "" || senhaVar == "") {
        alerta.innerHTML = `
            <img class="select-disable" src="./assets/icons/X-white.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
            <img class="select-disable" src="./assets/icons/X-red.png" alt="ERRO">
            <text>Algum campo está em branco!</text>
            <span style="background: #dc143c; width: 100%" id="Progresso"></span>
        `;
        abrirAlerta();
        return false;
    }

    if (InputClientEmail.value.match(regex) || InputClientEmail.value.match(regexCpf)) {

        fetch('/usuario/autenticar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identityServer: identityVar,
                senhaServer: senhaVar
            })
        }).then(resposta => {
            if (resposta.ok) {
                resposta.json().then(json => {
                    console.log(json);

                    sessionStorage.FK_EMPRESA = json.fkEmpresa;
                    sessionStorage.PERMISSAO_USUARIO = json.fkTipoPermissao;
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.idColaborador;

                    alerta.innerHTML = `
                <img class="select-disable" src="./assets/icons/X-white.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                <img class="select-disable" src="./assets/icons/check-icon-green.png" alt="ERRO">
                <text>Login realizado com sucesso!</text>
                <span style="background: #65da65; width: 100%" id="Progresso"></span>
                `;
                    abrirAlerta();
                    setTimeout(() => {
                        window.location = './area-restrita/dash-geral.html';
                        console.log('funcionou')
                    }, 1000);
                });
            } else {
                alerta.innerHTML = `
                <img class="select-disable" src="./assets/icons/X-white.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                <img class="select-disable" src="./assets/icons/X-red.png" alt="ERRO">
                <text>Houve um erro ao tentar realizar o login!</text>
                <span style="background: #dc143c; width: 100%" id="Progresso"></span>
            `;
                abrirAlerta();
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
    } else {
        alerta.innerHTML = `
            <img class="select-disable" src="./assets/icons/X-white.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
            <img class="select-disable" src="./assets/icons/X-red.png" alt="ERRO">
            <text>O E-mail ou Cpf digitado é inválido!</text>
            <span style="background: #dc143c; width: 100%" id="Progresso"></span>
        `;
        abrirAlerta();
        return false;
    }
}

function entrar() {

    var regex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
    var regexCpf = "([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})";
    var identityVar = InputAdmIdentity.value;
    var senhaVar = InputAdmSenha.value;

    if (identityVar == "" || senhaVar == "") {
        alerta.innerHTML = `
            <img class="select-disable" src="./assets/icons/X-white.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
            <img class="select-disable" src="./assets/icons/X-red.png" alt="ERRO">
            <text>Algum campo está em branco!</text>
            <span style="background: #dc143c; width: 100%" id="Progresso"></span>
        `;
        abrirAlerta();
        return false;
    }
    if (InputAdmIdentity.value.match(regex) || InputAdmIdentity.value.match(regexCpf)) {

    fetch('/administrador/autenticar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identityServer: identityVar,
            senhaServer: senhaVar
        })
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.PERMISSAO_USUARIO = json.fkPermissao;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idAdmin;

                alerta.innerHTML = `
                    <img class="select-disable" src="./assets/icons/X-white.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                    <img class="select-disable" src="./assets/icons/check-icon-green.png" alt="ERRO">
                    <text>Login realizado com sucesso!</text>
                    <span style="background: #65da65; width: 100%" id="Progresso"></span>
                `;
                abrirAlerta();
                setTimeout(() => {
                    window.location = './area-restrita/dash-geral.html';
                }, 1500);
            });
        } else {
            alerta.innerHTML = `
                <img class="select-disable" src="./assets/icons/X-white.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                <img class="select-disable" src="./assets/icons/X-red.png" alt="ERRO">
                <text>Houve um erro ao tentar realizar o login!</text>
                <span style="background: #dc143c; width: 100%" id="Progresso"></span>
            `;
            abrirAlerta()
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
} else {
    alerta.innerHTML = `
            <img class="select-disable" src="./assets/icons/X-white.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
            <img class="select-disable" src="./assets/icons/X-red.png" alt="ERRO">
            <text>O E-mail ou Cpf digitado é inválido!</text>
            <span style="background: #dc143c; width: 100%" id="Progresso"></span>
        `;
        abrirAlerta();
        return false;
}
}

window.addEventListener('load', rolagem);
btnChange.forEach(e => {
    e.addEventListener('click', changeLogin);
});

$(document).keypress(function (e) {
    if (direita.classList.contains('hide')) {
        if (e.which == 13) $('#BtnClient').click();
    } else {
        if (e.which == 13) $('#btnAdm').click();
    }
});