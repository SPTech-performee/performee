const containerCard = document.getElementById('Content');

let grafico = [];

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.TIPO_USER != 'Admin') {

        // INSERIR FETCHS ESPECÍFICOS COM A EMPRESA DO USER

    } else {
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
                                    let i = 1;
                                    containerCard.innerHTML += `
                                    <div class="column-data-center">
                                    <div>
                                        <a href="./dash-datacenter-especifico.html">
                                            ${jsonInfo2[0].razaoSocial} - ${jsonInfo2[0].nome}
                                        </a>
                                        <img class="select-disable" src="../assets/icons/info-icone.png" alt="Icone de informação">
                                    </div>
                                    <div class="data-center-content">
                                        <div class="container-info">
                                            <div>
                                                <div>
                                                    <h2>Quantidade de servidores</h2>
                                                    <span>${jsonInfo2[0].qtdServer}</span>
                                                </div>
                                                <div id="SisOpMaisUtilizadoCard${i}"></div>
                                            </div>
                                            <div>
                                                <h2>Status dos servidores por porcentagem</h2>
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
                                    if(jsonInfo2[0].sisOpMaisUtilizado != "Windows") {
                                        document.getElementById('SisOpMaisUtilizadoCard${i}').innerHTML = `
                                        <h2>Sistema Operacional mais presente</h2>
                                        <img src="../assets/icons/LinuxLogo.png" alt="Sistema Operacional">
                                    `;
                                    } else {
                                        document.getElementById('SisOpMaisUtilizadoCard${i}').innerHTML = `
                                        <h2>Sistema Operacional mais presente</h2>
                                        <img src="../assets/icons/WindowsLogo.png" alt="Sistema Operacional">
                                    `;
                                    }
                                    graficos.add(`myChart${dt.idDataCenter}`);
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