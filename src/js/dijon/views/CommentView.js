(function (ns) {
    'use strict';

    ns.views.CommentView = function () {
        var divTemplate = $('#divTemplate').html();
        var commentTemplate = $('#textareaTemplate').html();
        
        return {
            system: undefined, //inject
            chronoView: undefined,
            chronoModel: undefined,
            rmCommentModel: undefined,
            loaderService: undefined,
            notificationService: undefined,
            templateService: undefined,
            
            ID_CHRONO_COMMENTS: 'chronoComments',
            
            setup: function(){
                var self = this;
                var $chrono = this.chronoView.getChronoDom();
                
                $chrono.on('click', '#'+this.ID_CHRONO_COMMENTS+' button', function(ev){
                    ev.preventDefault();
                    var $textarea = $chrono.find('#'+self.ID_CHRONO_COMMENTS+' textarea');
                    var text = $textarea.val();
                    
                    self.loaderService.load($chrono.find('#'+self.ID_CHRONO_COMMENTS), 'comment.pending');
                    self.rmCommentModel.send(self.chronoModel.data.id, text);
                });
            },
            
            hideFromChrono: function(){
                this.chronoView.getChronoDom().find('#'+this.ID_CHRONO_COMMENTS).remove();
            },
            
            displayInChrono: function(){
                var $element = this.chronoView.getChronoDom().find('#footerPlaceholder');
                this.displayInElement($element);
            },
            
            displayInElement: function($element){
                var html = this.getTemplateHtml(this.ID_CHRONO_COMMENTS);
                $element.append(html);
            },
            
            getTemplateHtml: function(id){
                var html = this.templateService.parse(divTemplate, {
                    id: id,
                    content: this.templateService.parse(commentTemplate, {
                        label: 'comment.add',
                        buttonLabel: 'comment.send',
                        buttonClass: 'small columns secondary small-4',
                        inputClass: 'columns small-8'
                    })
                });
                
                return html;
            },
            
            clear: function(){
                var $chrono = this.chronoView.getChronoDom();
                this.loaderService.unload($chrono.find('#'+this.ID_CHRONO_COMMENTS), this.getTemplateHtml(this.ID_CHRONO_COMMENTS));
                $chrono.find('#'+this.ID_CHRONO_COMMENTS+' textarea').val('');
            }
        };
    };

}(chalk));
