var $ = document.querySelector.bind(document);
var isAudioSetted = false;
var _ = () => (true);

$('#whatsapp-audio-file').addEventListener('change', function() { 
	var fileReader = new FileReader(); 
	fileReader.onload = function(){ 
		$('#audio').src = fileReader.result;
		isAudioSetted = true;
	}
	fileReader.readAsDataURL(this.files[0]); 
});

$('#save').onclick = function(){
	if (isAudioSetted){
		chrome.storage.local.set({"custom_notification_sound_dataURI": $('#audio').src}, _);
	}
}