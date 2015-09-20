(function (ns) {
    'use strict';
    
    ns.views.UserView = function () {
        var configTemplate = $('#selectTemplate').html();
        
        return {
            system:undefined,
            rmUserModel: undefined,
            configView: undefined,
            configUtils: undefined,
            
            setup: function(){
                var self = this;
                var fullConfigId = this.getFullConfigId();
                
                this.configUtils.read(this.rmUserModel.CONFIG_ID, function(result){
                    $('#config #'+fullConfigId+' select').val(result);
                });
                
                $('#config').on('change', '#'+fullConfigId+' select', function(){
                    self.configUtils.save(self.rmUserModel.CONFIG_ID, $(this).val());
                });
            },
            
            configHandler: function(){
                var self = this;

                self.configView.add({
                    id: self.rmUserModel.CONFIG_ID,
                    templateHtml: configTemplate,
                    label: 'issue.filter.yoursOnly',
                    templateData: {
                        defaultOption: 'app.choose',
                        items: [
                            {
                                id: 0,
                                name: 'app.no'
                            },
                            {
                                id: 1,
                                name: 'app.yes'
                            }
                        ]
                    },
                    callback: function(id, result){
                        $('#config #'+id+' select').val(result);
                    }
                });
            },
            
            getFullConfigId: function(){
                return this.configUtils.getDomId(this.rmUserModel.CONFIG_ID);
            }
        };
    };
}(chalk));