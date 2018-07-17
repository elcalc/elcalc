const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
	let win = new BrowserWindow({
		width: 325,
		height: 318,
		maximizable: false,
		minimizable: false,
		resizable: false,
		backgroundColor: '#9BA6A7',
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
