(function (ns) {
    'use strict';

    ns.views.ChronoView = function () {
        var $chrono = $('#chrono');
        var $activityPlaceholder = $('#chrono #activityPlaceholder');
        var activityTemplate = $('#selectTemplate').html();

        var $idleStatus = $('#idleStatus');
        var $activeStatus = $('#activeStatus');

        return {
            system:undefined,
            chronoModel: undefined,
            rmActivityModel: undefined,
            rmIssueModel: undefined,
            rmProjectModel: undefined,
            time: undefined,
            configUtils: undefined,
            templateService: undefined,
            authService: undefined,

            status: undefined,

            STATUS_PLAY: 'play',
            STATUS_PAUSE: 'pause',

            setup: function(){
                var self = this;
                this.status = this.STATUS_PAUSE;

                $chrono.on('click', '.control a', function(){
                    self.toggle();
                });

                $idleStatus.click(function(ev){
                    ev.preventDefault();
                    self.system.notify('App:status:idle');
                });

                $activeStatus.click(function(ev){
                    ev.preventDefault();
                    self.system.notify('App:status:active');
                });

                $chrono.on('click', '.close-reveal-modal', function(){
                    self.system.notify('Chrono:stop');
                });

                $chrono.on('click', '#yes', function(ev){
                    ev.preventDefault();
                    self.hideMessage();
                    self.chronoModel.postTime('idleBuffer');
                });

                $chrono.on('click', '#no', function(ev){
                    ev.preventDefault();
                    self.hideMessage();
                    self.chronoModel.emptyBuffer('idleBuffer');
                });

                $(document).on('closed.fndtn.reveal', '#chrono', function(){
                    $chrono.find('#footerPlaceholder').html('');
                    $activityPlaceholder.html('');
                });
            },

            /**
             * Init chrono
             *
             * @param {
             *  type: string('issue', 'project'),
             *  data: {}
             * } data
             */
            start: function(data, type){
                this.chronoModel.validateData(data, type);
                var projectName = data.project.name;
                var title = '';
                var author = '';
                var description = data.description;

                switch(type)
                {
                    case this.rmProjectModel.TYPE:
                        title = data.name;
                        break;

                    case this.rmIssueModel.TYPE:
                        title = '<a target="_blank" href="'+this.authService.gateway+'/issues/'+data.id+'">#'+data.id+'</a> '+data.subject+' ['+data.priority.name+']';
                        author = data.author.name;
                        break;
                }

                $chrono.find('.project').text(projectName);
                $chrono.find('.title').html(title);
                $chrono.find('.description').text(description);
                $chrono.find('.author').text(author);
                this.updateActivity();

                this.show();
            },

            toggle: function(){
                if(this.status == this.STATUS_PLAY)
                {
                    this.pause();
                }
                else
                {
                    this.play();
                }
            },

            play: function(){
                this.changeStatus(this.STATUS_PLAY);
            },

            pause: function(){
                this.changeStatus(this.STATUS_PAUSE);
            },

            reset: function(){
                this.cancel();

                $chrono.find('.title').text('');
                $chrono.find('.description').text('');
                $chrono.find('.author').text('');
                $chrono.find('.timer').text('00:00:00');
            },

            cancel: function(){
                console.log('ON CHRONO CANCEL');
                this.status = this.STATUS_PAUSE;
                this.updateButton(this.status);
                this.updateActivity();
            },

            activityError: function(){
                var delay = 200;
                $activityPlaceholder.stop().fadeIn(delay).fadeOut(delay).fadeIn(delay).fadeOut(delay).fadeIn(delay).fadeOut(delay).fadeIn(delay);
            },

            /**
             * De-init chrono
             */
            stop: function(){
                this.hide();
                this.reset();
            },

            changeStatus: function(newStatus, notify){
                console.log('STATUS CHANGE');

                if(typeof notify === 'undefined')
                {
                    notify = true;
                }
                var activity = this.getCurrentActivity();
                var disableActivity = newStatus == this.STATUS_PLAY;

                $activityPlaceholder.find('select').prop('disabled', disableActivity);

                var notifyEvent = newStatus == this.STATUS_PLAY ? 'Chrono:play' : 'Chrono:pause';

                this.updateButton(newStatus);

                this.status = newStatus;
                if(notify)
                {
                    this.system.notify(notifyEvent, activity);
                }
            },

            updateButton: function(status){
                var removeClass = status == this.STATUS_PLAY ? this.STATUS_PAUSE : this.STATUS_PLAY ;
                var newText = status == this.STATUS_PLAY ? '<i class="fa fa-pause"></i>' : '<i class="fa fa-play"></i>' ;

                $chrono.find('.control').addClass(status)
                    .removeClass(removeClass)
                    .find('a').html(newText);
            },

            update: function(){
                $chrono.find('.timer').text(this.time.formatted(this.chronoModel.currentTime));

                if(this.chronoModel.timeDestination == 'idleBuffer')
                {
                    $chrono.find('#savedTime').text(this.time.formatted(this.chronoModel.idleBuffer));
                }
            },

            updateActivity: function(){
                var self = this;
                this.rmActivityModel.getActivities(function(result){
                    self.configUtils.read(self.rmActivityModel.CONFIG_ID, function(defaultValue){
                        var html = self.templateService.parse(activityTemplate, {
                            items: result,
                            defaultOption: 'chrono.choose',
                            defaultValue: defaultValue
                        });

                        $activityPlaceholder.html(html);

                        if(defaultValue && defaultValue > 0)
                        {
                            $activityPlaceholder.find('select').val(defaultValue);
                        }
                    });
                });
            },

            getCurrentActivity: function(){
                var activityId = $activityPlaceholder.find('select').val();

                return this.rmActivityModel.getById(activityId);
            },


            /**
             * On app status change
             */
            idle: function(){
                if(this.chronoModel.status == this.chronoModel.STATUS_PLAY)
                {
                    $chrono.find('.alert-box').slideDown();
                    $chrono.find('.control a').prop('disabled', true);
                }
            },

            active: function(){
                if(this.chronoModel.status == this.chronoModel.STATUS_PLAY && this.chronoModel.timeDestination === 'idleBuffer')
                {
                    this.changeStatus(this.STATUS_PAUSE, false);
                }
            },

            /**
             * Display / hide chrono
             */
            show: function(){
                $chrono.foundation('reveal', 'open', {
                    animation: 'fadeAndPop',
                    close_on_esc: false
                });
                this.system.notify('Chrono:display:show');
            },

            hide: function(){
                $chrono.foundation('reveal', 'close');
                this.system.notify('Chrono:display:hide');
            },

            hideMessage: function(){
                $chrono.find('.alert-box').slideUp();
                $chrono.find('.control a').prop('disabled', false);
            },

            getChronoDom: function()
            {
                return $chrono;
            }
        };
    };
}(chalk));
