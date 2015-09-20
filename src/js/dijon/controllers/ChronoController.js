(function (ns) {
    'use strict';

    ns.controllers.ChronoController = function () {
        return {
            system: undefined,
            chronoView: undefined,
            chronoModel: undefined,
            rmIssueModel: undefined,
            rmProjectModel: undefined,
            
            init: function(){
                this.system.mapHandler('Auth:logout', 'chronoController', 'stop');
                
                this.system.mapHandler('Issue:selected', 'chronoController', 'startIssue', false, true);
                
                this.system.mapHandler('Chrono:play', 'chronoController', 'play', false, true);
                this.system.mapHandler('Chrono:pause', 'chronoController', 'pause', false, true);
                this.system.mapHandler('Chrono:stop', 'chronoController', 'stop');
                this.system.mapHandler('Chrono:error', 'chronoController', 'error');
                this.system.mapHandler('Chrono:activity:error', 'chronoView', 'activityError');
                this.system.mapHandler('Chrono:time', 'chronoView', 'update', false, true);
                
                this.system.mapHandler('App:status:idle', 'chronoController', 'idle');
                this.system.mapHandler('App:status:locked', 'chronoController', 'idle');
                this.system.mapHandler('App:status:active', 'chronoController', 'active');
            },

            play: function(ev, data){
                this.chronoModel.play(data);
            },
            
            pause: function(ev, postTime){
                this.chronoModel.pause(postTime);
            },

            error: function(){
                this.chronoModel.reset();
                this.chronoView.cancel();
            },

            /**
             * Params :
             * {
             *  id: int,
             * }
             **/
            startIssue: function(ev, issue){
                this.chronoView.start(issue, this.rmIssueModel.TYPE);
                this.chronoModel.start(issue, this.rmIssueModel.TYPE);
            },

            stop: function(){
                this.chronoView.stop();
                this.chronoModel.stop();
            },


            idle: function(){
                this.chronoView.idle();
                this.chronoModel.idle();
            },

            active: function(){
                this.chronoView.active();
                this.chronoModel.active();
            }
        };
    };
}(chalk));