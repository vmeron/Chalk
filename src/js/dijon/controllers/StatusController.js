(function (ns) {
    'use strict';

    ns.controllers.StatusController = function () {
        return {
            system: undefined,

            init: function(){
                this.system.mapHandler('Auth:loginSuccess', 'rmStatusModel', 'refresh');
                this.system.mapHandler('Chrono:loaded', 'statusView', 'displayInChrono');
            }
        };
    };
}(chalk));