(function (ns) {
    'use strict';

    ns.models.RmUserModel = function () {
        return {
            system: undefined, //inject
            dataService: undefined,
            restClient: undefined,
            
            users: [],
            currentUser: undefined,

            CONFIG_ID: 'defaultAssignedToFilter',

            getCurrent: function(){
                var self = this;

                this.restClient.call(this.restClient.methods.GET, 'users/current', null, function(result){
                    if(result && result.user && result.user.id > 0)
                    {
                        self.currentUser = result.user;
                    }

                    self.system.notify('User:refresh:success');
                });
            },

            refresh: function(useCache){
                var self = this;

                this.dataService.paginatedRefresh(useCache, 'users', 'User:refresh:success', function(result){
                    self.users = self.filterUsers(result);
                    self.users = self.dataService.sortString(self.users, 'lastname');
                });
            },

            filterUsers: function(users)
            {
                for(var i in users)
                {
                    users[i].name = users[i].firstname+' '+users[i].lastname;
                }

                return users;
            },

            getById: function(id){
                var user = this.dataService.getById(this.users, 'id', id);
                return user;
            }
        };
    };
}(chalk));
