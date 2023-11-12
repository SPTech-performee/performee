create database performee;
use performee;
-- drop database performee;

create table Permissao (
idTipo int primary key auto_increment,
descricao varchar(45)
);

create table Administrador (
idAdmin int primary key auto_increment,
nome varchar(100),
email varchar(100),
senha varchar(100),
cpf char(11),
fkPermissao int,
foreign key (fkPermissao) references Permissao(idTipo)
);

create table Empresa (
idEmpresa int primary key auto_increment,
razaoSocial varchar(45),
nomeFantasia varchar(45),
cnpj char(14),
email varchar(45),
telefone char(13)
);

create table Usuario (
idColaborador int auto_increment,
nome varchar(100),
email varchar(100),
senha varchar(100),
cpf char(11),
cargo varchar(60),
fkEmpresa int,
fkTipoPermissao int,
foreign key (fkEmpresa) references Empresa(idEmpresa),
foreign key (fkTipoPermissao) references Permissao(idTipo),
primary key pkColaborador(idColaborador, fkEmpresa)
);

create table DataCenter (
idDataCenter int auto_increment,
nome varchar(100),
tamanho float,
fkEmpresa int,
foreign key (fkEmpresa) references Empresa(idEmpresa),
primary key pkDataCenter(idDataCenter, fkEmpresa)
);

create table EnderecoDataCenter (
idEndereco int primary key auto_increment,
pais varchar(100),
estado char(2),
cidade varchar(100),
cep char(8),
bairro varchar(100),
numero varchar(45),
complemento varchar(45),
fkDataCenter int,
foreign key (fkDataCenter) references DataCenter(idDataCenter)
);

-- tabela abaixo se refere ao Rede de Parametros da API Looca
create table Servidor (
ipServidor char(14),
hostname varchar(100),
sisOp varchar(100),
ativo char(1),
fkEmpresa int,
fkDataCenter int,
foreign key (fkEmpresa) references Empresa(idEmpresa),
foreign key (fkDataCenter) references DataCenter(idDataCenter),
primary key pkServidor(ipServidor, fkEmpresa, fkDataCenter)
); 


create table UnidadeMedida (
idUnidadeMedida int primary key auto_increment,
tipoMedida varchar(100)
);

-- como será feito a tabela componente
create table Componente (
idComponente int auto_increment,
tipo varchar(45), constraint chkTipo check (tipo in ('CPU', 'RAM', 'Disco', 'SSD', 'Rede', 'GPU')),
modelo varchar(150),
capacidadeTotal double,
fkMedida int,
fkEmpresa int,
fkDataCenter int,
fkServidor char(14),
foreign key (fkMedida) references UnidadeMedida(idUnidadeMedida),
foreign key (fkEmpresa) references Empresa(idEmpresa),
foreign key (fkDataCenter) references DataCenter(idDataCenter),
foreign key (fkServidor) references Servidor(ipServidor),
primary key pkComponente(idComponente, fkEmpresa, fkDataCenter, fkServidor)
);

create table leitura (
idLeitura int auto_increment,
dataLeitura datetime,
emUso double,
tempoAtividade varchar(50),
temperatura double,
frequencia double,
upload double,
download double,
velocidadeLeitura double,
velocidadeEscrita double,
fkMedidaTemp int,
fkEmpresa int,
fkDataCenter int,
fkServidor char(14),
fkComponente int,
foreign key (fkEmpresa) references Empresa(idEmpresa),
foreign key (fkDataCenter) references DataCenter(idDataCenter),
foreign key (fkServidor) references Servidor(ipServidor),
foreign key (fkComponente) references Componente(idComponente),
primary key pkLeitura(idLeitura, fkEmpresa, fkDataCenter, fkServidor, fkComponente)
);


create table alerta (
idAlerta int auto_increment,
dataAlerta datetime,
tipo varchar(50), constraint chkTipoAlerta check (tipo in ('Estável', 'Cuidado', 'Em risco')),
descricao varchar(500),
fkEmpresa int,
fkDataCenter int,
fkServidor char(14),
fkComponente int,
fkLeitura int,
foreign key (fkEmpresa) references Empresa(idEmpresa),
foreign key (fkDataCenter) references DataCenter(idDataCenter),
foreign key (fkServidor) references Servidor(ipServidor),
foreign key (fkComponente) references Componente(idComponente),
foreign key (fkLeitura) references Leitura(idLeitura),
primary key pkAlerta(idAlerta, fkEmpresa, fkDataCenter, fkServidor, fkComponente, fkLeitura)
);

