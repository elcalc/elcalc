const {app, BrowserWindow} = require('electron');
const logger = require('electron-timber');

try {
	require('electron-reloader')(module);
} catch (err) {}

// Handle uncaught exceptions before calling any functions
process.on('uncaughtException', err => {
	logger.error('Uncaught error:\n', err);
});

app.on('ready', () => {
	let win = new BrowserWindow({
		width: 330,
		height: 350,
		maximizable: false,
		resizable: false,
		backgroundColor: '#9BA6A7',
		darkTheme: true,
		alwaysOnTop: true,
		titleBarStyle: 'hiddenInset',
		show: false
	});

	win.setMenu(null);

	win.loadURL(`file://${__dirname}/index.html`);

	win.once('ready-to-show', () => {
		logger.log('App started');
		win.show();
	});

	win.on('closed', () => {
		logger.log(`App closed`);
		win = null;
		app.quit();
	});
});
