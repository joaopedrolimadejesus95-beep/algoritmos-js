// Liga a página às funções da pasta src/.
// Este arquivo só lê os campos e mostra os resultados: toda a lógica fica em src/.

import { criptografar, descriptografar } from "../src/cifra-de-cesar.js";
import { contarCaracteres, palindromo, contarVogaisConsoantes, substituirCaracter } from "../src/strings.js";
import { somarArray, maiorElemento, contarPares, media, contarPositivosNegativos, multiplicar } from "../src/arrays.js";
import { somarElementosMatriz, buscarNumeroNaMatriz, diagonalPrincipal } from "../src/matrizes.js";

const $ = (id) => document.getElementById(id);
const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ---------- abas ----------

const abas = document.querySelectorAll(".aba");
abas.forEach((aba) => {
    aba.addEventListener("click", () => {
        abas.forEach((outra) => {
            const ativa = outra === aba;
            outra.classList.toggle("ativa", ativa);
            outra.setAttribute("aria-selected", ativa);
            $(outra.getAttribute("aria-controls")).hidden = !ativa;
        });
    });
});

// ---------- cifra de César ----------

let modo = "criptografar";
const selectChave = $("cifra-chave");

ALFABETO.forEach((letra) => {
    const opcao = document.createElement("option");
    opcao.value = letra;
    opcao.textContent = letra;
    selectChave.append(opcao);
});
selectChave.value = "F";

document.querySelectorAll(".modo").forEach((botao) => {
    botao.addEventListener("click", () => {
        // Ao trocar de modo, o resultado atual vira a nova entrada,
        // assim dá pra ver o texto voltando ao original
        if (botao.dataset.modo !== modo) {
            $("cifra-entrada").value = $("cifra-saida").textContent;
        }
        modo = botao.dataset.modo;
        document.querySelectorAll(".modo").forEach((b) => b.classList.toggle("ativo", b === botao));
        atualizarCifra();
    });
});

function montarMapa(chave) {
    const original = $("mapa-original");
    const deslocado = $("mapa-deslocado");
    original.replaceChildren();
    deslocado.replaceChildren();

    ALFABETO.forEach((letra) => {
        const de = document.createElement("span");
        de.textContent = letra;
        original.append(de);

        const para = document.createElement("span");
        para.textContent = criptografar(letra, chave);
        deslocado.append(para);
    });
}

function atualizarCifra() {
    const texto = $("cifra-entrada").value;
    const chave = selectChave.value;
    const funcao = modo === "criptografar" ? criptografar : descriptografar;

    $("cifra-saida").textContent = funcao(texto, chave);
    $("cifra-funcao").textContent = `${modo}(texto, "${chave}")`;

    const posicao = ALFABETO.indexOf(chave);
    $("nota-chave").textContent = chave;
    $("nota-posicao").textContent = posicao;
    $("nota-passos").textContent = modo === "criptografar" ? `${posicao} casas pra frente` : `${posicao} casas pra trás`;
    montarMapa(chave);
}

$("cifra-entrada").addEventListener("input", atualizarCifra);
selectChave.addEventListener("change", atualizarCifra);

// ---------- strings ----------

function atualizarStrings() {
    const frase = $("strings-entrada").value;

    const ehPalindromo = frase.trim() !== "" && palindromo(frase);
    $("res-palindromo").textContent = ehPalindromo ? "Sim ✓" : "Não";
    $("res-palindromo").classList.toggle("positivo", ehPalindromo);

    $("res-caracteres").textContent = contarCaracteres(frase);

    const { vogais, consoantes } = contarVogaisConsoantes(frase);
    $("res-vogais").textContent = `${vogais} vogais · ${consoantes} consoantes`;

    const antigo = $("troca-antigo").value;
    const novo = $("troca-novo").value;
    $("res-substituir").textContent = antigo ? substituirCaracter(frase, antigo, novo) : frase;
}

["strings-entrada", "troca-antigo", "troca-novo"].forEach((id) => $(id).addEventListener("input", atualizarStrings));

// ---------- arrays ----------

