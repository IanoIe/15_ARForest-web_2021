var fotos;

window.onload = carregarFotos();
function carregarFotos(){
    $.ajax({
        url: "/api/carregarFotos/",
        method: "get",
        success: function(resultado){
            fotos = resultado;
            console.log(fotos)
        }
    })
}

