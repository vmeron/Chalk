const os = require('os');
const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');
const storage = require('electron-json-storage');
const storageListeners = require('./js/process/listeners/storage.js').ipcListeners;
const _ = require('lodash');
const windowHelper = require('./js/process/helpers/window.js');
const autoUpdater = require("electron-updater").autoUpdater;
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "debug";
//autoUpdater.allowPrerelease = true;
//autoUpdater.allowDowngrade = true;

//Debug mode
const ENV_DEBUG = process.argv.indexOf('--dev') > -1;
const STORAGE_CLEAR = process.argv.indexOf('--clear') > -1;

//console.log('Data path : ', storage.getDataPath());
//storage.setDataPath(os.tmpdir());

if(STORAGE_CLEAR) {
    storage.clear(function(error) {
        if(error) {
            throw error;
        }
    });
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

autoUpdater.on('checking-for-update', function() {
  log.debug('Checking for update...');
});

autoUpdater.on('update-available', function(info) {
  log.debug('Update available.');
});

autoUpdater.on('update-not-available', function(info) {
  log.debug('Update not available.');
});

autoUpdater.on('error', function(err) {
  log.debug('Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', function(progressObj) {
  var log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  log.debug(log_message);
});

autoUpdater.on('update-downloaded', function(info) {
  log.debug('Update downloaded');
});

function createWindow () {
    var area = electron.screen.getPrimaryDisplay().workArea;

    for(var i in storageListeners) {
        ipcMain.on(i, storageListeners[i]);
    }

    ipcMain.on('App:status:active', function() {
        win.focus();
    });

    storage.get('windowOptions', function(event, windowOptions) {
        if(_.isEmpty(windowOptions)) {
            windowOptions = windowHelper.getDefaultWindowState(area);

            storage.set('windowOptions', windowOptions, function(error) {
                if(error) {
                    throw error;
                }
            });
        }

        win.setPosition(windowOptions.x, windowOptions.y, false);
        win.setSize(windowOptions.width, windowOptions.height, false);

        win.show();

        win.on('resize', function() {
            var newOptions = windowHelper.getCurrentWindowState(win);
            storage.set('windowOptions', newOptions);
        });

        win.on('move', function() {
            var newOptions = windowHelper.getCurrentWindowState(win);
            storage.set('windowOptions', newOptions);
        });

        var template = [{
            label: "Chalk",
            submenu: [
                { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
                { type: "separator" },
                { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
            ]}, {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]}
        ];

        Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    });

    // Create the browser window.
    win = new BrowserWindow({
        //width: 800,
        //height: 600,
        show: false,
        webPreferences: {
            //nodeIntegration: false
        }
    });

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'window.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    if(ENV_DEBUG) {
        win.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        //win = null;
        app.quit();
    });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
    //autoUpdater.checkForUpdatesAndNotify();
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        console.log('On activate');
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
