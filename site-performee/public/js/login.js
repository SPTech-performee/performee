const target = document.querySelectorAll("[element-anime]")
    , esquerda = document.getElementById("Esquerda")
    , direita = document.getElementById("Direita")
    , btnChange = document.querySelectorAll(".change");

const changeLogin = () => {
    esquerda.classList.toggle("showing");
    direita.classList.toggle("hide");
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

function entrar() {
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;

    if (emailVar == "" || senhaVar == "") {
        console.log("Tem algo em branco...")
        return false;
    }

    fetch('/usuarios/autenticar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idAdmin;

                setTimeout(() => {
                    window.location = '#';
                }, 1000);
            });
        } else {
            console.log("Houve um erro ao tentar realizar o login!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}

window.addEventListener('load', rolagem);
btnChange.forEach(e => {
    e.addEventListener('click', changeLogin);
});