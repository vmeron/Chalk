(function (ns) {
    'use strict';

    ns.services.CacheService = function () {
        return {
            system: undefined, //inject
            storageService: undefined, //inject
            _: undefined, //inject
            time: undefined,

            prefix: 'CACHE_',

            DAY: 3600*24,
            HOUR: 3600,

            get: function(cid, callback){
                var self = this;
                
                this.storageService.get(this.getCid(cid), function(result){
                    if(self._.isEmpty(result) && callback)
                    {
                        callback(null);
                    }
                    else
                    {
                        if(callback)
                        {
                            if(!self.hasCache(result))
                            {
                                result = null;
                            }
                            else
                            {
                                result = result.data;
                            }

                            callback(result);
                        }
                    }
                });
            },

            hasCache: function(data){
                var time = this.time.getUnixTime();
                if(!data)
                {
                    return false;
                }

                return data.ttl > time;
            },

            set: function(cid, data, duration){
                var cacheData = {};
                var cleanCid = this.getCid(cid);
                cacheData = {
                    ttl: this.time.getUnixTime(duration),
                    data: data
                };

                this.storageService.set(cleanCid, cacheData);
            },

            getCid: function(cid){
                return this.prefix+cid;
            }
        };
    };
}(chalk));
