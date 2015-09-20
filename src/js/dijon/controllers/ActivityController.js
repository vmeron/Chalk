(function (ns) {
    'use strict';

    ns.controllers.ActivityController = function () {
        return {
            system: undefined,
            
            init: function(){
                this.system.mapHandler('Config:init', 'activityView', 'configHandler');
            }
        };
    };
}(chalk));