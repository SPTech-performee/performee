-- Script SQL WORCKBENCH

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

create table Leitura (
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


create table Alerta (
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

insert into Permissao values
(null, 'Master'),
(null, 'Expert'),
(null, 'Guest');

insert into Administrador values
(null, "Admin1", "admin@performee.com", "admin123", "54102995072", 1);

insert into Empresa values
  (null, 'São Paulo Tech School', 'EDUCARE', 58891507000162, 'sptech@sptech.school', 9876543210);

insert into Usuario values
(null, "Cleber Ferreira", "cleber@sptech.school", "cleber123", "12591913030", "Diretor Analytic and Development squad", 1, 2),
(null, "Carolina Maria Socorro", "carol@sptech.school", "carol123", "37068246044", "Analista Junior", 1, 3);

insert into UnidadeMedida values
(null, "TB"),
(null, "Ghz"),
(null, "Mhz"),
(null, "GB"),
(null, "MB"),
(null, "C°");