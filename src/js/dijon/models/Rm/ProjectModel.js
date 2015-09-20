(function (ns) {
    'use strict';
    
    ns.models.RmProjectModel = function () {
        return {
            system:undefined,
            dataService: undefined,
            
            projects: [],

            TYPE: 'project',
            
            refresh: function(useCache){
                var self = this;

                this.dataService.paginatedRefresh(useCache, 'projects', 'Project:refresh:success', function(projects){
                    self.projects = self.dataService.sortString(projects, 'name');
                });
            },

            getProjects: function(callback){
                return this.projects;
            },
            
            getById: function(id){
                return this.dataService.getById(this.projects, 'id', id);
            },

            reset: function(){
                this.projects = [];
            }
        };
    };
}(chalk));