(function(ns) {
    'use strict';

    ns.controllers.IdleController = function() {
        return {
            system: undefined, //inject
            appModel: undefined, //inject
            idleService: undefined, //inject
            chronoRunning: false,

            interval: undefined,
            momentum: 1000,
            maxDuration: undefined,

            state: 'active',

            STATE_IDLE: 'idle',
            STATE_ACTIVE: 'active',

            init: function() {
                this.system.mapHandler('Auth:loginSuccess', 'idleController', 'loginHandler');
                this.system.mapHandler('Auth:logoutSuccess', 'idleController', 'stopInterval');
            },

            loginHandler: function() {
                this.startInterval();
            },

            startInterval: function() {
                var self = this;
                this.stopInterval();

                this.interval = setInterval(function() {
                    self.secondHandler();
                }, this.momentum);
            },

            secondHandler: function() {
                var self = this;

                this.appModel.getIdleTime(function(maxDurationMilli) {
                    self.maxDuration = maxDurationMilli * 1000 * 60;
                    var maxDuration = self.maxDuration;
                    var idleTime = self.idleService.getIdleTime();

                    if(typeof maxDuration == 'undefined') {
                        return;
                    }

                    if(self.state === self.STATE_ACTIVE && idleTime > maxDuration) {
                        self.state = self.STATE_IDLE;
                        console.log('NOTIFY IDLE');
                        self.system.notify('App:status:idle');
                    }
                    else if(self.state === self.STATE_IDLE && idleTime < maxDuration) {
                        self.state = self.STATE_ACTIVE;
                        console.log('NOTIFY ACTIVE');
                        self.system.notify('App:status:active');
                    }
                });
            },

            stopInterval: function() {
                clearInterval(this.interval);
            }
        };
    };
}(chalk));