function lerNumeros(texto) {
    const partes = texto.split(",").map((p) => p.trim()).filter((p) => p !== "");
    const numeros = partes.map(Number);
    const invalidos = partes.filter((p, i) => Number.isNaN(numeros[i]));
    return { numeros, invalidos };
}

function atualizarArrays() {
    const { numeros, invalidos } = lerNumeros($("arrays-entrada").value);
    const erro = $("arrays-erro");

    erro.hidden = invalidos.length === 0;
    if (!erro.hidden) {
        erro.textContent = `Não é número: ${invalidos.join(", ")}`;
        return;
    }

    const fichas = $("arrays-fichas");
    fichas.replaceChildren();
    numeros.forEach((n) => {
        const ficha = document.createElement("span");
        ficha.className = "ficha" + (n % 2 === 0 ? " par" : "") + (n < 0 ? " negativo" : "");
        ficha.textContent = n;
        fichas.append(ficha);
    });

    $("res-soma").textContent = somarArray(numeros);
    $("res-media").textContent = Number(media(numeros).toFixed(2));
    $("res-maior").textContent = maiorElemento(numeros) ?? "—";
    $("res-pares").textContent = contarPares(numeros);

    const { positivos, negativos } = contarPositivosNegativos(numeros);
    $("res-sinais").textContent = `${positivos} + · ${negativos} −`;

    const multiplicador = Number($("multiplicador").value) || 0;
    $("res-multiplicar").textContent = `[${multiplicar(numeros, multiplicador).join(", ")}]`;
}

["arrays-entrada", "multiplicador"].forEach((id) => $(id).addEventListener("input", atualizarArrays));

// ---------- matrizes ----------

function lerMatriz(texto) {
    const linhas = texto
        .trim()
        .split("\n")
        .map((linha) => linha.trim())
        .filter((linha) => linha !== "")
        .map((linha) => linha.split(/\s+/).map(Number));

    if (linhas.length === 0) return { erro: "Digite pelo menos uma linha." };
    if (linhas.some((linha) => linha.some(Number.isNaN))) return { erro: "Use só números separados por espaço." };
    if (linhas.some((linha) => linha.length !== linhas[0].length)) return { erro: "Todas as linhas precisam ter o mesmo tamanho." };

    return { matriz: linhas };
}

function atualizarMatrizes() {
    const { matriz, erro } = lerMatriz($("matriz-entrada").value);
    const elErro = $("matriz-erro");

    elErro.hidden = !erro;
    if (erro) {
        elErro.textContent = erro;
        return;
    }

    const busca = Number($("matriz-busca").value);
    const resultadoBusca = buscarNumeroNaMatriz(matriz, busca);
    const diagonal = diagonalPrincipal(matriz);

    const visual = $("matriz-visual");
    visual.replaceChildren();
    visual.style.gridTemplateColumns = `repeat(${matriz[0].length}, minmax(2.5rem, 1fr))`;

    matriz.forEach((linha, i) => {
        linha.forEach((valor, j) => {
            const celula = document.createElement("span");
            celula.className = "celula";
            if (diagonal && i === j) celula.classList.add("diagonal");
            if (resultadoBusca.encontrado && resultadoBusca.posicao[0] === i && resultadoBusca.posicao[1] === j) {
                celula.classList.add("achado");
            }
            celula.textContent = valor;
            visual.append(celula);
        });
    });

    $("res-matriz-soma").textContent = somarElementosMatriz(matriz);
    $("res-matriz-busca").textContent = resultadoBusca.encontrado
        ? `linha ${resultadoBusca.posicao[0]}, coluna ${resultadoBusca.posicao[1]}`
        : "não encontrado";
    $("res-matriz-diagonal").textContent = diagonal ? `[${diagonal.join(", ")}]` : "matriz não é quadrada";
}

["matriz-entrada", "matriz-busca"].forEach((id) => $(id).addEventListener("input", atualizarMatrizes));

// ---------- primeira renderização ----------

atualizarCifra();
atualizarStrings();
atualizarArrays();
atualizarMatrizes();
