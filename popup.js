var $ = document.querySelector.bind(document);
var isAudioSetted = false;
var isAudioUnchanged = true;
var previousSound = void 0;
var _ = () => setMessage('Changes saved. Refresh the page.');

chrome.storage.local.get('custom_notification_sound_dataURI', function(result){
	if (result && result['custom_notification_sound_dataURI']){
		$('#audio').src = previousSound = result['custom_notification_sound_dataURI'];
		isAudioSetted = true;
	}
})

$('#audio-file-input').addEventListener('change', function() { 
	clearMessage();
	var fileReader = new FileReader(); 
	fileReader.onload = function(){ 
		$('#audio').src = fileReader.result;
		isAudioSetted = true;
		isAudioUnchanged = fileReader.result == previousSound;
	}
	fileReader.readAsDataURL(this.files[0]); 
})

$('#audio').addEventListener('volumechange', function() {
	$("#current-volume").textContent = +($('#audio').volume * 100).toFixed(1);
});

$('#save').onclick = function(){
	if (isAudioSetted){
		if (isAudioUnchanged){
			setWarning('No effect. Please upload a different file.');
		} else {
			chrome.storage.local.set({
				"custom_notification_sound_dataURI": $('#audio').src,
				"custom_notification_sound_volume": $('#audio').volume,
			}, _);
		} 
	} else {
		setError('Please select a file.');
	}
}

setMessage = (text) => {
	$('#message').textContent = text
	$('#message').className = '';
}

setError = (text) => {
	$('#message').textContent = text
	$('#message').className = 'error-message';
}

setWarning = (text) => {
	$('#message').textContent = text
	$('#message').className = 'warning-message';
}

clearMessage = () => {
	$('#message').textContent = ''
	$('#message').className = '';
}

$('#upload-button').onclick = function(){
	$('#audio-file-input').click();
}