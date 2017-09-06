(function(ns) {
    'use strict';

    ns.services.OpenService = function() {
        var _open = require('open');
        return {
            open: function(url, program) {
                _open(url, program);
            }
        };
    };
}(chalk));
