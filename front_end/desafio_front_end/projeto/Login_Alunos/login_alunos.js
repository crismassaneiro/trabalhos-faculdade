document.getElementById("login-form").addEventListener("submit", function(event){
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Aqui você pode adicionar a lógica para verificar o nome de usuário e senha, por exemplo:
    if(username === "usuario" && password === "senha"){
        alert("Login bem-sucedido!");
        // Redirecionamento para outra página após o login bem-sucedido
        // window.location.href = "pagina_de_redirecionamento.html";
    } else {
        alert("Nome de usuário ou senha incorretos.");
    }
});
