class Timer {
    constructor()
    {
        this.durationLeft = 0;
        this.isCanceled = false;
        this.timerID = null;
        this.momentum = 100;
        this.TIMER_COMPLETE = 'timerEvent';
        this.TIMER_CANCEL = 'timerStop';
    }

    start(duration)
    {
        this.isCanceled = false;
        this.durationLeft = parseInt(duration);
        var _this = this;

        var handler = function(){
            if(_this.durationLeft <= 0 || _this.isCanceled)
            {
                if(_this.isCanceled)
                {
                    _this.cancelHandler();
                }
                else
                {
                    _this.completeHandler();
                }
            }

            _this.durationLeft -= _this.momentum;
        }

        if(!this.timerID)
        {
            this.timerID = setInterval(handler, _this.momentum);
        }
    }

    completeHandler()
    {
        this.durationLeft = 0;
        clearInterval(this.timerID);
        this.timerID = null;
        $(this).trigger(this.TIMER_COMPLETE)
    }

    cancel()
    {
        this.isCanceled = true;
    }

    cancelHandler()
    {
        this.durationLeft = 0;
        clearInterval(this.timerID);
        this.timerID = null;
        $(this).trigger(this.TIMER_CANCEL);
    }
}