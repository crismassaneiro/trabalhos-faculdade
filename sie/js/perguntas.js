document.addEventListener("DOMContentLoaded", function () {
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
    const feedbackComentario = document.getElementById("feedback-text");
    const plataformaRating = document.getElementById("plataforma-rating");
    const perguntasRating = document.getElementById("perguntas-rating");
    const aprendizadoRating = document.getElementById("aprendizado-rating");

    // Criação do elemento de erro
    const mensagemErro = document.createElement("div");
    mensagemErro.id = "mensagem-erro";
    mensagemErro.style.color = "red"; // Cor do texto de erro
    mensagemErro.style.visibility = "hidden"; // Inicialmente invisível
    feedbackForm.appendChild(mensagemErro); // Adiciona a mensagem de erro abaixo do formulário

    // Criação do elemento de sucesso
    const mensagemSucesso = document.createElement("div");
    mensagemSucesso.id = "mensagem-sucesso";
    mensagemSucesso.style.color = "green"; // Cor do texto de sucesso
    mensagemSucesso.style.visibility = "hidden"; // Inicialmente invisível
    feedbackForm.appendChild(mensagemSucesso); // Adiciona a mensagem de sucesso abaixo do formulário

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
            if (contagemPerguntas % 1 === 0) {
                feedbackForm.style.display = "block"; // Mostrar o formulário
            }
        } catch (error) {
            console.error(error);
            mostrarMensagemErro("Não foi possível carregar a pergunta.");
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

    // Função para mostrar mensagens de erro
    function mostrarMensagemErro(mensagem) {
        mensagemErro.innerText = mensagem;
        mensagemErro.style.visibility = "visible"; // Exibe a mensagem de erro
        mensagemSucesso.style.visibility = "hidden"; // Esconde mensagem de sucesso anterior
        setTimeout(() => {
            mensagemErro.style.visibility = "hidden"; // Esconde a mensagem de erro após 5 segundos
        }, 5000);
    }

    // Função para enviar feedback via API Gateway
    async function enviarFeedback() {
        const comentario = feedbackComentario.value;
        const satisfacao = plataformaRating.value;
        const perguntaID = perguntasHistorico[indicePerguntaAtual].PerguntaID; // Pega o ID da pergunta atual

        // Limpa mensagens de erro e sucesso anteriores
        mensagemErro.style.visibility = "hidden";
        mensagemSucesso.style.visibility = "hidden"; // Limpa mensagem de sucesso anterior

        if (!comentario || !satisfacao) {
            mostrarMensagemErro("Por favor, preencha todos os campos.");
            return;
        }

        const feedbackData = {
            pergunta_id: perguntaID,
            comentario: comentario,
            satisfacao: satisfacao
        };

        try {
            const response = await fetch("https://7rks1opxcl.execute-api.us-east-1.amazonaws.com/dev/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(feedbackData)
            });

            if (!response.ok) {
                throw new Error("Erro ao enviar o feedback.");
            }

            mensagemSucesso.innerText = "Feedback enviado com sucesso!";
            mensagemSucesso.style.visibility = "visible"; // Exibe a mensagem de sucesso
            feedbackForm.style.display = "none"; // Esconde o formulário após o envio
            feedbackComentario.value = ''; // Limpa o campo de comentário
            plataformaRating.innerHTML = '<option value="" disabled selected>Selecione uma opção</option>'; // Reseta o campo de satisfação
        } catch (error) {
            console.error(error);
            mostrarMensagemErro("Erro ao enviar o feedback. Tente novamente.");
        }
    }

    // Preencher opções ao clicar nos campos de seleção
    function preencherOpcoes(selectElement, opcoes) {
        selectElement.innerHTML = ''; // Limpa qualquer opção existente
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = "Selecione uma opção";
        selectElement.appendChild(defaultOption);

        opcoes.forEach(opcao => {
            const optionElement = document.createElement('option');
            optionElement.value = opcao.toLowerCase(); // Exemplo: "ruim", "médio", etc.
            optionElement.textContent = opcao;
            selectElement.appendChild(optionElement);
        });
    }

    // Eventos de foco para carregar as opções quando o usuário clicar nos campos de seleção
    plataformaRating.addEventListener("focus", function () {
        preencherOpcoes(plataformaRating, ["Ruim", "Médio", "Bom", "Ótimo"]);
    });

    perguntasRating.addEventListener("focus", function () {
        preencherOpcoes(perguntasRating, ["Ruim", "Médio", "Bom", "Ótimo"]);
    });

    aprendizadoRating.addEventListener("focus", function () {
        preencherOpcoes(aprendizadoRating, ["Sim", "Não"]);
    });

    // Adicionando eventos aos botões
    novaPerguntaBtn.addEventListener("click", obterPergunta);
    anteriorPerguntaBtn.addEventListener("click", carregarPerguntaAnterior);
    enviarFeedbackBtn.addEventListener("click", enviarFeedback);
    fecharFeedbackBtn.addEventListener("click", () => {
        feedbackForm.style.display = "none"; // Esconde o formulário
        feedbackComentario.value = ''; // Limpa o campo de comentário
        plataformaRating.innerHTML = '<option value="" disabled selected>Selecione uma opção</option>'; // Reseta o campo de satisfação
        mensagemErro.style.visibility = "hidden"; // Esconde mensagens de erro
        mensagemSucesso.style.visibility = "hidden"; // Esconde mensagens de sucesso
    });

    // Inicializa com a primeira pergunta
    obterPergunta();
});