insert into permissao values
(null, 'Master'),
(null, 'Expert'),
(null, 'Guest');

insert into Administrador values
(null, "performee", "admin@performee.com", "admin123", "67890990909", 1);

insert into Empresa values
  (null, 'São Paulo Tech School', 'EDUCARE', 12345678901234, 'email1@sptech.school', 9876543210),
  (null, 'Meta.Inc', 'Meta', 98765432101234, 'email2@meta.com', 1234567890),
  (null, 'EQUINIX LTDA', 'Equinix', 98712345601234, 'email3@equinix.com', 3456789012),
  (null, 'Atos', 'ATOS', 8765432101234, 'email4@atos.com', 7654321098),
  (null, 'Junix', 'JUNIX', 7654321091234, 'email5@junix.com', 6543210987);


insert into usuario values
(null, "Giuliana Miniguiti", "giu.miniguiti@sptech.school", "giu123", "78698798790", "Analista NOC", 1, 3),
(null, "Matheus Carloto", "MatCarlot@gmail.com", "matheus123", "33444433333", "Analista NOC", 2, 3),
(null, "Fernando Silva", "fern.silva@gmail.com", "fer123", "55543332221", "Analista NOC", 3, 3),
(null, "William Marques", "william.marques@sptech.school", "william123", "67565456767", "Engenheiro Noc", 4, 2);

insert into DataCenter values
(null, "DATATECH", 100.10, 1),
(null, "FACE", 232.10, 2),
(null, "SP2", 100.10, 3),
(null, "SP3", 222.10, 3),
(null, "JUNIXDC", 111.10, 5),
(null, "AtosDC", 22.10, 4);

insert into EnderecoDataCenter values
(null, "Brasil", "SP", "São paulo", 03303010, "Paulista", 595, null, 1),
(null, "Brasil", "MG", "Maranhao", 02205333, "Capital", 44, null, 2),
(null, "Brasil", "ES", "Estadps Santo", 22222222, "Maie", 595, null, 3),
(null, "Brasil", "RJ", "Roça", 02222222, "Caraca", 333, null, 4),
(null, "Brasil", "SP", "Maua", 09330222, "Lisboa", 442, null, 5),
(null, "Brasil", "SP", "Maua", 09330222, "Lisboa", 442, null, 5);

insert into servidor values
('000000001', 'DESKTOP-SPTECH', 'Windows', 1, 1, 1),
('192168155', 'DESKTOP-ATOS', 'Linux', 1, 4, 6),
('000000003', 'DESKTOP-FACE', 'Windows', 1, 2, 2),
('000000004', 'DESKTOP-JUNIX', 'Windows', 1, 5, 5),
('000000005', 'DESKTOP-EQUINIX1', 'Linux', 1, 3, 3),
('000000006', 'DESKTOP-EQUINIX2', 'Windows', 0, 3, 4),
('000000007', 'DESKTOP-ATOS2', 'Windows', 1, 4, 6);

insert into UnidadeMedida values
(null, "Ghz"),
(null, "Mhz"),
(null, "GB"),
(null, "MB");

insert into componente values 
(1, 'CPU', 'Intel(R) Core(TM) i3-3220 CPU @ 3.30GHz', 4, 1, 1, 1, '192168155'),
(2, 'CPU', 'Intel(R) Core(TM) i5-3220 CPU @ 3.30GHz', 4, 1, 1, 1, '000000001'),
(3, 'CPU', 'Intel(R) Core(TM) i7-3220 CPU @ 3.30GHz', 4, 1, 1, 1, '000000003'),
(4, 'RAM', 'Memoria RAM', 7.96, 3, 1, 1, '192168155'),
(5, 'RAM', 'Memoria RAM', 16.96, 3, 1, 1, '000000001'),
(6, 'RAM', 'Memoria RAM', 20.96, 3, 1, 1, '000000003'),
(7, 'Disco', 'SMI   Reader USB Device (Unidades de disco padrão)', 0, 3, 1, 1, '192168155'),
(8, 'Disco', 'SSD 120GB (Unidades de disco padrão)', 111.79, 3, 1, 1, '000000001'),
(9, 'Disco', 'WDC WD5000AZLX-00K2TA0 (Unidades de disco padrão)', 465.76, 3, 1, 1, '000000003'),
(10, 'Disco', 'WDC WD10SPZX-24Z10 (Unidades de disco padrão)', 931.51, 3, 1, 1, '000000005'),
(11, 'Rede', 'VirtualBox Host-Only Ethernet Adapter', 0, 4, 1, 1, '000000001'),
(12, 'Rede', 'Realtek PCIe GbE Family Controller', 676662.36, 4, 1, 1, '192168155'),
(13, 'Rede', 'Realtek PCIe GbE Family Controller', 676662.36, 4, 1, 1, '000000003'),
(14, 'Rede', 'Hyper-V Virtual Ethernet Adapter', 6.84, 4, 1, 1, '000000005'),
(15, 'Rede', 'Hyper-V Virtual Ethernet Adapter', 6.84, 4, 1, 1, '000000001');

