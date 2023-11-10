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
                                <img src="../assets/icons/X-white.png" alt="NEGADO">
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
                                    <img src="../assets/icons/X-white.png" alt="NEGADO">
                                </li>
                                <li>
                                <span>Crud do usuário</span>
                                    <img src="../assets/icons/X-white.png" alt="NEGADO">
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
                // FETCH DE MUDANÇA PARA USUARIO
                
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
            
                        console.log("Nome editado")
                    } else {
                        throw ("Houve um erro ao tentar realizar o cadastro!");
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`)
                    
                });
                return false;

            } else {
                // FETCH DE MUDANÇA PARA ADMIN
               
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
            break;
        }
        case 2: {
            if (sessionStorage.PERMISSAO_USUARIO != 1) {
                // FETCH DE MUDANÇA PARA USUARIO

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
            
                        console.log("Nome editado")
                    } else {
                        throw ("Houve um erro ao tentar realizar o cadastro!");
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`)
                    
                });
                return false;
                
            } else {
                // FETCH DE MUDANÇA PARA ADMIN
                var emailVar = IptEmailUser.value;

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
            break;
        }
        case 3: {
            if (sessionStorage.PERMISSAO_USUARIO != 1) {
                // FETCH DE MUDANÇA PARA USUARIO

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
            
                        console.log("Nome editado")
                    } else {
                        throw ("Houve um erro ao tentar realizar o cadastro!");
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`)
                    
                });
                return false;
            } else {
                // FETCH DE MUDANÇA PARA ADMIN
               

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
            break;
        }
        case 4: {
            if (sessionStorage.PERMISSAO_USUARIO != 1) {
                // FETCH DE MUDANÇA PARA USUARIO

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
            
                        console.log("Nome editado")
                    } else {
                        throw ("Houve um erro ao tentar realizar o cadastro!");
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`)
                    
                });
                return false;
            } else {
                // FETCH DE MUDANÇA PARA ADMIN
            }
            break;
        }
    }

    
    
    var idAdminVar = 1;


    
}

// editar usuario
function editInfoUSer() {
    
    var emailVar = IptNomeUser.value;
    var cpfVar = IptCpfUser.value;
    var cargoVar = IptCargoUser.value;

    fetch("/usuario/editar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            cpfServer: cpfVar,
            cargoServer: cargoVar,
            idUsuarioServer: idUsuarioVar
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


// editar empresa
function editarEmpresa() {

    var razaoSocialVar = IptrazaoSocEmp.value;
    var nomeFantasiaVar = IptNomeFantasia.value;
    var cnpjVar = cnp.value;
    var emailVar = IptCargoUser.value;
    var telefoneVar = IptTelEmp.value;
    var idEmpresaVar;


    fetch("/empresas/editar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            razaoSocialServer: razaoSocialVar,
            nomeFantasiaServer: nomeFantasiaVar,
            cnpjServer: cnpjVar,
            emailServer: emailVar,
            telefoneServer: telefoneVar,
            idEmpresaServer: idEmpresaVar
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

// Editar DataCenter
function editarEmpresa() {

    var nomeVar = IptrazaoSocEmp.value;
    var tamanhoVar = IptNomeFantasia.value;

    //dados Endereço
    var cepVar = IptCargoUser.value;
    var bairroVar = IptTelEmp.value;
    var numeroVar = IptTelEmp.value;
    var complementoVar = IptTelEmp.value;
    var cidadeVar = IptTelEmp.value;
    var EstadoVar = IptTelEmp.value;
    var PaisVar = IptTelEmp.value;
    var idDataCenterVar;



    fetch("/dataCenter/editar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            tamanhoServer: tamanhoVar,
            idDataCenterServer: idDataCenterVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'dcEditado',
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


    fetch("/endereco/editar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cepServer: cepVar,
            bairroServer: bairroVar,
            numeroServer: numeroVar,
            complementoServer: complementoVar,
            cidadeServer: cidadeVar,
            estadoServer: EstadoVar,
            paisServer: paisVar,
            fkDataCenterServer: idDataCenterVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'dcEditado',
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

// editar servidor
function editarServer() {

    var hostNameVar = IptrazaoSocEmp.value;
    var dominioVar = IptNomeFantasia.value;
    var sisOpVar = cnp.value;
    var ativoVar = IptCargoUser.value;
    var idServidorVar;


    fetch("/servidor/editar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            hostNameServer: hostNameVar,
            dominio: dominioVar,
            sisOpServer: sisOpVar,
            ativoServer: ativoVar,
            idServidorVar: idServidor
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

