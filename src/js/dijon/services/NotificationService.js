(function (ns) {
    'use strict';

    ns.services.NotificationService = function () {
        return {
            system: undefined, //inject
            translateService: undefined,

            SUCCESS: 'ok',
            INFO: 'info',
            WARN: 'warn',
            ERROR: 'error',

            icons: {
                ok: 'fa-check',
                info: 'fa-info',
                warn: 'fa-warning',
                error: 'fa-times-circle'
            },

            notify: function(message, type, $element){
                if(message instanceof Array)
                {
                    message = this.translateService.t.apply(this.translateService, message);
                }
                else
                {
                    message = this.translateService.t(message);
                }

                if(typeof type === 'undefined')
                {
                    type = this.INFO;
                }

                $.amaran({
                    content:{
                        message: message,
                        icon: 'fa '+this.icons[type]
                    },
                    position: 'top right',
                    theme: 'default '+type,
                    closeOnClick: true,
                    sticky: false,
                    inEffect: 'slideTop',
                    delay: 5000,
                });
                
                if($element)
                {
                    $element.fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
                }
            },

            notifySuccess: function(message, $element){
                this.notify(message, this.SUCCESS);
            },

            notifyInfo: function(message, $element){
                this.notify(message, this.INFO);
            },

            notifyWarn: function(message, $element){
                this.notify(message, this.WARN);
            },

            notifyError: function(message, $element){
                this.notify(message, this.ERROR);
            }
        };
    };
}(chalk));