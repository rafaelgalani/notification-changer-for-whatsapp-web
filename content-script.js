const s = document.createElement('script');
s.src = chrome.runtime.getURL('modifier.js');

const URI_PROP = 'custom_notification_sound_dataURI'

chrome.storage.local.get(URI_PROP, function(result){
    if (result[URI_PROP]){
        s.setAttribute(URI_PROP, result[URI_PROP]);
    }

    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
})