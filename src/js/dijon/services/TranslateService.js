(function (ns) {
    'use strict';

    ns.services.TranslateService = function () {
        return {
            system: undefined, //inject
            configUtils: undefined,
            languageModel: undefined,

            initDom: function(){
                var self = this;
                
                this.configUtils.read(this.languageModel.CONFIG_ID, function(language){
                    i18n.init({
                        fallbackLng: 'en',
                        lng: language
                    },function(t){
                        $(document).i18n();
                        console.log('Translate:ready');
                        self.system.notify('Translate:ready');
                    });

                    Ashe.addModifiers({
                        t: function(str){
                            return i18n.t(str);
                        }
                    });
                });

            },

            translateHtml: function(html){
                var $el = $(html).i18n();
                return $('<div></div>').append($el).html();
            },

            t: function(){
                var result = i18n.t.apply(i18n, arguments);
                return result;
            }
        };
    };
}(chalk));
