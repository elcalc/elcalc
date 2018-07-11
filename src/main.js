const electron = require('electron');

const {app, BrowserWindow} = electron;

let mainWindow = null;

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		titleBarStyle: 'hidden',
		title: 'elcalc',
		width: 331,
		height: 324,
		maxWidth: 331,
		maxHeight: 344,
		minWidth: 331,
		minHeight: 344,
		maximizable: false,
		minimizable: false,
		resizable: false
	});

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
});
