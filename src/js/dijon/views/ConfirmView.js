(function (ns) {
    'use strict';

    ns.views.ConfirmView = function () {
        var confirmTemplate = $('#confirmTemplate').html();

        return {
            system:undefined,
            templateService: undefined,

            confirm: function(id, message, callback){
                var html = this.templateService.parse(confirmTemplate, {
                    confirmId: id,
                    message: message
                });

                $('#confirm_'+id).on('click', '#yes', function(ev){
                    ev.preventDefault();
                    callback(true);
                });

                $('confirm_'+id).on('click', '#no', function(ev){
                    ev.preventDefault();
                    callback(false);
                });

                $(html).foundation('reveal', 'open');
            },

            close: function(id)
            {
                $(html).foundation('reveal', 'close');
            }
        };
    };
}(chalk));