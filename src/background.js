// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
import {app, BrowserWindow, Menu} from 'electron';
import contextMenu from 'electron-context-menu';

// Support copy & paste
contextMenu();

app.on('ready', () => {
	Menu.setApplicationMenu(null);

	const mainWindow = new BrowserWindow({
		width: 330,
		height: 500,
		maximizable: false,
		resizable: false,
		backgroundColor: '#9BA6A7',
		alwaysOnTop: true,
		titleBarStyle: 'hiddenInset',
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'app.html'),
			protocol: 'file:',
			slashes: true
		})
	);
});

app.on('window-all-closed', () => {
	app.quit();
});
