(function (ns) {
    'use strict';

    ns.controllers.CommentController = function () {
        return {
            system: undefined,
            commentView: undefined,
            notificationService: undefined,

            init: function(){
                this.system.mapHandler('Chrono:loaded', 'commentView', 'displayInChrono');
                this.system.mapHandler('Comment:send:success', 'commentController', 'sendSuccess');
            },

            sendSuccess: function(){
                this.notificationService.notifySuccess('comment.added');
                this.commentView.clear();
            }
        };
    };
}(chalk));
