(function (ns) {
    'use strict';

    ns.controllers.TrackerController = function () {
        return {
            system: undefined,
            
            init: function(){
                this.system.mapHandler('Auth:loginSuccess', 'rmTrackerModel', 'refresh');
                this.system.mapHandler('Chrono:loaded', 'trackerView', 'displayInChrono');
            }
        };
    };
}(chalk));