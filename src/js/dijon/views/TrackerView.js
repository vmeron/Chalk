(function (ns) {
    'use strict';

    ns.views.TrackerView = function () {
        var divTemplate = $('#divTemplate').html();
        var trackerTemplate = $('#selectTemplate').html();
        
        return {
            system: undefined, //inject
            chronoView: undefined,
            chronoModel: undefined,
            rmTrackerModel: undefined,
            loaderService: undefined,
            notificationService: undefined,
            templateService: undefined,
            translateService: undefined,
            
            ID_CHRONO_TRACKER: 'chronoTracker',
            
            setup: function(){
                var self = this;
                var $chrono = this.chronoView.getChronoDom();
                
                $chrono.on('change', '#'+this.ID_CHRONO_TRACKER+' select', function(ev){
                    ev.preventDefault();
                    var val = $(this).val();
                    
                    self.rmTrackerModel.send(self.chronoModel.data.id, val);
                });
            },
            
            hideFromChrono: function(){
                this.chronoView.getChronoDom().find('#'+this.ID_CHRONO_TRACKER).remove();
            },
            
            displayInChrono: function(){
                var $element = this.chronoView.getChronoDom().find('#footerPlaceholder');
                this.displayInElement($element);
            },
            
            displayInElement: function($element){
                var html = this.getTemplateHtml(this.ID_CHRONO_TRACKER);
                $element.append(html);
                $element.find('#'+this.ID_CHRONO_TRACKER+' select').val(this.chronoModel.data.tracker.id);
            },
            
            getTemplateHtml: function(id){
                var html = this.templateService.parse(divTemplate, {
                    id: id,
                    content: this.templateService.parse(trackerTemplate, {
                        defaultOption: 'tracker.chooseATracker',
                        items: this.rmTrackerModel.trackers
                    })
                });

                return html;
            }
        };
    };

}(chalk));
