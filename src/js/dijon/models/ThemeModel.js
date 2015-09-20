(function (ns) {
    'use strict';

    ns.models.ThemeModel = function () {
        return {
            system: undefined, //inject
            restClient: undefined,
            dataService: undefined,

            themes: [
                {
                    id: 'default',
                    name: 'theme.themes.default'
                },
                {
                    id: 'blue',
                    name: 'theme.themes.blue'
                },
                {
                    id: 'slime',
                    name: 'theme.themes.slime'
                }
            ],
            
            CONFIG_ID: 'defaultTheme',

            getThemeUrl: function(theme){
                return 'css/chalk-'+theme+'.css';
            }
        };
    };
}(chalk));
