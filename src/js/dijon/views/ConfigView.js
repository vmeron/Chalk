(function (ns) {
    'use strict';

    ns.views.ConfigView = function () {
        var $configPlaceholder = $('#config ul');
        var configLineTemplate = $('#configLineTemplate').html();

        return {
            system:undefined,
            configUtils: undefined,
            templateService: undefined,

            add: function(data){
                var content = this.templateService.parse(data.templateHtml, data.templateData);
                var configId = this.configUtils.getDomId(data.id);
                var html = this.templateService.parse(configLineTemplate, {
                    id: configId,
                    label: data.label,
                    content: content
                });

                $configPlaceholder.append(html);

                if(typeof data.callback !== 'undefined')
                {
                    console.log('Before configutils read');

                    this.configUtils.read(data.id, function(result){
                        console.log('Reading from configutils');
                        data.callback(configId, result);
                    });
                }
            },

            reset:function(){
                $configPlaceholder.html('');
            }
        };
    };
}(chalk));
