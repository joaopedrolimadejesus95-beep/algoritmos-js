// Cifra de César: desloca cada letra do alfabeto pela posição da chave.
// Ex: chave "F" (posição 5) transforma A -> F, B -> G, ..., Z -> E.

const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function criptografar(frase, chave) {
    let resultado = "";

    // Transforma a chave em um deslocamento
    const deslocamento = ALFABETO.indexOf(chave.toUpperCase());

    // Converte toda a frase para letras maiúsculas
    frase = frase.toUpperCase();

    // Percorre cada caractere
    for (let i = 0; i < frase.length; i++) {
        const char = frase[i];

        // Verifica se o caractere está no alfabeto
        if (ALFABETO.includes(char)) {
            const index = ALFABETO.indexOf(char);
            const novoIndex = (index + deslocamento) % 26;
            resultado += ALFABETO[novoIndex];
        }
        // Caracteres que não estão no alfabeto permanecem inalterados
        else {
            resultado += char;
        }
    }
    return resultado;
}

function descriptografar(frase, chave) {
    let resultado = "";

    // Transforma a chave em um deslocamento
    const deslocamento = ALFABETO.indexOf(chave.toUpperCase());

    // Converte toda a frase para letras maiúsculas
    frase = frase.toUpperCase();

    // Percorre cada caractere
    for (let i = 0; i < frase.length; i++) {
        const char = frase[i];

        // Verifica se o caractere está no alfabeto
        if (ALFABETO.includes(char)) {
            const index = ALFABETO.indexOf(char);
            // Retrocede no alfabeto: o +26 evita índice negativo
            // e o % 26 faz a volta quando passa de Z
            const novoIndex = (index - deslocamento + 26) % 26;
            resultado += ALFABETO[novoIndex];
        }
        // Caracteres que não estão no alfabeto permanecem inalterados
        else {
            resultado += char;
        }
    }
    return resultado;
}

export { criptografar, descriptografar };
