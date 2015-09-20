(function (ns) {
    'use strict';

    ns.models.RmIssueModel = function () {
        return {
            system: undefined, //inject
            restClient: undefined,
            rmProjectModel: undefined,
            rmUserModel: undefined,
            dataService: undefined,
            configUtils: undefined,
            
            currentStart: 0,
            issues: [],
            step: 100,
            
            TYPE: 'issue',

            refresh: function(idProject){
                var self = this;

                //Search for default filter
                self.configUtils.read(this.rmUserModel.CONFIG_ID, function(defaultFilter){
                    var additionalData = {
                        project_id: idProject,
                        sort: 'updated_on:desc'
                    };

                    if(defaultFilter == 1)
                    {
                        additionalData.assigned_to_id = self.rmUserModel.currentUser.id;
                    }

                    self.dataService.paginatedRefresh(false, 'issues', 'Issue:refresh:success', function(issues){
                        self.issues = issues;
                    }, additionalData);
                });
            },

            getById: function(id, callback, callbackError){
                var self = this;

                this.restClient.call(this.restClient.methods.GET, 'issues/'+id, null, function(result){
                    if(callback)
                    {
                        callback(result.issue);
                    }
                }, callbackError);
            },
            
            reset: function(){
                this.issues = [];
            }
        };
    };
}(chalk));
