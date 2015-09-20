(function (ns) {
    'use strict';

    ns.views.ThemeView = function () {
        var configTemplate = $('#selectTemplate').html();

        return {
            system:undefined,
            configView: undefined,
            themeModel: undefined,
            configUtils: undefined,

            setup: function(){
                var self = this;
                var fullConfigId = this.getFullConfigId();

                this.configUtils.read(this.themeModel.CONFIG_ID, function(result){
                    $('#config #'+fullConfigId+' select').val(result);
                });

                $('#config').on('change', '#'+fullConfigId+' select', function(){
                    self.configUtils.save(self.themeModel.CONFIG_ID, $(this).val());
                    self.switch($(this).val());
                });
            },

            init: function(){
                var self = this;
                
                this.configUtils.read(this.themeModel.CONFIG_ID, function(result){
                    self.switch(result);
                });
            },

            configHandler: function(){
                var themes = this.themeModel.themes;

                this.configView.add({
                    id: this.themeModel.CONFIG_ID,
                    templateHtml: configTemplate,
                    label: 'theme.default',
                    templateData: {
                        defaultOption: 'theme.choose',
                        items: themes
                    },
                    callback: function(id, result){
                        $('#config #'+id+' select').val(result);
                    }
                });
            },

            getFullConfigId: function(){
                return this.configUtils.getDomId(this.themeModel.CONFIG_ID);
            },

            switch: function(newTheme){
                if(newTheme && newTheme.length > 0)
                {
                    var href = this.themeModel.getThemeUrl(newTheme);
                    $('#theme').attr('href', href);
                }
            }
        };
    };
}(chalk));