var database = require("../database/config")

function selecionarTudo() {
    var instrucao = `
        SELECT * FROM Servidor;
    `;
    return database.executar(instrucao);
}

function cadastrar(ipServidor, hostName, sisOp, ativo, fkEmpresa, fkDataCenter) {
    var instrucao = `
        INSERT INTO Servidor (ipServidor, hostname, sisOp, ativo, fkEmpresa, fkDataCenter) VALUES ('${ipServidor}', '${hostName}', '${sisOp}','${ativo}','${fkEmpresa}', '${fkDataCenter}');
  
    `;
    return database.executar(instrucao);
}

function selecionarTudoPerEmpresa(idEmpresa) {
    var instrucao = `
        SELECT * FROM Servidor WHERE fkEmpresa = ${idEmpresa};
    `;
    return database.executar(instrucao);
}

function editar(hostName, sisOp, ativo, hostNameAntigo, fkEmp) {
    var instrucao = `
    UPDATE Servidor
SET 
  hostname = '${hostName}',
  sisOp = '${sisOp}',
  ativo = '${ativo}'
WHERE fkEmpresa = '${fkEmp}' and hostname = '${hostNameAntigo}' ;
    `;
    return database.executar(instrucao);
}

function selecionarDadosGerais(ipServidor) {
    var instrucao = `
        SELECT s.ipServidor, s.hostname, s.ativo, s.sisOp, s.fkEmpresa, dt.nome, e.razaoSocial, c.tipo, c.modelo, c.capacidadeTotal, uni.tipoMedida FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON s.fkEmpresa = e.idEmpresa LEFT JOIN Componente as c ON c.fkServidor = s.ipServidor LEFT JOIN UnidadeMedida as uni ON c.fkMedida = uni.idUnidadeMedida WHERE ipServidor = ${ipServidor};`;
    return database.executar(instrucao);
}

function buscarQtdAtivosDesativados() {
    var instrucao = `
        SELECT (SELECT COUNT(ativo) FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE ativo = 1) as serversAtivos, (SELECT COUNT(ativo) as serversDesativos FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE ativo = 0) as serversDesativados FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE ativo = 1 GROUP BY serversAtivos, serversDesativados;
    `;
    return database.executar(instrucao);
}

function deletarServidor(tipo, id) {
    if (tipo == 'DC') {
        var instrucao = `
        delete from servidor where fkDataCenter = '${id}';
        `;
        return database.executar(instrucao);
    } else if (tipo == 'Server') {
        var instrucao = `
        delete from servidor where ipServidor = '${id}';
        `;
        return database.executar(instrucao);
    }
    else {
        var instrucao = `
    delete from servidor where fkEmpresa = '${id}';
    `;
        return database.executar(instrucao);
    }
}

function exibirDadosGerais(ipServidor) {
    var instrucao = `
    SELECT s.hostname, s.sisOp, s.ativo, 
    (SELECT l.emUso FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente 
    INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'CPU' AND s.ipServidor = '${ipServidor}' 
    ORDER BY l.dataLeitura DESC LIMIT 1) as usoCpu, 
    
    (SELECT ROUND(((SELECT l.emUso FROM Leitura as l INNER JOIN Componente as c ON c.idComponente = l.fkComponente 
    INNER JOIN Servidor as s ON s.ipServidor = c.fkServidor WHERE c.tipo = 'RAM' AND ipServidor = '${ipServidor}' 
    ORDER BY l.dataLeitura DESC LIMIT 1) / 
        (SELECT c.capacidadeTotal FROM Componente as c INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE ipServidor = '${ipServidor}' AND c.tipo = 'RAM') * 100),2)) as usoRam, 
    
    (SELECT CONCAT((SELECT l.velocidadeEscrita FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente 
    INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'Disco' AND s.ipServidor = '${ipServidor}' 
    ORDER BY l.dataLeitura DESC LIMIT 1), ('MB/s'))) as velocidadeEscrita, 
    
    (SELECT CONCAT((SELECT l.upload FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente 
    INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'Rede' AND s.ipServidor = '${ipServidor}' 
    ORDER BY l.dataLeitura DESC LIMIT 1), (SELECT uni.tipoMedida FROM unidadeMedida as uni INNER JOIN 
    Componente as c ON c.fkMedida = uni.idUnidadeMedida INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'REDE' GROUP BY uni.tipoMedida))) as uploadRede, 
    
    (SELECT l.emUso FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente 
    INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'GPU' AND s.ipServidor = '${ipServidor}' 
    ORDER BY l.dataLeitura DESC LIMIT 1) as usoGpu 
    
    FROM Servidor as s LEFT JOIN Componente as c ON c.fkServidor = s.ipServidor 
    LEFT JOIN Leitura as l ON l.fkComponente = c.idComponente WHERE s.ipServidor = '${ipServidor}' GROUP BY s.hostname, s.sisOp, s.ativo;
    `;
    return database.executar(instrucao);
}

