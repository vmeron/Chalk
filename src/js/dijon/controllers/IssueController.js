(function (ns) {
    'use strict';

    ns.controllers.IssueController = function () {
        return {
            system: undefined,
            rmIssueModel: undefined,
            issueView: undefined,
            
            init: function(){
                this.system.mapHandler('Auth:logout', 'issueController', 'reset');
                this.system.mapHandler('Auth:logout', 'issueView', 'logoutHandler');
                
                this.system.mapHandler('Auth:loginSuccess', 'issueView', 'initDirectSearch');
                this.system.mapHandler('Project:refresh', 'issueController', 'reset');
                this.system.mapHandler('Project:selected', 'issueController', 'projectRefreshHandler', false, true);
                
                this.system.mapHandler('Issue:refresh:success', 'issueView', 'refresh');
            },

            projectRefreshHandler: function(ev, project){
                this.issueView.startRefresh();
                this.rmIssueModel.refresh(project.id);
            },
            
            reset: function(){
                this.rmIssueModel.reset();
                this.issueView.reset();
            }
        };
    };
}(chalk));
