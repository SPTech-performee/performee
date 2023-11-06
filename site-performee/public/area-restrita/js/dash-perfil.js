const inputNome = document.getElementById('IptNomeUser')
    , inputEmail = document.getElementById('IptEmailUser')
    , inputCpf = document.getElementById('IptCpfUser')
    , inputCargo = document.getElementById('IptCargoUser');

document.getElementById('TituloNomeUser').innerHTML = sessionStorage.NOME_USUARIO;
document.getElementById('NomeUser').innerHTML = sessionStorage.NOME_USUARIO;

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.TIPO_USER != 'Admin') {
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

function ableEdit(btn) {
    let numBtb = Number(btn.id[btn.id.length - 1]);

    if (numBtb != 4) {
        document.getElementById(`BtnEdit${numBtb}`).setAttribute('disabled', true);
        document.getElementById(`BtnSalvar${numBtb}`).removeAttribute('disabled');
    }

    // Mudar para switch case e fazer funcionar
    if (numBtb == 1) {
        inputNome.removeAttribute('disabled');
    } else if (numBtb == 2) {
        inputEmail.removeAttribute('disabled');
    } else if (numBtb == 3) {
        inputCpf.removeAttribute('disabled');
    } else {
        if (sessionStorage.TIPO_USER == 'Admin') {
            // Adicionar um pop-up, sla, falando q admins nn podem mudar
            alert('Somente clientes podem mudar seu cargo!')
        } else {
            inputCargo.removeAttribute('disabled');
            document.getElementById(`BtnEdit${numBtb}`).setAttribute('disabled', true);
        document.getElementById(`BtnSalvar${numBtb}`).removeAttribute('disabled');
        }
    }
}

function editInfo(btn) {
    let numBtb = Number(btn.id[btn.id.length - 1]);
    switch (numBtb) {
        case 1: {

        }
        case 2: {

        }
        case 3: {

        }
        case 4: {

        }
    }
}