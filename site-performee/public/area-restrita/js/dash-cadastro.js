const userRadio = document.getElementById("AbaUserRadio")
    , empresaRadio = document.getElementById("AbaEmpresaRadio")
    , dcenterRadio = document.getElementById("AbaDCenterRadio")
    , serverRadio = document.getElementById("AbaServerRadio")

    , userCrud = document.getElementById('ContentUserCrud')
    , empresaCrud = document.getElementById('ContentEmpresaCrud')
    , dCenterCrud = document.getElementById('ContentDCenterCrud')
    , serverCrud = document.getElementById('ContentServerCrud')

    , containerComp = document.getElementById('Componentes');

// CARREGANDO A LISTA DE DADOS DE USUÁRIOS, EMPRESAS, DATACENTERS E SERVIDORES
document.addEventListener('DOMContentLoaded', () => {

    // VENDO SE O USER É ADMIN OU NÃO
    if (sessionStorage.PERMISSAO_USUARIO != 1) {

        // inserir aqui

    } else {
        // TABELA DE USUÁRIOS
        fetch('/usuario/selecionarTudo', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    jsonInfo.forEach(user => {
                        document.getElementById('UserTable').innerHTML += `
                        <div class="content-info">
                        <span>${user.nome}</span>
                        <div class="btn-group">
                            <img class="select-disable" src="../assets/icons/info-icone.png"
                                alt="Icone de informação" onClick="exibirInfoUser(this)" id="Info${user.idColaborador}">
                            <button class="btn-crud blue" id="BtnEdit${user.idColaborador}">
                                <img src="../assets/icons/edit-icon.png" alt="Editar">
                            </button>
                            <button class="btn-crud red" id="BtnDelete${user.idColaborador}">
                                <img src="../assets/icons/Trash.png" alt="Delete">
                            </button>
                        </div>
                    </div>
                        `
                    })
                })
            } else {
                console.log('Erro no .THEN lista de usuário');
            }
        })

        //TABELA EMPRESA
        fetch('/empresas/listar', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    jsonInfo.forEach(empresa => {
                        document.getElementById('EmpresaTable').innerHTML += `
                        <div class="content-info">
                        <span>${empresa.razaoSocial}</span>
                        <div class="btn-group">
                            <img class="select-disable" src="../assets/icons/info-icone.png"
                                alt="Icone de informação" onClick="exibirInfoEmpresa(this)" id="Info${empresa.idEmpresa}">
                            <button class="btn-crud blue" id="BtnEdit${empresa.idEmpresa}">
                                <img src="../assets/icons/edit-icon.png" alt="Editar">
                            </button>
                            <button class="btn-crud red" id="BtnDelete${empresa.idEmpresa}">
                                <img src="../assets/icons/Trash.png" alt="Delete">
                            </button>
                        </div>
                    </div>
                        `
                    })
                })
            } else {
                console.log('Erro no .THEN da lista de empresas');
            }
        })
    }

    //TABELA DATA CENTER
    fetch('/dataCenter/selecionarTudo', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonInfo) => {
                jsonInfo.forEach(dCenter => {
                    document.getElementById('DCenterTable').innerHTML += `
                    <div class="content-info">
                    <span>${dCenter.nome}</span>
                    <div class="btn-group">
                        <img class="select-disable" src="../assets/icons/info-icone.png"
                            alt="Icone de informação" onClick="exibirInfoDCenter(this)" id="Info${dCenter.idDataCenter}">
                        <button class="btn-crud blue" id="BtnEdit${dCenter.idDataCenter}">
                            <img src="../assets/icons/edit-icon.png" alt="Editar">
                        </button>
                        <button class="btn-crud red" id="BtnDelete${dCenter.idDataCenter}">
                            <img src="../assets/icons/Trash.png" alt="Delete">
                        </button>
                    </div>
                </div>
                    `
                })
            })
        } else {
            console.log('Erro no .THEN da lista de data centers');
        }
    })

    //Tabela Servidor
    fetch('/servidor/selecionarTudo', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonInfo) => {
                jsonInfo.forEach(server => {
                    document.getElementById('ServerTable').innerHTML += `
                    <div class="content-info">
                    <span>${server.hostname}</span>
                    <div class="btn-group">
                        <img class="select-disable" src="../assets/icons/info-icone.png"
                            alt="Icone de informação" onClick="exibirInfoServer(this)" id="Info${server.ipServidor}">
                        <button class="btn-crud blue" id="BtnEdit${server.ipServidor}">
                            <img src="../assets/icons/edit-icon.png" alt="Editar">
                        </button>
                        <button class="btn-crud red" id="BtnDelete${server.ipServidor}">
                            <img src="../assets/icons/Trash.png" alt="Delete">
                        </button>
                    </div>
                </div>
                    `
                })
            })
        } else {
            console.log('Erro no .THEN da lista de servidores');
        }
    })
});

