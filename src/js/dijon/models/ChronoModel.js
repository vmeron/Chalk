(function (ns) {
    'use strict';

    ns.models.ChronoModel = function () {
        return {
            system: undefined,
            appModel: undefined,
            rmIssueModel: undefined,
            rmProjectModel: undefined,
            restClient: undefined,
            notificationService: undefined,
            errorService: undefined,
            configUtils: undefined,
            
            time: undefined,
            interval: 1000,
            intervalRef: undefined,
            currentActivity: undefined,
            timeDestination: 'saveBuffer',
            
            saveBuffer: 0,
            idleBuffer: 0,
            currentTime: 0,
            
            type: undefined,
            data: undefined,

            status: 0,
            appStatus: 'active',
            sendStatus: undefined,

            STATUS_PLAY: 1,
            STATUS_PAUSE: 0,
            
            APP_STATUS_ACTIVE: 'active',
            APP_STATUS_IDLE: 'idle',

            MIN_TIME: 60,
            
            start: function(data, type){
                var self = this;
                
                if(this.status == this.STATUS_PLAY)
                {
                    this.errorService.throw("chrono.error.alreadyCounting");
                }
                
                this.reset();
                this.validateData(data, type);
                this.appStatus = this.APP_STATUS_ACTIVE;
                
                this.data = data;
                this.type = type;
                
                this.system.notify('Chrono:loaded');
            },

            play: function(activity){
                var self = this;

                if(!this.validateActivity(activity))
                {
                    this.system.notify('Chrono:error');
                    this.system.notify('Chrono:activity:error');
                    this.system.notify('App:alert:error', 'chrono.choose');
                    this.errorService.throw("chrono.error.choose");
                }
                
                this.currentActivity = activity;

                if(!this.intervalRef && activity.id > 0)
                {
                    this.status = this.STATUS_PLAY;
                    this.intervalRef = setInterval(function(){
                        self.update();
                    }, this.interval);
                }
            },

            pause: function(postTime){
                console.log('MODEL ON PAUSE');
                if(typeof postTime === 'undefined')
                {
                    postTime = true;
                }

                clearInterval(this.intervalRef);
                this.intervalRef = null;
                this.status = this.STATUS_PAUSE;
                
                //Save in background
                if(postTime)
                {
                    this.postTime();
                }
            },

            idle: function(){
                var self = this;
                
                if(this.status == this.STATUS_PLAY)
                {
                    this.appModel.getIdleTime(function(result){
                        //Remove idle time from buffer and inject it into idle buffer
                        self.saveBuffer = self.saveBuffer - result * 60;
                        
                        self.postTime('saveBuffer');
                        self.timeDestination = 'idleBuffer';
                        self.appStatus = self.APP_STATUS_IDLE;
                        
                        self.idleBuffer = self.idleBuffer + result * 60;
                    });
                }
            },

            active: function(){
                console.log('MODEL ON ACTIVE');
                if(this.status == this.STATUS_PLAY && this.timeDestination === 'idleBuffer')
                {
                    this.system.notify('Chrono:pause', false);
                    chrome.app.window.current().show();
                    this.timeDestination = 'saveBuffer';
                    this.appStatus = this.APP_STATUS_ACTIVE;
                }
            },

            stop: function(){
                this.status = this.STATUS_PAUSE;
                clearInterval(this.intervalRef);
                this.intervalRef = undefined;

                //Save in background;
                this.postTime('saveBuffer');

                this.system.notify('Chrono:unloaded');
            },

            update: function(){
                this.currentTime += this.interval/1000;
                var destination = this.timeDestination;
                this[destination] += this.interval/1000;

                this.system.notify('Chrono:time');
            },

            getIdleBuffer: function(){
                return this.idleBuffer;
            },

            reset: function(){
                this.status = this.STATUS_PAUSE;
                this.currentTime = 0;
                this.idleBuffer = 0;
                this.saveBuffer = 0;
                this.intervalRef = undefined;
            },

            validateData: function(data, type){
                if(!data || !data.id)
                {
                    this.errorService.throw("chrono.error.invalidId");
                }
                
                if(type != this.rmIssueModel.TYPE && type.rmProjectModel.TYPE)
                {
                    this.errorService.throw("chrono.error.forbiddenType");
                }
            },

            validateActivity: function(activity){
                var result = true;
                if(!activity || activity.id <= 0)
                {
                    result = false;
                }

                if(!result)
                {
                    this.system.notify('Chrono:error');
                }

                return result;
            },

            postTime: function(destination){
                if(typeof(destination) === 'undefined')
                {
                    destination = 'saveBuffer';
                }
                
                var self = this;
                this.validateActivity(this.currentActivity);
                this.system.notify('Chrono:save');

                if(this[destination] > this.MIN_TIME)
                {
                    var sendData = {
                        time_entry: {
                            hours: this.time.formatted(this[destination], false),
                            activity_id: this.currentActivity.id
                        }
                    };

                    switch(this.type)
                    {
                        case this.rmIssueModel.TYPE:
                            sendData.time_entry.issue_id = this.data.id;
                            break;
                        case this.rmProjectModel.TYPE:
                            sendData.time_entry.project_id = this.data.id;
                            break;
                        default:
                            this.errorService.throw("chrono.error.saveError", this.type);
                    }

                    this.restClient.call(this.restClient.methods.POST, 'time_entries', sendData, function(){
                        self[destination] = 0;
                        self.notificationService.notifySuccess(["chrono.saved", sendData.time_entry.hours+'min']);
                        self.system.notify('Chrono:save:success', sendData);
                    });
                }
            },
            
            emptyBuffer: function(id){
                this[id] = 0;
            }
        };
    };
}(chalk));