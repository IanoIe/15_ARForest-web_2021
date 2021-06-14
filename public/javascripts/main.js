var marcadores = []
var fotos = []
var idFoto
var mapa
var coordPopup = L.popup()

var conteudoModel
var conteudoImagem
var descricaoModel
var comentariosModel

var estadoImgUpload
var categoriaImgUpload
var latImgUpload
var lngImgUpload

var cores = {1:'#228B22', 2:'#9ACD32', 3:'#FFA500', 4:'#FF4500', 5:'#FF0000'}

window.onload = function(){
    document.getElementById('nomeUtilizador').innerHTML = localStorage.getItem('nomeUtilizador')
    conteudoModel = document.getElementById("conteudoModel")
    conteudoImagem = document.getElementById("conteudoImagem")
    descricaoModel = document.getElementById("descricao")
    comentariosModel = document.getElementById("comentarios")

    estadoImgUpload = document.getElementById('estadoUpload')
    categoriaImgUpload = document.getElementById('categoriaUpload')
    latImgUpload = document.getElementById('latUpload')
    lngImgUpload = document.getElementById('lngUpload')

    // função para fechar janela popup carregando fora da janela
    window.onclick = function(event) {
        if (event.target == document.getElementById("modal")) {
            limparJanelaValidarFoto()
        }
    }
    carregarMapa();
    carregarFotos();  
}
// Limpa imagem conteudo do model e faz-o desaparecer
function limparJanelaValidarFoto(){
    document.getElementById("modal").style.display = "none";
    conteudoImagem.removeChild(conteudoImagem.children[conteudoImagem.children.length-1])
    while (comentariosModel.childNodes.length > 0){
        comentariosModel.removeChild(comentariosModel.children[comentariosModel.children.length-1])
    }
    document.getElementById('caixaComentar').value = ""
} 

function abrirJanelaValidarFoto(foto){
    idFoto = foto.idFotografias
    const img = new Image();
    img.onload = function(){
        this.height = this.height*(600/this.width)
        this.width = 600
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
                                   "<p>Data: "+dia+"/"+mes+"/"+ano+"</p>"+
                                   "<div style='display: flex;flex-direction:row;'>"+
                                        "<div style='margin-right: 10px';>Classificação:</div>"+
                                        "<div style='color:"+cor+"; font-weight: bold;'>"+classi+"</div>"+
                                    "</div>"
        for (i=0; i<foto.Comentarios.length; i++){
            comentario = document.createElement('div')
            comentario.classList.add("comentario")

            classi = foto.Comentarios[i].Classificacao
            cor = cores[classi]

            comentario.innerHTML = "<div style='display: flex; flex-direction:row; justify-content: space-between'>"+
                                        "<div style= 'font-weight: bold; color:"+cor+"'>"+foto.Comentarios[i].Classificacao+"</div>"+
                                    "</div>"+
                                    "<p style='font-size:12px'>"+foto.Comentarios[i].Texto+"</p>"
            comentariosModel.appendChild(comentario)
        }
        /* A condição que não pemeter o utilizador comemnte as suas fotos */
        if (parseInt(localStorage.getItem('idUtilizador')) != foto.idUtilizador){
            document.getElementById('formClassComen').style.display = 'block'
        }else{
            document.getElementById('formClassComen').style.display = 'none'
        }
        document.getElementById("modal").style.display = "block" 
    }
    img.src = foto.Url
}

function submeterClassComen(){
    idUtilizador = localStorage.getItem('idUtilizador')
    idFotografia = idFoto
    classi = document.getElementById('classificar').value
    coment = document.getElementById('caixaComentar').value
    enviarClassComen(idUtilizador, idFotografia, classi, coment)
    limparJanelaValidarFoto()
    alert("Comentário submetido com sucesso")
    location.reload();
}

function enviarClassComen(idUtilizador, idFoto, classi, comentario){
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
        },
        error: function(errorThrown) {
            console.log(errorThrown);
        }
    })
}

function carregaFotosMapa(fotos){
    // Apagar os punto no mapa antes de preencher de novo
    marcadores.forEach(function(m){
        mapa.removeLayer(m)
    })
    // Criar novo icon para marcador
    var icon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    // alterar o url dependendo do estado (altera a cor)
    for (i=0; i<fotos.length; i++){
        if (fotos[i].nomeEstado == 'Sujo'){
            icon.options.iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
        }else if (fotos[i].nomeEstado == 'Semi-Limpo'){
            icon.options.iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png'
        }else{
            icon.options.iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
        }
        var marcador = L.marker([fotos[i].Latitude, fotos[i].Longitude], {icon: icon}).addTo(mapa)
        marcadores.push(marcador)

        imagemPopup = document.createElement("img");
        imagemPopup.src = fotos[i].Url
        imagemPopup.width = '100'
        imagemPopup.height = '100'

        textPopup = document.createElement("div")
        var d = new Date(fotos[i].Data)
        textPopup.innerHTML = "<ul>"+
                                "<li>Autor: "+fotos[i].nomeAutor+"</li>"+
                                "<li>Estado: "+fotos[i].nomeEstado+"</li>"+
                                "<li>Categoria: "+fotos[i].nomeCategoria+"</li>"+
                               "</ul>"
        infoPopup = document.createElement("div")
        infoPopup.appendChild(imagemPopup)
        infoPopup.appendChild(textPopup)
        infoPopup.style.cursor = 'pointer'
        infoPopup.value = i
        infoPopup.onclick = function(){
            abrirJanelaValidarFoto(fotos[this.value])
        }
        marcador.bindPopup(infoPopup, {
            maxWidth: "auto"
        });

        marcador.on('mouseover', function(e){
            this.openPopup()
        })
    }
}

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
        success: function(result, status) {
            console.log('Success')
        },
        error: function(errorThrown) {
            console.log(status);
        }
    })
    alert("Fotografia guardada com sucesso")
    location.reload();
}

function filtrarFotos(){
    console.log(fotos)
    var selectEstado = document.getElementById('estado').value
    var selectCategoria = document.getElementById('categoria').value
    var textAutor = document.getElementById('autor').value
    
    var filtro = {}
    if (selectEstado != ""){
        filtro.idEstado = parseInt(selectEstado)
    }
    if (selectCategoria != ""){
        filtro.idCategoria = parseInt(selectCategoria)
    }
    if (textAutor != ""){
        filtro.nomeAutor = textAutor
    }
    console.log(filtro)
    fotosFiltradas = []
    var fotoPassa = true
    for (i = 0; i < fotos.length; i++){
        for(var key in filtro){
            if (fotos[i][key] != filtro[key]){
                fotoPassa = false
            }
        }
        if (fotoPassa){
            fotosFiltradas.push(fotos[i])
        }
        fotoPassa = true
    }
    carregaFotosMapa(fotosFiltradas)

}

function carregarMapa(){
    mapa = L.map('map')
    var attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
    var tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mapa);
    /**Cordenadas da localização de Madrid */
    mapa.setView([40.36328834091583, -3.6254882812500004], 6);
    mapa.on('click', function(e){
        coordPopup
                .setLatLng(e.latlng) 
                .setContent(e.latlng.toString())
                .openOn(this)
        latImgUpload.value = e.latlng.lat
        lngImgUpload.value = e.latlng.lng
    })
}

function carregarFotos(){
    $.ajax({
        url: '/api/fotos/',
        method: 'get',
        success: function(resultado){
            fotos = resultado;
            console.log(fotos)
            carregaFotosMapa(fotos) 
        }
    })
}



