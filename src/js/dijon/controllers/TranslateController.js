(function (ns) {
    'use strict';

    ns.controllers.TranslateController = function () {
        return {
            system: undefined,
            translateService: undefined,

            init: function(){
                this.translateService.initDom();
            }
        };
    };
}(chalk));