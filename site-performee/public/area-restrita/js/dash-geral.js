const inputLog = document.getElementById('InputLog')
    , slcLog = document.getElementById('SlcLog')
    , containerLogs = document.getElementById('LogContent')
    , chart1 = document.getElementById('myChart1');

let arrayServerIntavel = [];

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.PERMISSAO_USUARIO != 1) {

        // FETCHS ESPECÍFICOS DA EMPRESA

    } else {
        fetch('/alerta/qtdServerInstavel', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    arrayServerIntavel.push(jsonInfo[0].atual);
                    arrayServerIntavel.push(jsonInfo[0].diasAtras1);
                    arrayServerIntavel.push(jsonInfo[0].diasAtras2);
                    arrayServerIntavel.push(jsonInfo[0].diasAtras3);
                    arrayServerIntavel.push(jsonInfo[0].diasAtras4);
                    arrayServerIntavel.push(jsonInfo[0].diasAtras5);
                    arrayServerIntavel.push(jsonInfo[0].diasAtras6);
                }).then(() => {
                    carregarChartQtdServerIntaveis();
                });
            } else {
                console.log('Erro no .THEN selecionarAlertasPerEstado() do Alertas');
            }
        })

        fetch('/servidor/buscarQtdAtivosDesativados', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    document.getElementById('QtdServersAtivos').innerText = `
                        ${jsonInfo[0].serversAtivos}
                    `;
                    document.getElementById('QtdServersDesativos').innerText = `
                        ${jsonInfo[0].serversDesativados}
                    `;
                })
            } else {
                console.log('Erro no .THEN selecionarAlertasPerEstado() do Alertas');
            }
        })

        fetch('/alerta/selecionarAlertasPerEstado', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((jsonInfo) => {
                    let percentAlertasEstaveis = ((jsonInfo[0].qtdAlertasEstavel / jsonInfo[0].qtdTotalAlertas) * 100).toFixed(2)
                        , percentAlertasCuidado = ((jsonInfo[0].qtdAlertasCuidado / jsonInfo[0].qtdTotalAlertas) * 100).toFixed(2)
                        , percentAlertasPerigo = ((jsonInfo[0].qtdAlertasRisco / jsonInfo[0].qtdTotalAlertas) * 100).toFixed(2);

                    document.getElementById('PercentEstavel').innerText = `${percentAlertasEstaveis}%`;
                    document.getElementById('PercentCuidado').innerText = `${percentAlertasCuidado}%`;
                    document.getElementById('PercentRisco').innerText = `${percentAlertasPerigo}%`;
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
                    <p>${alerta.dataAlerta}</p>
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