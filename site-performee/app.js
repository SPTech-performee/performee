process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var administradorRouter = require("./src/routes/administrador");
var empresasRouter = require("./src/routes/empresas");
var permissaoRouter = require("./src/routes/permissao");
var usuarioRouter = require("./src/routes/usuario");
var dataCenterRouter = require("./src/routes/dataCenter");
var enderecoDataCenterRouter = require("./src/routes/enderecoDataCenter");
var servidorRouter = require("./src/routes/servidor");
var uniMedidaRouter = require("./src/routes/uniMedida");
var componenteRouter = require("./src/routes/componente");
var leituraRouter = require("./src/routes/leitura");
var alertaRouter = require("./src/routes/alerta");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/administrador", administradorRouter);
app.use("/empresas", empresasRouter);
app.use("/permissao", permissaoRouter);
app.use("/usuario", usuarioRouter);
app.use("/dataCenter", dataCenterRouter);
app.use("/enderecoDataCenter", enderecoDataCenterRouter);
app.use("/servidor", servidorRouter);
app.use("/uniMedida", uniMedidaRouter);
app.use("/componente", componenteRouter);
app.use("/leitura", leituraRouter);
app.use("/alerta", alertaRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
