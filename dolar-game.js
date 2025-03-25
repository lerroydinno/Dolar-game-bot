(function() {
    async function getHistory() {
        try {
            let response = await fetch("https://dolargame.io/history/stats");
            let data = await response.json();
            return data.history || [];
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            return [];
        }
    }

    function analisarPadroes(historico) {
        if (historico.length < 5) {
            return "🔍 Coletando mais dados...";
        }

        let ultimos5 = historico.slice(-5); // Últimos 5 resultados
        let preto = ultimos5.filter(jogo => jogo.color === "black").length;
        let vermelho = ultimos5.filter(jogo => jogo.color === "red").length;

        if (preto > vermelho) return "⚫ Próxima aposta: PRETO";
        if (vermelho > preto) return "🔴 Próxima aposta: VERMELHO";
        return "🔄 Nenhuma tendência forte detectada";
    }

    async function gerarPrevisao() {
        let historico = await getHistory();
        let previsao = analisarPadroes(historico);
        document.getElementById("previsao").innerText = previsao;
    }

    function criarMenu() {
        let menu = document.createElement("div");
        menu.id = "menuPrevisao";
        menu.style.position = "fixed";
        menu.style.bottom = "20px";
        menu.style.right = "20px";
        menu.style.background = "white";
        menu.style.border = "2px solid black";
        menu.style.padding = "10px";
        menu.style.borderRadius = "10px";
        menu.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.5)";
        menu.style.zIndex = "9999";
        menu.innerHTML = `
            <strong>📊 Dólar Game</strong><br>
            <button id="btnPrever" style="margin-top:5px;padding:5px 10px;">Gerar Previsão</button>
            <p id="previsao" style="margin-top:10px;font-weight:bold;">🔍 Aguardando...</p>
        `;
        document.body.appendChild(menu);
        document.getElementById("btnPrever").addEventListener("click", gerarPrevisao);
    }

    if (!document.getElementById("menuPrevisao")) {
        criarMenu();
    }
})();
