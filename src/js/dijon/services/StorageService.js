(function (ns) {
    'use strict';

    ns.services.StorageService = function () {
        return {
            system: undefined, //inject
            ipcService: undefined, //inject
            processUtils: undefined, //inject
            ipcHelper: undefined, //inject

            setup: function() {
                //this.clear();
                //this.ipcHelper = require(this.processUtils.appDir+'/js/process/helpers/ipc.js');
            },

            get: function (varName, callback) {
                var resultString = localStorage.getItem(varName);
                var result = JSON.parse(resultString);

                if(typeof callback !== 'undefined') {
                    callback(result);
                }
                /*
                var self = this;
                var result = this.ipcService.send('storageServiceGet', {
                    varName: varName
                }, function(event, response) {
                    if(typeof callback !== 'undefined') {
                        console.log('Storage get result : '+varName);
                        console.log(response);

                        callback(response.data);
                    }
                });
                */

            },

            set: function (varName, data, callback) {
                localStorage.setItem(varName, JSON.stringify(data));

                if(typeof callback !== 'undefined') {
                    callback(data);
                }

                /*
                var self = this;

                var result = this.ipcService.send('storageServiceSet', {
                    varName: varName,
                    data: data
                }, function(event, response) {
                    if(typeof callback !== 'undefined') {
                        callback(response.data);
                    }
                });*/
            },

            clear: function(){
                localStorage.clear();
                //this.ipcService.send('storageServiceClear');
            }
        };
    };
}(chalk));
