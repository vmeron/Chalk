const storage = require('electron-json-storage');
const ipcHelper = require('../helpers/ipc.js');
var exports = module.exports;

/*
storage.clear(function(error){
    if(error) {
        throw error;
    }
    console.log('Storage cleared at '+os.tmpdir());
});
*/
exports.ipcListeners = {
    storageServiceGet: function(event, data) {
        cleanData = ipcHelper.unwrapData(data);

        storage.get(cleanData.varName, function(error, result) {
            var response = ipcHelper.wrapData(result);
            var responseChannel = ipcHelper.generateResponseChannel('storageServiceGet', data.uid);

            event.sender.send(responseChannel, response);
        });
    },

    storageServiceSet: function(event, data) {
        var cleanData = ipcHelper.unwrapData(data);

        storage.set(cleanData.varName, data.data, function(error) {
            var responseChannel = ipcHelper.generateResponseChannel('storageServiceSet', data.uid);
            var cleanResponse = ipcHelper.wrapData(cleanData);

            event.sender.send(responseChannel, cleanResponse);
        });
    },

    storageServiceClear: function() {
        storage.clear(function(error){
            if(error) {
                throw error;
            }
        });
    }
};
