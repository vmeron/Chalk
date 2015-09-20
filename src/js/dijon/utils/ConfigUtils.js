(function (ns) {
    'use strict';
    ns.utils.ConfigUtils = function () {

        return {
            system: undefined, //inject
            storageService: undefined,
            
            ID_PREFIX: 'config_',
            
            getDomId: function(id)
            {
                return this.ID_PREFIX+id;
            },
            
            save: function(id, val){
                var data = {};
                id = this.ID_PREFIX+id;
                data[id] = val;
                this.storageService.set(data);
            },
            
            read: function(id, callback){
                id = this.ID_PREFIX+id;
                
                this.storageService.get(id, function(result){
                    callback(result[id]);
                });
            }
        };
    };
}(chalk));
