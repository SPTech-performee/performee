const qualServer = document.getElementById('QualServidor')

    , usoCpu = document.getElementById('UsoCpu')
    , usoRam = document.getElementById('UsoRam')
    , usoDisc = document.getElementById('UsoDisc')
    , uploadRede = document.getElementById('UploadRede')

    , statusCpu = document.getElementById('StatusCpu')
    , statusRam = document.getElementById('StatusRam')
    , statusDisc = document.getElementById('StatusDisc')
    , statusRede = document.getElementById('StatusRede')

    , containerLogsDefault = document.getElementById('LogContent')
    , containerLogsPeriodicos = document.getElementById('LogContentPeriódico');

let arrayAlertasCpu = []
    , arrayAlertasRam = []
    , arrayAlertasDisco = []
    , arrayAlertasRede = []

    , arrayComparacaoRede = []
    , coresArrayComparacaoRede = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch(`/servidor/selecionarDadosGerais/${sessionStorage.IP_SERVIDOR}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonInfo) => {
                qualServer.innerHTML = `
                    ${jsonInfo[0].hostname}
                `;
                if (jsonInfo[0].sisOp == "Windows") {
                    qualServer.innerHTML += `
                    <img class="select-disable"
                    src="../assets/icons/WindowsLogo-blue.png" alt="Sistema Operacional">
                    `;
                } else {
                    qualServer.innerHTML += `
                    <img class="select-disable"
                    src="../assets/icons/LinuxLogo-blue.png" alt="Sistema Operacional">
                    `;
                }
            })
        } else {
            console.log('Erro no .THEN selecionarDadosGerais() do servidor');
        }
    });

    fetch(`/servidor/exibirDadosKpiServidor/${sessionStorage.IP_SERVIDOR}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonInfo) => {
                usoCpu.innerText = `${jsonInfo[0].UsoCPU}`;
                if (jsonInfo[0].UsoCPU > 85) {
                    statusCpu.innerHTML += `<span class="status-span red"></span>`;
                } else if (jsonInfo[0].UsoCPU <= 84 || jsonInfo[0].UsoCPU > 66) {
                    statusCpu.innerHTML += `<span class="status-span yellow"></span>`;
                } else {
                    statusCpu.innerHTML += `<span class="status-span green"></span>`;
                }

                usoRam.innerText = `${jsonInfo[0].UsoRAM}`;
                if (jsonInfo[0].UsoRAM > (jsonInfo[0].capacidadeTotal * .85)) {
                    statusRam.innerHTML += `<span class="status-span red"></span>`;
                } else if (jsonInfo[0].UsoRAM <= (jsonInfo[0].capacidadeTotal * .84) || jsonInfo[0].UsoRAM > (jsonInfo[0].capacidadeTotal * .66)) {
                    statusRam.innerHTML += `<span class="status-span yellow"></span>`;
                } else {
                    statusRam.innerHTML += `<span class="status-span green"></span>`;
                }

                usoDisc.innerText = `${jsonInfo[0].velocidadeEscrita} MB/s`;
                statusDisc.innerHTML += `<span class="status-span yellow"></span>`;

                uploadRede.innerText = `${jsonInfo[0].uploadAtual} MB/s`;
                if (jsonInfo[0].uploadAtual < 20) {
                    statusRede.innerHTML += `<span class="status-span red"></span>`;
                } else if (jsonInfo[0].uploadAtual >= 20 && jsonInfo[0].uploadAtual <= 59) {
                    statusRede.innerHTML += `<span class="status-span yellow"></span>`;
                } else {
                    statusRede.innerHTML += `<span class="status-span green"></span>`;
                }
            });
        } else {
            console.log('Erro no .THEN exibirDadosKpiServidor() do servidor');
        }
    });
    exibirLogsPerServidor();

    fetch(`/leitura/leituraUsoRamPerHora/${sessionStorage.IP_SERVIDOR}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonInfo) => {
                jsonInfo.reverse();
                loadRamUsadoPerHora(jsonInfo);
            });
        } else {
            console.log('Erro no .THEN leituraUsoRamPerHora() do servidor');
        }
    });

    fetch(`/leitura/leituraComparacaoUpDownPerDia/${sessionStorage.IP_SERVIDOR}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonInfo) => {
                jsonInfo.forEach(perDia => {
                    arrayComparacaoRede.push([perDia.upload, perDia.download]);

                    let corUpload
                        , corDownload;

                    if (jsonInfo[0].upload < 20) {
                        corUpload = 'crimson';
                    } else if (jsonInfo[0].upload <= 59 || jsonInfo[0].upload > 20) {
                        corUpload = '#F1CE14';
                    } else {
                        corUpload = '#65da65';
                    }

                    if (jsonInfo[0].download < 40) {
                        corDownload = corUpload = 'crimson';
                    } else if (jsonInfo[0].download <= 89 || jsonInfo[0].download >= 40) {
                        corDownload = corUpload = '#F1CE14';
                    } else {
                        corDownload = corUpload = '#65da65';
                    }
                    coresArrayComparacaoRede.push([corUpload, corDownload]);
                });
            }).then(() => {
                loadCompararRede();
            });
        } else {
            console.log('Erro no .THEN leituraComparacaoUpDownPerDia() da leitura');
        }
    });

    fetch(`/alerta/statusComponentesPerSemana/${sessionStorage.IP_SERVIDOR}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonInfo) => {
                jsonInfo.forEach(e => {
                    if (e.tipoAlerta == 'Em risco') {
                        containerLogsPeriodicos.innerHTML += `
                            <div class="log-box">
                                <p>O componente ${e.tipoComponente} recebeu ${e.qtdAlertas} alertas do tipo ${e.tipoAlerta} nos ultimos 7 dias.</p>
                                <p>Urgentemente, verifique o(s) ponto(s) que estão impedindo o servidor performar de maneira decente.</p>
                                <span class="red" style="border-radius: 100%;"></span>
                            </div>
                        `;
                    } else if (e.tipoAlerta == 'Cuidado') {
                        containerLogsPeriodicos.innerHTML += `
                            <div class="log-box">
                                <p>O componente ${e.tipoComponente} recebeu ${e.qtdAlertas} alertas do tipo ${e.tipoAlerta} nos ultimos 7 dias.</p>
                                <p>Tenha atenção! Possível surgimento de grandes problemas de performance.</p>
                                <span class="yellow" style="border-radius: 100%;"></span>
                            </div>
                        `;
                    } else {
                        containerLogsPeriodicos.innerHTML += `
                            <div class="log-box">
                                <p>O componente ${e.tipoComponente} recebeu ${e.qtdAlertas} alertas do tipo ${e.tipoAlerta} nos ultimos 7 dias.</p>
                                <p>O componente apresenta um comportamento consistente sem muitos problemas.</p>
                                <span class="green" style="border-radius: 100%;"></span>
                            </div>
                        `;
                    }
                });
            });
        } else {
            console.log('Erro no .THEN leituraComparacaoUpDownPerDia() da leitura');
        }
    });

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Fetchs dos charts de alertas para cada componente

    // CPU
    fetch(`/alerta/qtdAlertasPerCpu/${sessionStorage.IP_SERVIDOR}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonInfo) => {
                loadAlertaDiaCpu(jsonInfo);
            });
        } else {
            console.log('Erro no .THEN qtdAlertasPerCpu() do alerta');
        }
    });

    fetch(`/alerta/qtdAlertasPerRam/${sessionStorage.IP_SERVIDOR}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonInfo) => {
                loadAlertaDiaRam(jsonInfo);
            });
        } else {
            console.log('Erro no .THEN qtdAlertasPerRam() do alerta');
        }
    });

    fetch(`/alerta/qtdAlertasPerDisco/${sessionStorage.IP_SERVIDOR}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonInfo) => {
                loadAlertaDiaDisco(jsonInfo);
            });
        } else {
            console.log('Erro no .THEN qtdAlertasPerDisco() do alerta');
        }
    });

    fetch(`/alerta/qtdAlertasPerRede/${sessionStorage.IP_SERVIDOR}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonInfo) => {
                loadAlertaDiaRede(jsonInfo);
            });
        } else {
            console.log('Erro no .THEN qtdAlertasPerRede() do alerta');
        }
    });


    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------


    fetchUltimasLeiturasCpu();
    fetchUltimasLeiturasGpu();
    fetchUltimasLeiturasRam();
    fetchUltimasLeiturasDisco();
    fetchUltimasLeiturasRede();
});

function exibirLogsPerServidor() {
    containerLogsDefault.innerHTML = ``;
    let condicaoType = document.querySelector(`select[name="slc-order-log"]`).value;

    fetch(`/alerta/exibirLogsPerServidor/${sessionStorage.IP_SERVIDOR}/${condicaoType}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            let i = 1;
            resposta.json().then((jsonInfo) => {
                jsonInfo.forEach(alerta => {
                    containerLogsDefault.innerHTML += `
                    <div class="log-box" id="logBoxStatus${i}">
                        <p><span>${alerta.componente}</span></p>
                        <p><span>${alerta.tipoComp}</span></p>
                        <p>${alerta.tipoAlerta}</p>
                        <p class="desc">${alerta.descricao}</p>
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
            console.log('Erro no .THEN exibirLogsPerServidor() do Alertas');
        }
    })
}

function exibirMaisInfo(type) {
    for (i = 1; i < 6; i++) {
        document.getElementById(`Container${i}`).style.display = 'none';
    }
    switch (type) {
        case 1: {
            document.getElementById(`Container1`).style.display = 'flex';
            break;
        }
        case 2: {
            document.getElementById(`Container2`).style.display = 'flex';
            break;
        }
        case 3: {
            document.getElementById(`Container3`).style.display = 'flex';
            break;
        }
        case 4: {
            document.getElementById(`Container4`).style.display = 'flex';
            break;
        } case 5: {
            document.getElementById(`Container5`).style.display = 'flex';
            break;
        }
    }
    abrirModal();
}