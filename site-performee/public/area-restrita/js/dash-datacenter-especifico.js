const spanQualDCenter = document.getElementById('QualDCenter')
    , containerDCenters = document.getElementById('DataInfo')
    , containerLogs = document.getElementById('LogContent');

spanQualDCenter.innerText = `${sessionStorage.NOME_DATACENTER}`;
sessionStorage.IP_SERVIDOR = null;
sessionStorage.HOSTNAME = null;

document.addEventListener('DOMContentLoaded', () => {
    fetch(`/servidor/exibirServidoresPerDCenter/${sessionStorage.ID_DATACENTER}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonInfo) => {
                let i = 1
                jsonInfo.forEach(server => {
                    containerDCenters.innerHTML += `
                    <div class="box-server">
                        <a href="./dash-server.html" id="Nome${i}" onclick="getIpServer('${server.ipServidor}', '${server.hostname}')">
                            Servidor XPTO
                        </a>
                        <div class="details-server">
                            <div>
                                <h3>Sistema Operacional</h3>
                                <div id="SisOP${i}">
                                    
                                </div>
                            </div>
                            <div>
                                <ul id="ListaDadosServidor${server.ipServidor}">
                                    <li>CPU: <span>xxx</span></li>
                                    <li>RAM: <span>xxx</span></li>
                                    <li>Disco: <span>xxx</span></li>
                                    <li>Rede: <span>xxx</span></li>
                                    <li>GPU: <span>xxx</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    `;
                    document.getElementById(`Nome${i}`).innerText = `
                        ${server.hostname}
                    `;
                    if (server.sisOp == "Windows") {
                        document.getElementById(`SisOP${i}`).innerHTML = `
                        <img class="select-disable" src="../assets/icons/WindowsLogo-black.png" alt="Sistema Operacional Windows">
                        <text>Windows</text>
                        `;
                    } else {
                        document.getElementById(`SisOP${i}`).innerHTML = `
                        <img class="select-disable" src="../assets/icons/LinuxLogo-black.png" alt="Sistema Operacional Linux">
                        <text>${server.sisOp}</text>
                        `;
                    }
                    loadInfoServers(server.ipServidor);
                    i++;
                })
            })
        } else {
            console.log('Erro no .THEN selecionarTudo() do data center');
        }
    });
    exibirLogsPerDCenter();
}
);

function getIpServer(id, nome) {
    sessionStorage.IP_SERVIDOR = id;
    sessionStorage.HOSTNAME = nome;
}

function loadInfoServers(ip) {
    fetch(`/servidor/exibirDadosGerais/${ip}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta2) => {
        if (resposta2.ok) {
            resposta2.json().then((jsonInfo2) => {
                document.getElementById(`ListaDadosServidor${ip}`).innerHTML = `
                <li>CPU: <span>${jsonInfo2[0].usoCpu}%</span></li>
                <li>RAM: <span>${jsonInfo2[0].usoRam}%</span></li>
                <li>Disco: <span>${jsonInfo2[0].velocidadeEscrita}</span></li>
                <li>Rede: <span>${jsonInfo2[0].uploadRede}</span></li>
                <li>GPU: <span>${jsonInfo2[0].usoGpu}%</span></li>
                `;
                if (jsonInfo2[0].ativo != 1) {
                    document.getElementById(`ListaDadosServidor${ip}`).innerHTML += `
                    <li>Servidor Desativado <span class="red"></span></li>
                `;
                } else {
                    document.getElementById(`ListaDadosServidor${ip}`).innerHTML += `
                    <li>Servidor Ativo <span class="green"></span></li>
                    `;
                }
            })
        } else {
            console.log('Erro no .THEN do exibirDadosGerais() dos Servidores');
        }
    });
}

function exibirLogsPerDCenter() {
    containerLogs.innerHTML = ``;
    let condicaoType = document.querySelector(`select[name="slc-order-log"]`).value;

    fetch(`/alerta/exibirLogsPerDCenter/${sessionStorage.ID_DATACENTER}/${condicaoType}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            let i = 1;
            resposta.json().then((jsonInfo) => {
                jsonInfo.forEach(alerta => {
                    containerLogs.innerHTML += `
                    <div class="log-box" id="logBoxStatus${i}">
                        <p>
                            <span>${alerta.hostname}</span>
                        </p>
                        <p>${alerta.descricao}</p>
                        <p>${formatarData(alerta.dataAlerta)}</p>
                    </div>
                    `;
                    i++;
                });
                i = 0;
                for (let k = i + 1; k <= jsonInfo.length; k++) {
                    if (jsonInfo[i].tipoAlerta == 'Estável') {
                        document.getElementById(`logBoxStatus${k}`).innerHTML += `
                            <span class="green" style="border-radius: 100%;"></span>
                        `;
                    } else if (jsonInfo[i].tipoAlerta == 'Em risco') {
                        document.getElementById(`logBoxStatus${k}`).innerHTML += `
                            <span class="red" style="border-radius: 100%;"></span>
                        `;
                    } else {
                        document.getElementById(`logBoxStatus${k}`).innerHTML += `
                            <span class="yellow" style="border-radius: 100%;"></span>
                        `;
                    }
                    i++;
                }
            })
        } else {
            console.log('Erro no .THEN exibirLogsPerDCenter() do Alertas');
        }
    })
}