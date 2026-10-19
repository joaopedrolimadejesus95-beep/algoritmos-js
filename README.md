# Algoritmos em JavaScript

Exercícios de lógica de programação que fiz no curso técnico, reunidos e revisados. Todas as funções usam laços (`for`, `while`) em vez de métodos prontos do JavaScript, porque o objetivo era entender a lógica por trás de cada uma.

🔗 **Teste no navegador:** https://joaopedrolimadejesus95-beep.github.io/algoritmos-js/

A página usa as mesmas funções da pasta `src/` que os testes verificam. A interface (`index.html` e a pasta `interface/`) só lê os campos e mostra os resultados; toda a lógica fica separada em `src/`.

## O que tem aqui

###  Cifra de César — [`src/cifra-de-cesar.js`](src/cifra-de-cesar.js)

| Função | O que faz |
|---|---|
| `criptografar(frase, chave)` | Desloca cada letra pela posição da chave (ex: chave `F` → A vira F) |
| `descriptografar(frase, chave)` | Faz o caminho inverso |

###  Strings — [`src/strings.js`](src/strings.js)

| Função | O que faz |
|---|---|
| `contarCaracteres(string)` | Conta os caracteres, ignorando espaços |
| `palindromo(string)` | Verifica se a frase é igual de trás pra frente |
| `contarVogaisConsoantes(string)` | Retorna quantas vogais e consoantes a frase tem |
| `substituirCaracter(string, antigo, novo)` | Troca todas as ocorrências de um caractere |

###  Arrays — [`src/arrays.js`](src/arrays.js)

| Função | O que faz |
|---|---|
| `somarArray(array)` | Soma todos os elementos |
| `maiorElemento(array)` | Encontra o maior valor |
| `contarPares(array)` | Conta quantos números são pares |
| `media(array)` | Calcula a média |
| `contarPositivosNegativos(array)` | Conta positivos e negativos |
| `multiplicar(array, numero)` | Multiplica cada elemento por um número |

###  Matrizes — [`src/matrizes.js`](src/matrizes.js)

| Função | O que faz |
|---|---|
| `somarElementosMatriz(matriz)` | Soma todos os elementos |
| `buscarNumeroNaMatriz(matriz, numero)` | Retorna a posição `[linha, coluna]` do número |
| `diagonalPrincipal(matriz)` | Retorna a diagonal de uma matriz quadrada |

## Como rodar

Precisa ter o [Node.js](https://nodejs.org) 18 ou superior.

```bash
git clone https://github.com/joaopedrolimadejesus95-beep/algoritmos-js.git
cd algoritmos-js
npm test
```

Para testar uma função no terminal:

```bash
node --input-type=module -e "import { criptografar } from './src/cifra-de-cesar.js'; console.log(criptografar('ola mundo', 'F'))"
# TQF RZSIT
```

Para abrir a interface localmente, rode um servidor simples na pasta do projeto (o navegador não carrega módulos JavaScript abrindo o arquivo direto):

```bash
npx serve .
```

## Estrutura

```
algoritmos-js/
├── src/                 # lógica: as funções em si
│   ├── cifra-de-cesar.js
│   ├── strings.js
│   ├── arrays.js
│   └── matrizes.js
├── test/                # testes das funções de src/
├── interface/           # JavaScript e CSS da página
└── index.html           # página publicada no GitHub Pages
```

## Testes

Os testes ficam em [`test/`](test) e usam o test runner nativo do Node, sem nenhuma dependência para instalar.

## Bugs que encontrei ao revisar

Quando juntei os exercícios, escrevi testes e eles pegaram três bugs no código original:

1. **`descriptografar` quebrava com algumas letras.** A conta `index - deslocamento + 26` evitava número negativo, mas podia passar de 25 e buscar uma posição que não existe no alfabeto (retornando `undefined`). A correção foi adicionar `% 26`, como já existia no `criptografar`.
2. **`contarVogaisConsoantes` retornava `NaN` nas consoantes.** Um comentário foi colado no meio da linha `let consoante = 0;`, então o `= 0` virou parte do comentário e a variável começava como `undefined`.
3. **O arquivo de strings travava ao rodar.** A última linha chamava `imprimirDiagonalPrincipal(matriz)` com uma variável `matriz` que nunca foi criada.

---

Feito por **João Pedro Lima de Jesus** · [LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-pedro-lima-de-jesus-17b798322/)