-- cpu
insert into leitura(dataLeitura, emUso, tempoAtividade, temperatura, frequencia, fkMedidaTemp, fkEmpresa, fkDataCenter, fkServidor, fkComponente) values
("2023-10-13 14:01:20",70.27,"14 days, 01:28:48",22.22,3.293, 1, 1, 1,'000000001',2),
("2023-10-03 14:01:20",50.27,"14 days, 01:28:48",55.22,3.293, 1, 1, 1,'000000001',2),
("2023-10-25 14:01:20",99.27,"14 days, 01:28:48",60.0,3.293, 1, 1, 1,'000000001',2),
("2023-10-19 14:01:20",10.27,"14 days, 01:28:49",20,3.293, 1,4,6,'192168155',1),
("2023-10-22 14:01:21",10.63,"14 days, 01:28:50",24,3.293, 1,4,6,'192168155',1),
("2023-10-31 14:01:38",40.63,"14 days, 01:29:06",25,3.293, 1,4,6,'192168155',1);

-- ram
insert into leitura(dataLeitura, emUso, tempoAtividade, fkMedidaTemp, fkEmpresa, fkDataCenter, fkServidor, fkComponente) values
("2023-10-23 14:01:22",7.2,"14 days, 01:28:51", 2,1,1,'000000001',5),
("2023-10-29 14:01:23",5.01,"14 days, 01:28:51", 2,1,1,'000000001',5),
("2023-10-25 14:01:23",3.01,"14 days, 01:28:51", 2,1,1,'000000001',5),
("2023-10-27 14:01:23",7.01,"14 days, 01:28:52", 2,4,6, '192168155',4),
("2023-10-23 14:01:32",2.2,"14 days, 01:29:00", 2,4,6, '192168155',4),
("2023-10-22 14:01:32",6.2,"14 days, 01:29:00", 2,4,6, '192168155',4);

-- disco
insert into leitura(dataLeitura, tempoAtividade, upload, download, fkMedidaTemp, fkEmpresa, fkDataCenter, fkServidor, fkComponente) values
("2023-10-22 14:01:25","14 days, 01:28:54",456845.2,206083.43,4,1,1,'000000001',8),
("2023-10-23 14:01:25","14 days, 01:28:54",454545.2,554545.43,4,1,1,'000000001',8),
("2023-10-25 14:01:28","14 days, 01:28:56",456845.21,206084.04,4,4,6,'192168155',7),
("2023-10-30 14:01:28","14 days, 01:28:56",456845.21,206084.04,4,4,6,'192168155',7);

-- rede
insert into leitura(dataLeitura, tempoAtividade, velocidadeLeitura, velocidadeEscrita, fkMedidaTemp, fkEmpresa, fkDataCenter, fkServidor, fkComponente) values
("2023-10-22 14:01:52","14 days, 01:29:21",21065.62,655635.81,4,1,1,'000000001',15),
("2023-10-22 14:01:52","14 days, 01:29:21",21065.62,655635.81,4,1,1,'000000001',15),
("2023-10-21 14:01:57","14 days, 01:29:26", 21065.62,655635.81, 4,4,6,'192168155',12),
("2023-10-24 14:01:57","14 days, 01:29:26", 21065.62,655635.81, 4,4,6,'192168155',12);


