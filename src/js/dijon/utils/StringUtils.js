(function (ns){
    'use strict';

    ns.utils.StringUtils = function() {
        return {
            processUtils: undefined, //inject
            stringHelper: undefined,

            setup: function() {
                this.stringHelper = require(this.processUtils.appDir+'/js/process/helpers/string.js');
            },

            uniqueid: function() {
                return this.stringHelper.uid();
            }
        };
    };
}(chalk));
