(function (ns) {
    'use strict';
    
    ns.services.StorageService = function () {
        return {
            system: undefined, //inject
            
            set: function (data, callback) {
                chrome.storage.local.set(data, callback);
            },

            get: function (varName, callback) {
                chrome.storage.local.get(varName, callback);
            },

            clear: function(){
                chrome.storage.local.clear();
            }
        };
    };
}(chalk));
