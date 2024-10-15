document.addEventListener("DOMContentLoaded", function() {
    const perguntaTexto = document.getElementById("pergunta-texto");
    const opcoesContainer = document.getElementById("opcoes-container");
    const novaPerguntaBtn = document.getElementById("nova-pergunta");
    const anteriorPerguntaBtn = document.getElementById("anterior-pergunta");
    const resultadoTexto = document.getElementById("resultado");
    const numeroPergunta = document.getElementById("numero-pergunta");
    const temaPergunta = document.getElementById("tema-pergunta");
    const feedbackForm = document.getElementById("feedback-form");
    const enviarFeedbackBtn = document.getElementById("enviar-feedback");
    const fecharFeedbackBtn = document.getElementById("fechar-feedback");
    const acertosTexto = document.getElementById("acertos");
    const errosTexto = document.getElementById("erros");

    let perguntasHistorico = [];
    let indicePerguntaAtual = -1;
    let contagemPerguntas = 0; // Contador de perguntas
    let acertos = 0; // Contador de acertos
    let erros = 0; // Contador de erros
    let respostaDada = false; // Flag para controlar se a resposta foi dada

    // Função para obter uma pergunta aleatória do endpoint
    async function obterPergunta() {
        try {
            const response = await fetch("https://ptg98rlma7.execute-api.us-east-1.amazonaws.com/dev/perguntas");
            if (!response.ok) {
                throw new Error("Erro ao buscar a pergunta.");
            }
            const pergunta = await response.json();
            perguntasHistorico.push(pergunta);
            indicePerguntaAtual = perguntasHistorico.length - 1;
            exibirPergunta(pergunta);
            contagemPerguntas++;

            // Verificar se deve exibir o formulário de feedback
            if (contagemPerguntas % 15 === 0) {
                feedbackForm.style.display = "block"; // Mostrar o formulário
            }
        } catch (error) {
            console.error(error);
            perguntaTexto.innerText = "Não foi possível carregar a pergunta.";
        }
    }

    // Função para exibir a pergunta e suas opções
    function exibirPergunta(pergunta) {
        perguntaTexto.innerText = pergunta.Pergunta;
        opcoesContainer.innerHTML = ""; // Limpar opções anteriores
        resultadoTexto.style.visibility = "hidden"; // Esconder o resultado
        respostaDada = false; // Resetar a flag

        // Exibir número da pergunta e tema
        numeroPergunta.innerText = `Número da Pergunta: ${pergunta.PerguntaID}`;
        temaPergunta.innerText = `Tema: ${pergunta.Tema}`;

        // Adicionar opções de resposta
        if (pergunta.Opcoes && Array.isArray(pergunta.Opcoes)) {
            pergunta.Opcoes.forEach(opcao => {
                const botaoOpcao = document.createElement("button");
                botaoOpcao.innerText = opcao;
                botaoOpcao.classList.add('opcao-btn');
                botaoOpcao.onclick = () => verificarResposta(botaoOpcao, opcao, pergunta.RespostaCorreta, pergunta.JustificativaCorreta, pergunta.JustificativaIncorreta);
                opcoesContainer.appendChild(botaoOpcao);
            });
        }
    }

    // Função para verificar a resposta do usuário
    function verificarResposta(botao, resposta, respostaCorreta, justificativaCorreta, justificativaIncorreta) {
        if (respostaDada) return; // Se já foi dada uma resposta, não faz nada

        respostaDada = true; // Marca que a resposta foi dada

        // Verifica se a resposta está correta
        if (resposta === respostaCorreta) {
            resultadoTexto.innerText = `Correto! A resposta é: ${resposta}. ${justificativaCorreta}`;
            resultadoTexto.className = "correto";
            botao.classList.add("resposta-correta");
            acertos++; // Incrementar acertos
        } else {
            resultadoTexto.innerText = `Incorreto! A resposta correta é: ${respostaCorreta}. ${justificativaIncorreta}`;
            resultadoTexto.className = "errado";
            botao.classList.add("resposta-incorreta");
            erros++; // Incrementar erros
        }

        // Exibir resultado
        resultadoTexto.style.visibility = "visible";
        atualizarScore();
    }

    // Função para atualizar o score
    function atualizarScore() {
        acertosTexto.innerText = `Acertos: ${acertos}`;
        errosTexto.innerText = `Erros: ${erros}`;
    }

    // Função para carregar pergunta anterior
    function carregarPerguntaAnterior() {
        if (indicePerguntaAtual > 0) {
            indicePerguntaAtual--;
            exibirPergunta(perguntasHistorico[indicePerguntaAtual]);
        }
    }

    // Eventos para os botões
    novaPerguntaBtn.addEventListener("click", obterPergunta);
    anteriorPerguntaBtn.addEventListener("click", carregarPerguntaAnterior);
    
    // Evento para o botão de fechar feedback
    fecharFeedbackBtn.addEventListener("click", () => {
        feedbackForm.style.display = "none"; // Fechar o formulário
    });

    // Evento para o botão de enviar feedback
    enviarFeedbackBtn.addEventListener("click", () => {
        // Lógica para enviar feedback (pode ser implementada conforme necessário)
        alert("Feedback enviado!"); // Exemplo de notificação
        feedbackForm.style.display = "none"; // Fechar o formulário após enviar
    });

    // Carregar a primeira pergunta ao iniciar a página
    obterPergunta();
});
