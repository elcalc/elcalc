const electron = require('electron');

const {app, BrowserWindow} = electron;

let win = null;

app.on('ready', () => {
	win = new BrowserWindow({
		titleBarStyle: 'hidden',
		title: 'elcalc',
		width: 324,
		height: 295,
		maximizable: false,
		minimizable: false,
		resizable: false
	});

	win.setMenu(null);

	win.loadURL(`file://${__dirname}/index.html`);

	win.on('closed', () => {
		win = null;
	});
});
