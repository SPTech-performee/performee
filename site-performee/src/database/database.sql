create database performee;

use performee;

create table TipoUsuario (
idTipo int primary key auto_increment,
descricao varchar(45)
);

create table AdminSistema (
nome varchar(45),
email varchar(45),
senha varchar(45),
fkTipoSis int,
foreign key (fkTipoSis) references TipoUsuario(idTipo)
);

create table Empresa (
idEmpresa int primary key auto_increment,
razaoSocial varchar(45),
nomeFantasia varchar(45),
email varchar(45),
cnpj char(14),
telefone char(13)
);

create table userEmpresa (
idUser int auto_increment,
nome varchar(45),
email varchar(45),
cpf char(11),
cargo varchar(45),
fkEmpresa int,
fkTipo int,
foreign key (fkEmpresa) references Empresa(idEmpresa),
foreign key (fkTipo) references TipoUsuario(idTipo),
primary key (idUser, fkEmpresa)
);

create table DataCenter (
idDataCenter int auto_increment,
nome varchar(45),
tamanho float,
fkEmpresa int,
foreign key (fkEmpresa) references Empresa(idEmpresa),
primary key (idDataCenter, fkEmpresa)
);

create table Endereco (
idEndereco int primary key auto_increment,
pais varchar(45),
cep char(8),
estado varchar(45),
cidade varchar(45),
bairro varchar(45),
logradouro varchar(45),
complemento varchar(45),
fkDataCenter int,
foreign key (fkDataCenter) references DataCenter(idDataCenter)
);

create table Servidor (
idServidor int auto_increment,
ip char(14),
modelo varchar(45),
ativo tinyint,
sisOp varchar(45),
fkDataCenter int,
foreign key (fkDataCenter) references DataCenter(idDataCenter),
primary key (ip, fkDataCenter)
);

create table LogEventos (
idLog int auto_increment,
horario datetime,
tipoAlerta varchar(45),
descricao varchar(45),
origem varchar(45),
fkServidor int,
fkDataCenter int,
foreign key (fkServidor) references Servidor(idServidor),
foreign key (fkDataCenter) references DataCenter(idDataCenter),
primary key (idLog, fkServidor, fkDataCenter)
);

create table componentes (
idComponentes int auto_increment,
processador varchar(45),
ram varchar(45),
gpu varchar(45),
disco varchar(45),
placaDeRede varchar(45),
placaMae varchar(45),
fkIpServidor char(14),
fkDataCenter int,
foreign key (fkIpServidor) references Servidor(idServidor),
foreign key (fkDatacenter) references DataCenter(idDataCenter),
primary key (idComponentes, fkIpServidor, fkDataCenter)
);

create table leitura (
idLeitura int,
dataLeitura datetime,
usoCpu float,
qtdProcessosCpu int,
maiorProcesso varchar(50),
utilizacaoRam float,
totalRam float,
usoVRam float,
tresDGpu float,
copyGpu float,
temperaturaGpu float,
procVideoGpu float,
usoArmazenamento float,
totalArmazenamento float,
integrArmazenamento float,
velocGravArmazenamento float,
velocLeitArmazenamento float,
consumoRede float,
uploadRede float,
downloadRede float,
pingrRede float,
fkIpServidor char(14),
fkDataCenter int,
foreign key (fkIpServidor) references Servidor(ipServidor),
foreign key (fkDataCenter) references DataCenter(idDataCenter),
primary key (idLeitura, fkIpServidor, fkDataCenter)
);



