(function (ns) {
    'use strict';

    ns.controllers.ThemeController = function () {
        return {
            system: undefined,
            themeView:undefined,

            init: function(){
                this.themeView.init();
                this.system.mapHandler('Auth:loginSuccess', 'themeView', 'configHandler');
            }
        };
    };
}(chalk));