function exibirInfoUser(icone) {
    idUser = Number(icone.id[icone.id.length - 1]);
    fetch(`/usuario/selecionarDadosGerais/${idUser}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonQuery) => {
                document.getElementById('ModalContent').innerHTML = `
                <img class="fechar select-disable" src="../assets/icons/X.png" alt="Fechar" onclick="abrirModal()">
                <h1>Informações do Usuário</h1>
                <div class="content-info-user">
                    <div>
                        <h3>Nome do usuário:</h3>
                        <text>${jsonQuery[0].nome}</text>
                    </div>
                    <div>
                        <h3>E-mail do usuário:</h3>
                        <text>${jsonQuery[0].email}</text>
                    </div>
                    <div>
                        <h3>CPF do usuário:</h3>
                        <text>${conversorCpf(jsonQuery[0].cpf)}</text>
                    </div>
                    <div>
                        <h3>Cargo do usuário:</h3>
                        <text>${jsonQuery[0].cargo}</text>
                    </div>
                    <div>
                        <h3>Empresa do usuário:</h3>
                        <text>${jsonQuery[0].razaoSocial}</text>
                    </div>
                    <div>
                        <h3>Tipo de permissão:</h3>
                        <text>${jsonQuery[0].descricao}</text>
                    </div>
                </div>
            `})
        } else {
            console.log('Erro no .THEN');
        }
    })
    abrirModal();
}

function exibirInfoEmpresa(icone) {
    idEmpresa = Number(icone.id[icone.id.length - 1]);
    fetch(`/empresas/selecionarDadosGerais/${idEmpresa}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonQuery) => {
                document.getElementById('ModalContent').innerHTML = `
                <img class="fechar select-disable" src="../assets/icons/X.png" alt="Fechar" onclick="abrirModal()">
                <h1>Informações da Empresa</h1>
                <div class="content-info-user">
                    <div>
                        <h3>Razão Social da empresa:</h3>
                        <text>${jsonQuery[0].razaoSocial}</text>
                    </div>
                    <div>
                        <h3>Nome fantasia da empresa:</h3>
                        <text>${jsonQuery[0].nomeFantasia}</text>
                    </div>
                    <div>
                        <h3>CNPJ da empresa:</h3>
                        <text>${conversorCnpj(jsonQuery[0].cnpj)}</text>
                    </div>
                    <div>
                        <h3>E-mail de contato da empresa:</h3>
                        <text>${jsonQuery[0].email}</text>
                    </div>
                    <div>
                        <h3>Telefone de contato da empresa:</h3>
                        <text>${conversorTel(jsonQuery[0].telefone)}</text>
                    </div>
                </div>
            `})
        } else {
            console.log('Erro no .THEN');
        }
    })
    abrirModal();
}

