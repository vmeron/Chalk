(function (ns) {
    'use strict';

    ns.models.RmCommentModel = function () {
        return {
            system: undefined, //inject
            restClient: undefined,
            
            send: function(id, comment){
                var self = this;
                
                this.restClient.call(this.restClient.methods.PUT, 'issues/'+id, {
                    issue: {
                        id: id,
                        notes: comment
                    }
                }, function(){
                    self.system.notify('Comment:send:success');
                }, function(){
                    self.system.notify('Comment:send:success');
                });
            }
        };
    };
}(chalk));
