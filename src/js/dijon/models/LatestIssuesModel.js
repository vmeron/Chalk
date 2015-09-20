(function (ns) {
    'use strict';

    ns.models.LatestIssuesModel = function () {
        return {
            system:undefined,
            storageService: undefined,
            rmIssueModel: undefined,
            
            latestIssues: undefined,
            latest: [],
            MAX_LATEST: 10,
            
            add: function(data){
                var self = this;
                if(data && data.hasOwnProperty('issue_id'))
                {
                    this.rmIssueModel.getById(data.issue_id, function(result){
                        if(result.id)
                        {
                            self.push(result);
                        }
                    });
                }
            },
            
            refresh: function(){
                var self = this;
                
                this.storageService.get('latestIssues', function(result){
                    if(typeof result === 'undefined' || !result.hasOwnProperty('latestIssues'))
                    {
                        result = [];
                    }
                    else
                    {
                        result = result.latestIssues;
                    }
                    
                    self.latestIssues = result;
                    
                    self.system.notify('LatestIssues:refresh:success');
                });
            },
            
            push: function(issue){
                var self = this;

                this.storageService.get('latestIssues', function(result){
                    if(typeof result === 'undefined' || !result.hasOwnProperty('latestIssues'))
                    {
                        result = [];
                    }
                    else
                    {
                        result = result.latestIssues;
                    }


                    result = self.removeDuplicates(issue, result);
                    
                    result.unshift(issue);

                    if(result.length > self.MAX_LATEST)
                    {
                        result.pop();
                    }
                    
                    self.storageService.set({latestIssues: result});
                    
                    self.latestIssues = result;
                    self.dump();
                    
                    self.system.notify('LatestIssues:add:success');
                });
            },

            removeDuplicates: function(issue, data){
                var final = [];

                for(var i = 0; i < data.length; i++)
                {
                    var item = data[i];
                    if(item.id != issue.id)
                    {
                        final.push(item);
                    }
                }

                return final;
            },

            reset: function(){
                this.latest = [];
                this.latestIssues = undefined;
            },
            
            dump: function(){
                for(var i = 0; i < this.latestIssues.length; i++)
                {
                    console.log(i+' : '+this.latestIssues[i].id);
                }
            }
        };
    };
}(chalk));