var express = require('express');
var router = express.Router();
var utilizadorModel = require("../models/utilizadorModel");
const {signedCookie } = require('cookie-parser');

router.post('/:idUtilizador/fotos/:idFotos/comentario', function (req, res, next){
  utilizadorModel.comentarFoto(req.params.idUtilizador, req.params.idFotos, req.body.comentario, function (status, result) {
    if (status.code == 200){
      res.send(result);
    }
    else {
      res.statusMessage = status.status;
      res.status(status.code).send({});
    }
  });
});

router.post('/:idUtilizador/fotos/upload', function (req, res, next){
  utilizadorModel.uploadFoto(req.params.idUtilizador, req.body, function (status, result) {
    if (status.code == 200){
      res.send(result);
    }
    else {
      res.statusMessage = status.status;
      res.status(status.code).send(status.status);
    }
  });
});

module.exports = router;