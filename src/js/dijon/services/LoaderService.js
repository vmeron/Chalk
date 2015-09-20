(function (ns) {
    'use strict';
    
    ns.services.LoaderService = function () {
        var loaderTemplate = $('#loaderTemplate').html();

        return {
            system: undefined,
            templateService: undefined,

            load: function($placeholder, message){
                var html = this.getHtml({
                    message: message
                });

                $placeholder.one('transitionend', function(){
                    $(this).html(html)
                        .removeClass('fadeOut')
                        .addClass('fadeIn');
                });

                $placeholder.addClass('fadeOut');
            },

            unload: function($placeholder, html, callback){
                $placeholder.one('transitionend', function(){
                    $(this).html(html)
                        .removeClass('fadeOut')
                        .addClass('fadeIn');
                    
                    if(callback)
                    {
                        callback();
                    }
                });

                $placeholder.addClass('fadeOut');
            },

            getHtml: function(data)
            {
                return this.templateService.parse(loaderTemplate, data);
            }
        };
    };
}(chalk));