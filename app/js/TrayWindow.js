const path = require('path');
const { BrowserWindow } = require('electron');

class TrayWindow {
  constructor() {

    let htmlPath = path.join('file://', path.join(__dirname, '../pages/views/tray_page.html'));

    this.window = new BrowserWindow({
      show: false,
      height: 200,
      width: 225,
      frame: false,
      // resizable: false,
    });

    this.window.loadURL(htmlPath);

    this.window.on('blur', () => {
      this.window.hide();
    });
  }
}

module.exports = TrayWindow;