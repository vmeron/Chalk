(function (ns) {
    'use strict';

    ns.views.StatusView = function () {
        var divTemplate = $('#divTemplate').html();
        var statusTemplate = $('#selectTemplate').html();

        return {
            system: undefined, //inject
            chronoView: undefined,
            chronoModel: undefined,
            rmStatusModel: undefined,
            loaderService: undefined,
            notificationService: undefined,
            templateService: undefined,

            ID_CHRONO_STATUS: 'chronoStatus',

            setup: function(){
                var self = this;
                var $chrono = this.chronoView.getChronoDom();

                $chrono.on('change', '#'+this.ID_CHRONO_STATUS+' select', function(ev){
                    ev.preventDefault();
                    var val = $(this).val();

                    self.rmStatusModel.send(self.chronoModel.data.id, val);
                });
            },

            hideFromChrono: function(){
                this.chronoView.getChronoDom().find('#'+this.ID_CHRONO_STATUS).remove();
            },

            displayInChrono: function(){
                var $element = this.chronoView.getChronoDom().find('#footerPlaceholder');
                this.displayInElement($element);
            },

            displayInElement: function($element){
                var html = this.getTemplateHtml(this.ID_CHRONO_STATUS);
                $element.append(html);
                $element.find('#'+this.ID_CHRONO_STATUS+' select').val(this.chronoModel.data.status.id);
            },

            getTemplateHtml: function(id){
                var html = this.templateService.parse(divTemplate, {
                    id: id,
                    content: this.templateService.parse(statusTemplate, {
                        defaultOption: 'status.choose',
                        items: this.rmStatusModel.statuses
                    })
                });

                return html;
            }
        };
    };

}(chalk));
