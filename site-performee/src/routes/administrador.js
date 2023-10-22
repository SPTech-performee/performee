var express = require("express");
var router = express.Router();

var administradorController = require("../controllers/administradorController");

router.post("/autenticar", function (req, res) {
    administradorController.autenticar(req, res);
});

module.exports = router;