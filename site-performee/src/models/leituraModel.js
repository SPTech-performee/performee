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
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer
        
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT
        MAX(l.dataLeitura) AS ultimaLeitura,
        MAX(l.emUso) AS usoRam,
        MAX(c.capacidadeTotal) AS capacidadeTotal
    FROM
        leitura l
    JOIN Componente c ON l.fkComponente = c.idComponente
    JOIN Servidor s ON l.fkServidor = s.ipServidor
    WHERE
        s.ipServidor = '${ipServidor}'
        AND c.tipo = 'RAM'
        AND l.dataLeitura >= NOW() - INTERVAL 5 HOUR
    GROUP BY
        YEAR(l.dataLeitura),
        MONTH(l.dataLeitura),
        DAY(l.dataLeitura),
        HOUR(l.dataLeitura)
    ORDER BY
        ultimaLeitura DESC;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function ultimasLeiturasDisco(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            l.*, c.capacidadeTotal
            FROM
                Leitura l
                INNER JOIN Componente c ON l.fkComponente = c.idComponente
                INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
            WHERE
                s.ipServidor = '${ipServidor}'
                AND (c.tipo = 'Disco' OR c.tipo = 'SSD')
            ORDER BY
                l.dataLeitura DESC
            LIMIT 7;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function leituraMaisRecenteDisco(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer
        
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            l.*, c.capacidadeTotal
            FROM
                Leitura l
                INNER JOIN Componente c ON l.fkComponente = c.idComponente
                INNER JOIN Servidor s ON c.fkServidor = s.ipServidor
            WHERE
                s.ipServidor = '${ipServidor}'
                AND (c.tipo = 'Disco' OR c.tipo = 'SSD')
            ORDER BY
                l.dataLeitura DESC
            LIMIT 1;
        `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function ultimasLeiturasRede(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer
        
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
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
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }

    return database.executar(instrucao);
}

function leituraMaisRecenteRede(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer
        
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
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
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
    return database.executar(instrucao);
}

function leituraComparacaoUpDownPerDia(ipServidor) {
    if (process.env.AMBIENTE_PROCESSO == "produção") {

        // script sqlServer
        
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
            SELECT
            dataLeitura,
            upload,
            download
            FROM
            Leitura
            WHERE
            fkComponente IN (
                SELECT
                    idComponente
                FROM
                    Componente
                WHERE
                    fkServidor = '${ipServidor}'
                    AND tipo = 'Rede'
                )
                AND DATE(dataLeitura) IN (
                    CURDATE(),
                    CURDATE() - INTERVAL 1 DAY,
                    CURDATE() - INTERVAL 2 DAY,
                    CURDATE() - INTERVAL 3 DAY,
                    CURDATE() - INTERVAL 4 DAY,
                    CURDATE() - INTERVAL 5 DAY
                );
            `;
    } else {
        console.log('Ambienetes não definidos no app.js');
        return;
    }
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

    ultimasLeiturasDisco,
    leituraMaisRecenteDisco,

    ultimasLeiturasRede,
    leituraMaisRecenteRede,
    leituraComparacaoUpDownPerDia
};