function exibirInfoDCenter(icone) {
    idDataCenter = Number(icone.id[icone.id.length - 1]);
    fetch(`/dataCenter/selecionarDadosGerais/${idDataCenter}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonQuery) => {
                document.getElementById('ModalContent').innerHTML = `
                <img class="fechar select-disable" src="../assets/icons/X.png" alt="Fechar" onclick="abrirModal()">
                <span>
                    <h1>Informações do data center</h1>
                    <div class="content-info-user">
                        <div>
                            <h3>Nome do data center:</h3>
                            <text>${jsonQuery[0].nome}</text>
                        </div>
                        <div>
                            <h3>Tamanho do data center (m²):</h3>
                            <text>${jsonQuery[0].tamanho}</text>
                        </div>
                        <div>
                            <h3>Empresa dona do data center:</h3>
                            <text>${jsonQuery[0].razaoSocial}</text>
                        </div>
                    </div>
                </span>
                <span>
                    <h1>Informações de endereço</h1>
                    <div class="content-info-user">
                        <div>
                            <h3>CEP:</h3>
                            <text>${jsonQuery[0].cep}</text>
                        </div>
                        <div>
                            <h3>Bairro:</h3>
                            <text>${jsonQuery[0].bairro}</text>
                        </div>
                        <div>
                            <h3>Número:</h3>
                            <text>${jsonQuery[0].numero}</text>
                        </div>
                        <div>
                            <h3>Complemento:</h3>
                            <text>${jsonQuery[0].complemento}</text>
                        </div>
                        <div>
                            <h3>Cidade:</h3>
                            <text>${jsonQuery[0].cidade}</text>
                        </div>
                        <div>
                            <h3>Estado:</h3>
                            <text>${jsonQuery[0].estado}</text>
                        </div>
                        <div>
                            <h3>País:</h3>
                            <text>${jsonQuery[0].pais}</text>
                        </div>
                    </div>
                </span>
            `})
        } else {
            console.log('Erro no .THEN');
        }
    })
    abrirModal();
}

function exibirInfoServer(icone) {
    ipServidor = icone.id.slice(4, 13);
    fetch(`/servidor/selecionarDadosGerais/${ipServidor}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonQuery) => {
                document.getElementById('ModalContent').innerHTML = `
                <img class="fechar select-disable" src="../assets/icons/X.png" alt="Fechar" onclick="abrirModal()">
                    <span>
                    <h1>Informações do servidor</h1>
                    <div class="content-info-user">
                        <div>
                            <h3>IP do servidor:</h3>
                            <text>${jsonQuery[0].ipServidor}</text>
                        </div>
                        <div>
                            <h3>Hostname do servidor:</h3>
                            <text>${jsonQuery[0].hostname}</text>
                        </div>
                        <div>
                            <h3>Estado:</h3>
                            <text>${jsonQuery[0].ativo}</text>
                        </div>
                        <div>
                            <h3>Sistema Operacional:</h3>
                            <text>${jsonQuery[0].sisOp}</text>
                        </div>
                        <div>
                            <h3>Data center onde está alocado:</h3>
                            <text>${jsonQuery[0].nome}</text>
                        </div>
                        <div>
                            <h3>Empresa dona do data center:</h3>
                            <text>${jsonQuery[0].razaoSocial}</text>
                        </div>
                    </div>
                    </span>
                    <span>
                    <h1>Componentes do servidor</h1>
                `
                jsonQuery.forEach(componente => {
                    document.getElementById('ModalContent').innerHTML += `
                        <div class="content-info-user">
                            <div>
                                <h3>Tipo do componente:</h3>
                                <text>${componente.tipo}</text>
                            </div>
                            <div>
                                <h3>Modelo do componente:</h3>
                                <text>${componente.modelo}</text>
                            </div>
                            <div>
                                <h3>Capacidade do componente:</h3>
                                <text>${componente.capacidadeTotal + componente.tipoMedida}</text>
                            </div>
                        </div>
                    `
                });
                document.getElementById('ModalContent').innerHTML += `
                    </span>
                `;
            })
        } else {
            console.log('Erro no .THEN');
        }
    })
    abrirModal();
}

let componentes = {};
let totalComponentes = 6;
function addComponente() {
    totalComponentes++;

    containerComp.innerHTML += `
            <div id="Comp${totalComponentes}">
            <img class="select-disable menos" src="../assets/icons/Menos.png" alt="Remover" onclick="removeComponente(this)" id="${totalComponentes}">
            <label>
                <span>Tipo Componente:</span>
                <input type="text" placeholder="Exemplo: RAM" id="IptTipoServer${totalComponentes}">
            </label>
            <label>
                <span>Modelo:</span>
                <select name="modelo-server" id="SlcModelo${totalComponentes}">
                    <option value="CPU XPTO">CPU XPTO</option>
                    <option value="RAM XPTO">RAM XPTO</option>
                    <option value="DISK XPTO">DISK XPTO</option>
                    <option value="GPU XPTO">GPU XPTO</option>
                </select>
            </label>
            <label>
                <span>Capacidade:</span>
                <input type="text" placeholder="40 ('medida')"
                    id="IptCapacidadeServer${totalComponentes}">
            </label>
            <label>
                <span>Medida:</span>
                <select name="unimed-server" id="SlcUniMed${totalComponentes}">
                    <option value="GB">Gigabyte</option>
                    <option value="Ghz">Ghz</option>
                    <option value="T">Terabyte</option>
                    <option value="MB">Megabyte</option>
                </select>
            </label>
        </div>
    `
    loadComponentes();
}

function removeComponente(componente) {
    let id = componente.id;
    let attributeComp = `componente${id}`;
    let elementHtml = document.getElementById(`Comp${id}`);

    delete componentes[attributeComp];
    elementHtml.parentNode.removeChild(elementHtml);

    console.log(componentes)
}

