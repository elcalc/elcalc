const keys = document.querySelectorAll('#calculator span');
const math = require('mathjs');
const logger = require('electron-timber');

const operators = ['+', '-', '*', '÷', '.'];
const input = document.querySelector('.screen');

let decimalAdded = false;

/* Buttons */

for (let i = 0; i < keys.length; i++) {
	keys[i].addEventListener('click', function (e) {
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

/* Keyboard support */

// In this particular case, we need to disable some eslint rules, for keyboard support to work correctly.
/* eslint eqeqeq:0 */
/* eslint complexity:0 */

document.addEventListener('keydown', event => {
	const {key, code} = event;
	const inputVal = input.textContent;
	const lastChar = inputVal[inputVal.length - 1];
	let equation = inputVal;

	equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

	if (key == 1 || code == 'Numpad1') {
		input.textContent += '1';
	}
	if (key == 2 || code == 'Numpad2') {
		input.textContent += '2';
	}
	if (key == 3 || code == 'Numpad3') {
		input.textContent += '3';
	}
	if (key == 4 || code == 'Numpad4') {
		input.textContent += '4';
	}
	if (key == 5 || code == 'Numpad5') {
		input.textContent += '5';
	}
	if (key == 6 || code == 'Numpad6') {
		input.textContent += '6';
	}
	if (key == 7 || code == 'Numpad7') {
		input.textContent += '7';
	}
	if (key == 8 || code == 'Numpad8') {
		input.textContent += '8';
	}
	if (key == 9 || code == 'Numpad9') {
		input.textContent += '9';
	}
	if (key == 0 || code == 'Numpad0') {
		input.textContent += '0';
	}

	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && code == 'Equal') || (inputVal != '' && operators.indexOf(lastChar) == -1 && code == 'NumpadAdd')) {
		input.textContent += '+';
	}
	if ((operators.indexOf(lastChar) == -1 && code == 'Minus') || (operators.indexOf(lastChar) == -1 && code == 'NumpadSubtract')) {
		input.textContent += '-';
	}
	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && code == 'NumpadMultiply') || (operators.indexOf(lastChar) == -1 && code == 'KeyX')) {
		input.textContent += '*';
	}
	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && code == 'Slash') || (operators.indexOf(lastChar) == -1 && code == 'NumpadDivide')) {
		input.textContent += '÷';
	}
	if ((inputVal != '' && operators.indexOf(lastChar) == -1 && code == 'Period') || (inputVal != '' && operators.indexOf(lastChar) == -1 && code == 'NumpadDecimal')) {
		input.textContent += '.';
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
