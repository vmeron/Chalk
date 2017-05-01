(function (ns) {
    'use strict';

    ns.services.StorageService = function () {
        return {
            system: undefined, //inject

            set: function (data, callback) {
                localStorage.setItem(data);
                callback();
            },

            get: function (varName, callback) {
                var result = localStorage.getItem(varName);
                callback({varName: result});
            },

            clear: function(){
                localStorage.clear();
            }
        };
    };
}(chalk));
