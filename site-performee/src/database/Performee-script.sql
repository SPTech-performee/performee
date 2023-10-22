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
nomeDominio varchar(45),
sisOp varchar(100),
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
(null, 'São Paulo Tech School', 'EDUCARE', 05608415000166, 'atendimento@sptech.school', 1120794549);

insert into usuario values
(null, "Giuliana Miniguiti", "giu.miniguiti@sptech.school", "giu123", "78698798790", "Analista NOC", 1, 3),
(null, "William Marques", "william.marques@sptech.school", "william123", "67565456767", "Engenheiro Noc", 1, 2);

insert into DataCenter values
(null, "DATATECH", 100.10, 1);

insert into EnderecoDataCenter values
(null, "Brasil", "SP", "São paulo", 03303010, "Paulista", 595, null, 1);

insert into servidor values
(000000001, 'DESKTOP-SPTECH', 'São Paulo Tech School', 'Windows', 1, 1);

insert into UnidadeMedida values
(null, "Ghz"),
(null, "Mhz"),
(null, "GB"),
(null, "MB");


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