(function (ns) {
    'use strict';

    ns.services.DataService = function () {
        return {
            system: undefined, //inject
            cacheService: undefined,
            restClient: undefined,

            buffer: {},
            currentStart: {},
            refreshStep: 100,

            getById: function(collection, label, id)
            {
                for(var i in collection)
                {
                    if(collection[i][label] == id)
                    {
                        return collection[i];
                    }
                }

                return null;
            },

            sortString: function(data, attribute){
                return data.sort(function(a, b){
                    var result = 0;
                    if(a[attribute].toLowerCase() < b[attribute].toLowerCase()) result = -1;
                    if(a[attribute].toLowerCase() > b[attribute].toLowerCase()) result = 1;

                    return result;
                });
            },

            paginatedRefresh: function(useCache, entity, eventName, callback, additionalData){
                var self = this;

                this.currentStart[entity] = 0;
                this.buffer[entity] = [];

                if(typeof additionalData === 'undefined')
                {
                    additionalData = {};
                }

                if(typeof useCache === 'undefined')
                {
                    useCache = true;
                }

                if(useCache === true)
                {
                    this.cacheService.get(entity, function(result){
                        if(result === null)
                        {
                            self._refresh(entity, eventName, callback, additionalData);
                        }
                        else
                        {
                            callback(result);
                            self.buffer[entity] = result;
                            self.system.notify(eventName);
                        }
                    });
                }
                else
                {
                    this._refresh(entity, eventName, callback, additionalData);
                }
            },

            _refresh: function(entity, eventName, callback, additionalData, start){
                var self = this;
                if(start === undefined)
                {
                    start = 0;
                }

                var restData = this.mergeObjects({
                    offset: start,
                    limit: this.refreshStep
                }, additionalData);

                this.restClient.call(this.restClient.methods.GET, entity, restData, function(result){
                    //Not done yet, refresh again
                    if(result[entity].length > 0)
                    {
                        self.currentStart[entity] += self.refreshStep;
                        self.buffer[entity] = self.buffer[entity].concat(result[entity]);
                        self._refresh(entity, eventName, callback, additionalData, self.currentStart[entity]);
                    }
                    //Success : stop paginating
                    else
                    {
                        callback(self.buffer[entity]);
                        self.cacheService.set(entity, self.buffer[entity], self.cacheService.HOUR);
                        self.system.notify(eventName);
                    }
                });
            },

            mergeObjects: function(o1, o2){
                var result = {};
                for(var i in o1)
                {
                    result[i] = o1[i];
                }

                for(var j in o2)
                {
                    result[j] = o2[j];
                }

                return result;
            }
        };
    };
}(chalk));
