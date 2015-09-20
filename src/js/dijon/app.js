$(document).ready(function(){
    (function( ns ) {
        'use strict';

        ns.App = function () {
            var system;
            return {
                startup: function() {
                    system = new dijon.System();

                    system.mapValue( 'system', system);
                    system.mapOutlet('system');

                    system.injectInto( new ns.Config());

                    system.notify('App:startup');
                    system.notify('App:startupComplete');
                }
            };
        };
    }( chalk ));
    
    chalk.app = new chalk.App();
    chalk.app.startup();
});