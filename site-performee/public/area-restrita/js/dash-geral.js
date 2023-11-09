const inputLog = document.getElementById('InputLog')
    , slcLog = document.getElementById('SlcLog');

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.PERMISSAO_USUARIO != 1) {
        // FETCHS ESPECÍFICOS DA EMPRESA
    } else {
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
    }
})