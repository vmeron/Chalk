(function (ns) {
    'use strict';

    ns.controllers.AppController = function () {
        return {
            system: undefined,
            rmIssueModel: undefined,
            cacheService: undefined,
            latestIssuesModel: undefined,
            notificationService: undefined,
            timerService: undefined,
            ipcService: undefined,
            appView: undefined,
            appModel: undefined,

            idleTimerId: 'idleTimer',

            init: function(){
                var self = this;
                $(document).foundation();

                this.appView.init();

                this.system.mapHandler('Auth:loginSuccess', 'appView', 'configHandler');
                //this.system.mapHandler('App:status:active', 'appController', 'idleHandler');

                this.system.mapHandler('Chrono:idle', 'appController', 'idleHandler');
            },

            idleHandler: function() {
                this.ipcService.send('App:status:active');
            },

            timerCompleteHandler: function(){
                this.system.notify('App:status:idle');
            },

            getTimer: function(){
                return this.timerService.getTimerById(this.idleTimerId);
            }
        };
    };
}(chalk));
