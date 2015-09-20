(function (ns) {
    'use strict';

    ns.services.TemplateService = function () {
        return {
            system: undefined, //inject
            translateService:undefined,

            parse: function(template, data){
                var result = Ashe.parse(template, data);
                result = this.translateService.translateHtml(result);
                this.system.notify('Template:parse', result);
                return result;
            }
        };
    };
}(chalk));
