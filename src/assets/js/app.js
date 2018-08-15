/* global document */
const keys = document.querySelectorAll('#calculator span');
const math = require('mathjs');
const logger = require('electron-timber');

const operators = ['+', '-', '*', '÷'];
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

// In this particular case, we need to disable the eqeqeq rule, for keyboard support to work correctly.
/* eslint eqeqeq:0 */
/* eslint complexity:0 */

document.addEventListener('keydown', event => {
	const keyPress = String.fromCharCode(event.keyCode);
	const {keyCode} = event;
	const input = document.querySelector('.screen');
	const inputVal = input.textContent;
	const lastChar = inputVal[inputVal.length - 1];
	let equation = inputVal;

	equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

	if (keyPress == 1 || keyCode == 97) {
		input.textContent += keyPress;
	}
	if (keyPress == 2 || keyCode == 98) {
		input.textContent += keyPress;
	}
	if (keyPress == 3 || keyCode == 32 || keyCode == 99) {
		input.textContent += keyPress;
	}
	if (keyPress == 4 || keyCode == 100) {
		input.textContent += keyPress;
	}
	if (keyPress == 5 || keyCode == 101) {
		input.textContent += keyPress;
	}
	if (keyPress == 6 || keyCode == 102) {
		input.textContent += keyPress;
	}
	if (keyPress == 7 || keyCode == 103) {
		input.textContent += keyPress;
	}
	if ((keyPress == 8 && event.shiftKey == false) || keyCode == 104) {
		input.textContent += keyPress;
	}
	if (keyPress == 9 || keyCode == 105) {
		input.textContent += keyPress;
	}
	if (keyPress == 0 || keyCode == 96) {
		input.textContent += keyPress;
	}

	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && keyCode == 187 && event.shiftKey) || (keyCode == 107) || (keyCode == 61 && event.shiftKey)) {
		document.querySelector('.screen').textContent += '+';
	}
	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && keyCode == 189 && event.shiftKey) || (inputVal != '' && operators.indexOf(lastChar) == -1 && keyCode == 109)) {
		document.querySelector('.screen').textContent += '-';
	}
	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && keyCode == 56 && event.shiftKey) || (inputVal != '' && operators.indexOf(lastChar) == -1 && keyCode == 106)) {
		document.querySelector('.screen').textContent += 'x';
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
