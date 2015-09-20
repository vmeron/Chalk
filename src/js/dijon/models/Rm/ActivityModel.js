(function (ns) {
    'use strict';

    ns.models.RmActivityModel = function () {
        return {
            system: undefined, //inject
            restClient: undefined,
            dataService: undefined,

            activities: [],
            CONFIG_ID: 'defaultActivity',

            refresh: function(){
                var self = this;
                this.getActivities(function(result){
                    self.activities = result;
                });
            },

            getActivities: function(callback){
                this.restClient.call(this.restClient.methods.GET, 'enumerations/time_entry_activities', null, function(result){
                    callback(result.time_entry_activities);
                });
            },
            
            getById: function(id){
                return this.dataService.getById(this.activities, 'id', id);
            }
        };
    };
}(chalk));
