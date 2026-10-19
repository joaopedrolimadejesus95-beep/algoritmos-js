Algoritmos em JavaScript
Exercícios de lógica de programação que fiz no curso técnico, reunidos e revisados. Todas as funções usam laços ( for, while) em vez de métodos prontos do JavaScript, porque o objetivo era entender a lógica por trás de cada uma.

🔗 Teste no navegador: https://joaopedrolimadejesus95-beep.github.io/algoritmos-js/

A página usa as mesmas funções da pasta src/que os testes verificaram. A interface ( index.htmle a pasta interface/) só lê os campos e mostra os resultados; toda a lógica fica separada em src/.

O que tem aqui
Cifra de César —src/cifra-de-cesar.js
‐	O que faz
criptografar(frase, chave)	Desloca cada letra pela posição da chave (ex: chave F→ A vira F)
descriptografar(frase, chave)	Faz o caminho inverso
Cordas —src/strings.js
‐	O que faz
contarCaracteres(string)	Conta os caracteres, ignorando espaços
palindromo(string)	Verifique se a frase é igual de trás pra frente
contarVogaisConsoantes(string)	Retorna quantas vogais e consoantes a frase tem
substituirCaracter(string, antigo, novo)	Troca todas as ocorrências de um personagem
Matrizes —src/arrays.js
‐	O que faz
somarArray(array)	Soma todos os elementos
maiorElemento(array)	Encontre o maior valor
contarPares(array)	Conta quantos números são pares
media(array)	Calcular uma média
contarPositivosNegativos(array)	Conta cada um
multiplicar(array, numero)	Multiplicar cada elemento por um número
Matrizes —src/matrizes.js
‐	O que faz
somarElementosMatriz(matriz)	Soma todos os elementos
buscarNumeroNaMatriz(matriz, numero)	Retorna a posição [linha, coluna]do número
diagonalPrincipal(matriz)	Retorna a diagonal de uma matriz quadrada
Como rodar
Precisa ter o Node.js 18 ou superior.

git clone https://github.com/joaopedrolimadejesus95-beep/algoritmos-js.git
cd algoritmos-js
npm test
Para testar uma função no terminal:

node --input-type=module -e "import { criptografar } from './src/cifra-de-cesar.js'; console.log(criptografar('ola mundo', 'F'))"
# TQF RZSIT
Para abrir uma interface localmente, rode um servidor simples na pasta do projeto (o navegador não carrega módulos JavaScript abrindo o arquivo direto):

npx serve .
Estrutura
algoritmos-js/
├── src/                 # lógica: as funções em si
│   ├── cifra-de-cesar.js
│   ├── strings.js
│   ├── arrays.js
│   └── matrizes.js
├── test/                # testes das funções de src/
├── interface/           # JavaScript e CSS da página
└── index.html           # página publicada no GitHub Pages
Testes
Os testes ficam em test/e usam o test runner nativo do Node, sem nenhuma dependência para instalação.

Bugs que encontrei ao revisar
Quando juntei os exercícios, escrevi testes e eles pegaram três bugs no código original:

descriptografarquebrava com algumas letras. A conta index - deslocamento + 26evitou número negativo, mas poderia passar de 25 e buscar uma posição que não existe no alfabeto (retornando undefined). A correção foi adicionada % 26, como já existia no criptografar.
contarVogaisConsoantesretornaria NaNnas consoantes. Um comentário foi colado no meio da linha let consoante = 0;, então o = 0virou parte do comentário e a variável começou como undefined.
O arquivo de strings travava ao rodar. A última linha chamava imprimirDiagonalPrincipal(matriz)com uma variável matrizque nunca foi criada.
Feito por João Pedro Lima de Jesus · LinkedIn
