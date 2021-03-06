const {signedCookie } = require('cookie-parser');
var express = require('express');
var router = express.Router();
var fotModels = require("../models/fotografiaModel");


/* GET all Fotografias */
router.get('/', function (req, res, next){
  console.log(req.query)
  fotModels.getFotos(req.query, function (status, result) {
      if (status.code == 200)
      res.send(result);
    else {
      res.statusMessage = status.status;
      res.status(status.code).send(result);
    }
    });
  });

router.post('/:idFoto', function (req, res){
  fotModels.postClassiComen(req.body.idUtilizador, req.params.idFoto, req.body.classificacao, req.body.comentario, function (status, result) {
      if (status.code == 200){
        res.send(result);
      }else {
        res.statusMessage = status.status;
        res.status(status.code).send(result);
      }
    });
  });

module.exports = router;