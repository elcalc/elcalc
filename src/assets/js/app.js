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
	const {key, code} = event;
	const input = document.querySelector('.screen');
	const inputVal = input.textContent;
	const lastChar = inputVal[inputVal.length - 1];
	let equation = inputVal;

	equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

	if (key == 1 || code == 'Numpad1') {
		document.querySelector('.screen').textContent += '1';
	}
	if (key == 2 || code == 'Numpad2') {
		document.querySelector('.screen').textContent += '2';
	}
	if (key == 3 || code == 'Numpad3') {
		document.querySelector('.screen').textContent += '3';
	}
	if (key == 4 || code == 'Numpad4') {
		document.querySelector('.screen').textContent += '4';
	}
	if (key == 5 || code == 'Numpad5') {
		document.querySelector('.screen').textContent += '5';
	}
	if (key == 6 || code == 'Numpad6') {
		document.querySelector('.screen').textContent += '6';
	}
	if (key == 7 || code == 'Numpad7') {
		document.querySelector('.screen').textContent += '7';
	}
	if (key == 8 || code == 'Numpad8') {
		document.querySelector('.screen').textContent += '8';
	}
	if (key == 9 || code == 'Numpad9') {
		document.querySelector('.screen').textContent += '9';
	}
	if (key == 0 || code == 'Numpad0') {
		document.querySelector('.screen').textContent += '0';
	}

	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && code == 'Equal') || (inputVal != '' && operators.indexOf(lastChar) == -1 && code == 'NumpadAdd')) {
		document.querySelector('.screen').textContent += '+';
	}
	if ((operators.indexOf(lastChar) == -1 && code == 'Minus') || (operators.indexOf(lastChar) == -1 && code == 'NumpadSubtract')) {
		document.querySelector('.screen').textContent += '-';
	}
	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && code == 'NumpadMultiply') || (operators.indexOf(lastChar) == -1 && code == 'KeyX')) {
		document.querySelector('.screen').textContent += '*';
	}
	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && code == 'Slash') || (operators.indexOf(lastChar) == -1 && code == 'NumpadDivide')) {
		document.querySelector('.screen').textContent += '÷';
	}
	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && code == 'Period') || (inputVal != '' && operators.indexOf(lastChar) == -1 && code == 'NumpadDecimal')) {
		document.querySelector('.screen').textContent += '.';
	}
	if ((code == 'NumpadEnter' && event.shiftKey == false) || (code == 'Enter' && event.shiftKey == false)) {
		input.textContent = math.eval(equation);
		decimalAdded = false;
		logger.log(`Evaluated equation ${equation}`);
	}
	if ((code == 'Backspace') || (code == 'Delete')) {
		input.textContent = '';
		decimalAdded = false;
		logger.log(`Cleared calculator output`);
	}
});
