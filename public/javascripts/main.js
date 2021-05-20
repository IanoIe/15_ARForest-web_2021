
window.onload = function(){
    var mapa = carregarMapa();
    carregarFotos(mapa);
      
}

function carregaFotosMapa(mapa, fotos){
    console.log(fotos)
    for (i=0; i<fotos.length; i++){
        console.log(fotos[i].Url)
        var marcador = L.marker([fotos[i].Latitude, fotos[i].Longitude]).addTo(mapa)

        imagemPopup = document.createElement("img");
        imagemPopup.src = fotos[i].Url
        imagemPopup.width = '100'
        imagemPopup.height = '100'

        textPopup = document.createElement("li")
        estado = document.createTextNode("Estado: " + fotos[i].nomeEstado)
        textPopup.appendChild(estado)
        categoria = document.createTextNode("Categoria: " + fotos[i].nomeCategoria)
        textPopup.appendChild(categoria)
        data = document.createTextNode("Data: " + fotos[i].Data)
        textPopup.appendChild(data)

        infoPopup = document.createElement("div")
        infoPopup.appendChild(imagemPopup)
        infoPopup.appendChild(textPopup)
        
        marcador.bindPopup(infoPopup, {
            maxWidth: "auto"
        });
    } 
}


function carregarMapa(){
    var mapa = L.map('map')
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
    return mapa;
}

function carregarFotos(mapa){
    $.ajax({
        url: "/api/carregarFotos/",
        method: "get",
        success: function(resultado){
            fotos = resultado;
            carregaFotosMapa(mapa, fotos) 
        }
    })
}

