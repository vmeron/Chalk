(function (ns) {
    'use strict';

    ns.models.RmStatusModel = function () {
        return {
            system: undefined, //inject
            restClient: undefined,

            statuses: [],

            send: function(id, statusId){
                var self = this;

                this.restClient.call(this.restClient.methods.PUT, 'issues/'+id, {
                    issue: {
                        id: id,
                        status_id: statusId
                    }
                }, function(){
                    self.system.notify('Status:send:success');
                });
            },

            refresh: function(){
                var self = this;
                this.restClient.call(this.restClient.methods.GET, 'issue_statuses', null, function(result){
                    self.statuses = result.issue_statuses;
                });
            }
        };
    };
}(chalk));
