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

module.exports.uploadFoto = function (idUtilizador, data, callback){
    console.log(data)
    mysql.getConnection(function(err, conn){
        if(err){
            conn.release();
            next(err);
        }
        else conn.query('INSERT INTO Fotografias(URL, Classificacao, Fotografias_idCategoria, Fotografias_idEstado,'+
                        ' Latitude, Longitude, Data, Fotografias_idUtilizador) VALUES(?,?,?,?,?,?,?,?)', 
                        [data.url, 0, parseInt(data.categoria), parseInt(data.estado), data.lat, data.lng, new Date(), idUtilizador], function (err, rows){
            conn.release();

            if (err) {
                callback({code: 401, status: err}, null);
            }
        })
    })
}