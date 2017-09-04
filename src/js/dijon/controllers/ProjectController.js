(function (ns) {
    'use strict';

    ns.controllers.ProjectController = function () {
        return {
            system: undefined, //inject
            rmProjectModel: undefined, //inject
            projectView: undefined, //inject

            init: function(){
                console.log('HIHIHI');
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
                console.log('Refreshing projects');
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