function loadComponentes() {
    for (i = 1; i <= totalComponentes; i++) {
        componentes[`componente${i}`] = {
            tipo: document.getElementById(`IptTipoServer${i}`).value,
            modelo: document.getElementById(`SlcModelo${i}`).value,
            capacidade: document.getElementById(`IptCapacidadeServer${i}`).value,
            medida: document.getElementById(`SlcUniMed${i}`).value
        }
    }
}

function changeAba(radio) {
    switch (radio.value) {
        case "1":
            userCrud.style.display = "flex";
            empresaCrud.style.display = "none";
            dCenterCrud.style.display = "none";
            serverCrud.style.display = "none";
            break;
        case "2":
            userCrud.style.display = "none";
            empresaCrud.style.display = "flex";
            dCenterCrud.style.display = "none";
            serverCrud.style.display = "none";
            break;
        case "3":
            userCrud.style.display = "none";
            empresaCrud.style.display = "none";
            dCenterCrud.style.display = "flex";
            serverCrud.style.display = "none";
            break;
        case "4":
            userCrud.style.display = "none";
            empresaCrud.style.display = "none";
            dCenterCrud.style.display = "none";
            serverCrud.style.display = "flex";
            break;
    }
}

const empresa = document.getElementById("SlcEmpresaUser");
const empresaDc = document.getElementById("SlcEmpresaDC");
const empresaServer = document.getElementById("SlcEmpresaServer");

fetch("/empresas/consulta", {
    method: "get",
    headers: {
        "Content-Type": "application/json"
    }
}).then(function (resultadoEmpresa) {
    if (resultadoEmpresa.ok) {
        resultadoEmpresa.json().then(jsonEmpresa => {
            for (var i = 0; i < jsonEmpresa.length; i++) {
                SlcEmpresaUser.innerHTML += `<option value="${jsonEmpresa[i].idEmpresa}">${jsonEmpresa[i].nomeFantasia}</option>`;
                SlcEmpresaDC.innerHTML += `<option value="${jsonEmpresa[i].idEmpresa}">${jsonEmpresa[i].nomeFantasia}</option>`;
                SlcEmpresaServer.innerHTML += `<option value="${jsonEmpresa[i].idEmpresa}">${jsonEmpresa[i].nomeFantasia}</option>`;
            }
        });
    } else {
        console.log("Houve um erro ao tentar realizar a consulta!");

        resultadoEmpresa.text().then(texto => {
            console.error(texto);
        });
    }
}).catch(function (erro) {
    console.error(erro);
});

var fkEmpresaUser;
empresa.addEventListener("change", function () {
    fkEmpresaUser = SlcEmpresaUser.value;
});

var fkEmpresaDc;
empresaDc.addEventListener("change", function () {
    fkEmpresaDc = SlcEmpresaDC.value;
});

var fkEmpresaServer;
empresaServer.addEventListener("change", function () {
    fkEmpresaServer = SlcEmpresaServer.value;
});

function cadastrarUser() {
    var nomeVar = IptNomeUser.value;
    var emailVar = IptEmailUser.value;
    var cargoVar = IptCargoUser.value;
    var empresaVar = fkEmpresaUser;
    var cpfVar = IptCpfUser.value;
    var permissaoVar = SlcPermissao.value;
    var senhaVar = IptSenhaUser.value;
    var confirmarSenha = IptCSenhaUser.value;

    if (nomeVar == null || emailVar == null || cargoVar == null || empresaVar == null || cpfVar == null || permissaoVar == null || senhaVar == null || confirmarSenha == null) {
        alert("Preencha todos os campos!")
        return false;
    } else if (confirmarSenha != senhaVar) {
        alert("senhas diferentes!")
        return false;
    } else {
        fetch("/usuario/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                emailServer: emailVar,
                cargoServer: cargoVar,
                empresaServer: empresaVar,
                cpfServer: cpfVar,
                permissaoServer: permissaoVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso',
                    showConfirmButton: false,
                    timer: 2000
                })
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Houve um erro ao realizar o cadastro'
            });
        });
        return false;
    }
}

function cadastrarEmpresa() {
    var razaoSocialVar = IptRSEmpresa.value;
    var nomeFantasiaVar = IptNFEmpresa.value;
    var cnpjVar = IptCNPJEmpresa.value;
    var telefoneVar = IptTelEmpresa.value;
    var emailVar = IptEmailEmpresa.value;

    if (razaoSocialVar == null || nomeFantasiaVar == null || cnpjVar == null || telefoneVar == null || emailVar == null) {
        return false;
    } else {

        fetch("/empresas/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                razaoSocialServer: razaoSocialVar,
                nomeFantasiaServer: nomeFantasiaVar,
                cnpjServer: cnpjVar,
                telefoneServer: telefoneVar,
                emailServer: emailVar
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso',
                    showConfirmButton: false,
                    timer: 2000
                })
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Houve um erro ao realizar o cadastro'
            });
        });
        return false;
    }
}

