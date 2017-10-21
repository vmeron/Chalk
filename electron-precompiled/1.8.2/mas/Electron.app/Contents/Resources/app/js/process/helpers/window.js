var exports = module.exports;

exports.getCurrentWindowState = function(win) {
    return {
        x: win.getPosition()[0],
        y: win.getPosition()[1],
        width: win.getSize()[0],
        height: win.getSize()[1]
    };
};

exports.getDefaultWindowState = function(size) {
    var screenW = size.width;
    var screenH = size.height;
    var defaultW = 460;
    var defaultH = 960;

    return {
        x: screenW / 2 - defaultW / 2,
        y: screenH / 2 - defaultH / 2,
        width: 460,
        height: 960
    };
};
