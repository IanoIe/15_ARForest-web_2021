var marcadores = []
var fotos = []
var mapa

var conteudoModel
var conteudoImagem;
var descricaoModel;
var comentariosModel;

window.onload = function(){
    document.getElementById('nomeUtilizador').innerHTML = localStorage.getItem('nomeUtilizador')
    conteudoModel = document.getElementById("conteudoModel")
    conteudoImagem = document.getElementById("conteudoImagem")
    descricaoModel = document.getElementById("descricao")
    comentariosModel = document.getElementById("comentarios")
    // função para fechar janela popup na cruz
    document.getElementById("botaoFechar").onclick = function() {
        limparJanelaValidarFoto()
    }
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
} 

function abrirJanelaValidarFoto(foto){
    const img = new Image();
    img.onload = function(){
        this.height = this.height*(600/this.width)
        this.width = 600
        conteudoImagem.appendChild(img)
        var d = new Date(foto.Data)
        var dia = d.getDate()
        var mes = d.getMonth()+1
        var ano = d.getFullYear()
        descricaoModel.innerHTML = "<p>Autor: "+foto.nomeAutor+"</p>"+
                                   "<p>Estado: "+foto.nomeEstado+"</p>"+
                                   "<p>Categoria: "+foto.nomeCategoria+"</p>"+
                                   "<p>Data: "+dia+"/"+mes+"/"+ano+"</p>"
        for (i=0; i<foto.Comentarios.length; i++){
            comentario = document.createElement('div')
            comentario.classList.add("comentario")
            comentario.innerHTML = "<div style='display: flex; flex-direction:row; justify-content: space-between'>"+
                                        "<div style='font-weight:bold'>"+foto.Comentarios[i].Titulo+"</div>"+
                                        "<div style='color:green'>"+5+"</div>"+
                                    "</div>"+
                                    "<p style='font-size:12px'>"+foto.Comentarios[i].Texto+"</p>"
            comentariosModel.appendChild(comentario)
        }
        document.getElementById("modal").style.display = "block" 
    }
    img.src = foto.Url
}

function submeterComentario(idUtilizador, idFoto, comentario){
    $.ajax({
        url: '/api/auth/register', 
        method: 'post',
        data: {
            Nome:document.getElementById("nome").value,
            Email:document.getElementById("emailRegistar").value,
            Senha:document.getElementById("senha").value,
        },
        success: function(result, status) {
            console.log('Success')
            window.location = "login.html";
        },
        error: function(jqXHR, textStatus, errorThrown) {
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
        var dia = d.getDate()
        var mes = d.getMonth()+1
        var ano = d.getFullYear()
        textPopup.innerHTML = "<ul>"+
                 "<li>Autor: "+fotos[i].nomeAutor+"</li>"+
                 "<li>Estado: "+fotos[i].nomeEstado+"</li>"+
                 "<li>Categoria: "+fotos[i].nomeCategoria+"</li>"+
                 "<li>Data: "+dia+"/"+mes+"/"+ano+"</li>"+
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

function filtrarFotos(){
    console.log(fotos)
    var selectEstado = document.getElementById('estado').value
    var selectCategoria = document.getElementById('categoria').value
    var textAutor = document.getElementById('autor').value
    
    var filtro = {}
    if (selectEstado != ""){
        filtro.nomeEstado = selectEstado
    }
    if (selectCategoria != ""){
        filtro.nomeCategoria = selectCategoria
    }
    if (textAutor != ""){
        filtro.nomeAutor = textAutor
    }
    
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
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position) {
            mapa.setView([position.coords.latitude, position.coords.longitude], 8);
        })
    }else{
                      /**Cordenadas da localização de Santos */
        mapa.setView([38.70689937357626, -9.155871477142364], 8);
    }
}

function carregarFotos(){
    $.ajax({
        url: "/api/carregarFotos/",
        method: "get",
        success: function(resultado){
            fotos = resultado;
            console.log(fotos)
            carregaFotosMapa(fotos) 
        }
    })
}



