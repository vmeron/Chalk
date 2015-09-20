(function (ns) {
    'use strict';

    ns.controllers.ProjectController = function () {
        return {
            system: undefined,
            rmProjectModel: undefined,
            projectView: undefined,
            
            init: function(){
                this.system.mapHandler('Auth:loginSuccess', 'projectController', 'refresh');
                this.system.mapHandler('Auth:logout', 'projectController', 'reset');
                
                /*
                this.system.mapHandler('Project:refresh', 'rmProjectModel', 'refresh', false, true);
                this.system.mapHandler('Project:refresh', 'projectView', 'refresh');
                */
                this.system.mapHandler('Project:refresh', 'projectController', 'refresh', false, true);
                this.system.mapHandler('Project:refresh:success', 'projectView', 'update');
            },
            
            refresh: function(useCache){
                if(typeof useCache === 'undefined')
                {
                    useCache = true;
                }

                this.projectView.refresh();
                this.rmProjectModel.refresh(useCache);
            },
            
            reset: function(){
                this.rmProjectModel.reset();
                this.projectView.reset();
            }
        };
    };
}(chalk));
