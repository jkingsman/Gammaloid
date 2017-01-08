// set to sane starting values; overwritten with actual values if set
var rules = {
    opacity: 10,
    frequency: 40,
    enabled: true
};

function loadFromStorage() {
    // attempt to load rules, set defaults if nonexistant, then flash if enabled
    chrome.storage.sync.get(null, function(data) {
        if (typeof data.rules === 'undefined') {
            chrome.storage.sync.set({
                rules: rules
            });
        } else {
            rules = data.rules;
        }

        // populate everything

        // set sliders
        document.getElementById('opacityInput').value = rules.opacity;

        // draw color box; divide by 100 to get into decimal form from 1-100
        document.getElementById('opacityDisplay').style.opacity = document.getElementById('opacityInput').value / 100;

        // set input percentage
        document.getElementById('opacityValue').value = document.getElementById('opacityInput').value + '%';

        // set frequency
        document.getElementById('frequency').value = rules.frequency;

        // set dis/enabled checkbox
        if (rules.enabled) {
            document.getElementById('enabled').checked = true;
        } else {
            document.getElementById('enabled').checked = false;
        }
    });
}

// save form settings into rules in storage
function saveRules() {
    // get form values
    var newRules = {
        opacity: document.getElementById('opacityInput').value,
        frequency: document.getElementById('frequency').value,
        enabled: document.getElementById('enabled').checked
    };

    // save it
    chrome.storage.sync.set({
        'rules': newRules
    });

    // put changed rules into palce
    rules = newRules;
}

//bind startup to dom ready
document.addEventListener('DOMContentLoaded', loadFromStorage);

// bind the opacity range input event to redrawing the color and value...
document.getElementById('opacityInput').addEventListener('input', function() {
    document.getElementById('opacityDisplay').style.opacity = document.getElementById('opacityInput').value / 100;
    document.getElementById('opacityValue').value = document.getElementById('opacityInput').value + '%';
});

// ...but don't actually save the rules until they're changed
document.getElementById('opacityInput').addEventListener('change', saveRules);
document.getElementById('enabled').addEventListener('change', saveRules);
document.getElementById('frequency').addEventListener('input', saveRules);
