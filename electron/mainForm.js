'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { ipcMain, Menu, MenuItem, dialog } = require('electron');

var mainWindow = null;
var mainWindow = null;
var currentClient = null;

function setupMenu() {
  const template = [
    {
      label: 'Game Select',
      submenu: [
        {
          label: 'Prime 1',
          // accelerator: 'CmdOrCtrl+1',
          click(item, focusedWindow) {
            goToPrime1(focusedWindow);
          }
        },
        {
          label: 'Prime 2',
          // accelerator: 'CmdOrCtrl+2',
          click(item, focusedWindow) {
            goToPrime2(focusedWindow);
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload()
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools()
          }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
}

app.disableHardwareAcceleration();

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 400, height: 620, title: "Prime Item Tracker" });
  mainWindow.loadURL('file://' + __dirname + '/../html/simple-prime1.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  setupMenu();
});

function goToPrime1(w) {
  w = w || mainWindow;
  w.setSize(400, 620)
  w.loadURL('file://' + __dirname + '/../html/simple-prime1.html');
}

function goToPrime2(w) {
  w = w || mainWindow;
  w.setSize(400, 660)
  w.loadURL('file://' + __dirname + '/../html/simple-prime2.html');
}
