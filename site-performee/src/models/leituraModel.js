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

function ultimasLeiturasGpu(ipServidor) {
    var instrucao = `
    SELECT
    l.*, c.capacidadeTotal
    FROM
        Leitura l
        INNER JOIN Componente c ON l.fkComponente = c.idComponente
        INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'GPU'
    ORDER BY
        l.dataLeitura DESC
    LIMIT 7;
    `;
    return database.executar(instrucao);
}

function leituraMaisRecenteGpu(ipServidor) {
    var instrucao = `
    SELECT
    l.*, c.capacidadeTotal
    FROM
        Leitura l
        INNER JOIN Componente c ON l.fkComponente = c.idComponente
        INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'GPU'
    ORDER BY
        l.dataLeitura DESC
    LIMIT 1;
    `;
    return database.executar(instrucao);
}

function ultimasLeiturasRam(ipServidor) {
    var instrucao = `
    SELECT
    l.*, c.capacidadeTotal
    FROM
        Leitura l
        INNER JOIN Componente c ON l.fkComponente = c.idComponente
        INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'RAM'
    ORDER BY
        l.dataLeitura DESC
    LIMIT 7;
    `;
    return database.executar(instrucao);
}

function leituraMaisRecenteRam(ipServidor) {
    var instrucao = `
    SELECT
    l.*, c.capacidadeTotal
    FROM
        Leitura l
        INNER JOIN Componente c ON l.fkComponente = c.idComponente
        INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'RAM'
    ORDER BY
        l.dataLeitura DESC
    LIMIT 1;
    `;
    return database.executar(instrucao);
}

function leituraUsoRamPerHora(ipServidor) {
    var instrucao = `
    SELECT
    l.dataLeitura,
    l.emUso AS usoRam,
    c.capacidadeTotal
    FROM
    Leitura l
    INNER JOIN Componente c ON l.fkComponente = c.idComponente
    WHERE
    c.tipo = 'RAM'
    AND l.fkServidor = '${ipServidor}'
    AND (
        l.dataLeitura = CURDATE()
        OR l.dataLeitura = NOW() - INTERVAL 1 HOUR
        OR l.dataLeitura = NOW() - INTERVAL 2 HOUR
        OR l.dataLeitura = NOW() - INTERVAL 3 HOUR
        OR l.dataLeitura = NOW() - INTERVAL 4 HOUR
        OR l.dataLeitura = NOW() - INTERVAL 5 HOUR
    );

    `;
    return database.executar(instrucao);
}

function ultimasLeiturasRede(ipServidor) {
    var instrucao = `
    SELECT
    l.*, c.capacidadeTotal
    FROM
        Leitura l
        INNER JOIN Componente c ON l.fkComponente = c.idComponente
        INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'Rede'
    ORDER BY
        l.dataLeitura DESC
    LIMIT 7;
    `;
    return database.executar(instrucao);
}

function leituraMaisRecenteRede(ipServidor) {
    var instrucao = `
    SELECT
    l.*, c.capacidadeTotal
    FROM
        Leitura l
        INNER JOIN Componente c ON l.fkComponente = c.idComponente
        INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'Rede'
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
    leituraMaisRecenteCpu,

    ultimasLeiturasGpu,
    leituraMaisRecenteGpu,

    ultimasLeiturasRam,
    leituraMaisRecenteRam,
    leituraUsoRamPerHora,

    ultimasLeiturasRede,
    leituraMaisRecenteRede
};