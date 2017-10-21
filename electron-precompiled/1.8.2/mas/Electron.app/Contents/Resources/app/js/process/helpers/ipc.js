var stringHelper = require('./string.js');
var exports = module.exports;

exports.generateResponseChannel = function(channel, uid) {
    return channel+'Response'+uid;
};

exports.unwrapData = function(data) {
    return data.data;
};

exports.wrapData = function(data) {
    var uid = stringHelper.uid();

    return {
        uid: uid,
        data: data
    };
};
