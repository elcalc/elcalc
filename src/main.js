const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
	let win = new BrowserWindow({
		titleBarStyle: 'hidden',
		width: 324,
		height: 295,
		maximizable: false,
		minimizable: false,
		resizable: false,
		darkTheme: true,
		show: false
	});

	win.setMenu(null);

	win.loadURL(`file://${__dirname}/index.html`);

	win.once('ready-to-show', () => {
		win.show();
	});

	win.on('closed', () => {
		win = null;
	});
});
