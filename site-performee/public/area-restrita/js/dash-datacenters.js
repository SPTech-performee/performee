const containerCard = document.getElementById('Content');

let charts = [];
sessionStorage.ID_DATACENTER = null;
sessionStorage.NOME_DATACENTER = null;

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.PERMISSAO_USUARIO != 1) {
        quemUsa.innerText = `Cliente`;
        fetch(`/dataCenter/selecionarTudoPerEmpresa/${sessionStorage.FK_EMPRESA}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    jsonInfo.forEach(dt => {
                        fetch(`/dataCenter/exibirDadosEspecificosDC/${dt.idDataCenter}`, {
                            method: 'GET',
                            headers: {
                                'Content-type': 'application/json'
                            }
                        }).then((resposta2) => {
                            if (resposta2.ok) {
                                resposta2.json().then((jsonInfo2) => {
                                    containerCard.innerHTML += `
                                    <div class="column-data-center">
                                    <div>
                                        <a href="./dash-datacenter-especifico.html" onclick="getIdDataCenter(${dt.idDataCenter}, '${dt.nome}')">
                                            ${jsonInfo2[0].razaoSocial} - ${jsonInfo2[0].nome}
                                        </a>
                                        <img class="select-disable" src="../assets/icons/info-icone.png" alt="Icone de informação" onclick="exibirInfoDCenter(${dt.idDataCenter})">
                                    </div>
                                    <div class="data-center-content">
                                        <div class="container-info">
                                            <div>
                                                <div>
                                                    <h2>Quantidade de servidores</h2>
                                                    <span>${jsonInfo2[0].qtdServer}</span>
                                                </div>
                                                <div id="SisOpMaisUtilizadoCard${dt.idDataCenter}"></div>
                                            </div>
                                            <div>
                                                <h2>Quantidade de servidores em cada alerta de estado (hoje)</h2>
                                                <canvas id="myChart${dt.idDataCenter}"></canvas>
                                            </div>
                                            <div>
                                                <div>
                                                    <h2>Ativos: </h2> <span>${jsonInfo2[0].serversAtivo}</span>
                                                </div>
                                                <div>
                                                    <h2>Inativos: </h2> <span>${jsonInfo2[0].serversDesativados}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    `;
                                    if (jsonInfo2[0].sisOpMaisUtilizado != "Windows") {
                                        document.getElementById(`SisOpMaisUtilizadoCard${dt.idDataCenter}`).innerHTML = `
                                        <h2>Sistema Operacional mais presente</h2>
                                        <img src="../assets/icons/LinuxLogo.png" alt="Sistema Operacional">
                                    `;
                                    } else {
                                        document.getElementById(`SisOpMaisUtilizadoCard${dt.idDataCenter}`).innerHTML = `
                                        <h2>Sistema Operacional mais presente</h2>
                                        <img src="../assets/icons/WindowsLogo.png" alt="Sistema Operacional">
                                    `;
                                    }
                                    charts.push({
                                        chart: `myChart${dt.idDataCenter}`,
                                        idDCenter: `${dt.idDataCenter}`
                                    });
                                    criarGraficos(charts[charts.length - 1]);
                                });

                            } else {
                                console.log('Erro no .THEN exibirDadosEspecificosDC() do data center');
                            }
                        });
                    })
                })
            } else {
                console.log('Erro no .THEN selecionarTudo() do data center');
            }
        });

    } else {
        quemUsa.innerText = `Administrador`;
        fetch(`/dataCenter/selecionarTudo`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    jsonInfo.forEach(dt => {
                        fetch(`/dataCenter/exibirDadosEspecificosDC/${dt.idDataCenter}`, {
                            method: 'GET',
                            headers: {
                                'Content-type': 'application/json'
                            }
                        }).then((resposta2) => {
                            if (resposta2.ok) {
                                resposta2.json().then((jsonInfo2) => {
                                    containerCard.innerHTML += `
                                    <div class="column-data-center">
                                    <div>
                                        <a href="./dash-datacenter-especifico.html" onclick="getIdDataCenter(${dt.idDataCenter}, '${dt.nome}')">
                                            ${jsonInfo2[0].razaoSocial} - ${jsonInfo2[0].nome}
                                        </a>
                                        <img class="select-disable" src="../assets/icons/info-icone.png" alt="Icone de informação" onclick="exibirInfoDCenter(${dt.idDataCenter})">
                                    </div>
                                    <div class="data-center-content">
                                        <div class="container-info">
                                            <div>
                                                <div>
                                                    <h2>Quantidade de servidores</h2>
                                                    <span>${jsonInfo2[0].qtdServer}</span>
                                                </div>
                                                <div id="SisOpMaisUtilizadoCard${dt.idDataCenter}"></div>
                                            </div>
                                            <div>
                                                <h2>Quantidade de servidores em cada alerta de estado (hoje)</h2>
                                                <canvas id="myChart${dt.idDataCenter}"></canvas>
                                            </div>
                                            <div>
                                                <div>
                                                    <h2>Ativos: </h2> <span>${jsonInfo2[0].serversAtivo}</span>
                                                </div>
                                                <div>
                                                    <h2>Inativos: </h2> <span>${jsonInfo2[0].serversDesativados}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    `;
                                    if (jsonInfo2[0].sisOpMaisUtilizado != "Windows") {
                                        document.getElementById(`SisOpMaisUtilizadoCard${dt.idDataCenter}`).innerHTML = `
                                        <h2>Sistema Operacional mais presente</h2>
                                        <img src="../assets/icons/LinuxLogo.png" alt="Sistema Operacional">
                                    `;
                                    } else {
                                        document.getElementById(`SisOpMaisUtilizadoCard${dt.idDataCenter}`).innerHTML = `
                                        <h2>Sistema Operacional mais presente</h2>
                                        <img src="../assets/icons/WindowsLogo.png" alt="Sistema Operacional">
                                    `;
                                    }
                                    charts.push({
                                        chart: `myChart${dt.idDataCenter}`,
                                        idDCenter: `${dt.idDataCenter}`
                                    });
                                    criarGraficos(charts[charts.length - 1]);
                                });

                            } else {
                                console.log('Erro no .THEN exibirDadosEspecificosDC() do data center');
                            }
                        });
                    })
                })
            } else {
                console.log('Erro no .THEN selecionarTudo() do data center');
            }
        });
    }
});

function getIdDataCenter(id, nome) {
    sessionStorage.ID_DATACENTER = id;
    sessionStorage.NOME_DATACENTER = nome;
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