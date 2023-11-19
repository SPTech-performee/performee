const inputNome = document.getElementById('IptNomeUser')
    , inputEmail = document.getElementById('IptEmailUser')
    , inputCpf = document.getElementById('IptCpfUser')
    , inputCargo = document.getElementById('IptCargoUser');

document.getElementById('TituloNomeUser').innerHTML = sessionStorage.NOME_USUARIO;
document.getElementById('NomeUser').innerHTML = sessionStorage.NOME_USUARIO;

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.PERMISSAO_USUARIO != 1) {
        fetch(`/usuario/selecionarDadosGerais/${sessionStorage.ID_USUARIO}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    inputNome.value = jsonInfo[0].nome;
                    inputEmail.value = jsonInfo[0].email;
                    inputCpf.value = conversorCpf(jsonInfo[0].cpf);
                    inputCargo.value = jsonInfo[0].cargo;
                })
            } else {
                console.log('Erro no .THEN selecionarDadosGerais() do usuário');
            }
        });

        fetch(`/usuario/buscarDadosEmpresaPermissao/${sessionStorage.ID_USUARIO}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    document.getElementById('KpiAfiliacao').innerHTML = `
                    <span>
                        <h2>Empresa afiliada:</h2>
                        <text>${jsonInfo[0].razaoSocial}.</text>
                        <text>${jsonInfo[0].email} - ${conversorCnpj(jsonInfo[0].cnpj)}</text>
                    </span>
                    <img src="../assets/icons/Buildings.png" alt="logo de bussiness">
                    `;

                    if (jsonInfo[0].idTipo == 2) {
                        document.getElementById('KpiPermissoes').innerHTML = `
                        <ul>
                            <li>
                                <h2>Permissões do sistema:</h2>
                            </li>
                            <li>
                                <span>Crud Completo</span>
                                <img src=".../assets/icons/X.png" alt="NEGADO">
                            </li>
                            <li>
                                <span>Crud do usuário</span>
                                <img src="../assets/icons/check-icon.png" alt="OK">
                            </li>
                            <li>
                                <span>Visualização de dados</span>
                                <img src="../assets/icons/check-icon.png" alt="OK">
                            </li>
                        </ul>
                        `;
                    } else {
                        document.getElementById('KpiPermissoes').innerHTML = `
                            <ul>
                                <li>
                                    <h2>Permissões do sistema:</h2>
                                </li>
                                <li>
                                <span>Crud Completo</span>
                                    <img src=".../assets/icons/X.png" alt="NEGADO">
                                </li>
                                <li>
                                <span>Crud do usuário</span>
                                    <img src=".../assets/icons/X.png" alt="NEGADO">
                                </li>
                                <li>
                                    <span>Visualização de dados</span>
                                    <img src="../assets/icons/check-icon.png" alt="OK">
                                </li>
                            </ul>
                        `;
                    }
                })
            } else {
                console.log('Erro no .THEN buscarDadosEmpresaPermissao do usuário');
            }
        })
    } else {
        fetch(`/administrador/selecionarDadosGerais/${sessionStorage.ID_USUARIO}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    inputNome.value = jsonInfo[0].nome;
                    inputEmail.value = jsonInfo[0].email;
                    inputCpf.value = conversorCpf(jsonInfo[0].cpf);
                    inputCargo.value = 'Adminstrador Performee.';
                })
            } else {
                console.log('Erro no .THEN selecionarDadosGerais() do Administrador');
            }
        });

        document.getElementById('KpiAfiliacao').innerHTML = `
            <span>
                <h2>Empresa afiliada:</h2>
                <text>Performee.</text>
                <text>Performee@contato.com - ${conversorCnpj('12345678901234')}</text>                    
            </span>
            <img src="../assets/icons/Buildings.png" alt="logo de bussiness">
        `;
        document.getElementById('KpiPermissoes').innerHTML = `
            <ul>
                <li>
                    <h2>Permissões do sistema:</h2>
                </li>
                <li>
                    <span>Crud Completo</span>
                    <img src="../assets/icons/check-icon.png" alt="OK">
                </li>
                <li>
                    <span>Crud do usuário</span>
                    <img src="../assets/icons/check-icon.png" alt="OK">
                </li>
                <li>
                    <span>Visualização de dados</span>
                    <img src="../assets/icons/check-icon.png" alt="OK">
                </li>
            </ul>
            `;
    }
});

function ableEdit(type) {
    if (type != 4) {
        document.getElementById(`BtnEdit${type}`).setAttribute('disabled', true);
        document.getElementById(`BtnSalvar${type}`).removeAttribute('disabled');
    }

    // Mudar para switch case e fazer funcionar
    if (type == 1) {
        inputNome.removeAttribute('disabled');
    } else if (type == 2) {
        inputEmail.removeAttribute('disabled');
    } else if (type == 3) {
        inputCpf.removeAttribute('disabled');
    } else {
        if (sessionStorage.PERMISSAO_USUARIO == 1) {
            // Adicionar um pop-up, sla, falando q admins nn podem mudar
            alert('Somente clientes podem mudar seu cargo!')
        } else {
            inputCargo.removeAttribute('disabled');
            document.getElementById(`BtnEdit${type}`).setAttribute('disabled', true);
            document.getElementById(`BtnSalvar${type}`).removeAttribute('disabled');
        }
    }
}


function editInfo(id, type) {
    var nomeVar = IptNomeUser.value;
    var emailVar = IptEmailUser.value;
    var cpfVar = IptCpfUser.value;
    var cargoVar = IptCargoUser.value;

    switch (type) {
        case 1: {
            if (sessionStorage.PERMISSAO_USUARIO != 1) {
                fetch("/usuario/editarNome", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nomeServer: nomeVar,
                        idUsuarioServer: id

                    })
                }).then(function (resposta) {
                    console.log("resposta: ", resposta);
                    if (resposta.ok) {
                        sessionStorage.NOME_USUARIO = nomeVar;
                        alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/check-icon-green.png" alt="OK">
                        <text>Nome editado com sucesso!</text>
                        <span style="width: 100%;  background: #65da65;" id="Progresso"></span>
                        `;
                        abrirAlerta();
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    } else {
                        alerta.innerHTML = `
                            <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                            <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                            <text>Houve um erro ao editar o nome!</text>
                            <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                        `;
                        abrirAlerta();
                        throw ("Houve um erro ao tentar realizar a edição!");
                    }
                }).catch(function (resposta) {
                    alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>${erro}</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                    abrirAlerta();
                    console.log(`#ERRO: ${resposta}`)
                });
                return false;

            } else {
                fetch("/administrador/editarNome", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nomeServer: nomeVar,
                        idAdminServer: id
                    })
                }).then(function (resposta) {
                    console.log("resposta: ", resposta);
                    if (resposta.ok) {
                        sessionStorage.NOME_USUARIO = nomeVar;
                        alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/check-icon-green.png" alt="OK">
                        <text>Nome editado com sucesso!</text>
                        <span style="width: 100%;  background: #65da65;" id="Progresso"></span>
                        `;
                        abrirAlerta();
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    } else {
                        alerta.innerHTML = `
                            <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                            <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                            <text>Houve um erro ao editar o nome!</text>
                            <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                        `;
                        abrirAlerta();
                        throw ("Houve um erro ao tentar realizar o cadastro!");
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`)
                    alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>${erro}</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                    abrirAlerta();
                });
                return false;
            }
        }
        case 2: {
            if (sessionStorage.PERMISSAO_USUARIO != 1) {
                var regex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;

                if (IptEmailUser.value.match(regex)) {
                fetch("/usuario/editarEmail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        emailServer: emailVar,
                        idUsuarioServer: id

                    })
                }).then(function (resposta) {
                    console.log("resposta: ", resposta);
                    if (resposta.ok) {
                        alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/check-icon-green.png" alt="OK">
                        <text>E-mail editado com sucesso!</text>
                        <span style="width: 100%;  background: #65da65;" id="Progresso"></span>
                        `;
                        abrirAlerta();
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    } else {
                        alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>Houve um erro ao editar o e-mail!</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                        abrirAlerta();
                        throw ("Houve um erro ao tentar realizar o cadastro!");
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`)
                    alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>${erro}</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                    abrirAlerta();
                });
                return false;
            } else {
                alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>E-mail Inválido!</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                    abrirAlerta();
            }

            } else {
                var regex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;

                if (IptEmailUser.value.match(regex)) {

                fetch("/administrador/editarEmail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        emailServer: emailVar,
                        idAdminServer: id
                    })
                }).then(function (resposta) {
                    console.log("resposta: ", resposta);
                    if (resposta.ok) {
                        alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/check-icon-green.png" alt="OK">
                        <text>E-mail editado com sucesso!</text>
                        <span style="width: 100%;  background: #65da65;" id="Progresso"></span>
                        `;
                        abrirAlerta();
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    } else {
                        alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>Houve um erro ao editar o e-mail!</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                        abrirAlerta();
                        throw ("Houve um erro ao tentar realizar o cadastro!");
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`)
                    alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>${erro}</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                    abrirAlerta();
                });
                return false;

            } else {
                
                alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>E-mail Inválido!</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                    abrirAlerta();
            }
            break;
        }
        }
        case 3: {
//wweewewe
            
            if (sessionStorage.PERMISSAO_USUARIO != 1) {
                
                if (cpfVar.length == 11) {
                fetch("/usuario/editarCpf", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        cpfServer: cpfVar,
                        idUsuarioServer: id
                    })
                }).then(function (resposta) {
                    console.log("resposta: ", resposta);
                    if (resposta.ok) {
                        alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/check-icon-green.png" alt="OK">
                        <text>CPF editado com sucesso!</text>
                        <span style="width: 100%;  background: #65da65;" id="Progresso"></span>
                        `;
                        abrirAlerta();
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    } else {
                        alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>Houve um erro ao editar o CPF!</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                        abrirAlerta();
                        throw ("Houve um erro ao tentar realizar o cadastro!");
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`)
                    alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>${erro}</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                    abrirAlerta();
                });
                return false;
            } else {
                alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>CPF Inválido!</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                    abrirAlerta();
            }
            } else {
                if (cpfVar.length == 11) {
                fetch("/administrador/editarCpf", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        cpfServer: cpfVar,
                        idAdminServer: id
                    })
                }).then(function (resposta) {
                    console.log("resposta: ", resposta);
                    if (resposta.ok) {
                        alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/check-icon-green.png" alt="OK">
                        <text>CPF editado com sucesso!</text>
                        <span style="width: 100%;  background: #65da65;" id="Progresso"></span>
                        `;
                        abrirAlerta();
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    } else {
                        alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>Houve um erro ao editar o CPF!</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                        abrirAlerta();
                        throw ("Houve um erro ao tentar realizar o cadastro!");
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`)
                    alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>${erro}</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                    abrirAlerta();
                });
                return false;
            } else {
                alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>CPF Inválido!</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                    abrirAlerta();
            }
            break;
        }
        }
        case 4: {
            fetch("/usuario/editarCargo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cargoServer: cargoVar,
                    idUsuarioServer: id

                })
            }).then(function (resposta) {
                console.log("resposta: ", resposta);
                if (resposta.ok) {
                    alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/check-icon-green.png" alt="OK">
                        <text>Cargo editado com sucesso!</text>
                        <span style="width: 100%;  background: #65da65;" id="Progresso"></span>
                        `;
                    abrirAlerta();
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                } else {
                    alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>Houve um erro ao editar o cargo!</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                    abrirAlerta();
                    throw ("Houve um erro ao tentar realizar o cadastro!");
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`)
                alerta.innerHTML = `
                        <img class="select-disable" src="../../assets/icons/X.png" alt="Fechar" onclick="fecharAlerta()" id="FecharAlerta">
                        <img class="select-disable" src="../../assets/icons/X-red.png" alt="ERRO">
                        <text>${erro}</text>
                        <span style="width: 100%;  background: #dc143c;" id="Progresso"></span>
                    `;
                abrirAlerta();
            });
            return false;
        }
    }
}