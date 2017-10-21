//Bound storage id
var boundsStorageId = 'chrome.bounds';

chrome.app.runtime.onLaunched.addListener(function() {
    try {
        var window = chrome.app.window.create('window.html', {
            'outerBounds': {
                'width': 460,
                'height': 960
            }
        }, createHandler);
        
    } catch(err) {
        console.log('Window error : ' + err);
    }
});

function createHandler(win)
{
    //Restore window bounds if data found.
    chrome.storage.local.get(boundsStorageId, function(data){
        var bounds = data[boundsStorageId];

        if(bounds.left && bounds.top
            && bounds.width && bounds.height)
        {
            win.outerBounds.setPosition(bounds.left, bounds.top);
        }

        if(bounds.width && bounds.height)
        {
            win.outerBounds.setSize(bounds.width, bounds.height);
        }
    })

    //Save window bounds on bound change.
    win.onBoundsChanged.addListener(function(){
        var boundsData = {};
        boundsData[boundsStorageId] = {
            width: win.outerBounds.width,
            height: win.outerBounds.height,
            top: win.outerBounds.top,
            left: win.outerBounds.left,
        };
        chrome.storage.local.set(boundsData);
    });
}