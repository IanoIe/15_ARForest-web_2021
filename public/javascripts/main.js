var mapa
var coordPopup = L.popup()

var cores = {5:'#228B22', 4:'#9ACD32', 3:'#FFA500', 2:'#f35f29', 1:'#FF0000'}

window.onload = function(){
    document.getElementById('nomeUtilizador').innerHTML = localStorage.getItem('nomeUtilizador')
    var conteudoImagem = document.getElementById("conteudoImagem")
    var descricaoModel = document.getElementById("descricao")
    var comentariosModel = document.getElementById("comentarios")
    var caixaComentarios = document.getElementById('caixaComentar')

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
    carregarFotos(mapa, conteudoImagem, descricaoModel, comentariosModel);  
}