function cadastrarDCenter() {
    var nomeVar = IptNomeDCenter.value;
    var tamanhoVar = IptTamanhoDCenter.value;
    var empresaVar = fkEmpresaDc;

    // parte endereço
    var paisVar = IptPaisEndereco.value;
    var estadoVar = IptEstadoEndereco.value;
    var cidadeVar = IptCidadeEndereco.value;
    var cepVar = IptCEPEndereco.value;
    var bairroVar = IptBairroEndereco.value;
    var numeroVar = IptNumEndereco.value;
    var complementoVar = IptCompEndereco.value;

    if (nomeVar == null || tamanhoVar == null || empresaVar == null || paisVar == null || estadoVar == null || cidadeVar == null || cepVar == null || bairroVar == null || numeroVar == null || complementoVar == null) {
        alert("Preencha todos os campos!")
    } else {

        fetch("/dataCenter/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nomeVar,
                tamanhoServer: tamanhoVar,
                empresaServer: empresaVar
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {

                var fkDataCenterVar;

                fetch("/dataCenter/buscarUltimoDC").then(function (response) {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.error('Nenhum dado encontrado');
                    }
                }).then(function (resposta) {
                    if (resposta) {
                        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                        for (var i = 0; i < resposta.length; i++) {
                            var registro = resposta[i];
                            fkDataCenterVar = registro.idDataCenter;
                        }

                        fetch("/enderecoDataCenter/cadastrar", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                paisServer: paisVar,
                                estadoServer: estadoVar,
                                cidadeServer: cidadeVar,
                                cepServer: cepVar,
                                bairroServer: bairroVar,
                                numeroServer: numeroVar,
                                complementoServer: complementoVar,
                                fkDataCenterServer: fkDataCenterVar
                            })
                        }).then(function (resposta) {

                            console.log("resposta: ", resposta);

                            if (resposta.ok) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Cadastro realizado com sucesso',
                                    showConfirmButton: false,
                                    timer: 2000
                                })

                            } else {
                                throw ("Houve um erro ao tentar realizar o cadastro!");
                            }
                        }).catch(function (resposta) {
                            console.log(`#ERRO: ${resposta}`)
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Houve um erro ao realizar o cadastro'
                            });

                        });
                        return false;
                    }
                });

            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Houve um erro ao realizar o cadastro'
            });

        });
        return false;
    }
}

const dataCenters = document.getElementById("SlcDataCenter");

fetch("/dataCenter/selecionarTudo", {
    method: "get",
    headers: {
        "Content-Type": "application/json"
    }
}).then(function (reultadoDc) {
    if (reultadoDc.ok) {
        reultadoDc.json().then(jsonDataCenter => {
            for (var i = 0; i < jsonDataCenter.length; i++) {
                SlcDataCenter.innerHTML += `<option value="${jsonDataCenter[i].idDataCenter}">${jsonDataCenter[i].nome}</option>`;
            }
        });
    } else {
        console.log("Houve um erro ao tentar realizar a consulta!");

        reultadoDc.text().then(texto => {
            console.error(texto);
        });
    }
}).catch(function (erro) {
    console.error(erro);
});

var fkDataCenter;
dataCenters.addEventListener("change", function () {
    fkDataCenter = SlcDataCenter.value;
});

function cadastrarServidor() {
    var nomeServerVar = IptNomeServer.value;
    var dnsServerVar = IptDNSServer.value;
    var SisOpVar = SlcSisOp.value;
    var ativoVar = SlcAtivo.value;
    var fkEmpresaServerVar = fkEmpresaServer;
    var fkDcVar = fkDataCenter;

    if (nomeServerVar == null || dnsServerVar == null || SisOpVar == null || ativoVar == null || fkEmpresaServerVar == null || fkDcVar == null) {
        alert("Preencha todos os campos!")
        console.log(fkEmpresaServerVar, fkDcVar)
        return false;
    } else {

        fetch("/servidor/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServerServer: nomeServerVar,
                dnsServerServer: dnsServerVar,
                SisOpServer: SisOpVar,
                ativoServer: ativoVar,
                fkEmpresaServerServer: fkEmpresaServerVar,
                fkDcServer: fkDcVar
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso',
                    showConfirmButton: false,
                    timer: 2000
                })
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Houve um erro ao realizar o cadastro'
            });
        });
        return false;
    }

}