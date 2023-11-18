const qualServer = document.getElementById('QualServidor')

    , usoCpu = document.getElementById('UsoCpu')
    , usoRam = document.getElementById('UsoRam')
    , usoDisc = document.getElementById('UsoDisc')
    , uploadRede = document.getElementById('UploadRede')

    , statusCpu = document.getElementById('StatusCpu')
    , statusRam = document.getElementById('StatusRam')
    , statusDisc = document.getElementById('StatusDisc')
    , statusRede = document.getElementById('StatusRede')

    , containerLogsDefault = document.getElementById('LogContent');

let arrayAlertasCpu = []
    , arrayAlertasRam = []
    // , arrayAlertasDisco = []
    , arrayAlertasRede = []
    
    , arrayRamPerHora = [];

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
                jsonInfo.forEach(e => {
                    arrayRamPerHora.push([e.usoRam, e.capacidadeTotal]);
                });
            }).then(() => {
                loadRamUsadoPerHora();
            });
        } else {
            console.log('Erro no .THEN leituraUsoRamPerHora() do servidor');
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
                for (let i = 0; i < jsonInfo.length; i++) {
                    arrayAlertasCpu.push(jsonInfo[i].quantidade);
                }
                loadAlertaDiaCpu();
            })
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
                for (let i = 0; i < jsonInfo.length; i++) {
                    arrayAlertasRam.push(jsonInfo[i].quantidade);
                }
                loadAlertaDiaRam();
            })
        } else {
            console.log('Erro no .THEN qtdAlertasPerRam() do alerta');
        }
    });

    // fetch(`/alerta/qtdAlertasPerDisco/${sessionStorage.IP_SERVIDOR}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // }).then((resposta) => {
    //     if (resposta.ok) {
    //         resposta.json().then((jsonInfo) => {
    //             for (let i = 0; i < jsonInfo.length; i++) {
    //                 arrayAlertasDisco.push(jsonInfo[i].quantidade);
    //             }
    //             loadAlertaDiaDisco();
    //         })
    //     } else {
    //         console.log('Erro no .THEN qtdAlertasPerDisco() do alerta');
    //     }
    // });

    fetch(`/alerta/qtdAlertasPerRede/${sessionStorage.IP_SERVIDOR}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then((jsonInfo) => {
                for (let i = 0; i < jsonInfo.length; i++) {
                    arrayAlertasRede.push(jsonInfo[i].quantidade);
                }
                loadAlertaDiaRede();
            })
        } else {
            console.log('Erro no .THEN qtdAlertasPerRede() do alerta');
        }
    });


    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------


    fetchUltimasLeiturasCpu();
    fetchUltimasLeiturasGpu();
    fetchUltimasLeiturasRam();
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
                        <p>
                        <span>${alerta.componente}</span>
                        </p>
                        <p>${alerta.tipoAlerta}</p>
                        <p class="desc">${alerta.descricao}</p>
                        <p>${alerta.dataAlerta}</p>
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