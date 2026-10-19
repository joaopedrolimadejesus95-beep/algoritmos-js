// Funções de manipulação de strings, feitas com laços em vez de
// métodos prontos, para praticar a lógica por trás de cada uma.

// Conta quantos caracteres a string tem, sem contar os espaços
function contarCaracteres(string) {
    let contador = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] !== " ") {
            contador++;
        }
    }
    return contador;
}

// Verifica se a string é igual lida de trás pra frente,
// comparando as pontas e andando em direção ao meio
function palindromo(string) {
    string = string.replace(/\s+/g, "").toLowerCase();

    let comeco = 0;
    let final = string.length - 1;

    while (comeco < final) {
        if (string[comeco] !== string[final]) {
            return false;
        }
        comeco++;
        final--;
    }
    return true;
}

function contarVogaisConsoantes(string) {
    let vogal = 0;
    let consoante = 0;

    string = string.toLowerCase();

    for (let i = 0; i < string.length; i++) {
        const char = string[i];

        if ("aeiou".includes(char)) {
            vogal++;
        } else if (char >= "a" && char <= "z") {
            consoante++;
        }
    }

    return {
        vogais: vogal,
        consoantes: consoante,
    };
}

// Substitui todas as ocorrências de charAntigo por charNovo
function substituirCaracter(string, charAntigo, charNovo) {
    let novaString = "";

    for (let i = 0; i < string.length; i++) {
        if (string[i] === charAntigo) {
            novaString += charNovo;
        } else {
            novaString += string[i];
        }
    }

    return novaString;
}

export { contarCaracteres, palindromo, contarVogaisConsoantes, substituirCaracter };