insert into alerta values
(null,"2023-10-13 14:01:20", "Cuidado", "Uso da CPU acima de 70%", 1, 1,'000000001',2, 1),
(null,"2023-10-13 14:01:20", "Estável", "Temperatura da CPU abaixo de 30°C", 1, 1,'000000001',2, 1),
(null,"2023-10-22 14:01:21", "Cuidado", "temperatura da CPU em acima dos 30°C", 1, 1,'000000001',2,2),
(null,"2023-10-25 14:01:21", "Em risco", "Uso da CPU em acima dos 80%", 1, 1,'000000001',2,3),
(null,"2023-10-30 14:01:21", "Estável", "temperatura da CPU em abaixo dos 30°C e uso abaixo dos 20%", 4,6,'192168155',1,4),
(null,"2023-10-30 14:01:21", "Estável", "temperatura da CPU em abaixo dos 30°C e uso abaixo dos 20%", 4,6,'192168155',1,5),
(null,"2023-10-31 14:01:21", "Estável", "temperatura da CPU em abaixo dos 30°C e uso abaixo dos 20%", 4,6,'192168155',1,6),
(null,"2023-10-21 14:01:21", "Em risco", "Uso da Ram acima dos 80%", 1,1,'000000001',5,7),
(null,"2023-10-24 14:01:21", "Cuidado", "Uso da Ram acima dos 50%", 1,1,'000000001',5,8),
(null,"2023-10-31 14:01:21", "Em risco", "Uso da Ram acima dos 80%", 1,1,'000000001',5,9),
(null,"2023-11-01 14:01:21", "Em risco", "Uso da Ram acima dos 80%", 4,6, '192168155',4,10),
(null,"2023-10-23 14:01:21", "Estável", "Uso da Ram abaixo dos 40%", 4,6, '192168155',4,11),
(null,"2023-10-26 14:01:21", "Em risco", "Uso da Ram acima dos 80%", 4,6, '192168155',4,12);


select * from permissao;
select * from administrador;
select * from empresa;
select * from usuario;
select * from datacenter;
select * from enderecodatacenter;
select * from servidor;
select * from Componente;
select * from leitura;
select * from alerta;
select * from unidadeMedida;

SELECT idDataCenter FROM DataCenter ORDER BY idDataCenter DESC LIMIT 1;

-- SELECIONANDO DADOS DE UM USUÁRIO ESPECÍFICO
SELECT u.nome, u.email, u.cpf, u.cargo, e.razaoSocial, p.descricao FROM Usuario AS u INNER JOIN Permissao AS p ON u.fkTipoPermissao = p.idTipo INNER JOIN Empresa AS e ON u.fkEmpresa = e.idEmpresa WHERE idColaborador = 1;

-- SELECIONANDO DADOS GERAIS DE UMA EMPRESA ESPECÍFICA
select * from empresa where idEmpresa = 1;

-- SELECIONANDO DADOS DE UM ADMINISTRADOR EM ESPECÍFICO
SELECT a.nome, a.email, a.cpf FROM Administrador AS a WHERE idAdmin = 1;

-- SELECIONANDO DADOS DE UM DATA CENTER EM ESPECÍFICO
SELECT dt.nome, dt.tamanho, e.razaoSocial, edt.cep, edt.bairro, edt.numero, edt.complemento, edt.cidade, edt.estado, edt.pais FROM DataCenter as dt INNER JOIN Empresa as e ON dt.fkEmpresa = e.idEmpresa LEFT JOIN EnderecoDataCenter as edt ON dt.idDataCenter = edt.fkDataCenter WHERE idDataCenter = 2;

-- SELECIONANDO DADOS DE UM SERVIDOR EM ESPECÍFICO
SELECT s.ipServidor, s.hostname, s.ativo, s.sisOp, dt.nome, e.razaoSocial, c.tipo, c.modelo, c.capacidadeTotal, uni.tipoMedida FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON s.fkEmpresa = e.idEmpresa LEFT JOIN Componente as c ON c.fkServidor = s.ipServidor LEFT JOIN UnidadeMedida as uni ON c.fkMedida = uni.idUnidadeMedida WHERE ipServidor = '000000001';

-- BUSCANDO INFORMAÇÕES DA EMPRESA E PERMISSÕES DE UM USUÁRIO
SELECT e.razaoSocial, e.cnpj, e.email, p.idTipo FROM Empresa as e INNER JOIN Usuario as u ON u.fkEmpresa = e.idEmpresa INNER JOIN Permissao AS p ON u.fkTipoPermissao = idTipo WHERE u.idColaborador = 1;

