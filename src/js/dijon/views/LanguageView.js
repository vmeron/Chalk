(function (ns) {
    'use strict';

    ns.views.LanguageView = function () {
        var configTemplate = $('#selectTemplate').html();

        return {
            system:undefined,
            configView: undefined,
            languageModel: undefined,
            configUtils: undefined,
            notificationService: undefined,
            
            setup: function(){
                var self = this;
                var fullConfigId = this.getFullConfigId();

                this.configUtils.read(this.languageModel.CONFIG_ID, function(result){
                    $('#config #'+fullConfigId+' select').val(result);
                });

                $('#config').on('change', '#'+fullConfigId+' select', function(){
                    self.configUtils.save(self.languageModel.CONFIG_ID, $(this).val());
                    self.notificationService.notifyInfo('language.restart');
                });
            },

            configHandler: function(){
                this.configView.add({
                    id: this.languageModel.CONFIG_ID,
                    templateHtml: configTemplate,
                    label: 'language.default',
                    templateData: {
                        defaultOption: 'language.choose',
                        items: this.languageModel.languages
                    },
                    callback: function(id, result){
                        $('#config #'+id+' select').val(result);
                    }
                });
            },

            getFullConfigId: function(){
                return this.configUtils.getDomId(this.languageModel.CONFIG_ID);
            }
        };
    };
}(chalk));