(function (ns) {
    'use strict';

    ns.services.AuthService = function () {
        return {
            system: undefined, //inject
            storageService: undefined, //inject
            notificationService: undefined,
            _: undefined, //inject

            gateway: undefined,
            apiKey: undefined,

            registerCredentials: function(gateway, apiKey){
                var self = this;
                gateway = gateway.toLowerCase();
                apiKey = apiKey.toLowerCase();

                if(gateway.substr(-1) === '/')
                {
                    gateway = gateway.substr(0, gateway.length - 1);
                }

                if(!gateway.length || !apiKey.length)
                {
                    this.notificationService.notifyError('auth.error.invalidCredentials');
                    return;
                }

                this.storageService.set('credentials', {
                    gateway: gateway,
                    apiKey: apiKey
                }, function(){
                    self.gateway = gateway;
                    self.apiKey = apiKey;

                    self.login();
                });
            },

            login: function () {
                var self = this;

                this.storageService.get('credentials', function(credentials){
                    if(self._.isEmpty(credentials))
                    {
                        self.system.notify('Auth:logout');
                        self.system.notify('Auth:loginRequired');
                    }
                    else
                    {
                        self.gateway = credentials.gateway;
                        self.apiKey = credentials.apiKey;
                        
                        self.system.notify('Auth:loginSuccess');
                    }
                });
            },

            logout: function () {
                this.gateway = '';
                this.apiKey = '';
                this.storageService.clear();
            }
        };
    };
}(chalk));
