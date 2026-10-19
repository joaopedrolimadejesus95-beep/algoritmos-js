// Funções com matrizes (arrays de arrays), percorridas com dois laços:
// i anda pelas linhas e j anda pelas colunas.

function somarElementosMatriz(matriz) {
    let soma = 0;

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            soma += matriz[i][j];
        }
    }

    return soma;
}

// Retorna a posição [linha, coluna] da primeira ocorrência do número
function buscarNumeroNaMatriz(matriz, numero) {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] === numero) {
                return { encontrado: true, posicao: [i, j] };
            }
        }
    }
    return { encontrado: false };
}

// A diagonal principal são os elementos onde linha === coluna,
// por isso só existe em matriz quadrada
function diagonalPrincipal(matriz) {
    if (matriz.length !== matriz[0].length) {
        return null;
    }

    const diagonal = [];
    for (let i = 0; i < matriz.length; i++) {
        diagonal.push(matriz[i][i]);
    }

    return diagonal;
}

export { somarElementosMatriz, buscarNumeroNaMatriz, diagonalPrincipal };
