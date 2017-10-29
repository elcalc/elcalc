var app = require('app')
var path = require('path')
var BrowserWindow = require('browser-window')

require('crash-reporter').start()

var mainWindow = null

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 341,
    height: 356,
    maxWidth: 341,
    maxHeight: 356,
    minWidth: 341,
    minHeight: 356,
    maximizable: false,
    minimizable: false,
    resizable: false,
    icon: path.join(__dirname, 'assets/icons/png/calculator-icon.png')
  })

  mainWindow.loadUrl('file://' + __dirname + '/index.html')

  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
