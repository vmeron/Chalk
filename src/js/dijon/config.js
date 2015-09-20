var chalk = {};

(function (ns) {
    'use strict';

    ns.views = {};
    ns.models = {};
    ns.controllers = {};
    ns.services = {};
    ns.utils = {};
    ns.Config = function () {
        return {
            system: undefined, //inject

            setup: function () {
                this.system.autoMapOutlets = true;
                
                //Controllers
                this.system.mapSingleton('appController', ns.controllers.AppController);
                this.system.mapSingleton('themeController', ns.controllers.ThemeController);
                this.system.mapSingleton('projectController', ns.controllers.ProjectController);
                this.system.mapSingleton('issueController', ns.controllers.IssueController);
                this.system.mapSingleton('chronoController', ns.controllers.ChronoController);
                this.system.mapSingleton('notificationController', ns.controllers.NotificationController);
                this.system.mapSingleton('latestIssuesController', ns.controllers.LatestIssuesController);
                this.system.mapSingleton('configController', ns.controllers.ConfigController);
                this.system.mapSingleton('activityController', ns.controllers.ActivityController);
                this.system.mapSingleton('commentController', ns.controllers.CommentController);
                this.system.mapSingleton('trackerController', ns.controllers.TrackerController);
                this.system.mapSingleton('statusController', ns.controllers.StatusController);
                this.system.mapSingleton('translateController', ns.controllers.TranslateController);
                this.system.mapSingleton('languageController', ns.controllers.LanguageController);
                this.system.mapSingleton('userController', ns.controllers.UserController);
                
                //Services
                this.system.mapSingleton('loaderService', ns.services.LoaderService);
                this.system.mapSingleton('cacheService', ns.services.CacheService);
                this.system.mapSingleton('storageService', ns.services.StorageService);
                this.system.mapSingleton('authService', ns.services.AuthService);
                this.system.mapSingleton('dataService', ns.services.DataService);
                this.system.mapSingleton('notificationService', ns.services.NotificationService);
                this.system.mapSingleton('translateService', ns.services.TranslateService);
                this.system.mapSingleton('templateService', ns.services.TemplateService);
                this.system.mapSingleton('errorService', ns.services.ErrorService);
                this.system.mapSingleton('timerService', ns.services.TimerService);
                
                //Models
                this.system.mapSingleton('rmProjectModel', ns.models.RmProjectModel);
                this.system.mapSingleton('themeModel', ns.models.ThemeModel);
                this.system.mapSingleton('rmIssueModel', ns.models.RmIssueModel);
                this.system.mapSingleton('rmActivityModel', ns.models.RmActivityModel);
                this.system.mapSingleton('rmTrackerModel', ns.models.RmTrackerModel);
                this.system.mapSingleton('rmCommentModel', ns.models.RmCommentModel);
                this.system.mapSingleton('rmStatusModel', ns.models.RmStatusModel);
                this.system.mapSingleton('rmUserModel', ns.models.RmUserModel);
                this.system.mapSingleton('chronoModel', ns.models.ChronoModel);
                this.system.mapSingleton('latestIssuesModel', ns.models.LatestIssuesModel);
                this.system.mapSingleton('languageModel', ns.models.LanguageModel);
                this.system.mapSingleton('appModel', ns.models.AppModel);
 
                //Views
                this.system.mapSingleton('loginFormView', ns.views.LoginFormView);
                this.system.mapSingleton('projectView', ns.views.ProjectView);
                this.system.mapSingleton('themeView', ns.views.ThemeView);
                this.system.mapSingleton('issueView', ns.views.IssueView);
                this.system.mapSingleton('userView', ns.views.UserView);
                this.system.mapSingleton('chronoView', ns.views.ChronoView);
                this.system.mapSingleton('latestIssuesView', ns.views.LatestIssuesView);
                this.system.mapSingleton('configView', ns.views.ConfigView);
                this.system.mapSingleton('activityView', ns.views.ActivityView);
                this.system.mapSingleton('commentView', ns.views.CommentView);
                this.system.mapSingleton('trackerView', ns.views.TrackerView);
                this.system.mapSingleton('statusView', ns.views.StatusView);
                this.system.mapSingleton('languageView', ns.views.LanguageView);
                this.system.mapSingleton('appView', ns.views.AppView);

                //Utils
                this.system.mapSingleton('restClient', ns.utils.RestClient);
                this.system.mapSingleton('loader', ns.utils.Loader);
                this.system.mapSingleton('time', ns.utils.Time);
                this.system.mapSingleton('configUtils', ns.utils.ConfigUtils);

                //Handlers
                this.system.mapHandler('App:startupComplete', 'translateController', 'init');
                
                this.system.mapHandler('Translate:ready', 'authService', 'login');
                this.system.mapHandler('Translate:ready', 'configController', 'init');
                this.system.mapHandler('Translate:ready', 'notificationController', 'init');
                this.system.mapHandler('Translate:ready', 'projectController', 'init');
                this.system.mapHandler('Translate:ready', 'issueController', 'init');
                this.system.mapHandler('Translate:ready', 'chronoController', 'init');
                this.system.mapHandler('Translate:ready', 'latestIssuesController', 'init');
                this.system.mapHandler('Translate:ready', 'activityController', 'init');
                this.system.mapHandler('Translate:ready', 'statusController', 'init');
                this.system.mapHandler('Translate:ready', 'trackerController', 'init');
                this.system.mapHandler('Translate:ready', 'commentController', 'init');
                this.system.mapHandler('Translate:ready', 'languageController', 'init');
                this.system.mapHandler('Translate:ready', 'themeController', 'init');
                this.system.mapHandler('Translate:ready', 'userController', 'init');
                this.system.mapHandler('Translate:ready', 'appController', 'init');
                
                this.system.mapHandler('Auth:loginRequired', 'loginFormView', 'showLoginForm');
                this.system.mapHandler('Auth:loginSuccess', 'loginFormView', 'hideLoginForm');
                this.system.mapHandler('Auth:loginSuccess', 'rmActivityModel', 'refresh');
                this.system.mapHandler('Auth:logout', 'authService', 'logout');
            }
        };
    };
}(chalk));
