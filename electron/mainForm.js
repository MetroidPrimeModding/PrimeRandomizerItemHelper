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
      label: 'Prime',
      submenu: [
        {
          label: 'Full',
          // accelerator: 'CmdOrCtrl+1',
          click(item, focusedWindow) {
            goToFullP(focusedWindow);
          }
        },
		    {
          label: 'Compact',
          // accelerator: 'CmdOrCtrl+2',
          click(item, focusedWindow) {
            goToCompactP(focusedWindow);
          }
        },
		    /*{
          label: 'Expansions',
          // accelerator: 'CmdOrCtrl+2',
          click(item, focusedWindow) {
            goToExpansionsP(focusedWindow);
          }
        }*/
      ]
    },
	  {
      label: 'Echoes',
      submenu: [
        {
          label: 'Full',
          // accelerator: 'CmdOrCtrl+1',
          click(item, focusedWindow) {
            goToFullE(focusedWindow);
          }
        },
		    {
          label: 'Compact',
          // accelerator: 'CmdOrCtrl+2',
          click(item, focusedWindow) {
            goToCompactE(focusedWindow);
          }
        },
		    /*{
          label: 'Expansions',
          // accelerator: 'CmdOrCtrl+2',
          click(item, focusedWindow) {
            goToExpansionsE(focusedWindow);
          }
        },*/
		    {
          label: 'Alt',
          // accelerator: 'CmdOrCtrl+1',
          click(item, focusedWindow) {
            goToFullAltE(focusedWindow);
          }
        }
      ]
    },
    {
      label: 'Corruption',
      submenu: [
        {
          label: 'Full',
          // accelerator: 'CmdOrCtrl+1',
          click(item, focusedWindow) {
            goToFullC(focusedWindow);
          }
        },
		    /*{
          label: 'Compact',
          // accelerator: 'CmdOrCtrl+2',
          click(item, focusedWindow) {
            goToCompactC(focusedWindow);
          }
        },*/
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
  mainWindow = new BrowserWindow({ width: 496, height: 580, title: "Metroid Prime Series Item Tracker" });
  mainWindow.loadURL('file://' + __dirname + '/../html/simple-prime1-full.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  setupMenu();
});

// Sub-Menu Functions: Prime
function goToFullP(w) {
  w = w || mainWindow;
  w.setSize(496, 580)
  w.loadURL('file://' + __dirname + '/../html/simple-prime1-full.html');
}

function goToSimple1(w) {
  w = w || mainWindow;
  w.setSize(400, 511)
  w.loadURL('file://' + __dirname + '/../html/simple-prime1-simple.html');
}

function goToCompactP(w) {
  w = w || mainWindow;
  w.setSize(496, 360)
  w.loadURL('file://' + __dirname + '/../html/simple-prime1-compact.html');
}

function goToExpansionsP(w) {
  w = w || mainWindow;
  w.setSize(496, 360)
  w.loadURL('file://' + __dirname + '/../html/simple-prime1-expansions.html');
}

// Sub-Menu Functions: Echoes
function goToFullE(w) {
  w = w || mainWindow;
  w.setSize(496, 520)
  w.loadURL('file://' + __dirname + '/../html/simple-prime2-full.html');
}

function goToFullAltE(w) {
  w = w || mainWindow;
  w.setSize(496, 440)
  w.loadURL('file://' + __dirname + '/../html/simple-prime2-full-alt.html');
}

function goToCompactE(w) {
  w = w || mainWindow;
  w.setSize(496, 360)
  w.loadURL('file://' + __dirname + '/../html/simple-prime2-compact.html');
}

function goToExpansionsE(w) {
  w = w || mainWindow;
  w.setSize(496, 440)
  w.loadURL('file://' + __dirname + '/../html/simple-prime2-expansions.html');
}

// Sub-Menu Functions: Corruption
function goToFullC(w) {
  w = w || mainWindow;
  w.setSize(496, 528)
  w.loadURL('file://' + __dirname + '/../html/simple-prime3-full.html');
}

function goToCompactC(w) {
  w = w || mainWindow;
  w.setSize(482, 528)
  w.loadURL('file://' + __dirname + '/../html/simple-prime3-compact.html');
}