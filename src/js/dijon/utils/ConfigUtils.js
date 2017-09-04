(function (ns) {
    'use strict';
    ns.utils.ConfigUtils = function () {

        return {
            system: undefined, //inject
            storageService: undefined,
            _: undefined,

            ID_PREFIX: 'config_',

            getDomId: function(id)
            {
                return this.ID_PREFIX+id;
            },

            save: function(id, val){
                var data = {};
                id = this.ID_PREFIX+id;
                this.storageService.set(id, val);
            },

            read: function(id, callback){
                var self = this;
                id = this.ID_PREFIX+id;

                console.log('Reading from configutils');
                this.storageService.get(id, function(result){
                    if(self._.isEmpty(result)) {
                        result = undefined;
                    }

                    callback(result);
                });
            }
        };
    };
}(chalk));
