var mysql = require('./connection').pool;


/** GET All Fotografias*/
module.exports.getFotos = function (obj, callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        query = "select nomeUtilizador as nomeAutor, Url, Classificacao, Latitude, Longitude, Data, idUtilizador"+
        ", nomeEstado, nomeCategoria from Fotografias inner join Categoria on idCategoria = Fotografias_idCategoria"+
        " inner join Utilizador on idUtilizador = Fotografias_idUtilizador inner join Estado on Fotografias_idEstado = idEstado";
        
        var values = [];
        if (obj){
            isFirst = true;
            for (key in obj){
                values.push(obj[key])
                if (!isFirst){
                    query += " and ";
                } else {
                    isFirst = false; 
                }
                query += key + "=?";
            }
        }       
        conn.query(query, values, function (err, rows) {
            conn.release();
            if(err){
                callback({ code: 401, status: err }, null);
                return
            }
            callback({ code: 200, status: "Ok" }, rows);
        })
    })
}