(function (ns) {
    'use strict';

    ns.controllers.ConfigController = function () {
        return {
            system: undefined,
            configView: undefined,
            
            init: function(){
                this.system.mapHandler('User:refresh:success', 'configController', 'dispatch');
                this.system.mapHandler('Auth:logout', 'configController', 'reset');
            },
            
            dispatch: function(){
                console.log('CONFIG DISPATCH');
                this.system.notify('Config:init');
            },
            
            reset: function(){
                this.configView.reset();
            }
        };
    };
}(chalk));