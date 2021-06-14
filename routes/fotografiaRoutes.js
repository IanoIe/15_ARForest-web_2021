const {signedCookie } = require('cookie-parser');
var express = require('express');
var router = express.Router();
var fotModels = require("../models/fotografiaModel");


/* GET all Fotografias */
router.get('/', function (req, res, next){
  fotModels.getFotos(req.params, function (status, result) {
      if (status.code == 200)
      res.send(result);
    else {
      res.statusMessage = status.status;
      res.status(status.code).send(result);
    }
    });
  });

router.post('/:idFoto', function (req, res){
  console.log(req.params.idFoto)
  fotModels.postClassComen(req.body.idUtilizador, req.params.idFoto, req.body.classificacao, req.body.comentario, function (status, result) {
      if (status.code == 200){
        res.send(result);
      }else {
        res.statusMessage = status.status;
        res.status(status.code).send(result);
      }
    });
  });

module.exports = router;