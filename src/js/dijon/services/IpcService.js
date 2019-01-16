(function(ns) {
    'use strict';

    ns.services.IpcService = function() {
        return {
            stringUtils: undefined, //inject
            processUtils: undefined, //inject
            ipc: undefined,
            ipcHelper: undefined,
            callbacks: {},

            setup: function() {
                this.ipc = require('electron').ipcRenderer;
                this.ipcHelper = require(this.processUtils.appDir+'/js/process/helpers/ipc.js');
            },

            send: function(channel, data, callback) {
                var self = this;
                var sendData = this.ipcHelper.wrapData(data);

                if(typeof callback === 'function') {
                    this.callbacks[sendData.uid] = callback;
                    var responseChannel = this.ipcHelper.generateResponseChannel(channel, sendData.uid);

                    this.ipc.once(responseChannel, function(event, response) {
                        var cleanResponse = self.ipcHelper.unwrapData(response);
                        callback(event, cleanResponse);
                    });
                }

                this.ipc.send(channel, sendData);
            }
        };
    };
}(chalk));
