document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    const resultadoMensagem = document.getElementById('resultado-mensagem');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        // Capturar os dados do formulário
        const nome = document.querySelector('#nome').value;
        const email = document.querySelector('#email').value;
        const assunto = document.querySelector('#assunto').value;
        const mensagem = document.querySelector('#mensagem').value;

        // Criar o objeto com os dados do formulário
        const dadosFormulario = {
            nome: nome,
            email: email,
            assunto: assunto,
            mensagem: mensagem
        };

        // Enviar a requisição para a API HTTP via POST
        fetch('https://ja6ku70ywd.execute-api.us-east-1.amazonaws.com/dev/mensagem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dadosFormulario)
        })
        .then(response => {
            console.log('Resposta do servidor:', response); // Log da resposta
            if (!response.ok) {
                throw new Error('Erro ao enviar a mensagem.');
            }
            return response.json();
        })
        .then(data => {
            resultadoMensagem.innerText = 'Mensagem enviada com sucesso!';
            resultadoMensagem.style.color = 'green'; // Exibir em verde para sucesso
            form.reset();
        })
        .catch(error => {
            console.error('Erro:', error);
            resultadoMensagem.innerText = 'Houve um problema ao enviar sua mensagem. Tente novamente.';
            resultadoMensagem.style.color = 'red'; // Exibir em vermelho para erro
        });
    });
});
