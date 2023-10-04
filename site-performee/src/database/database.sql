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

create table VerificacaoBackup (
idVerificacaoBackup int auto_increment,
ultimoBackup datetime,
totalArmazenado float,
proxBackup datetime,
fkServidor int,
foreign key (fkServidor) references Servidor(idServidor),
primary key (idVerificacaoBackup, fkServidor)
);

create table LogEventos (
idLog int auto_increment,
horario datetime,
tipoAlerta varchar(45),
descricao varchar(45),
origem varchar(45),
foreign key (fkServidor) references Servidor(idServidor),
primary key (idLog, fkServidor)
);

create table Processador (
idCpu int auto_increment,
porcUso float,
temperatura float,
qtdProcessos int,
fkServidor int,
foreign key (fkServidor) references Servidor(idServidor),
primary key (idCpu, fkServidor)
);

create table Armazenamento (
idArmazenamento int auto_increment,
totalUsado float,
totalLivre float,
integridade float,
velocidadeLeitura float,
velocidadeGravacao float,
fkServidor int,
foreign key (fkServidor) references Servidor(idServidor),
primary key (idArmazenamento, fkServidor)
);

create table Ram (
idRam int auto_increment,
emUso float,
disponivel float,
fkServidor int,
foreign key (fkServidor) references Servidor(idServidor),
primary key (idRam, fkServidor)
);

create table Gpu (
idGpu int auto_increment,
porc3D float,
usoCopy float,
temperatura float,
usoVram float,
videoProc float,
fkServidor int,
foreign key (fkServidor) references Servidor(idServidor),
primary key (idGpu, fkServidor)
);

create table DadosRede (
idDadosRede int auto_increment,
consumo float,
usoUpload float,
usoDownload float,
ping int,
fkServidor int,
foreign key (fkServidor) references Servidor(idServidor),
primary key (idDadosRede, fkServidor)
);

