(function (ns) {
    'use strict';

    ns.controllers.UserController = function () {
        return {
            system: undefined,
            rmUserModel: undefined,

            init: function(){
                this.system.mapHandler('Auth:loginSuccess', 'userController', 'getCurrent');
                this.system.mapHandler('Config:init', 'userView', 'configHandler');
            },

            getCurrent: function(){
                this.rmUserModel.getCurrent();
            }
        };
    };
}(chalk));