// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
import {app} from 'electron';
import env from 'env';
import createWindow from './helpers/window';

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
	const userDataPath = app.getPath('userData');
	app.setPath('userData', `${userDataPath} (${env.name})`);
}

app.on('ready', () => {
	const mainWindow = createWindow('main', {
		width: 330,
		height: 440,
		maximizable: false,
		resizable: false,
		backgroundColor: '#9BA6A7',
		alwaysOnTop: true,
		titleBarStyle: 'hiddenInset',
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.setMenu(null);

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