-- EDITANDO USERS
UPDATE Administrador AS a SET a.nome = 'Luigi' WHERE idAdmin = 1;
UPDATE Administrador AS a SET a.email = 'Luigi@performee' WHERE idAdmin = 1;
UPDATE Administrador AS a SET a.cpf = '54362792873' WHERE idAdmin = 1;

UPDATE Usuario AS u SET u.nome = 'Luigi' WHERE idColaborador = 1;
UPDATE Usuario AS u SET u.email = 'Luigi@client' WHERE idColaborador = 1;
UPDATE Usuario AS u SET u.cpf = '54362792873' WHERE idColaborador = 1;
UPDATE Usuario AS u SET u.cargo = 'Mestre da computaria' WHERE idColaborador = 1;

-- SELECIONANDO QAUNTIDADE TOTAL DE SERVIDORES ATIVOS E DESATIVOS
SELECT (SELECT COUNT(ativo) FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE ativo = 1) as serversAtivos, (SELECT COUNT(ativo) as serversDesativos FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE ativo = 0) as serversDesativados FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE ativo = 1 GROUP BY serversAtivos, serversDesativados;

-- SELECIONANDO A QUANTIDADE DE SERVIDORES EM CADA ESTADO/STATUS
SELECT (select count(idAlerta) from Alerta) as qtdTotalAlertas,(select count(tipo) from Alerta WHERE tipo = 'Estável') AS qtdAlertasEstavel, (select count(tipo) from Alerta WHERE tipo = 'Cuidado') AS qtdAlertasCuidado, (select count(tipo) from Alerta WHERE tipo = 'Em risco') AS qtdAlertasRisco FROM Alerta GROUP BY qtdAlertasEstavel, qtdAlertasCuidado, qtdAlertasRisco;

-- SELECIONANDO OS DADOS DE UM DATA CENTERS E ORDENANDO POR EMPRESA E SUAS INFORMAÇÕES
SELECT dt.nome, e.razaoSocial, (SELECT COUNT(ipServidor) FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = 4) AS qtdServer, (SELECT COUNT(ativo) FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = 4 AND ativo = 1) AS serversAtivo, (SELECT COUNT(ativo) FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = 4 AND ativo = 0) AS serversDesativados, (SELECT s.sisOp FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = 4 AND (SELECT MAX((SELECT COUNT(DISTINCT sisOp) as qtdSisOp FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = 4 GROUP BY sisOp LIMIT 1)) as maxQtdSisOp FROM Servidor as s INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = 4) GROUP BY sisOp ORDER BY sisOp ASC LIMIT 1) AS sisOpMaisUtilizado FROM DataCenter as dt INNER JOIN Empresa as e ON dt.fkEmpresa = e.idEmpresa INNER JOIN Servidor as s ON dt.idDataCenter = s.fkDataCenter WHERE dt.idDataCenter = 4 GROUP BY dt.nome, e.razaoSocial;

-- SELECTS DE LOGS GERAIS DO SISTEMA
SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY FIELD(a.tipo, 'Em risco', 'Cuidado', 'Estável');
SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY e.razaoSocial;
SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY dt.nome;
SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY s.hostname;
SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY a.dataAlerta;
SELECT e.razaoSocial, dt.nome, s.hostname, a.descricao, a.tipo, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter INNER JOIN Empresa as e ON e.idEmpresa = dt.fkEmpresa ORDER BY a.dataAlerta DESC;

-- SELECIONANDO LOGS DE UM DETERMINADO DATA CENTER
SELECT s.hostname, c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a 
    INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
    INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
    INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
        WHERE dt.idDataCenter = 1 ORDER BY FIELD(a.tipo, 'Em risco', 'Cuidado', 'Estável');
SELECT s.hostname, c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a 
    INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
    INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
    INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
        WHERE dt.idDataCenter = 1 ORDER BY a.dataAlerta DESC;
SELECT s.hostname, c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a 
    INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
    INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
    INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
        WHERE dt.idDataCenter = 1 ORDER BY a.dataAlerta;
