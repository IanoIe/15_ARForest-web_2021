var mysql = require('./connection').pool;

module.exports.comentarFoto = function (idUtilizador, idFoto, comentario, callback){
    mysql.getConnection(function(err, conn){
        if(err){
            conn.release();
            next(err);
        }
        else conn.query('INSERT INTO Comentarios(Titulo, Texto, Comentarios_idUtilizador, Comentarios_idFotografias) VALUES(?,?,?,?)', ["", comentario, idUtilizador, idFoto], function (err, rows){
            conn.release();

            if (err) {
                callback({code: 401, status: "Erro a inserir comentario"}, null);
            }
        })
    })
}