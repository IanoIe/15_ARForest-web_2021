function entrar(){
    $.ajax({
        url: '/api/auth/login',
        method: 'post',
        data: {
            Email:document.getElementById("email").value,
            Senha:document.getElementById("password").value,
        },
        success: function(result, status) {
            alert('Login feito com sucesso!')
            localStorage.setItem("nomeUtilizador", result[0].nomeUtilizador);
            localStorage.setItem("idUtilizador", result[0].idUtilizador);
            window.location = "main.html";
        },
        error: function(jqXHR, textStatus, errorThron) {
            console.log(errorThrown);
        }
    })
}

function registar(){
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