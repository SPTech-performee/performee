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
fkEmpresa int,
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
idAlerta int,
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
primary key pkAlerta(idAlerta, fkEmpresa, fkDataCenter, fkServidor, fkComponente, fkLeitura)
);

insert into permissao values
(null, 'master'),
(null, 'expert'),
(null, 'guest');

insert into Administrador values
(null, "performee", "admin@performee.com", "admin123", "67890990909", 1, 1);

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
(null, "Brasil", "SP", "São paulo", 03303010, "Paulista", 595, null, 1);

insert into servidor values
(000000001, 'DESKTOP-SPTECH', 'Windows', 1, 1, 1),
(000000002, 'DESKTOP-ATOS', 'Linux', 1, 4, 6),
(000000003, 'DESKTOP-FACE', 'Windows', 1, 2, 2),
(000000004, 'DESKTOP-JUNIX', 'Windows', 1, 5, 5),
(000000005, 'DESKTOP-EQUINIX1', 'Linux', 1, 3, 3),
(000000006, 'DESKTOP-EQUINIX2', 'Windows', 0, 3, 4),
(000000007, 'DESKTOP-ATOS2', 'Windows', 1, 4, 6);

insert into UnidadeMedida values
(null, "Ghz"),
(null, "Mhz"),
(null, "GB"),
(null, "MB");

insert into componente values 
(1, 'CPU', 'Intel(R) Core(TM) i3-3220 CPU @ 3.30GHz', 4, 1, 1, 1, 1),
(2, 'RAM', 'Memoria RAM', 7.96, 3, 1, 1, 1),
(3, 'Disco', 'SMI   Reader USB Device (Unidades de disco padrão)', 0, 3, 1, 1, 1),
(4, 'Disco', 'SSD 120GB (Unidades de disco padrão)', 111.79, 3, 1, 1, 1),
(5, 'Disco', 'WDC WD5000AZLX-00K2TA0 (Unidades de disco padrão)', 465.76, 3, 1, 1, 1),
(6, 'Disco', 'WDC WD10SPZX-24Z10 (Unidades de disco padrão)', 931.51, 3, 1, 1, 1),
(7, 'Rede', 'VirtualBox Host-Only Ethernet Adapter', 0, 4, 1, 1, 1),
(8, 'Rede', 'Realtek PCIe GbE Family Controller', 676662.36, 4, 1, 1, 1),
(9, 'Rede', 'Hyper-V Virtual Ethernet Adapter', 6.84, 4, 1, 1, 1);

insert into leitura values
(1,"2023-10-13 14:01:20",10.27,"14 days, 01:28:48",0,3.293,NULL,NULL,NULL,NULL,NULL,1,1,1,1),
(2,"2023-10-23 14:01:20",10.27,"14 days, 01:28:49",0,3.293,NULL,NULL,NULL,NULL,NULL,1,1,1,1),
(3,"2023-11-03 14:01:21",20.63,"14 days, 01:28:50",0,3.293,NULL,NULL,NULL,NULL,NULL,1,1,1,1),
(4,"2023-10-03 14:01:22",5,"14 days, 01:28:51",NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1,2),
(5,"2023-10-23 14:01:23",5.01,"14 days, 01:28:51",NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1,2),
(6,"2023-11-03 14:01:23",5.01,"14 days, 01:28:52",NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1,2),
(7,"2023-10-13 14:01:25",NULL,"14 days, 01:28:54",NULL,NULL,NULL,NULL,456845.2,206083.43,NULL,1,1,1,4),
(8,"2023-10-23 14:01:28",NULL,"14 days, 01:28:56",NULL,NULL,NULL,NULL,456845.21,206084.04,NULL,1,1,1,4),
(9,"2023-11-03 14:01:32",5.2,"14 days, 01:29:00",NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1,2),
(10,"2023-11-03 14:01:38",20.63,"14 days, 01:29:06",0,3.293,NULL,NULL,NULL,NULL,NULL,1,1,1,1),
(11,"2023-10-03 14:01:52",NULL,"14 days, 01:29:21",NULL,NULL,21065.62,655635.81,NULL,NULL,NULL,1,1,1,8),
(12,"2023-10-03 14:01:57",NULL,"14 days, 01:29:26",NULL,NULL,21065.62,655635.81,NULL,NULL,NULL,1,1,1,8);


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
SELECT idDataCenter FROM DataCenter ORDER BY idDataCenter DESC LIMIT 1;

-- drop database performee;