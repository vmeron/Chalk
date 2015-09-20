(function (ns) {
    'use strict';
    
    ns.views.IssueView = function () {
        var issueTemplate = $('#issueTableTemplate').html();
        var searchTemplate = $('#inputTemplate').html();
        var userColId = 3;
        
        var $issuePlaceholder = $('#issuePlaceholder');
        var $directSearchPlaceholder = $('#directSearchPlaceholder');
        
        return {
            system: undefined,
            rmIssueModel: undefined,
            rmUserModel: undefined,
            loaderService: undefined,
            templateService: undefined,
            notificationService: undefined,
            translateService: undefined,
            userView: undefined,
            configUtils: undefined,

            datatable: undefined,
            
            setup: function(){
                var self = this;
                
                $issuePlaceholder.on('click', 'tbody tr', function(ev){
                    ev.preventDefault();
                    var id = parseInt($(this).find('td:nth-child(1)').text());
                    var data = self.rmIssueModel.getById(id);

                    self.rmIssueModel.getById(id, function(result){
                        self.system.notify('Issue:selected', result);
                    });
                });
                
                $directSearchPlaceholder.on('click', 'button', function(ev){
                    ev.preventDefault();
                    
                    self.loaderService.load($directSearchPlaceholder, 'issue.loadingSearch');
                    
                    var val = $directSearchPlaceholder.find('input').val();
                    self.rmIssueModel.getById(val, function(result){
                        
                        if(!result.hasOwnProperty('id'))
                        {
                            self.notificationService.notifyError('issue.getByIdError');
                        }
                        else
                        {
                            self.system.notify('Issue:selected', result);
                        }
                        
                        self.initDirectSearch();
                    }, function(err){
                        self.notificationService.notifyError('issue.getByIdError');
                        self.initDirectSearch();
                    });
                });
                
                $directSearchPlaceholder.on('keypress', 'input', function(ev){
                    if(ev.keyCode === 13)
                    {
                        $directSearchPlaceholder.find('button').click();
                    }
                });
            },

            startRefresh: function(){
                this.loaderService.load($issuePlaceholder, 'issue.loading');
            },

            refresh: function(){
                var self = this;
                var list = this.rmIssueModel.issues;
                
                var html = this.templateService.parse(issueTemplate, {
                    label: 'issue.yourIssues',
                    issues: list
                });

                this.loaderService.unload($issuePlaceholder, html, function(){
                    var configId = self.rmUserModel.CONFIG_ID;

                    self.configUtils.read(configId, function(defaultFilter){
                        self.setupDataTable(self.datatable, defaultFilter);
                    });
                });
            },

            setupDataTable: function(datatable, defaultFilter){
                var self = this;

                datatable = $issuePlaceholder.find('table').DataTable({
                    autoWidth: true,
                    //dom: '<"toolbar">frtip',
                    columnDefs: [{
                        "targets": 3,
                        "visible": false,
                        "searchable": true
                    }]
                });

                /* Disabled user filter since it is allowed only for admin redmine user to get this list
                var $select = $(self.translateService.translateHtml('<select id="userSearch"><option value="" data-i18n="issue.filter.assignedTo"></option></select>'))
                    .appendTo('div.toolbar')
                    .on('change', function (){
                        datatable
                            .column(userColId)
                            .search($(this).val())
                            .draw();
                    });
         
                datatable
                    .column(userColId)
                    .cache('search')
                    .sort()
                    .unique()
                    .each(function (id){
                        if(id.length > 0)
                        {
                            var user = self.rmUserModel.getById(id);
                            if(null !== user)
                            {
                                var selected = '';
                                var label = user.name;
                                
                                if(user.id == defaultFilter)
                                {
                                    selected = 'selected="selected"';
                                }

                                var optionDom = '<option value="'+id+'" data-i18n="'+label+'" '+selected+'>'+label+'</option>';
                                var $option = $(self.translateService.translateHtml(optionDom));
                                $select.append($option);
                            }
                        }
                    });

                $select.change();
                */
            },
            
            reset: function(){
                this.loaderService.unload($issuePlaceholder, '');
            },
            
            logoutHandler: function(){
                this.loaderService.unload($directSearchPlaceholder, '');
            },
            
            initDirectSearch: function(){
                var html = this.templateService.parse(searchTemplate, {
                    buttonText: 'issue.search',
                    placeholder: 'issue.placeholder',
                    type: 'text',
                    wrapperClass: 'small-9'
                });
                
                this.loaderService.unload($directSearchPlaceholder, html);
            }
        };
    };
}(chalk));