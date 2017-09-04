(function(ns) {
    'use strict';

    ns.utils.ProcessUtils = function() {
        return {
            appDir: undefined,

            setup: function() {
                var path = require('path');
                this.appDir = path.dirname(require.main.filename);
            }
        };
    };
}(chalk));
