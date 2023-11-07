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
                                alt="Icone de informação" onClick="exibirInfoUser(${user.idColaborador})" id="Info${user.idColaborador}">
                            <button class="btn-crud blue" id="BtnEdit${user.idColaborador}" onClick="exibirEditUser(${user.idColaborador})">
                                <img src="../assets/icons/edit-icon.png" alt="Editar">
                            </button>
                            <button class="btn-crud red" id="BtnDelete${user.idColaborador}" onClick="confirmDelete(${user.idColaborador}, 1)">
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
                                alt="Icone de informação" onClick="exibirInfoEmpresa(${empresa.idEmpresa})" id="Info${empresa.idEmpresa}">
                            <button class="btn-crud blue" id="BtnEdit${empresa.idEmpresa}" onClick="exibirEditEmpresa(${empresa.idEmpresa})">
                                <img src="../assets/icons/edit-icon.png" alt="Editar">
                            </button>
                            <button class="btn-crud red" id="BtnDelete${empresa.idEmpresa}" onClick="confirmDelete(${empresa.idEmpresa}, 2)">
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
                            alt="Icone de informação" onClick="exibirInfoDCenter(${dCenter.idDataCenter})" id="Info${dCenter.idDataCenter}">
                        <button class="btn-crud blue" id="BtnEdit${dCenter.idDataCenter}" onClick="exibirEditDCenter(${dCenter.idDataCenter})">
                            <img src="../assets/icons/edit-icon.png" alt="Editar">
                        </button>
                        <button class="btn-crud red" id="BtnDelete${dCenter.idDataCenter}" onClick="confirmDelete(${dCenter.idDataCenter}, 3)">
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
                            alt="Icone de informação" onClick="exibirInfoServer(${server.ipServidor})" id="Info${server.ipServidor}">
                        <button class="btn-crud blue" id="BtnEdit${server.ipServidor}" onClick="exibirEditServidor(${server.ipServidor})">
                            <img src="../assets/icons/edit-icon.png" alt="Editar">
                        </button>
                        <button class="btn-crud red" id="BtnDelete${server.ipServidor}" onClick="confirmDelete(${server.ipServidor}, 4)">
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

// ---------------------------------------------------------------------------- //
    //EXIBIÇÃO DOS DADOS DA TABELA

