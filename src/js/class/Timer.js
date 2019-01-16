class Timer {
    constructor() {
        this.durationLeft = 0;
        this.isCanceled = false;
        this.timerID = null;
        this.momentum = 100;
        this.TIMER_COMPLETE = 'timerEvent';
        this.TIMER_CANCEL = 'timerStop';
        this.TIMER_TICK = 'timerTick';
    }

    start(duration) {
        this.isCanceled = false;
        this.durationLeft = parseInt(duration);
        var self = this;

        var handler = function(){
            if(self.durationLeft <= 0 || self.isCanceled) {
                if(self.isCanceled) {
                    self.cancelHandler();
                }
                else {
                    self.completeHandler();
                }
            }

            self.durationLeft -= self.momentum;
        };

        if(!this.timerID) {
            this.timerID = setInterval(handler, self.momentum);
        }
    }

    completeHandler() {
        this.durationLeft = 0;
        clearInterval(this.timerID);
        this.timerID = null;
        $(this).trigger(this.TIMER_COMPLETE);
    }

    cancel() {
        this.isCanceled = true;
    }

    cancelHandler() {
        this.durationLeft = 0;
        clearInterval(this.timerID);
        this.timerID = null;
        $(this).trigger(this.TIMER_CANCEL);
    }
}
