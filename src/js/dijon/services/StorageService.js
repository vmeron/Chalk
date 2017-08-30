(function (ns) {
    'use strict';

    ns.services.StorageService = function () {
        return {
            system: undefined, //inject

            set: function (data, callback) {
                console.log(data);
                console.log(localStorage);
                for(var i in data)
                {
                    localStorage.setItem(i, data[i]);
                }

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
