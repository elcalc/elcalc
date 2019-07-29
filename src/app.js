import './stylesheets/main.css';

import {evaluate, round} from 'mathjs';

const keys = document.querySelectorAll('#calculator span');
const operators = ['+', '-', '*', '/'];
const input = document.querySelector('.screen');

let decimalAdded = true;

for (let i = 0; i < keys.length; i++) {
	keys[i].addEventListener('click', async function (e) {
		const inputVal = input.value;
		const btnVal = this.textContent;

		if (btnVal === 'C') {
			input.value = '';
			decimalAdded = true;
		} else if (
			(btnVal === '√' ||
			btnVal === 'ʸ√x' ||
			btnVal === '√x' ||
			btnVal === 'xʸ' ||
			btnVal === '%' ||
			btnVal === 'x²' ||
			btnVal === 'x!' ||
			btnVal === 'log𝑏(x)') &&
			input.value === ''
		) {
			input.value = '';
			decimalAdded = true;
		} else if (
			btnVal !== '' && (
				input.value.startsWith('pow(') ||
				input.value.startsWith('nthRoot(') ||
				input.value.startsWith('log(')
			) &&
			!input.value.endsWith(')')
		) {
			input.value += btnVal + ')';
			decimalAdded = true;
		} else if (btnVal === 'π' && input.value === '') {
			input.value = 'pi';
			decimalAdded = true;
		} else if (btnVal === '=') {
			let equation = inputVal;
			const lastChar = equation[equation.length - 1];

			if (operators.indexOf(lastChar) > -1 || lastChar === '.') {
				equation = equation.replace(/.$/, '');
			}

			if (equation) {
				const result = await evaluate(equation);
				input.value = round(result, 5);
			}

			decimalAdded = false;
		} else if (operators.indexOf(btnVal) > -1) {
			const lastChar = inputVal[inputVal.length - 1];

			if (inputVal !== '' && operators.indexOf(lastChar) === -1) {
				input.value += btnVal;
			} else if (inputVal === '' && btnVal === '-') {
				input.value += btnVal;
			}

			if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				input.value = inputVal.replace(/.$/, btnVal);
			}

			decimalAdded = true;
		} else if (btnVal === '.') {
			if (decimalAdded == true) {
				input.value += btnVal;
				decimalAdded = false;
			}
		} else if (btnVal === '%') {
			if (decimalAdded == true) {
				input.value += btnVal;
				decimalAdded = false;
			}
		} else if (btnVal === 'x²') {
			input.value = 'pow(' + input.value + ',2)';
			decimalAdded = false;
		} else if (btnVal === 'xʸ') {
			input.value = 'pow(' + input.value + ',';
			decimalAdded = false;
		} else if (btnVal === '√x' && input.value !== '') {
			input.value = `sqrt(${input.value})`;
			decimalAdded = false;
		} else if (btnVal === 'ʸ√x' && input.value !== '') {
			input.value = 'nthRoot(' + input.value + ',';
			decimalAdded = false;
		} else if (btnVal === 'log𝑏(x)' && input.value !== '') {
			input.value = 'log(' + input.value + ',';
			decimalAdded = false;
		} else if (btnVal === 'x!' && input.value !== '') {
			input.value += '!';
			decimalAdded = false;
		} else {
			input.value += btnVal;
		}

		e.preventDefault();
	});
}

/* Keyboard support */

// In this particular case, we need to disable some eslint rules, for keyboard support to work correctly.

/* eslint eqeqeq:0 */
/* eslint complexity:0 */

if (input.hasFocus()) {
	console.log();
} else {
	document.addEventListener('keydown', async event => {
		const {code} = event;
		const inputVal = input.value;
		const lastChar = inputVal[inputVal.length - 1];

		if (event.shiftKey == false && (code.startsWith('Numpad') || code.startsWith('Digit')) && '0123456789'.includes(code.slice(-1))) {
			input.value += code.slice(-1);
		}

		if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'Equal' || code == 'NumpadAdd')) {
			input.value += '+';
			decimalAdded = true;
		}

		if (operators.indexOf(lastChar) == -1 && (code == 'Minus' || code == 'NumpadSubtract')) {
			input.value += '-';
			decimalAdded = true;
		}

		if (inputVal != '' && operators.indexOf(lastChar) == -1 && ((code == 'KeyX' || code == 'NumpadMultiply')) || (code == 'Digit8' && event.shiftKey)) {
			input.value += '*';
			decimalAdded = true;
		}

		if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'Slash' || code == 'IntlRo' || code == 'NumpadDivide')) {
			input.value += '/';
			decimalAdded = true;
		}

		if ((code == 'Period' || code == 'NumpadDecimal') && decimalAdded == true) {
			input.value += '.';
			decimalAdded = false;
		}

		if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'Digit5' && event.shiftKey)) {
			input.value += '%';
			decimalAdded = true;
		}

		if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'Digit1' && event.shiftKey)) {
			input.value += '!';
			decimalAdded = true;
		}

		if (event.shiftKey == false && (code == 'NumpadEnter' || code == 'Enter')) {
			const equation = inputVal;
			const result = await evaluate(equation);
			input.value = round(result, 5);
			decimalAdded = false;
		}

		if (code == 'Backspace' || code == 'Delete') {
			input.value = '';
			decimalAdded = true;
		}
	});
}
