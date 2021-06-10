var mysql = require('./connection').pool;


/** GET All Fotografias*/
module.exports.getFotos = function (obj, callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        query = "select idFotografias, nomeUtilizador as nomeAutor, Url, Classificacao, Latitude, Longitude, Data, idUtilizador,"+
        " nomeEstado, nomeCategoria, Titulo, Texto, Comentarios_idUtilizador as idAutorComentario"+ 
        " from Fotografias inner join Categoria on idCategoria = Fotografias_idCategoria"+
        " inner join Utilizador on idUtilizador = Fotografias_idUtilizador inner join Estado on Fotografias_idEstado = idEstado"+
        " left join Comentarios on Comentarios_idFotografias = idFotografias;"
        
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
            console.log(rows)
            result = []
            id = -1
            for (i=0; i<rows.length; i++){
                if (rows[i].idFotografias != id){
                    result.push({'idUtilizador': rows[i].idUtilizador,
                                    'idFotografias': rows[i].idFotografias,
                                    'nomeAutor': rows[i].nomeAutor,
                                    'Url': rows[i].Url,
                                    'Classificacao': rows[i].Classificacao,
                                    'Latitude': rows[i].Latitude,
                                    'Longitude': rows[i].Longitude,
                                    'Data': rows[i].Data,
                                    'nomeEstado': rows[i].nomeEstado,
                                    'nomeCategoria': rows[i].nomeCategoria})
                    result[result.length-1].Comentarios = []
                    id = rows[i].idUtilizador
                }
                if(rows[i].Texto){
                    result[result.length-1].Comentarios.push({'Titulo': rows[i].Titulo, 
                                                              'Texto': rows[i].Texto, 
                                                              'idAutorComentario': rows[i].idAutorComentario})
                }
            }
            callback({ code: 200, status: "Ok" }, result);
        })
    })
}