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
                this.system.mapHandler('App:status:active', 'appController', 'activeHandler');
            },

            activeHandler: function() {
                this.ipcService.send('App:status:active');
            },

            secondHandler: function() {
                console.log('TICKING : '+systemIdleTime.getIdleTime());

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
