// TODO: How to recompile this into ES6?

const isDev = (process.env.NODE_ENV === 'development');

let installExtension = null;
if ( isDev ) {
  installExtension = require('electron-devtools-installer');
}

const Positioner = require('electron-positioner');
const Notifier = require('node-notifier');

const path = require('path');
const electron = require('electron');
const menuTemplate = require('./menuTemplate');

const MainWindow  = require('../windows/MainWindow');
const AboutWindow = require('../windows/AboutWindow');
const TrayWindow  = require('../windows/TrayWindow');

const TrayIcon = require('./TrayIcon');

const {app, BrowserWindow, ipcMain, Menu, Tray} = electron;

let tray = null;
let main = null;
let about = null;
let trayIcon = null;

app.dock.hide();
app.on('ready', function () {
  if ( isDev ) installExtentions();

  tray = new TrayWindow();
  main = new MainWindow();
  about = new AboutWindow();

  trayIcon = new TrayIcon(tray.window);

  Menu.setApplicationMenu( Menu.buildFromTemplate(menuTemplate(main)) );
})


ipcMain.on('quit-app', function() {
  console.log('QUIT APP ...')

  main.window.close();
  about.window.close();
  tray.window.close();
  app.quit();
});


// Custom events MAIN WINDOW
ipcMain.on('show-main-window-event', function() {
  main.window.show();
  app.dock.show();
});


// Custom events ABOUT WINDOW
ipcMain.on('show-about-window-event', function() {
  about.window.show();

  this.positioner = new Positioner(about.window);
  this.positioner.move('center');
});

// Custom events NOTIFICATION WINDOW
ipcMain.on('create-notification-window-event', function(event, options) {
  Notifier.notify({
    title: options.title,
    message: options.message,
    icon: path.join(__dirname, '../icons/icon-256.png'),
    sound: 'Glass',
    wait: true
  });
});


// Custom events TRAY WINDOW
ipcMain.on('update-title-tray-window-event', function(event, title) {
  trayIcon.updateTitle(title);
});

const installExtentions = function () {
  // TODO: How to forse it to use import instead of require?
  installExtension['default']( installExtension['REDUX_DEVTOOLS'] )
  installExtension['default']( installExtension['REACT_DEVELOPER_TOOLS'] )
}
