var mapa
var coordPopup = L.popup()

var categoriaImgUpload
var estadoImgUpload

var latImgUpload
var lngImgUpload

window.onload = function(){
    document.getElementById('nomeUtilizador').innerHTML = localStorage.getItem('nomeUtilizador')
    categoriaImgUpload = document.getElementById('categoriaUpload')
    estadoImgUpload = document.getElementById('estadoUpload')

    latImgUpload = document.getElementById('latUpload')
    lngImgUpload = document.getElementById('lngUpload')

    mapa = carregarMapa('map');
    mapa.on('click', function(e){
        coordPopup
                .setLatLng(e.latlng) 
                .setContent(e.latlng.toString())
                .openOn(this)
        latImgUpload.value = e.latlng.lat
        lngImgUpload.value = e.latlng.lng
    })
}



/** Função que permite fazer upload da imgaem */
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

/** Função que enviar imagens a base de dados */

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
