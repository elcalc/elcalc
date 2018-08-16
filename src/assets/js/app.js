/* global document */
const keys = document.querySelectorAll('#calculator span');
const math = require('mathjs');
const logger = require('electron-timber');

const operators = ['+', '-', '*', '÷', '.'];
let decimalAdded = false;

for (let i = 0; i < keys.length; i++) {
	keys[i].addEventListener('click', function (e) {
		const input = document.querySelector('.screen');
		const inputVal = input.textContent;
		const btnVal = this.textContent;

		if (btnVal === 'C') {
			input.textContent = '';
			decimalAdded = false;
			logger.log('Cleared calculator output');
		} else if (btnVal === '=') {
			let equation = inputVal;
			const lastChar = equation[equation.length - 1];

			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

			if (operators.indexOf(lastChar) > -1 || lastChar === '.') {
				equation = equation.replace(/.$/, '');
			}

			if (equation) {
				logger.log(`Evaluated equation ${equation}`);
				input.textContent = math.eval(equation);
			}

			decimalAdded = false;
		} else if (operators.indexOf(btnVal) > -1) {
			const lastChar = inputVal[inputVal.length - 1];

			if (inputVal !== '' && operators.indexOf(lastChar) === -1) {
				input.textContent += btnVal;
			} else if (inputVal === '' && btnVal === '-') {
				input.textContent += btnVal;
			}

			if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				input.textContent = inputVal.replace(/.$/, btnVal);
			}

			decimalAdded = false;
		} else if (btnVal === '.') {
			if (!decimalAdded) {
				input.textContent += btnVal;
				decimalAdded = true;
			}
		} else {
			input.textContent += btnVal;
		}
		e.preventDefault();
	});
}

// In this particular case, we need to disable some rules, for keyboard support to work correctly.
/* eslint eqeqeq:0 */
/* eslint complexity:0 */

document.addEventListener('keydown', event => {
	const {keyCode} = event;
	const input = document.querySelector('.screen');
	const inputVal = input.textContent;
	const lastChar = inputVal[inputVal.length - 1];
	let equation = inputVal;

	equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

	if (keyCode == 49) {
		document.querySelector('.screen').textContent += '1';
	}
	if (keyCode == 50) {
		document.querySelector('.screen').textContent += '2';
	}
	if (keyCode == 51) {
		document.querySelector('.screen').textContent += '3';
	}
	if (keyCode == 52) {
		document.querySelector('.screen').textContent += '4';
	}
	if (keyCode == 53) {
		document.querySelector('.screen').textContent += '5';
	}
	if (keyCode == 54) {
		document.querySelector('.screen').textContent += '6';
	}
	if (keyCode == 55) {
		document.querySelector('.screen').textContent += '7';
	}
	if (keyCode == 56) {
		document.querySelector('.screen').textContent += '8';
	}
	if (keyCode == 57) {
		document.querySelector('.screen').textContent += '9';
	}
	if (keyCode == 48) {
		document.querySelector('.screen').textContent += '0';
	}

	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && keyCode == 187) || (inputVal != '' && operators.indexOf(lastChar) == -1 && keyCode == 107)) {
		document.querySelector('.screen').textContent += '+';
	}
	if ((inputVal === '' && operators.indexOf(lastChar) == -1 && keyCode == 189) || (inputVal === '' && operators.indexOf(lastChar) == -1 && keyCode == 109)) {
		document.querySelector('.screen').textContent += '-';
	}
	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && keyCode == 88) || (inputVal != '' && operators.indexOf(lastChar) == -1 && keyCode == 106)) {
		document.querySelector('.screen').textContent += '*';
	}
	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && keyCode == 191) || (inputVal != '' && operators.indexOf(lastChar) == -1 && keyCode == 111)) {
		document.querySelector('.screen').textContent += '÷';
	}
	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && keyCode == 190) || (inputVal != '' && operators.indexOf(lastChar) == -1 && keyCode == 110)) {
		document.querySelector('.screen').textContent += '.';
	}
	if (keyCode == 13 && event.shiftKey == false) {
		input.textContent = math.eval(equation);
		decimalAdded = false;
		logger.log(`Evaluated equation ${equation}`);
	}
	if (keyCode == 8) {
		input.textContent = '';
		decimalAdded = false;
		logger.log(`Cleared calculator output`);
	}
});
