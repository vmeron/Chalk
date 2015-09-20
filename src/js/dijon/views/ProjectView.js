(function (ns) {
    'use strict';

    ns.views.ProjectView = function () {
        var projectsTemplate = $('#selectTemplate').html();
        var $projectsPlaceholder = $('#projectPlaceholder');
        
        return {
            system: undefined, //inject
            rmProjectModel: undefined, //inject
            loaderService: undefined,
            templateService: undefined,
            
            setup: function(){
                var self = this;
                $projectsPlaceholder.on('change', 'select', function(ev){
                    self.changeHandler(ev);
                });

                $projectsPlaceholder.on('click', '.refresh', function(ev){
                    ev.preventDefault();
                    self.system.notify('Project:refresh', false);
                });
            },
            
            changeHandler: function(ev){
                var project = this.rmProjectModel.getById($(ev.target).val());
                this.system.notify('Project:selected', project);
            },

            refresh: function(){
                this.loaderService.load($projectsPlaceholder, 'project.loading');
            },
            
            update: function(){
                var list = this.rmProjectModel.getProjects();
                var html = this.templateService.parse(projectsTemplate, {
                    label: 'project.yourProjects',
                    items: list,
                    refresh: true,
                    defaultOption: 'project.choose'
                });

                this.loaderService.unload($projectsPlaceholder, html, function(){
                    $projectsPlaceholder.find('select').select2();
                });
                /* @TODO : Autocomplete project name with jq autosuggest : 
                $projectsPlaceholder.find('#projects').magicSuggest({
                    data: list,
                    valueField: 'id',
                    displayField: 'name',
                    maxSelection: 1
                });
                */
            },
            
            reset: function(){
                this.loaderService.unload($projectsPlaceholder, '');
            }
        };
    };
}(chalk));
