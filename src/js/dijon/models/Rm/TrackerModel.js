(function (ns) {
    'use strict';

    ns.models.RmTrackerModel = function () {
        return {
            system: undefined, //inject
            restClient: undefined,
            
            trackers: [],
            
            send: function(id, trackerId){
                var self = this;
                
                this.restClient.call(this.restClient.methods.PUT, 'issues/'+id, {
                    issue: {
                        id: id,
                        tracker_id: trackerId
                    }
                }, function(){
                    self.system.notify('Tracker:send:success');
                });
            },
            
            refresh: function(){
                var self = this;
                this.restClient.call(this.restClient.methods.GET, 'trackers', null, function(result){
                    self.trackers = result.trackers;
                });
            }
        };
    };
}(chalk));