function exibirServidoresPerDCenter(idDataCenter) {
    var instrucao = `
        SELECT * FROM Servidor as s WHERE fkDataCenter = ${idDataCenter};
    `;
    return database.executar(instrucao);
}

function exibirStatusServidoresPerDCenter(idDataCenter) {
    var instrucao = `
        SELECT 
            (select count(idAlerta) from Alerta as a INNER JOIN DataCenter as dt ON a.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter}) as qtdTotalAlertas,
            (select count(tipo) from Alerta as a INNER JOIN DataCenter as dt ON a.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} AND tipo = 'Estável') AS qtdAlertasEstavel, 
            (select count(tipo) from Alerta as a INNER JOIN DataCenter as dt ON a.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} AND tipo = 'Cuidado') AS qtdAlertasCuidado, 
            (select count(tipo) from Alerta as a INNER JOIN DataCenter as dt ON a.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter} AND tipo = 'Em risco') AS qtdAlertasRisco 
        FROM Alerta as a INNER JOIN DataCenter as dt ON a.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = ${idDataCenter}  GROUP BY qtdAlertasEstavel, qtdAlertasCuidado, qtdAlertasRisco;
    `;
    return database.executar(instrucao);
}

function buscarQtdAtivosDesativadosPerEmpresa(idEmpresa) {
    var instrucao = `
    SELECT 
    (SELECT COUNT(ativo) FROM Servidor as s 
        INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON dt.fkEmpresa = e.idEmpresa 
            WHERE ativo = 1 AND e.idEmpresa = ${idEmpresa}) as serversAtivos, 
    (SELECT COUNT(ativo) as serversDesativos FROM Servidor as s 
        INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON dt.fkEmpresa = e.idEmpresa 
            WHERE ativo = 0 AND e.idEmpresa = ${idEmpresa}) as serversDesativados 
    FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON dt.fkEmpresa = e.idEmpresa WHERE ativo = 1 GROUP BY serversAtivos, serversDesativados;
    
    `;
    return database.executar(instrucao);
}

function exibirDadosKpiServidor(ipServidor) {
    var instrucao = `
    SELECT
    (SELECT
        c.capacidadeTotal AS CapacidadeRam
    FROM
        Leitura l
        JOIN Componente c ON l.fkComponente = c.idComponente
    WHERE
        c.tipo = 'RAM'
        AND c.fkServidor = '${ipServidor}'
    GROUP BY
        CapacidadeRam
    ) as capacidadeRam,
    (SELECT
        l.emUso AS UsoCPU
    FROM
        Leitura l
        JOIN Componente c ON l.fkComponente = c.idComponente
    WHERE
        c.tipo = 'CPU'
        AND c.fkServidor = '${ipServidor}'
        AND l.dataLeitura >= NOW() - INTERVAL 48 HOUR
    GROUP BY
        l.emUso
    ORDER BY
        COUNT(*) DESC
    LIMIT 1) AS UsoCPU,

    (SELECT
        l.emUso AS UsoRAM
    FROM
        Leitura l
        JOIN Componente c ON l.fkComponente = c.idComponente
    WHERE
        c.tipo = 'RAM'
        AND c.fkServidor = '${ipServidor}'
        AND l.dataLeitura >= NOW() - INTERVAL 48 HOUR
    GROUP BY
        l.emUso
    ORDER BY
        COUNT(*) DESC
    LIMIT 1) AS UsoRAM,

    (SELECT
        l.velocidadeEscrita
    FROM
        Leitura l
        JOIN Componente c ON l.fkComponente = c.idComponente
    WHERE
        c.tipo = 'DISCO'
        AND c.fkServidor = '${ipServidor}'
    ORDER BY
        l.dataLeitura DESC
    LIMIT 1) AS velocidadeEscrita,

    (SELECT
        l.upload
    FROM
        Leitura l
        JOIN Componente c ON l.fkComponente = c.idComponente
    WHERE
        c.tipo = 'Rede'
        AND c.fkServidor = '${ipServidor}'
    ORDER BY
        l.dataLeitura DESC
    LIMIT 1) AS uploadAtual;

    `;
    return database.executar(instrucao);
}

module.exports = {
    selecionarTudo,
    cadastrar,
    editar,
    selecionarDadosGerais,
    buscarQtdAtivosDesativados,
    deletarServidor,
    exibirDadosGerais,
    exibirServidoresPerDCenter,
    exibirStatusServidoresPerDCenter,
    buscarQtdAtivosDesativadosPerEmpresa,
    selecionarTudoPerEmpresa,
    exibirDadosKpiServidor
};