SELECT s.hostname, c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a 
    INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor 
    INNER JOIN Componente as c ON c.fkServidor = s.ipServidor 
    INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter 
        WHERE dt.idDataCenter = 1 ORDER BY s.hostname;

-- SELECIONANDO TODOS OS SERVERS DE UM DATA CENTER
SELECT * FROM Servidor as s WHERE fkDataCenter = 1;

-- SELECIONANDO TODOS OS SERVIDORES DE UM DATA CENTER E SUAS INFORMAÇÕES ATUAIS RELEVANTES
SELECT s.hostname, s.sisOp, s.ativo, (SELECT l.emUso FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'CPU' AND s.ipServidor = '000000001' ORDER BY l.dataLeitura DESC LIMIT 1) as usoCpu, (SELECT ROUND(((SELECT l.emUso FROM Leitura as l INNER JOIN Componente as c ON c.idComponente = l.fkComponente INNER JOIN Servidor as s ON s.ipServidor = c.fkServidor WHERE c.tipo = 'RAM' AND ipServidor = '000000001' ORDER BY l.dataLeitura DESC LIMIT 1) / (SELECT c.capacidadeTotal FROM Componente as c INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE ipServidor = '000000001' AND c.tipo = 'RAM') * 100),2)) as usoRam, (SELECT CONCAT((SELECT l.velocidadeEscrita FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'Disco' AND s.ipServidor = '000000001' ORDER BY l.dataLeitura DESC LIMIT 1), ('MB/s'))) as velocidadeEscrita, (SELECT CONCAT((SELECT l.upload FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'Rede' AND s.ipServidor = '000000001' ORDER BY l.dataLeitura DESC LIMIT 1), (SELECT uni.tipoMedida FROM unidadeMedida as uni INNER JOIN Componente as c ON c.fkMedida = uni.idUnidadeMedida INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'REDE' GROUP BY uni.tipoMedida))) as uploadRede, (SELECT l.emUso FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'GPU' AND s.ipServidor = '000000001' ORDER BY l.dataLeitura DESC LIMIT 1) as usoGpu FROM Servidor as s INNER JOIN Componente as c ON c.fkServidor = s.ipServidor INNER JOIN Leitura as l ON l.fkComponente = c.idComponente WHERE s.ipServidor = '000000001' GROUP BY s.hostname, s.sisOp, s.ativo;

-- SELECIONANDO TODOS OS LOGS DE UM DATA CENTER
SELECT c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN Componente as c ON c.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = 1 ORDER BY a.dataAlerta;
SELECT c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN Componente as c ON c.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = 1 ORDER BY a.dataAlerta DESC;
SELECT c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN Componente as c ON c.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = 1 ORDER BY FIELD(a.tipo, 'Em risco', 'Cuidado', 'Estável');
SELECT c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN Componente as c ON c.fkServidor = s.ipServidor INNER JOIN DataCenter as dt ON s.fkDataCenter = dt.idDataCenter WHERE dt.idDataCenter = 1 ORDER BY s.hostname;

-- SELECIONANDO TODOS OS LOG DE UM SERVIDOR
SELECT c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN Componente as c ON c.fkServidor = s.ipServidor WHERE s.ipServidor = '000000001' ORDER BY a.dataAlerta;
SELECT c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN Componente as c ON c.fkServidor = s.ipServidor WHERE s.ipServidor = '000000001' ORDER BY a.dataAlerta DESC;
SELECT c.tipo as componente, a.descricao, a.tipo as tipoAlerta, a.dataAlerta FROM Alerta as a INNER JOIN Servidor as s ON a.fkServidor = s.ipServidor INNER JOIN Componente as c ON c.fkServidor = s.ipServidor WHERE s.ipServidor = '000000001' ORDER BY FIELD(a.tipo, 'Em risco', 'Cuidado', 'Estável');

