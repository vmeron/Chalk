(function (ns) {
    'use strict';

    ns.views.LoginFormView = function () {
        var $loginForm = $('#loginForm');
        var $disconnect = $('#disconnect');

        return {
            system: undefined, //inject
            authService: undefined, //inject
            gateway: undefined,
            apiKey: undefined,

            setup: function () {
                var self = this;
                //Setting form default values
                //$loginForm.find('#apiGateway').val(this.gateway);
                //$loginForm.find('#apiKey').val(this.apiKey);
                
                $loginForm.submit(function(ev){
                    ev.preventDefault();
                    self.loginSubmitHandler();
                });
                
                $disconnect.click(function(ev){
                    ev.preventDefault();
                    self.system.notify('Auth:logout');
                    self.system.notify('Auth:loginRequired');
                });
            },

            showLoginForm: function(){
                $loginForm.foundation('reveal', 'open', {
                    close_on_esc: false
                });
                $loginForm.find('#apiGateway').val('');
                $loginForm.find('#apiKey').val('');
            },
            
            hideLoginForm: function(){
                $loginForm.foundation('reveal', 'close');
            },

            loginSubmitHandler: function(){
                var gateway = $loginForm.find('#apiGateway').val();
                var apiKey = $loginForm.find('#apiKey').val();
                
                //Store data
                this.authService.registerCredentials(gateway, apiKey);
            }
        };
    };
}(chalk));
