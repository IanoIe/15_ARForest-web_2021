var idFoto
var cores = {5:'#228B22', 4:'#9ACD32', 3:'#FFA500', 2:'#f35f29', 1:'#FF0000'}

function mediaScoreFoto(foto){
    media = 0
    for (i=0; i<foto.Comentarios.length; i++){
        media += foto.Comentarios[i].Classificacao
    }
    if(media == 0){
        return 0
    }else{
        return (media/foto.Comentarios.length).toFixed(1)
    }
}

function abrirJanelaValidarFoto(foto, conteudoImagem, descricaoModel, comentariosModel){
    idFoto = foto.idFotografias
    const img = new Image();
    img.onload = function(){
        this.height = this.height*(600/this.width)
        this.width = 600
    }
    conteudoImagem.appendChild(img)
    var d = new Date(foto.Data)
    var dia = d.getDate()
    var mes = d.getMonth()+1
    var ano = d.getFullYear()

    if (foto.mediaClassificacao){
        classi = foto.mediaClassificacao
    }else{
        classi = ""
    }
    
    cor = cores[Math.round(foto.mediaClassificacao)]
    descricaoModel.innerHTML = "<p>Autor: "+foto.nomeAutor+"</p>"+
                                "<p>Estado: "+foto.nomeEstado+"</p>"+
                                "<p>Categoria: "+foto.nomeCategoria+"</p>"+
                                "<p>Data: "+dia+"/"+mes+"/"+ano+"</p>"
    var numComentarios = 0
    for (i=0; i<foto.Comentarios.length; i++){
        var comentario = document.createElement('div')
        comentario.classList.add("comentario")

        classi = foto.Comentarios[i].Classificacao
        cor = cores[classi]

        comentario.innerHTML = "<div style='display: flex; flex-direction:row; justify-content: space-between'>"+
                                    "<div style= 'font-weight: bold; color:"+cor+"'>"+foto.Comentarios[i].Classificacao+"</div>"+
                                "</div>"+
                                "<p style='font-size:12px'>"+foto.Comentarios[i].Texto+"</p>"
        comentariosModel.appendChild(comentario)
        numComentarios += 1
    }
    document.getElementById('totalClassi').innerText = 'Total avaliações: '+numComentarios
    var mediaScore = mediaScoreFoto(foto)
    cor = cores[1] 
    for (key in cores){
        if (mediaScore > key){
            cor = cores[key]
        }
    }
    
    mediaClassi = document.getElementById('mediaClassi')
    mediaClassi.innerText = mediaScore
    mediaClassi.style.color = cor

    carregarScoreBarras(foto, {1:0, 2:0, 3:0, 4:0, 5:0})

    /* A condição que não pemeter o utilizador comemnte as suas fotos */
    if (parseInt(localStorage.getItem('idUtilizador')) != foto.idUtilizador){
        document.getElementById('comentar').style.display = 'block'
    }else{
        document.getElementById('comentar').style.display = 'none'
    }
    document.getElementById("modal").style.display = "block" 
    img.src = foto.Url
}

function carregarScoreBarras(foto, classi){
    total = 0
    for(i=0; i < foto.Comentarios.length; i++){
        valor = foto.Comentarios[i].Classificacao
        if(valor){
            classi[valor] += 1
            total += 1
        }
    }
    if(total > 0){
        for(key in classi){
            var perc = (classi[key]/total)*100
            perc = perc.toFixed(0);
            elemBarra = document.getElementsByClassName('barra classi'+key)[0]
            elemBarra.style.width = perc + "%"
            elemPerc = document.getElementsByClassName('percentagem classi'+key)[0]
            elemPerc.innerHTML =  perc + "%"
        }
    }
}

function limparBarras(nomeClass){
    barras = document.getElementsByClassName(nomeClass)
    for(i=0; i<barras.length; i++){
        barras[i].style.width = '0%'
    }
}

function limparPercentagem(nomeClass){
    percentagens = document.getElementsByClassName(nomeClass)
    for(i=0; i<percentagens.length; i++){
        percentagens[i].innerHTML = '0%'
    }
}

// Limpa imagem conteudo do model e faz-o desaparecer
function limparJanelaValidarFoto(conteudoImagem, comentariosModel, caixaComentarios){
    document.getElementById("modal").style.display = "none";
    conteudoImagem.removeChild(conteudoImagem.children[conteudoImagem.children.length-1])
    while (comentariosModel.childNodes.length > 0){
        comentariosModel.removeChild(comentariosModel.children[comentariosModel.children.length-1])
    }
    caixaComentarios.value = ""
    limparBarras('barra')
    limparPercentagem('percentagem')
}

function getStarRating(){
    starRating = document.getElementById('starRating')
    ratings = starRating.getElementsByTagName('input')
    for (i=0; i<ratings.length; i++){
        if(ratings[i].checked){
            return ratings[i].value
        }
    }
    return null
}

function submeterClassiComen(){
    idUtilizador = localStorage.getItem('idUtilizador')
    idFotografia = idFoto
    classi = getStarRating()
    coment = document.getElementById('caixaComentar').value
    enviarClassiComen(idUtilizador, idFotografia, classi, coment)

    var conteudoImagem = document.getElementById("conteudoImagem")
    var comentariosModel = document.getElementById("comentarios")
    var caixaComentarios = document.getElementById('caixaComentar')
    limparJanelaValidarFoto(conteudoImagem, comentariosModel, caixaComentarios)
    
}
 
function enviarClassiComen(idUtilizador, idFoto, classi, comentario){
    $.ajax({
        url: '/api/fotos/'+idFoto, 
        method: 'post',
        data: {
            idUtilizador: idUtilizador,
            classificacao: classi,
            comentario: comentario,
        },
        success: function(result, status) {
            console.log('Success')
            alert("Comentário submetido com sucesso")
            location.reload();
        },
        error: function(errorThrown) {
            console.log(errorThrown);
        }
    })
}

