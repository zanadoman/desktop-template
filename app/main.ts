import { BrowserWindow, Menu, app } from 'electron';
import url from 'url';
import path from 'path';

const createWindow = () => {
  const win = new BrowserWindow();

  Menu.setApplicationMenu(null);

  if (app.isPackaged) {
    win.loadURL(url.format({
      pathname: path.join(
        __dirname,
        'dist',
        'desktop-template',
        'browser',
        'index.html'
      ),
      protocol: 'file',
      slashes: true
    }));
  } else {
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools({
      mode: 'detach'
    });
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});
