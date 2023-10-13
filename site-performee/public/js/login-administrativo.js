const target = document.querySelectorAll("[element-anime]");
    
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
function entrar(){
var emailVar = ipt_email.value;
var senhaVar = ipt_senha.value;

if (emailVar == "" || senhaVar == "") {
    // cardErro.style.display = "block"
    // mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
    // finalizarAguardar();
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

}).then(function (resposta) {
    console.log("ESTOU NO THEN DO entrar()!")

    if (resposta.ok) {
        console.log(resposta);
        resposta.json().then(json => {
            console.log(json);
            console.log(JSON.stringify(json));

            sessionStorage.EMAIL_USUARIO = json.email;
            sessionStorage.NOME_USUARIO = json.nome;
            sessionStorage.ID_USUARIO = json.idAdmin;

            setTimeout(function () {
                window.location = "index.html";
            }, 1000); // apenas para exibir o loading


        });

    } else {
        console.log("Houve um erro ao tentar realizar o login!");

        resposta.text().then(texto => {
            console.error(texto);
            // finalizarAguardar(texto);
        });
    }

}).catch(function (erro) {
    console.log(erro);
})
 }

 function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        b_usuario.innerHTML = nome;

        // finalizarAguardar();
    } else {
        window.location = "../login.html";
    }
}




