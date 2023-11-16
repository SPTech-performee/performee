var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Leitura;
    `;
    return database.executar(instrucao);
}

function deletarLeitura(tipo, id) {
    if (tipo == 'DC') {
        var instrucao = `
        delete from Leitura where fkDataCenter = '${id}';
        `;
        return database.executar(instrucao);
    } else if (tipo == 'Server') {
        var instrucao = `
        delete from Leitura where fkServidor = '${id}';
        `;
        return database.executar(instrucao);
    }
    else {
        var instrucao = `
    delete from Leitura where fkEmpresa = '${id}';
    `;
        return database.executar(instrucao);
    }
}

function ultimasLeiturasCpu(ipServidor) {
    var instrucao = `
    SELECT
    l.*, c.capacidadeTotal
    FROM
        Leitura l
        INNER JOIN Componente c ON l.fkComponente = c.idComponente
        INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'CPU'
    ORDER BY
        l.dataLeitura DESC
    LIMIT 7;
    `;
    return database.executar(instrucao);
}

function leituraMaisRecenteCpu(ipServidor) {
    var instrucao = `
    SELECT
    l.*, c.capacidadeTotal
    FROM
        Leitura l
        INNER JOIN Componente c ON l.fkComponente = c.idComponente
        INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'CPU'
    ORDER BY
        l.dataLeitura DESC
    LIMIT 1;
    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    deletarLeitura,
    ultimasLeiturasCpu,
    leituraMaisRecenteCpu
};