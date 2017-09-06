(function (ns) {
    'use strict';

    ns.services.TimerService = function () {
        return {
            system: undefined, //inject
            timers: {},

            loadTimer: function(id, duration, autoStart){
                var self = this;
                var timer = this.getTimerInstance();

                if(autoStart === true)
                {
                    timer.start(duration);
                }

                $(timer).bind(timer.TIMER_CANCEL, function(){
                    self.system.notify('Timer:cancel:'+id);
                });

                $(timer).bind(timer.TIMER_COMPLETE, function(){
                    console.log('TIMER COMPLETE');
                    self.system.notify('Timer:complete:'+id);
                });

                this.timers[id] = timer;
                return timer;
            },

            getTimerById: function(id){
                return this.timers[id];
            },

            getTimerInstance: function(){
                return new Timer();
            }
        };
    };
}(chalk));
