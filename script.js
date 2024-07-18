
const plus = 'RanIsAKingAndAkivaIsAPartyPooper';
const minus = plus + plus;
const left = plus + plus + plus;
const right = plus + plus + plus + plus;
const comma = plus + plus + plus + plus + plus;
const period = plus + plus + plus + plus + plus + plus;
const lBracket = plus + plus + plus + plus + plus + plus + plus;
const rBracket = plus + plus + plus + plus + plus + plus + plus + plus;

document.addEventListener('DOMContentLoaded', function() {
  const runInterpreterButton = document.getElementById('runInterpreter');
  const translateButton = document.getElementById('translateToBFPP');

  runInterpreterButton.addEventListener('click', function() {
    const inputCode = document.getElementById('bfInput').value;
    const outputElement = document.getElementById('interpreterOutput');

    const result = runBrainfuck(convertCode(inputCode));
    outputElement.textContent = result.output;

    // Render tape only if needed in your UI
    // const arrayElement = document.getElementById('array-display');
    // arrayElement.innerHTML = renderTape(result.tape);
  });

  translateButton.addEventListener('click', function() {
    const inputCode = document.getElementById('bfppInput').value;
    const outputElement = document.getElementById('translatorOutput');

    const translatedCode = translateToBrainfuckPlusPlus(inputCode);
    outputElement.textContent = translatedCode;
  });

  function convertCode(code) {
    const commands = code.trim().split(/\s+/);
    const convertedCode = commands.map(command => {
      switch (command) {
        case plus:
          return '+';
        case minus:
          return '-';
        case left:
          return '<';
        case right:
          return '>';
        case comma:
          return ',';
        case period:
          return '.';
        case lBracket:
          return '[';
        case rBracket:
          return ']';
        default:
          return '';
      }
    }).join('');
    return convertedCode;
  }

  function runBrainfuck(code) {
    const tape = Array(30000).fill(0);
    let pointer = 0;
    let output = '';
    let inputIndex = 0;
    let input = '';
    const loopStack = [];
    const loopMap = {};

    for (let i = 0; i < code.length; i++) {
      if (code[i] === '[') loopStack.push(i);
      if (code[i] === ']') {
        const start = loopStack.pop();
        loopMap[start] = i;
        loopMap[i] = start;
      }
    }

    for (let i = 0; i < code.length; i++) {
      switch (code[i]) {
        case '>':
          pointer++;
          break;
        case '<':
          pointer--;
          break;
        case '+':
          tape[pointer]++;
          break;
        case '-':
          tape[pointer]--;
          break;
        case '.':
          output += String.fromCharCode(tape[pointer]);
          break;
        case ',':
          if (inputIndex >= input.length) {
            input = prompt('Enter input for the Brainfuck program:') || '';
            inputIndex = 0;
          }
          tape[pointer] = input.charCodeAt(inputIndex++) || 0;
          break;
        case '[':
          if (tape[pointer] === 0) i = loopMap[i];
          break;
        case ']':
          if (tape[pointer] !== 0) i = loopMap[i];
          break;
      }
    }

    return { output, tape };
  }

  function translateToBrainfuckPlusPlus(code) {
    let translatedCode = '';

    for (let i = 0; i < code.length; i++) {
      switch (code[i]) {
        case '+':
          translatedCode += plus;
          break;
        case '-':
          translatedCode += minus;
          break;
        case '<':
          translatedCode += left;
          break;
        case '>':
          translatedCode += right;
          break;
        case ',':
          translatedCode += comma;
          break;
        case '.':
          translatedCode += period;
          break;
        case '[':
          translatedCode += lBracket;
          break;
        case ']':
          translatedCode += rBracket;
          break;
        default:
          // Ignore unrecognized characters or sequences
          break;
      }

      // Add space after each command, except the last one
      if (i < code.length - 1) {
        translatedCode += ' ';
      }
    }

    return translatedCode;
  }
});
