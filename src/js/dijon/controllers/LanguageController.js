(function (ns) {
    'use strict';

    ns.controllers.LanguageController = function () {
        return {
            system: undefined,

            init: function(){
                this.system.mapHandler('Config:init', 'languageView', 'configHandler');
            }
        };
    };
}(chalk));
