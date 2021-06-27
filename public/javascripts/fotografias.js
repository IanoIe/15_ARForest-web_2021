var fotos
var marcadores = []


/** A função que carrega as fotografias e assim como os dados relacionados a elas  */
function carregarFotos(mapa, conteudoImagem, descricaoModel, comentariosModel, params){
    url = '/api/fotos/'
    if(params){
        url+='?'
        for(p in params){
            url+=p+'='+params[p]+'&'
        }
        url = url.slice(0,-1)
    }
    $.ajax({
        url: url,
        method: 'get',
        success: function(resultado){
            fotos = resultado;
            console.log(fotos)
            carregaFotosMapa(mapa, fotos, marcadores, conteudoImagem, descricaoModel, comentariosModel) 
        }
    })
}

/** A função que carrega as fotografias, marcadores (pontos) e assim como as descrições, comentarios no mapa */
function carregaFotosMapa(mapa, fotos, marcadores, conteudoImagem, descricaoModel, comentariosModel){
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
        marcador.indexFoto = i

        imagemPopup = document.createElement("img");
        imagemPopup.src = fotos[i].Url
        imagemPopup.width = '100'
        imagemPopup.height = '100'

        textPopup = document.createElement("div")
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

            abrirJanelaValidarFoto(fotos[this.value], conteudoImagem, descricaoModel, comentariosModel)
        }
        marcador.bindPopup(infoPopup, {
            maxWidth: "auto"
        });

        marcador.on('mouseover', function(e){
            this.openPopup()
        })
        marcador.on('click', function(){
            abrirJanelaValidarFoto(fotos[this.indexFoto], conteudoImagem, descricaoModel, comentariosModel)
        })
        marcadores.push(marcador)
    }
}

/** A função para filtrar as fotografias  */
function filtrarFotos(filtro, fotos){
    
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
    return fotosFiltradas
}

/**A função para criar filtro e permitir que seja executada conformo ao estado, categoria e autor  */
function criarFiltro(){
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
    return filtro
}

/**A função que permite aplicar filtro criada na função anterior  */
function aplicarFiltro(){
    filtro = criarFiltro()
    fotosFiltradas = filtrarFotos(filtro, fotos)
    carregaFotosMapa(mapa, fotosFiltradas, marcadores, conteudoImagem, descricaoModel, comentariosModel)
}