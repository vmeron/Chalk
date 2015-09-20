(function (ns) {
    'use strict';

    ns.utils.RestClient = function(){
        return {
            system: undefined,
            apiKey: undefined,
            gateway: undefined,
            authService: undefined,

            methods: {
                GET: 'GET',
                POST: 'POST',
                PUT: 'PUT',
                DELETE: 'DELETE'
            },
            gatewaySuffix: '/',
            dataType: 'json',
            
            call: function (method, service, params, callback, callbackError)
            {
                var gateway = this.authService.gateway;
                var apiKey = this.authService.apiKey;

                var url = gateway+this.gatewaySuffix+service+'.'+this.dataType;
                var self = this;
                
                try {
                    this.system.notify('Rest:start');
                    //@TODO: Add caching
                    $.ajax({
                        method: method,
                        url:url,
                        data: params,
                        dataType: this.dataType,
                        
                        success: function(result){
                            self.system.notify('Rest:success');
                            callback(result);
                        },
                        
                        error: function(err){
                            //self.system.notify('App:alert:error', 'Connexion impossible');
                            self.system.notify('Rest:error');
                            if(typeof callbackError !== 'undefined')
                            {
                                callbackError(err);
                            }
                        },
                        
                        beforeSend: function(xhr){
                            xhr.setRequestHeader ("X-Redmine-API-Key", apiKey);
                        }
                    });
                }catch(err)
                {
                    this.system.notify('App:alert:error', 'Connexion impossible');
                    console.log(err);
                }
            }
        };
    };
}(chalk));