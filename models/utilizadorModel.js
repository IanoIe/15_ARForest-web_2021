var mysql = require("./connection").pool;

module.exports.getIdUtilizador = function (obj, callback, next){
    mysql.getConnection(function (err, conn){
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("SELECT idUtilizador, Email from Utilizador where Nome=?", [obj.Nome], function (err, row){
            conn.release();
            if(!(rows.length === 0)){
                callback({ code: 200, status: "Ok"}, rows);
            }
            else {
                callback({ code: 401, status: "Utilizador não existe"}, null);
            }
        })
    })
}