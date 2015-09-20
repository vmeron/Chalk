(function (ns) {
    'use strict';

    ns.controllers.NotificationController = function () {
        return {
            system: undefined, //inject
            notificationService: undefined,

            init: function(){
                this.system.mapHandler('App:alert:success', 'notificationController', 'notifySuccess', false, true);
                this.system.mapHandler('App:alert:info', 'notificationController', 'notifyInfo', false, true);
                this.system.mapHandler('App:alert:warn', 'notificationController', 'notifyWarn', false, true);
                this.system.mapHandler('App:alert:error', 'notificationController', 'notifyError', false, true);
            },

            notifySuccess: function(ev, err, $element){
                this.notificationService.notifySuccess(err);
            },

            notifyInfo: function(ev, err, $element){
                this.notificationService.notifyInfo(err);
            },

            notifyWarn: function(ev, err, $element){
                this.notificationService.notifyWarn(err);
            },

            notifyError: function(ev, err, $element){
                this.notificationService.notifyError(err);
            }
        };
    };
}(chalk));