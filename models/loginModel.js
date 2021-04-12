var pool = require("./connection");

/**Login */
module.exports.login = function (obj, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("Select Email, Senha from Utilizador where Email=? and Senha=?",
        [obj.Email, obj.Senha], function (err, rows) {
            console.log(rows);
            console.log(obj);
            conn.release();
            if (!(rows.length === 0)){
                callback({ code: 200, status: "Ok"}, rows);
                }
                else {
                    callback({ code: 401, status: "Email ou Senha incorrecta" }, null);
                    }
                })
            })
        }

/** Resgistar */
module.exports.registar = function (obj, callback, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query('INSERT INTO Utilizador(Nome, Email, Senha) VALUES (?,?,?)',
            [obj.Nome, obj.Email, obj.Senha], function(err, rows){
                conn.release();
                if (!(rows.length === 0)){
                    callback({ code: 200, status: "Ok"}, rows);
                    }
                    else {
                        callback({code: 401, status: "Utilizador ou Senha incorrecto!"}, null);
                        }
             } )
     })
 }