-- SELECIONANDO DADOS DAS KPIS DA TELA DE SERVIDOR
SELECT (SELECT l.emUso FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'CPU' AND s.ipServidor = '000000001' ORDER BY l.dataLeitura DESC LIMIT 1) as usoCpu, (SELECT ROUND(((SELECT l.emUso FROM Leitura as l INNER JOIN Componente as c ON c.idComponente = l.fkComponente INNER JOIN Servidor as s ON s.ipServidor = c.fkServidor WHERE c.tipo = 'RAM' AND ipServidor = '000000001' ORDER BY l.dataLeitura DESC LIMIT 1) / (SELECT c.capacidadeTotal FROM Componente as c INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE ipServidor = '000000001' AND c.tipo = 'RAM') * 100),2)) as usoRam, (SELECT CONCAT((SELECT l.velocidadeEscrita FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'Disco' AND s.ipServidor = '000000001' ORDER BY l.dataLeitura DESC LIMIT 1), ('MB/s'))) as velocidadeEscrita, (SELECT CONCAT((SELECT l.upload FROM Leitura as l INNER JOIN Componente as c ON l.fkComponente = c.idComponente INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'Rede' AND s.ipServidor = '000000001' ORDER BY l.dataLeitura DESC LIMIT 1), (SELECT uni.tipoMedida FROM unidadeMedida as uni INNER JOIN Componente as c ON c.fkMedida = uni.idUnidadeMedida INNER JOIN Servidor as s ON c.fkServidor = s.ipServidor WHERE c.tipo = 'REDE' GROUP BY uni.tipoMedida))) as uploadRede FROM Servidor as s INNER JOIN Componente as c ON c.fkServidor = s.ipServidor INNER JOIN Leitura as l ON l.fkComponente = c.idComponente WHERE s.ipServidor = '000000001' GROUP BY s.hostname;

-- SELECT LOGS PERIÓDICOS
-- 

-- SELECT QUANTIDADE DE SERVIDORES INSTAVÉIS EM 7DIAS
SELECT (select count(a.tipo) from Alerta as a WHERE a.tipo = 'Em risco' AND a.dataAlerta = (select a.dataAlerta from Alerta as a order by a.dataAlerta DESC limit 1)) as atual, 
(select count(a.tipo) as 1diaAtras from Alerta as a WHERE a.tipo = 'Em risco' AND a.dataAlerta = (SELECT (select a.dataAlerta - interval 1 day from Alerta as a order by a.dataAlerta DESC limit 1) FROM Alerta as a  WHERE a.tipo = 'Em risco' order by a.dataAlerta DESC limit 1)) as 1diaAtras, 
(select count(a.tipo) from Alerta as a WHERE a.tipo = 'Em risco' AND a.dataAlerta = (SELECT (select a.dataAlerta - interval 2 day from Alerta as a order by a.dataAlerta DESC limit 1) FROM Alerta as a  WHERE a.tipo = 'Em risco' order by a.dataAlerta DESC limit 1)) as 2diasAtras, 
(select count(a.tipo) from Alerta as a WHERE a.tipo = 'Em risco' AND a.dataAlerta = (SELECT (select a.dataAlerta - interval 3 day from Alerta as a order by a.dataAlerta DESC limit 1) FROM Alerta as a  WHERE a.tipo = 'Em risco' order by a.dataAlerta DESC limit 1)) as 3diasAtras, 
(select count(a.tipo) from Alerta as a WHERE a.tipo = 'Em risco' AND a.dataAlerta = (SELECT (select a.dataAlerta - interval 4 day from Alerta as a order by a.dataAlerta DESC limit 1) FROM Alerta as a  WHERE a.tipo = 'Em risco' order by a.dataAlerta DESC limit 1)) as 4diasAtras, 
(select count(a.tipo) from Alerta as a WHERE a.tipo = 'Em risco' AND a.dataAlerta = (SELECT (select a.dataAlerta - interval 5 day from Alerta as a order by a.dataAlerta DESC limit 1) FROM Alerta as a  WHERE a.tipo = 'Em risco' order by a.dataAlerta DESC limit 1)) as 5diasAtras, 
(select count(a.tipo) from Alerta as a WHERE a.tipo = 'Em risco' AND a.dataAlerta = (SELECT (select a.dataAlerta - interval 6 day from Alerta as a order by a.dataAlerta DESC limit 1) FROM Alerta as a  WHERE a.tipo = 'Em risco' order by a.dataAlerta DESC limit 1)) as 6diasAtras, 
(select count(a.tipo) from Alerta as a WHERE a.tipo = 'Em risco' AND a.dataAlerta = (SELECT (select a.dataAlerta - interval 7 day from Alerta as a order by a.dataAlerta DESC limit 1) FROM Alerta as a  WHERE tipo = 'Em risco' order by a.dataAlerta DESC limit 1)) as 7diasAtras FROM Alerta as a group by atual;
