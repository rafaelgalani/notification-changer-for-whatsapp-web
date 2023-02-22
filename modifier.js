(function(){
	localStorage.setItem('custom_notification_sound_dataURI', document.currentScript.getAttribute('custom_notification_sound_dataURI'));
	const WHATSAPP_NOTIFICATION_URL = 'https://web.whatsapp.com/notification';
	const audioDefaultPlay = window.Audio.prototype.play;

	window.Audio.prototype.play = function(){
		if (this.src.startsWith(WHATSAPP_NOTIFICATION_URL)){
			this.src = localStorage.getItem('custom_notification_sound_dataURI');
		};
		audioDefaultPlay.apply(this)
	}
})()