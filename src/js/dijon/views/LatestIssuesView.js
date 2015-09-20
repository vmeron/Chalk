(function (ns) {
    'use strict';
    
    ns.views.LatestIssuesView = function () {
        var latestIssuesTemplates = $('#issueTableTemplate').html();
        var $latestIssuesPlaceholder = $('#latestPlaceholder');
        
        return {
            system: undefined, //inject
            latestIssuesModel: undefined,
            loaderService: undefined,
            rmIssueModel: undefined,
            templateService: undefined,
            translateService: undefined,

            datatable: undefined,

            setup: function(){
                var self = this;
                
                $latestIssuesPlaceholder.on('click', 'tbody tr', function(ev){
                    ev.preventDefault();

                    var id = parseInt($(this).find('td:nth-child(1)').text());
                    var data = self.rmIssueModel.getById(id);

                    self.rmIssueModel.getById(id, function(result){
                        self.system.notify('Issue:selected', result);
                    });
                });
            },
            
            redraw: function(){
                var self = this;
                var issues = this.latestIssuesModel.latestIssues;
                issues = this.formatIssues(issues);

                if(issues && issues.length > 0)
                {
                    var html = this.templateService.parse(latestIssuesTemplates, {
                        label: this.translateService.t('issue.latestIssues', this.latestIssuesModel.MAX_LATEST),
                        issues: issues
                    });

                    this.loaderService.unload($latestIssuesPlaceholder, html, function(){
                        self.datatable = $latestIssuesPlaceholder.find('table').DataTable({
                            "paging": false,
                            "ordering":  false,
                            "searching": false,
                            "bInfo": false,
                            columnDefs: [{
                                "targets": 3,
                                "visible": false,
                                "searchable": true
                            }]
                        });
                    });
                }
                else
                {
                    this.loaderService.unload($latestIssuesPlaceholder, '');
                }
            },

            reset: function(){
                this.datatable = undefined;
                this.loaderService.unload($latestIssuesPlaceholder, '');
            },

            formatIssues: function(issues)
            {
                for(var i in issues)
                {
                    issues[i].subject = '<span>'+issues[i].project.name+'</span><br />'+issues[i].subject;
                }

                return issues;
            }
        };
    };
}(chalk));
