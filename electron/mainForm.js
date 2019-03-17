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
/*         {
          label: 'Simple Icons',
          // accelerator: 'CmdOrCtrl+2',
          click(item, focusedWindow) {
            goToSimple1(focusedWindow);
          }
		},*/
		{
          label: 'Simplified',
          // accelerator: 'CmdOrCtrl+2',
          click(item, focusedWindow) {
            goToSimplifiedP(focusedWindow);
          }
        },
		{
          label: 'Simplified + Expansions',
          // accelerator: 'CmdOrCtrl+2',
          click(item, focusedWindow) {
            goToExpansionsP(focusedWindow);
          }
        }
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
/*         {
          label: 'Simple Icons',
          // accelerator: 'CmdOrCtrl+2',
          click(item, focusedWindow) {
            goToSimple2(focusedWindow);
          }
        }, */
		{
          label: 'Simplified',
          // accelerator: 'CmdOrCtrl+2',
          click(item, focusedWindow) {
            goToSimplifiedE(focusedWindow);
          }
        },
		{
          label: 'Simplified + Expansions',
          // accelerator: 'CmdOrCtrl+2',
          click(item, focusedWindow) {
            goToExpansionsE(focusedWindow);
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
  mainWindow = new BrowserWindow({ width: 400, height: 511, title: "Metroid Prime 1 & 2 Item Tracker" });
  mainWindow.loadURL('file://' + __dirname + '/../html/simple-prime1-full.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  setupMenu();
});

function goToFullP(w) {
  w = w || mainWindow;
  w.setSize(400, 511)
  w.loadURL('file://' + __dirname + '/../html/simple-prime1-full.html');
}

/* function goToSimple1(w) {
  w = w || mainWindow;
  w.setSize(400, 511)
  w.loadURL('file://' + __dirname + '/../html/simple-prime1-full-alt.html');
} */

function goToSimplifiedP(w) {
  w = w || mainWindow;
  w.setSize(300, 260)
  w.loadURL('file://' + __dirname + '/../html/simple-prime1-simplified.html');
}

function goToExpansionsP(w) {
  w = w || mainWindow;
  w.setSize(300, 260)
  w.loadURL('file://' + __dirname + '/../html/simple-prime1-expansions.html');
}

function goToFullE(w) {
  w = w || mainWindow;
  w.setSize(336, 435)
  w.loadURL('file://' + __dirname + '/../html/simple-prime2-full.html');
}

/* function goToSimple2(w) {
  w = w || mainWindow;
  w.setSize(336, 435)
  w.loadURL('file://' + __dirname + '/../html/simple-prime2-full-alt.html');
} */

function goToSimplifiedE(w) {
  w = w || mainWindow;
  w.setSize(300, 290)
  w.loadURL('file://' + __dirname + '/../html/simple-prime2-simplified.html');
}

function goToExpansionsE(w) {
  w = w || mainWindow;
  w.setSize(300, 290)
  w.loadURL('file://' + __dirname + '/../html/simple-prime2-expansions.html');
}
