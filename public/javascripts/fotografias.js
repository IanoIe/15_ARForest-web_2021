window.onload = function(){
    loadFotografias();
}

function loadFotografias(){
    $.aja({
        url:'api/Fotografias/todosFotografias',
        method: 'get',
        success: function(result, status){
            current = result;
            console.log(result);
            
        }
    })
}