document.addEventListener("DOMContentLoaded", function() {
    const perguntaTexto = document.getElementById("pergunta-texto");
    const opcoesContainer = document.getElementById("opcoes-container");
    const novaPerguntaBtn = document.getElementById("nova-pergunta");
    const anteriorPerguntaBtn = document.getElementById("anterior-pergunta");
    const resultadoTexto = document.getElementById("resultado");
    const numeroPergunta = document.getElementById("numero-pergunta");
    const temaPergunta = document.getElementById("tema-pergunta");

    let perguntasHistorico = [];
    let indicePerguntaAtual = -1;

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

        // Exibir número da pergunta e tema
        numeroPergunta.innerText = `Número da Pergunta: ${pergunta.PerguntaID}`;
        temaPergunta.innerText = `Tema: ${pergunta.Tema}`;

        // Adicionar opções de resposta
        if (pergunta.Opcoes && Array.isArray(pergunta.Opcoes)) {
            pergunta.Opcoes.forEach(opcao => {
                const botaoOpcao = document.createElement("button");
                botaoOpcao.innerText = opcao;
                botaoOpcao.classList.add('opcao-btn');
                botaoOpcao.onclick = () => verificarResposta(botaoOpcao, opcao, pergunta.RespostaCorreta);
                opcoesContainer.appendChild(botaoOpcao);
            });
        }
    }

    // Função para verificar a resposta do usuário
    function verificarResposta(botao, resposta, respostaCorreta) {
        resultadoTexto.style.visibility = "visible";
        if (resposta === respostaCorreta) {
            resultadoTexto.innerText = `Correto! A resposta é: ${resposta}`;
            resultadoTexto.className = "correto";
            botao.classList.add("resposta-correta");
        } else {
            resultadoTexto.innerText = `Incorreto! A resposta correta é: ${respostaCorreta}`;
            resultadoTexto.className = "errado";
            botao.classList.add("resposta-incorreta");
        }
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

    // Carregar a primeira pergunta ao iniciar a página
    obterPergunta();
});
