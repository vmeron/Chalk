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
            appView: undefined,
            appModel: undefined,

            idleTimerId: 'idleTimer',

            init: function(){
                var self = this;
                $(document).foundation();

                this.appView.init();
                this.system.mapHandler('Auth:loginSuccess', 'appView', 'configHandler');

                this.timerService.loadTimer(this.idleTimerId);

                //Idle simulation
                $('#idle').click(function(){
                    self.stateUpdateHandler('idle');
                });

                $('#active').click(function(){
                    self.stateUpdateHandler('active');
                });

                //Set idle management
                /*
                chrome.idle.onStateChanged.addListener(function(state){
                    self.stateUpdateHandler(state);
                });
                */
               
                this.system.mapHandler('Timer:complete:'+this.idleTimerId, 'appController', 'timerCompleteHandler');
            },

            stateUpdateHandler: function(state){
                console.log('STATE CHANGE : '+state);
                var timer = this.getTimer();
                if(state === 'locked' || state === 'idle')
                {
                    this.appModel.getIdleTime(function(result){
                        console.log('STARTING TIMER');
                        console.log('timeout : '+(result*60*1000));
                        timer.start(result * 60 * 1000);
                    });
                }
                else
                {
                    timer.cancel();
                    this.system.notify('App:status:'+state);
                }
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
