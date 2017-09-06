const os = require('os');
const {app, BrowserWindow, ipcMain} = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');
const storage = require('electron-json-storage');
const storageListeners = require('./js/process/listeners/storage.js').ipcListeners;
const _ = require('lodash');
const windowHelper = require('./js/process/helpers/window.js');

storage.setDataPath(os.tmpdir());

/*
storage.clear(function(error) {
    if(error) {
        throw error;
    }
});
*/
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;


function createWindow () {
    var area = electron.screen.getPrimaryDisplay().workArea;

    for(var i in storageListeners) {
        ipcMain.on(i, storageListeners[i]);
    }

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
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
    console.log('On ready');
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
