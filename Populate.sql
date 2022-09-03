use arforest;


#Estado da superficie
insert into Estado (idEstado, nomeEstado) values (1, "Limpo");
insert into Estado (idEstado, nomeEstado) values (2, "Semi-Limpo");
insert into Estado (idEstado, nomeEstado) values (3, "Sujo");

# Utilizador 
insert into Utilizador (idUtilizador, nomeUtilizador, Email, Senha) values (1, "Luis Goveia", "luis@gmail.com", "luis");
insert into Utilizador (idUtilizador, nomeUtilizador, Email, Senha) values (2, "Mario Ferreira", "mario@hotmail.com", "mario");
insert into Utilizador (idUtilizador, nomeUtilizador, Email, Senha) values (3, "Terasa Assunção", "teresa@hotmail.com", "teresa");
insert into Utilizador (idUtilizador, nomeUtilizador, Email, Senha) values (4, "Luis Goveia", "luis@gmail.com", "luis");
insert into Utilizador (idUtilizador, nomeUtilizador, Email, Senha) values (5, "Joana Matos", "joana@gmail.com", "joana");

# Categoria
insert into Categoria(idCategoria, nomeCategoria) values (1, "Parque Natural");
insert into Categoria(idCategoria, nomeCategoria) values (2, "Zonas Habitadas");
insert into Categoria(idCategoria, nomeCategoria) values (3, "Zona Agrícola");


# Fotografias
insert into Fotografias (idFotografias, Url, Classificacao, Latitude, Longitude, Data, Fotografias_idUtilizador, Fotografias_idEstado, Fotografias_idCategoria) values (1, "https://drive.google.com/uc?export=view&id=1g1kVTLWOnH4NWP99eQc0XysogNcF9gdt", "1", "38.6916","-9.216", '2020-01-01 10:10:10', 1, 1, 1);
insert into Fotografias (idFotografias, Url, Classificacao, Latitude, Longitude, Data, Fotografias_idUtilizador, Fotografias_idEstado, Fotografias_idCategoria) values (2, "https://drive.google.com/uc?export=view&id=1VgHb5qXLkSzP1EqeA1W2ItwiXmh8fh4M", "2", "39.3345","-10.234", '2020-01-01 10:10:10', 2, 1, 2);
insert into Fotografias (idFotografias, Url, Classificacao, Latitude, Longitude, Data, Fotografias_idUtilizador, Fotografias_idEstado, Fotografias_idCategoria) values (3, "https://drive.google.com/uc?export=view&id=1Th7X5DV3aLnlFo-mVtNyGk2NgXNr5AY5", "3", "33.4930","-820", '2020-01-01 10:10:10', 3, 2, 3);
insert into Fotografias (idFotografias, Url, Classificacao, Latitude, Longitude, Data, Fotografias_idUtilizador, Fotografias_idEstado, Fotografias_idCategoria) values (4, "https://drive.google.com/uc?export=view&id=1Y9sIj486ghfH80WWW_Tkv4gt4Zq-crUO", "4", "37.4933", "-9.100", '2020-01-01 10:10:10', 4, 2, 1);
insert into Fotografias (idFotografias, Url, Classificacao, Latitude, Longitude, Data, Fotografias_idUtilizador, Fotografias_idEstado, Fotografias_idCategoria) values (5, "https://drive.google.com/uc?export=view&id=1EeQuZJ4cnkfGKSDYtAA0ADZJbI9vrUpq", "5", "38.8272","-8.234", '2020-01-01 10:10:10', 5, 3, 2);

# Comentários
insert into Comentarios (idComentarios, Titulo, Texto, Comentarios_idFotografias, Comentarios_idUtilizador) values (1, "Foto de Feijó", "Estas são as fotografias que preciso", 1, 1);
insert into Comentarios (idComentarios, Titulo, Texto, Comentarios_idFotografias, Comentarios_idUtilizador) values (2, "Seixal Velho", "Esta é uma zona muito perigosa", 2, 2);
insert into Comentarios (idComentarios, Titulo, Texto, Comentarios_idFotografias, Comentarios_idUtilizador) values (3, "Setubal Verde", "Zona das laranjeiras alentejanas", 3, 3);
insert into Comentarios (idComentarios, Titulo, Texto, Comentarios_idFotografias, Comentarios_idUtilizador) values (4, "Fotos do Outuno", "Estas são as fotografi", 4, 4);
insert into Comentarios (idComentarios, Titulo, Texto, Comentarios_idFotografias, Comentarios_idUtilizador) values (5, "Almada Lixeira", "Estas são: ", 5, 5);
