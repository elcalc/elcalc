const math = require('mathjs');
const logger = require('electron-timber');

const keys = document.querySelectorAll('#calculator span');
const operators = ['+', '-', '*', '/'];
const input = document.querySelector('.screen');

let decimalAdded = true;

for (let i = 0; i < keys.length; i++) {
	keys[i].addEventListener('click', async function (e) {
		const inputVal = await input.textContent;
		const btnVal = await this.textContent;

		if (btnVal === 'C') {
			input.textContent = '';
			decimalAdded = true;
			logger.log('Cleared calculator output');
		} else if (['√', 'ʸ√x', '√x', 'xʸ', '%', 'x²', '|x|', 'x!', 'log𝑏(x)'].indexOf(btnVal) > -1 && input.textContent === '') {
			input.textContent = '';
			decimalAdded = true;
		} else if (btnVal !== '' && input.textContent.startsWith('pow(') && !input.textContent.endsWith(')')) {
			input.textContent += btnVal + ')';
			decimalAdded = true;
		} else if (btnVal !== '' && input.textContent.startsWith('nthRoot(') && !input.textContent.endsWith(')')) {
			input.textContent += btnVal + ')';
			decimalAdded = true;
		} else if (btnVal !== '' && input.textContent.startsWith('log(') && !input.textContent.endsWith(')')) {
			input.textContent += btnVal + ')';
			decimalAdded = true;
		} else if (btnVal === '=') {
			let equation = math.round(inputVal, 13);
			const lastChar = await equation[equation.length - 1];

			if (operators.indexOf(lastChar) > -1 || lastChar === '.') {
				equation = await equation.replace(/.$/, '');
			}

			if (equation) {
				logger.log(`Evaluated equation ${equation}`);
				input.textContent = await math.eval(equation);
			}

			decimalAdded = false;
		} else if (operators.indexOf(btnVal) > -1) {
			const lastChar = await inputVal[inputVal.length - 1];

			if (inputVal !== '' && operators.indexOf(lastChar) === -1) {
				input.textContent += btnVal;
			} else if (inputVal === '' && btnVal === '-') {
				input.textContent += btnVal;
			}

			if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				input.textContent = await inputVal.replace(/.$/, btnVal);
			}

			decimalAdded = true;
		} else if (btnVal === '.') {
			if (decimalAdded == true) {
				input.textContent += btnVal;
				decimalAdded = false;
			}
		} else if (btnVal === '%') {
			if (decimalAdded == true) {
				input.textContent += btnVal;
				decimalAdded = false;
			}
		} else if (btnVal === 'x²') {
			input.textContent = 'pow(' + input.textContent + ',2)';
			decimalAdded = false;
		} else if (btnVal === 'xʸ') {
			input.textContent = 'pow(' + input.textContent + ',';
			decimalAdded = false;
		} else if (btnVal === '√x' && input.textContent !== '') {
			input.textContent = `sqrt(${input.textContent})`;
			decimalAdded = false;
		} else if (btnVal === 'ʸ√x' && input.textContent !== '') {
			input.textContent = 'nthRoot(' + input.textContent + ',';
			decimalAdded = false;
		} else if (btnVal === 'log𝑏(x)' && input.textContent !== '') {
			input.textContent = 'log(' + input.textContent + ',';
			decimalAdded = false;
		} else if (btnVal === '|x|') {
			input.textContent = 'abs(' + input.textContent + ')';
			decimalAdded = false;
		} else if (btnVal === 'x!' && input.textContent !== '') {
			input.textContent += '!';
			decimalAdded = false;
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

document.addEventListener('keydown', async event => {
	const {code} = event;
	const inputVal = await input.textContent;
	const lastChar = await inputVal[inputVal.length - 1];
	if (event.shiftKey == false && (code.startsWith('Numpad') || code.startsWith('Digit')) && '0123456789'.includes(code.slice(-1))) {
		input.textContent += code.slice(-1);
	}

	if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'Equal' || code == 'NumpadAdd')) {
		input.textContent += '+';
		decimalAdded = true;
	}

	if (operators.indexOf(lastChar) == -1 && (code == 'Minus' || code == 'NumpadSubtract')) {
		input.textContent += '-';
		decimalAdded = true;
	}

	if (inputVal != '' && operators.indexOf(lastChar) == -1 && ((code == 'KeyX' || code == 'NumpadMultiply')) || (code == 'Digit8' && event.shiftKey)) {
		input.textContent += '*';
		decimalAdded = true;
	}

	if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'Slash' || code == 'IntlRo' || code == 'NumpadDivide')) {
		input.textContent += '/';
		decimalAdded = true;
	}

	if ((code == 'Period' || code == 'NumpadDecimal') && decimalAdded == true) {
		input.textContent += '.';
		decimalAdded = false;
	}

	if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'Digit5' && event.shiftKey)) {
		input.textContent += '%';
		decimalAdded = true;
	}

	if (inputVal != '' && operators.indexOf(lastChar) == -1 && (code == 'Digit1' && event.shiftKey)) {
		input.textContent += '!';
		decimalAdded = true;
	}

	if (event.shiftKey == false && (code == 'NumpadEnter' || code == 'Enter')) {
		const equation = inputVal;
		input.textContent = await math.eval(equation);
		decimalAdded = false;
		logger.log(`Evaluated equation ${equation}`);
	}

	if (code == 'Backspace' || code == 'Delete') {
		input.textContent = '';
		decimalAdded = true;
		logger.log('Cleared calculator output');
	}
});
