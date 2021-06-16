var mysql = require('./connection').pool;


/** GET All Fotografias*/
module.exports.getFotos = function (obj, callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        query = "select idFotografias, nomeUtilizador as nomeAutor, Url, Texto, Classificacao, Latitude, Longitude, Data, idUtilizador,"+
        " nomeEstado, nomeCategoria, Texto, Comentarios_idUtilizador as idAutorComentario, Fotografias_idEstado as idEstado,"+ 
        " Fotografias_idCategoria as idCategoria"+
        " from Fotografias inner join Categoria on idCategoria = Fotografias_idCategoria"+
        " inner join Utilizador on idUtilizador = Fotografias_idUtilizador inner join Estado on Fotografias_idEstado = idEstado"+
        " left join Comentarios on Comentarios_idFotografias = idFotografias order by idFotografias;"        
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
            result = []
            id = -1
            for (i=0; i<rows.length; i++){
                if (rows[i].idFotografias != id){
                    result.push({'idUtilizador': rows[i].idUtilizador,
                                    'idFotografias': rows[i].idFotografias,
                                    'nomeAutor': rows[i].nomeAutor,
                                    'Url': rows[i].Url,
                                    'Latitude': rows[i].Latitude,
                                    'Longitude': rows[i].Longitude,
                                    'Data': rows[i].Data,
                                    'nomeEstado': rows[i].nomeEstado,
                                    'nomeCategoria': rows[i].nomeCategoria,
                                    'idEstado': rows[i].idEstado,
                                    'idCategoria': rows[i].idCategoria})
                    result[result.length-1].Comentarios = []
                    id = rows[i].idFotografias
                }
                if(rows[i].Texto){
                    result[result.length-1].Comentarios.push({'Texto': rows[i].Texto, 
                                                              'Classificacao': rows[i].Classificacao, 
                                                              'idAutorComentario': rows[i].idAutorComentario})
                }
            }
            inserirMediaClassi(result)
            callback({ code: 200, status: "Ok" }, result);
        })
    })
}

module.exports.postClassComen = function (idUtilizador, idFoto, classificacao, comentario, callback){
    mysql.getConnection(function(err, conn){
        if(err){
            conn.release();
            next(err);
        }
        else conn.query('insert into Comentarios (Comentarios_idUtilizador, Comentarios_idFotografias, Classificacao, Texto) values (?,?,?,?)', 
                        [idUtilizador, idFoto, classificacao, comentario], function (err, rows){
            conn.release();
            if (err) {
                callback({code: 401, status: err}, null);
            }
        })
    })
}

function inserirMediaClassi(rows){
    for (i=0; i<rows.length; i++){
        media = 0
        for (j=0; j<rows[i].Comentarios.length; j++){
            media += rows[i].Comentarios[j].Classificacao
        }
        if (rows[i].Comentarios.length > 0){
            rows[i].mediaClassificacao = media/rows[i].Comentarios.length
        }
    }
}
