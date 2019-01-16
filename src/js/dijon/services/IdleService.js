(function(ns){
    ns.services.IdleService = function() {
        'use strict';

        var systemIdleTime = require('@paulcbetts/system-idle-time');

        return {
            getIdleTime: function() {
                return systemIdleTime.getIdleTime();
            }
        };
    };
}(chalk));
