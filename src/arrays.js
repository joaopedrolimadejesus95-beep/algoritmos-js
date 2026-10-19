// Funções básicas com arrays, feitas com laços para praticar a lógica.

function somarArray(array) {
    let soma = 0;
    for (let i = 0; i < array.length; i++) {
        soma += array[i];
    }
    return soma;
}

function maiorElemento(array) {
    if (array.length === 0) {
        return null;
    }

    // Começa supondo que o primeiro é o maior e compara com o resto
    let maior = array[0];

    for (let i = 1; i < array.length; i++) {
        if (array[i] > maior) {
            maior = array[i];
        }
    }

    return maior;
}

function contarPares(array) {
    let contador = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            contador++;
        }
    }

    return contador;
}

function media(array) {
    if (array.length === 0) {
        return 0;
    }

    return somarArray(array) / array.length;
}

// O zero conta como positivo aqui
function contarPositivosNegativos(array) {
    let positivos = 0;
    let negativos = 0;

    for (const numero of array) {
        if (numero >= 0) {
            positivos++;
        } else {
            negativos++;
        }
    }

    return { positivos, negativos };
}

function multiplicar(array, numero) {
    return array.map((elemento) => elemento * numero);
}

export { somarArray, maiorElemento, contarPares, media, contarPositivosNegativos, multiplicar };
