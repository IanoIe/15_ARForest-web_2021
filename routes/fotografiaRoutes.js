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

module.exports = router;