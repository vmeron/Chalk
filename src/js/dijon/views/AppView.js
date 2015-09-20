(function (ns) {
    'use strict';

    ns.views.AppView = function () {
        var configTemplate = $('#inputTemplate').html();
        
        return {
            system: undefined, //inject
            appModel: undefined,
            configView: undefined,
            configUtils: undefined,
            
            setup: function(){
                var self = this;
                var fullConfigId = this.getFullConfigId();
                
                $('#config').on('change', '#'+fullConfigId+' input', function(){
                    self.configUtils.save(self.appModel.CONFIG_ID, $(this).val());
                });
            },
            
            init: function(){
                var self = this;
                var fullConfigId = this.getFullConfigId();
                
                this.configUtils.read(this.appModel.CONFIG_ID, function(result){
                    console.log('#'+fullConfigId+' input');
                    $('#'+fullConfigId+' input').val(result);
                });
            },
            
            configHandler: function(){
                this.configView.add({
                    id: this.appModel.CONFIG_ID,
                    templateHtml: configTemplate,
                    label: 'app.idleTime',
                    templateData: {
                        type: 'text',
                        placeholder: 'app.durationMinutes',
                        defaultValue: this.appModel.DEFAULT_IDLE_TIME,
                        wrapperClass: 'small-12 columns',
                        inputClass: 'expand',
                        rowClass: 'collapse'
                    },
                    callback: function(id, result){
                        
                    }
                });
            },
            
            getFullConfigId: function(){
                return this.configUtils.getDomId(this.appModel.CONFIG_ID);
            }
        };
    };
}(chalk));
