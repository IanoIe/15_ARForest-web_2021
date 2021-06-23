
/**Esta função permite carregar o mapa e centraliza-lo nas coordenas que estao abaixo, neste caso coordenadas de Madrid */
function carregarMapa(idElement){
    var mapa = L.map(idElement)
    var attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
    var tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mapa);
    /**Cordenadas da localização de Madrid */
    mapa.setView([40.36328834091583, -3.6254882812500004], 6);
    return mapa
}
