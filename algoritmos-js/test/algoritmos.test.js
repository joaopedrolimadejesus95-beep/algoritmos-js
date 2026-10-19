import { test } from "node:test";
import assert from "node:assert";

import { criptografar, descriptografar } from "../src/cifra-de-cesar.js";
import * as strings from "../src/strings.js";
import * as matrizes from "../src/matrizes.js";
import * as arrays from "../src/arrays.js";

test("cifra de César criptografa com a chave", () => {
    assert.strictEqual(criptografar("abc", "F"), "FGH");
});

test("cifra de César dá a volta no alfabeto", () => {
    assert.strictEqual(criptografar("XYZ", "F"), "CDE");
});

test("descriptografar desfaz o criptografar", () => {
    const frase = "OLA, BOM DIA. MEU NOME E ALEXANDRE!";
    assert.strictEqual(descriptografar(criptografar(frase, "F"), "F"), frase);
});

test("descriptografar funciona com letras do começo do alfabeto", () => {
    // Era aqui que o bug antigo aparecia: sem o % 26, "F" virava undefined
    assert.strictEqual(descriptografar("F", "B"), "E");
});

test("contarCaracteres ignora espaços", () => {
    assert.strictEqual(strings.contarCaracteres("ola mundo"), 8);
});

test("palindromo reconhece frases", () => {
    assert.strictEqual(strings.palindromo("Socorram me subi no onibus em Marrocos"), true);
    assert.strictEqual(strings.palindromo("javascript"), false);
});

test("contarVogaisConsoantes conta as duas coisas", () => {
    assert.deepStrictEqual(strings.contarVogaisConsoantes("Programar"), {
        vogais: 3,
        consoantes: 6,
    });
});

test("substituirCaracter troca todas as ocorrências", () => {
    assert.strictEqual(strings.substituirCaracter("banana", "a", "o"), "bonono");
});

const matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

test("somarElementosMatriz", () => {
    assert.strictEqual(matrizes.somarElementosMatriz(matriz), 45);
});

test("buscarNumeroNaMatriz", () => {
    assert.deepStrictEqual(matrizes.buscarNumeroNaMatriz(matriz, 6), {
        encontrado: true,
        posicao: [1, 2],
    });
    assert.deepStrictEqual(matrizes.buscarNumeroNaMatriz(matriz, 10), { encontrado: false });
});

test("diagonalPrincipal", () => {
    assert.deepStrictEqual(matrizes.diagonalPrincipal(matriz), [1, 5, 9]);
    assert.strictEqual(matrizes.diagonalPrincipal([[1, 2, 3]]), null);
});

test("funções de array", () => {
    const numeros = [3, -1, 0, 7, -5, 2];
    assert.strictEqual(arrays.somarArray(numeros), 6);
    assert.strictEqual(arrays.maiorElemento(numeros), 7);
    assert.strictEqual(arrays.maiorElemento([]), null);
    assert.strictEqual(arrays.contarPares(numeros), 2);
    assert.strictEqual(arrays.media(numeros), 1);
    assert.deepStrictEqual(arrays.contarPositivosNegativos(numeros), { positivos: 4, negativos: 2 });
    assert.deepStrictEqual(arrays.multiplicar([1, 2, 3], 2), [2, 4, 6]);
});
