var fotos
var marcadores = []

function carregarFotos(mapa, conteudoImagem, descricaoModel, comentariosModel){
    $.ajax({
        url: '/api/fotos/',
        method: 'get',
        success: function(resultado){
            fotos = resultado;
            console.log(fotos)
            carregaFotosMapa(mapa, fotos, marcadores, conteudoImagem, descricaoModel, comentariosModel) 
        }
    })
}

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
        marcadores.push(marcador)

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
    }
}

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

function aplicarFiltro(){
    filtro = criarFiltro()
    fotosFiltradas = filtrarFotos(filtro, fotos)
    console.log(fotos)
    carregaFotosMapa(mapa, fotosFiltradas, marcadores)
}