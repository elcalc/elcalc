'use strict';

import './stylesheets/main.css';

const keys = document.querySelectorAll('#calculator span');
const operators = ['+', '-', '*', '/', '^'];
const input = document.querySelector('.screen');

let decimalAdded = true;

for (const key of keys) {
	key.addEventListener('click', async function (e) {
		const inputVal = input.value;
		const btnVal = this.textContent;

		if (btnVal === 'C') {
			input.value = '';
			decimalAdded = true;
		} else if (
			(btnVal === '√' ||
			btnVal === '√x' ||
			btnVal === 'xʸ' ||
			btnVal === '%' ||
			btnVal === 'x²' ||
			btnVal === 'abs' ||
			btnVal === 'exp' ||
			btnVal === 'log' ||
			btnVal === 'sin' ||
			btnVal === 'cos' ||
			btnVal === 'tan') &&
			input.value === ''
		) {
			input.value = '';
			decimalAdded = true;
		} else if (btnVal === '=') {
			let equation = inputVal;
			const lastChar = equation[equation.length - 1];

			if (operators.indexOf(lastChar) > -1 || lastChar === '.') {
				equation = equation.replace(/.$/, '');
			}

			if (equation) {
				await import('../crate/pkg').then(async module => {
					const result = await module.evaluate(equation.replace(/π/g, 'pi'));
					input.value = result;
				});
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
			input.value += '^2';
			decimalAdded = false;
		} else if (btnVal === 'xʸ') {
			input.value += '^';
			decimalAdded = false;
		} else if (btnVal === '√x' && input.value !== '') {
			input.value = `sqrt(${input.value})`;
			decimalAdded = false;
		} else if (btnVal === 'abs' && input.value !== '') {
			input.value = `abs(${input.value})`;
			decimalAdded = false;
		} else if (btnVal === 'log' && input.value !== '') {
			input.value = `ln(${input.value})`;
			decimalAdded = false;
		} else if (btnVal === 'exp' && input.value !== '') {
			input.value = `exp(${input.value})`;
			decimalAdded = false;
		} else if (btnVal === 'sin' && input.value !== '') {
			input.value = `sin(${input.value})`;
			decimalAdded = false;
		} else if (btnVal === 'cos' && input.value !== '') {
			input.value = `cos(${input.value})`;
			decimalAdded = false;
		} else if (btnVal === 'tan' && input.value !== '') {
			input.value = `tan(${input.value})`;
			decimalAdded = false;
		} else {
			input.value += btnVal;
		}

		e.preventDefault();
	});
}

/* Keyboard support */

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

	if (code == 'KeyE') {
		input.value += 'e';
		decimalAdded = false;
	}

	if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'Digit5' && event.shiftKey)) {
		input.value += '%';
		decimalAdded = true;
	}

	if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'Digit6' && event.shiftKey)) {
		input.value += '^';
		decimalAdded = true;
	}

	if (event.shiftKey == false && (code == 'NumpadEnter' || code == 'Enter')) {
		await import('../crate/pkg').then(async module => {
			const equation = inputVal;
			const result = await module.evaluate(equation.replace(/π/g, 'pi'));
			input.value = result;
		});
	}

	if (code == 'Backspace' || code == 'Delete') {
		input.value = '';
		decimalAdded = true;
	}
});
