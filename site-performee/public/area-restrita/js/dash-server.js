const qualServer = document.getElementById('QualServidor')
    , usoCpu = document.getElementById('UsoCpu')
    , usoRam = document.getElementById('UsoRam')
    , usoDisc = document.getElementById('UsoDisc')
    , uploadRede = document.getElementById('UploadRede')
    
    , containerLogsDefault = document.getElementById('LogContent');

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
                usoRam.innerText = `${jsonInfo[0].UsoRAM}`;
                usoDisc.innerText = `${jsonInfo[0].velocidadeEscrita} MB/s`;
                uploadRede.innerText = `${jsonInfo[0].uploadAtual} MB/s`;
            })
        } else {
            console.log('Erro no .THEN exibirDadosKpiServidor() do servidor');
        }
    });
    exibirLogsPerServidor();
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