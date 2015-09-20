(function (ns) {
    'use strict';

    ns.services.ErrorService = function () {
        return {
            system: undefined, //inject
            translateService: undefined,

            throw: function(){
                throw this.translateService.t.apply(this.translateService, arguments);
            }
        };
    };
}(chalk));
