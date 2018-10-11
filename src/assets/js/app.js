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
	const code = event.code;
	const inputVal = input.textContent;
	const lastChar = inputVal[inputVal.length - 1];
	if ((code.startsWith('Numpad') || code.startsWith('Digit')) && '0123456789'.includes(code.slice(-1))) {
		input.textContent += code.slice(-1);
	}

	if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'Equal' || code == 'NumpadAdd')) {
		input.textContent += '+';
	}

	if (operators.indexOf(lastChar) == -1 && (code == 'Minus' || code == 'NumpadSubtract')) {
		input.textContent += '-';
	}

	if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'KeyX' || code == 'NumpadMultiply')) {
		input.textContent += '*';
	}

	if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'Slash' || code == 'NumpadDivide')) {
		input.textContent += '÷';
	}

	if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'Period' || code == 'NumpadDecimal')) {
		input.textContent += '.';
	}

	if (event.shiftKey == false && (code == 'NumpadEnter' || code == 'Enter')) {
		let equation = inputVal.replace(/x/g, '*').replace(/÷/g, '/');
		input.textContent = math.eval(equation);
		decimalAdded = false;
		logger.log(`Evaluated equation ${equation}`);
	}
	
	if (code == 'Backspace' || code == 'Delete') {
		input.textContent = '';
		decimalAdded = false;
		logger.log(`Cleared calculator output`);
	}
});
