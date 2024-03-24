document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
            
    // Obtém os valores dos campos de entrada
    var username = document.getElementById('signup-username').value;
    var password = document.getElementById('signup-password').value;

    // Envia os dados para o backend
    fetch('http://db-project-unisinos.c72kcyc8yf0o.us-east-1.rds.amazonaws.com/sua-rota-de-cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => {
        if (response.ok) {
            alert('Conta criada com sucesso!');
            // Limpa os campos do formulário após o envio bem-sucedido
            document.getElementById('signup-username').value = '';
            document.getElementById('signup-password').value = '';
        } else {
            alert('Erro ao criar conta. Por favor, tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao criar conta. Por favor, tente novamente.');
    });
});