function exibirInfoUser(id) {
    fetch(`/usuario/selecionarDadosGerais/${id}`, {
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

function exibirInfoEmpresa(id) {
    fetch(`/empresas/selecionarDadosGerais/${id}`, {
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

function exibirInfoDCenter(id) {
    fetch(`/dataCenter/selecionarDadosGerais/${id}`, {
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

function exibirInfoServer(id) {
    fetch(`/servidor/selecionarDadosGerais/${id}`, {
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
// ---------------------------------------------------------------------------- //


// ---------------------------------------------------------------------------- //
    //ABRINDO MODAL DE EDIÇÃO

function exibirEditUser(id) {
    document.getElementById('ModalContent').innerHTML = `
    <img class="fechar select-disable" src="../assets/icons/X.png" alt="Fechar" onclick="abrirModal()">
    <h1>Editar informações do usuário:</h1>
    <form>
        <label>
            <h3>Nome do usuário:</h3>
            <input type="text" placeholder="Exemplo: João da Silva" id="IptNomeUserEdit">
        </label>
        <label>
            <h3>E-mail do usuário:</h3>
            <input type="text" placeholder="Exemplo: joão@gmail.com" id="IptEmailUserEdit">
        </label>
        <label>
            <h3>Cargo do usuário:</h3>
            <input type="text" placeholder="Exemplo: Analista NOC" id="IptCargoUserEdit">
        </label>
        <label>
            <h3>CPF do usuário:</h3>
            <input type="text" placeholder="Exemplo: 918.538.252.39" id="IptCpfUserEdit"
                maxlength="11">
        </label>
        <label>
            <h3>Permissão:</h3>
            <select name="permissao-user-editdit" id="SlcPermissaoEdit">
                <option value="2">Expert</option>
                <option value="3">Guest</option>
            </select>
        </label>
        <label>
            <h3>Senha do usuário:</h3>
            <input type="password" placeholder="Digite a senha" id="IptSenhaUserEdit">
        </label>
        <label>
            <h3>Confirmar senha:</h3>
            <input type="password" placeholder="Confirme a senha" id="IptCSenhaUserEdit">
        </label>
    </form>
    <button class="btn-cadastro" onclick="editarUser(${id})" id="BtnEditUser">
        Editar
    </button>
    `;
    abrirModal();
}

function exibirEditEmpresa(id) {
    document.getElementById('ModalContent').innerHTML = `
    <img class="fechar select-disable" src="../assets/icons/X.png" alt="Fechar" onclick="abrirModal()">
    <h1>Editar informações do usuário:</h1>
    <form class="type2">
        <label>
            <h3>Razão Social:</h3>
            <input type="text" placeholder="Exemplo: Performee." id="IptRSEmpresaEdit">
        </label>
        <label>
            <h3>Nome Fantasia:</h3>
            <input type="text" placeholder="Exemplo: Per4Mee." id="IptNFEmpresaEdit">
        </label>
        <label>
            <h3>CNPJ da Empresa:</h3>
            <input type="text" placeholder="Exemplo: 10.287.384/0001-29" id="IptCNPJEmpresaEdit" maxlength="14">
        </label>
        <label>
            <h3>Telefone da Empresa:</h3>
            <input type="text" placeholder="Exemplo: (11) 94842-9422" id="IptTelEmpresaEdit" maxlength="13">
        </label>
        <label>
            <h3>E-mail da Empresa:</h3>
            <input type="text" placeholder="Performee@contato.com" id="IptEmailEmpresaEdit">
        </label>
    </form>
    <button class="btn-cadastro" onclick="editarEmpresa(${id})" id="BtnEditEmpresa">
        Editar
    </button>
    `;
    abrirModal();
}

function exibirEditDCenter(id) {
    document.getElementById('ModalContent').innerHTML = `
    <img class="fechar select-disable" src="../assets/icons/X.png" alt="Fechar" onclick="abrirModal()">
    <h1>Editar informações do data center:</h1>
    <form>
            <label>
                <h3>Nome do Data Center:</h3>
                <input type="text" placeholder="Exemplo: Data Center 01" id="IptNomeDCenterEdit">
            </label>
            <label>
                <h3>Tamanho do Data Center:</h3>
                <input type="text" placeholder="Exemplo: 500 (em M²)" id="IptTamanhoDCenterEdit">
            </label>
            <label>
                <h3>Pais do Data Center:</h3>
                <input type="text" placeholder="Exemplo: Brasil" id="IptPaisEnderecoEdit">
            </label>
            <label>
                <h3>Estado do Data Center:</h3>
                <input type="text" placeholder="Exemplo: SP" id="IptEstadoEnderecoEdit" maxlength="2">
            </label>
            <label>
                <h3>Cidade do endereço:</h3>
                <input type="text" placeholder="Exemplo: Belo Horizonte" id="IptCidadeEnderecoEdit">
            </label>
            <label>
                <h3>Bairro do endereco:</h3>
                <input type="text" placeholder="Exemplo: Guaianases" id="IptBairroEnderecoEdit">
            </label>
            <label>
                <h3>Número do endereço:</h3>
                <input type="text" placeholder="Exemplo: 254" id="IptNumEnderecoEdit">
            </label>
            <label>
                <h3>Complemento:</h3>
                <input type="text" placeholder="Exemplo: Zona Norte B2" id="IptCompEnderecoEdit">
            </label>
            <label>
                <h3>CEP do endereço:</h3>
                <input type="text" placeholder="Exemplo: 08451-050" id="IptCEPEnderecoEdit" maxlength="8">
            </label>
    </form>
        <button class="btn-cadastro" onclick="editarDCenter(${id})" id="BtnEditDCenter">
            Editar
        </button>
    `;
    abrirModal();
}

function exibirEditServidor(id) {
    document.getElementById('ModalContent').innerHTML = `
    <img class="fechar select-disable" src="../assets/icons/X.png" alt="Fechar" onclick="abrirModal()">
    <h1>Editar informações do servidor:</h1>
    <form>
        <label>
            <h3>Hostname:</h3>
            <input type="text" placeholder="Exemplo: DESKTOP-P908" id="IptNomeServerEdit">
        </label>
        <label>
            <h3>Domínio do Servidor:</h3>
            <input type="text" placeholder="Exemplo: 198.128.289-9" id="IptDNSServerEdit"
                maxlength="14">
        </label>
        <label>
            <h3>Sistema Operacional:</h3>
            <select name="sisop-server-edit" id="SlcSisOpEdit">
                <option value="Windows">Windows</option>
                <option value="Linux Ubuntu">Ubuntu</option>
                <option value="Linux Mint">Linux Mint</option>
                <option value="Linux Fedora">Linux Fedora</option>
                <option value="Linux RedHat">Linux RedHat</option>
                <option value="Linux Kali">Linux Kali</option>
                <option value="Arch Linux">Arch Linux</option>
            </select>
        </label>
        <label>
            <h3>Ativo:</h3>
            <select name="ativo-server-edit" id="SlcAtivoEdit">
                <option value="0">Desligado</option>
                <option value="1">Ativo</option>
            </select>
        </label>
    </form>
    <button class="btn-cadastro" onclick="editarServidor(${id})" id="BtnEditServidor">
        Editar
    </button>
    `;
    abrirModal();
}
// ---------------------------------------------------------------------------- //


// ---------------------------------------------------------------------------- //
    //ABRINDO MODAL DO DELETE

function confirmDelete(id, type) {
    switch (type) {
        case 1: {
            document.getElementById('ModalContent').innerHTML = `
            <div class="container-confirmacao">
            <div>
                <h1>Você está prestes a <span>EXCLUIR</span> o registro!</h1>
            <text>Após a confirmação, os dados serão excluidos, assim como suas associações.</text>
            </div>
            <div>
                <button class="btn-confirm-delete cancel" onclick="abrirModal()">Cancelar</button>
                <button class="btn-confirm-delete delete" onclick="deleteUser(${id})">Deletar</button>
            </div>
        </div>
            `;
            abrirModal();
            break;
        }
        case 2: {
            document.getElementById('ModalContent').innerHTML = `
            <div class="container-confirmacao">
            <div>
                <h1>Você está prestes a <span>EXCLUIR</span> o registro!</h1>
            <text>Após a confirmação, os dados serão excluidos, assim como suas associações.</text>
            </div>
            <div>
                <button class="btn-confirm-delete cancel" onclick="abrirModal()">Cancelar</button>
                <button class="btn-confirm-delete delete" onclick="deleteEmpresa(${id})">Deletar</button>
            </div>
        </div>
            `;
            abrirModal();
            break;
        }
        case 3: {
            document.getElementById('ModalContent').innerHTML = `
            <div class="container-confirmacao">
            <div>
                <h1>Você está prestes a <span>EXCLUIR</span> o registro!</h1>
            <text>Após a confirmação, os dados serão excluidos, assim como suas associações.</text>
            </div>
            <div>
                <button class="btn-confirm-delete cancel" onclick="abrirModal()">Cancelar</button>
                <button class="btn-confirm-delete delete" onclick="deleteDCenter(${id})">Deletar</button>
            </div>
        </div>
            `;
            abrirModal();
            break;
        }
        case 4: {
            document.getElementById('ModalContent').innerHTML = `
            <div class="container-confirmacao">
            <div>
                <h1>Você está prestes a <span>EXCLUIR</span> o registro!</h1>
            <text>Após a confirmação, os dados serão excluidos, assim como suas associações.</text>
            </div>
            <div>
                <button class="btn-confirm-delete cancel" onclick="abrirModal()">Cancelar</button>
                <button class="btn-confirm-delete delete" onclick="deleteServidor(${id})">Deletar</button>
            </div>
        </div>
            `;
            abrirModal();
            break;
        }
    }
}

// ---------------------------------------------------------------------------- //
//EDIT DAS TABELAS

function editarUser(id) {
    // colocar lógica...
    abrirModal();
}

function editarEmpresa(id) {
    // colocar lógica...
    abrirModal();
}

function editarDCenter(id) {
    // colocar lógica...
    abrirModal();
}

function editarServidor(id) {
    // colocar lógica...
    abrirModal();
}
// ---------------------------------------------------------------------------- //


// ---------------------------------------------------------------------------- //
//DELETES DAS TABELAS

function deleteUser(id) {
    // COLOCAR A LÓGICA DO DELETE USER
    abrirModal();
}

function deleteEmpresa(id) {
    // COLOCAR A LOGICA DO DELETE EMPRESA
    abrirModal();
}

function deleteDCenter(id) {
    // COLOCAR A LÓGICA DO DELETE DATA CENTER
    abrirModal();
}

function deleteServidor(id) {
    // COLOCAR A LOGICA DO DELETE SERVIDOR
    abrirModal();
}
// ---------------------------------------------------------------------------- //

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