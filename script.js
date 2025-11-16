const tabuleiro = document.getElementById("tabuleiro");
const botaoReiniciar = document.getElementById("reiniciar");
let pecaSelecionada = null;

// Criar tabuleiro + peças
function criarTabuleiro() {
    tabuleiro.innerHTML = ""; // limpa antes de recriar

    for (let linha = 0; linha < 8; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {

            let casa = document.createElement("div");
            casa.classList.add("casa");

            // alternância de cores
            if ((linha + coluna) % 2 === 0) {
                casa.classList.add("clara");
            } else {
                casa.classList.add("escura");

                // coloca peças pretas (topo)
                if (linha < 3) {
                    casa.appendChild(criarPeca("preta"));
                }

                // coloca peças vermelhas (baixo)
                if (linha > 4) {
                    casa.appendChild(criarPeca("vermelha"));
                }
            }

            casa.addEventListener("click", () => moverPeca(casa));
            tabuleiro.appendChild(casa);
        }
    }
}

// Criar peça com emoji ♠
function criarPeca(cor) {
    const p = document.createElement("div");
    p.classList.add("peca", cor);
    p.textContent = "♠";

    // Selecionar peça
    p.addEventListener("click", (e) => {
        e.stopPropagation(); 
        selecionarPeca(p);
    });

    return p;
}

// Selecionar peça
function selecionarPeca(peca) {
    if (pecaSelecionada) {
        pecaSelecionada.classList.remove("selecionada");
    }
    pecaSelecionada = peca;
    peca.classList.add("selecionada");
}

// Mover peça
function moverPeca(casa) {
    if (pecaSelecionada && casa.children.length === 0 && casa.classList.contains("escura")) {
        casa.appendChild(pecaSelecionada);
        pecaSelecionada.classList.remove("selecionada");
        pecaSelecionada = null;
    }
}

// Botão Reiniciar
botaoReiniciar.addEventListener("click", () => {
    pecaSelecionada = null;
    criarTabuleiro();
});

// Inicializa o jogo
criarTabuleiro();
