// set to sane starting values; overwritten with actual values if set
var rules = {
    opacity: 10,
    frequency: 40,
    enabled: true
};

function buildDiv() {
    var overlay = document.createElement('div');

    // cover the whole page
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.zIndex = 99999;
    overlay.style.background = 'black';

    // avoid blocking clicks
    overlay.style.pointerEvents = 'none';

    overlay.id = 'gammyloidOverlay';
    document.body.appendChild(overlay);
}

function flashDiv(opacity, frequency){
    // convet frequency to period
    var period = 1 / frequency;

    // the period will be the time it takes for an on/off sequence so the color switch will be at twice that speed in ms
    var changeInterval = (period / 2) * 1000;

    // set to check color at that interval
    setInterval(function(opacity){
        var overlay = document.getElementById('gammyloidOverlay');

        // toggle the overlay with the corrected opacity
        if(overlay.style.opacity == 0){ // jshint ignore:line 
            overlay.style.opacity = (opacity / 100);
        } else {
            overlay.style.opacity = 0;
        }


    }, changeInterval, opacity);
}

// attempt to load rules, set defaults if nonexistant, then flash if enabled
chrome.storage.sync.get(null, function(data) {
    if (typeof data.rules === 'undefined') {
        chrome.storage.sync.set({
            rules: rules
        });
    } else {
        rules = data.rules;
    }

    if (!rules.enabled) {
        return;
    }

    buildDiv();
    flashDiv(rules.opacity, rules.frequency);
});
