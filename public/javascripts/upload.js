var mapa
var coordPopup = L.popup()
var fotos
var cores = {5:'#228B22', 4:'#9ACD32', 3:'#FFA500', 2:'#f35f29', 1:'#FF0000'}

var categoriaImgUpload
var estadoImgUpload

var latImgUpload
var lngImgUpload

var conteudoImagem
var descricaoModel
var comentariosModel
var caixaComentarios

window.onload = function(){
    document.getElementById('nomeUtilizador').innerHTML = localStorage.getItem('nomeUtilizador')
    categoriaImgUpload = document.getElementById('categoriaUpload')
    estadoImgUpload = document.getElementById('estadoUpload')

    conteudoImagem = document.getElementById("conteudoImagem")
    descricaoModel = document.getElementById("descricao")
    comentariosModel = document.getElementById("comentarios")
    caixaComentarios = document.getElementById('caixaComentar')

    latImgUpload = document.getElementById('latUpload')
    lngImgUpload = document.getElementById('lngUpload')

    // função para fechar janela popup carregando fora da janela e no botao de fechar
    window.onclick = function(event) {
        if (event.target == document.getElementById("modal")) {
            limparJanelaValidarFoto(conteudoImagem, comentariosModel, caixaComentarios)
        }
    }
    // função que permite fechar a janela clicando na cruz (x) com rato
    document.getElementById('botaoFechar').addEventListener('click', function(){
        limparJanelaValidarFoto(conteudoImagem, comentariosModel, caixaComentarios)})

    mapa = carregarMapa('map');
    mapa.on('click', function(e){
        coordPopup
                .setLatLng(e.latlng) 
                .setContent(e.latlng.toString())
                .openOn(this)
        latImgUpload.value = e.latlng.lat
        lngImgUpload.value = e.latlng.lng
    })
    params = {Fotografias_idUtilizador: localStorage.getItem('idUtilizador')}
    carregarFotos(mapa, conteudoImagem, descricaoModel, comentariosModel, params);
}


/** Função que permite fazer upload da imgaem, guardando no Imgbb */
function uploadImg(){
    var file = document.getElementById('input_img');
    var form = new FormData();
    form.append('image', file.files[0])

    $.ajax(
        {
            'url': 'https://api.imgbb.com/1/upload?key=d54931f6597af555fc8dfdbb69742ceb',
            'method': 'POST',
            'timeout': 0,
            'processData': false,
            'mimeType': 'multipart/form-data',
            'contentType': false,
            'data': form
        }
    ).done(function(rep){
        var jx = JSON.parse(rep)
        uploadFotoBD(localStorage.getItem('idUtilizador'), jx.data.url)
    })
}

/** Função que permite enviar imagens a base de dados */
function uploadFotoBD(idAutor, url){
    $.ajax({
        url: '/api/utilizador/'+idAutor+'/fotos/upload', 
        method: 'post',
        data: {
            estado: estadoImgUpload.value,
            categoria: categoriaImgUpload.value,
            lat: latImgUpload.value,
            lng: lngImgUpload.value,
            url: url
        },
        success: function(status, result) {
            console.log(result)
            alert("Fotografia guardada com sucesso")
            location.reload();
        },
        error: function(status, result) {
            console.log(status);
        }
    })
}
