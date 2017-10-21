(function (ns) {
    'use strict';

    ns.models.AppModel = function () {
        return {
            system:undefined,
            configUtils: undefined,
            CONFIG_ID: 'defaultIdleDuration',
            DEFAULT_IDLE_TIME: 1,

            getIdleTime: function(callback){
                var self = this;

                this.configUtils.read(this.CONFIG_ID, function(result){
                    if(isNaN(result))
                    {
                        result = self.DEFAULT_IDLE_TIME;
                    }

                    callback(result);
                });
            }
        };
    };
}(chalk));
