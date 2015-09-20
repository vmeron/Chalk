chrome.app.runtime.onLaunched.addListener(function() {
    try {
        var window = chrome.app.window.create('window.html', {
            'bounds': {
                'width': 460,
                'height': 960
            }
        });
    }
    catch(err) {
        console.log('Window error : ' + err);
    }
});