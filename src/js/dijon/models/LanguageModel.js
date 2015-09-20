(function (ns) {
    'use strict';

    ns.models.LanguageModel = function () {
        return {
            system: undefined, //inject
            
            languages: [
                {
                    id: 'fr',
                    name: 'language.locale.french'
                },
                {
                    id: 'en',
                    name: 'language.locale.english'
                }
            ],
            CONFIG_ID: 'defaultLanguage',
        };
    };
}(chalk));
