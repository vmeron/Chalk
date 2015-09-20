(function (ns) {
    'use strict';

    ns.controllers.LatestIssuesController = function () {
        return {
            system: undefined,
            latestIssuesModel: undefined,
            latestIssuesView: undefined,
            
            init: function(){
                this.system.mapHandler('Auth:loginSuccess', 'latestIssuesModel', 'refresh');
                this.system.mapHandler('Auth:logout', 'latestIssuesController', 'reset');
                this.system.mapHandler('Chrono:save:success', 'latestIssuesController', 'chronoSaveHandler', false, true);
                this.system.mapHandler('LatestIssues:add:success', 'latestIssuesView', 'redraw');
                this.system.mapHandler('LatestIssues:refresh:success', 'latestIssuesView', 'redraw');
            },
            
            chronoSaveHandler: function(ev, data){
                this.latestIssuesModel.add(data.time_entry);
            },

            reset: function(){
                this.latestIssuesModel.reset();
                this.latestIssuesView.reset();
            }
        };
    };
}(chalk));