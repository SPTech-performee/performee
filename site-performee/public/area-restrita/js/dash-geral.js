const inputLog = document.getElementById('InputLog')
    , slcLog = document.getElementById('SlcLog')
    , containerLogs = document.getElementById('LogContent')
    , chart1 = document.getElementById('myChart1');

let arrayServerIntavel = [];

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.PERMISSAO_USUARIO != 1) {
        fetch(`/alerta/qtdServerInstavelPerEmpresa/${sessionStorage.FK_EMPRESA}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    for (let i = 0; i < jsonInfo.length; i++) {
                        arrayServerIntavel.push(jsonInfo[i].ServidoresEmRisco);
                    }
                }).then(() => {
                    carregarChartQtdServerIntaveis();
                });
            } else {
                console.log('Erro no .THEN qtdServerInstavelPerEmpresa() do Alertas');
            }
        });

        fetch(`/servidor/buscarQtdAtivosDesativadosPerEmpresa/${sessionStorage.FK_EMPRESA}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    document.getElementById('QtdServersAtivos').innerText = `
                        ${jsonInfo[0].Ativos}
                    `;
                    document.getElementById('QtdServersDesativos').innerText = `
                        ${jsonInfo[0].EmRisco}
                    `;
                })
            } else {
                console.log('Erro no .THEN buscarQtdAtivosDesativadosPerEmpresa() do Alertas');
            }
        });

        fetch(`/alerta/selecionarAlertasPerEstadoPerEmpresa/${sessionStorage.FK_EMPRESA}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    document.getElementById('PercentEstavel').innerText = `${jsonInfo[0].Estavel}%`;
                    document.getElementById('PercentCuidado').innerText = `${jsonInfo[0].Cuidado}%`;
                    document.getElementById('PercentRisco').innerText = `${jsonInfo[0].EmRisco}%`;
                })
            } else {
                console.log('Erro no .THEN selecionarAlertasPerEstadoPerEmpresa() do Alertas');
            }
        });
        exibirLogs();

    } else {
        fetch('/alerta/qtdServerInstavel', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    for (let i = 0; i < jsonInfo.length; i++) {
                        arrayServerIntavel.push(jsonInfo[i].ServidoresEmRisco);
                    }
                }).then(() => {
                    carregarChartQtdServerIntaveis();
                });
            } else {
                console.log('Erro no .THEN selecionarAlertasPerEstado() do Alertas');
            }
        });

        fetch('/servidor/buscarQtdAtivosDesativados', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    document.getElementById('QtdServersAtivos').innerText = `
                        ${jsonInfo[0].Ativos}
                    `;
                    document.getElementById('QtdServersDesativos').innerText = `
                        ${jsonInfo[0].EmRisco}
                    `;
                })
            } else {
                console.log('Erro no .THEN selecionarAlertasPerEstado() do Alertas');
            }
        });

        fetch('/alerta/selecionarAlertasPerEstado', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    document.getElementById('PercentEstavel').innerText = `${jsonInfo[0].Estavel}%`;
                    document.getElementById('PercentCuidado').innerText = `${jsonInfo[0].Cuidado}%`;
                    document.getElementById('PercentRisco').innerText = `${jsonInfo[0].EmRisco}%`;
                })
            } else {
                console.log('Erro no .THEN selecionarAlertasPerEstado() do Alertas');
            }
        })
        exibirLogs();
    }
})

function exibirLogs() {
    containerLogs.innerHTML = ``;
    let condicaoType = document.querySelector(`select[name="slc-order-log"]`).value;

    if (sessionStorage.PERMISSAO_USUARIO != 1) {
        fetch(`/alerta/exibirTodosLogsPerEmpresa/${condicaoType}/${sessionStorage.FK_EMPRESA}`, {
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
                            <span>${alerta.razaoSocial}</span>
                            <span>${alerta.nome}</span>
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
                        if (jsonInfo[i].tipo == 'Estável') {
                            document.getElementById(`logBoxStatus${k}`).innerHTML += `
                                <span class="green" style="border-radius: 100%;"></span>
                            `;
                        } else if (jsonInfo[i].tipo == 'Em risco') {
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
                console.log('Erro no .THEN exibirTodosLogsPerEmpresa() do Alertas');
            }
        })
    } else {
        fetch(`/alerta/exibirTodosLogs/${condicaoType}`, {
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
                            <span>${alerta.razaoSocial}</span>
                            <span>${alerta.nome}</span>
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
                        if (jsonInfo[i].tipo == 'Estável') {
                            document.getElementById(`logBoxStatus${k}`).innerHTML += `
                                <span class="green" style="border-radius: 100%;"></span>
                            `;
                        } else if (jsonInfo[i].tipo == 'Em risco') {
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
                console.log('Erro no .THEN exibirTodosLogs() do Alertas');
            }
        })
    }
}