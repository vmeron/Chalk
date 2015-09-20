(function (ns) {
    'use strict';
    
    ns.views.ActivityView = function () {
        var configTemplate = $('#selectTemplate').html();
        
        return {
            system:undefined,
            configView: undefined,
            rmActivityModel: undefined,
            configUtils: undefined,
            
            setup: function(){
                var self = this;
                var fullConfigId = this.getFullConfigId();
                
                this.configUtils.read(this.rmActivityModel.CONFIG_ID, function(result){
                    $('#config #'+fullConfigId+' select').val(result);
                });
                
                $('#config').on('change', '#'+fullConfigId+' select', function(){
                    self.configUtils.save(self.rmActivityModel.CONFIG_ID, $(this).val());
                });
            },
            
            configHandler: function(){
                var self = this;
                this.rmActivityModel.getActivities(function(result){
                    self.configView.add({
                        id: self.rmActivityModel.CONFIG_ID,
                        templateHtml: configTemplate,
                        label: 'activity.default',
                        templateData: {
                            defaultOption: 'activity.choose',
                            items: result
                        },
                        callback: function(id, result){
                            $('#config #'+id+' select').val(result);
                        }
                    });
                });
            },
            
            getFullConfigId: function(){
                return this.configUtils.getDomId(this.rmActivityModel.CONFIG_ID);
            }
        };
    };
}(chalk));