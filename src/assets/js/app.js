/* global document */
const keys = document.querySelectorAll('#calculator span');
const math = require('mathjs');
const logger = require('electron-timber');

const operators = ['+', '-', '*', '/'];
let decimalAdded = false;

for (let i = 0; i < keys.length; i++) {
	keys[i].addEventListener('click', function (e) {
		const input = document.querySelector('.screen');
		const inputVal = input.innerHTML;
		const btnVal = this.innerHTML;

		if (btnVal === 'C') {
			input.innerHTML = '';
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
				input.innerHTML = math.eval(equation);
			}

			decimalAdded = false;
		} else if (operators.indexOf(btnVal) > -1) {
			const lastChar = inputVal[inputVal.length - 1];

			if (inputVal !== '' && operators.indexOf(lastChar) === -1) {
				input.innerHTML += btnVal;
			} else if (inputVal === '' && btnVal === '-') {
				input.innerHTML += btnVal;
			}

			if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}

			decimalAdded = false;
		} else if (btnVal === '.') {
			if (!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		} else {
			input.innerHTML += btnVal;
		}
		e.preventDefault();
	});
}
