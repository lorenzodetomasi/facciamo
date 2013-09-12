if(!getRandomValueFromArray){
				var getRandomValueFromArray = function(arrayName){
					var x = Math.floor(Math.random()*arrayName.length);
					return arrayName[x];
				}
}
var preloadAudios = function(audioFilesArray){
		for (var x=0;x<audioFilesArray.length;x++){
				$('<audio id="'+audioFilesArray[x]+'"><source src="'+audioFilesPath+audioFilesArray[x]+'.mp3" type="audio/mpeg" preload="auto"></audio>').appendTo('.content');
		}
}
var playRandomAudio = function(audioFilesArray){
		var audioFile = getRandomValueFromArray(audioFilesArray);
		console.log('Playing random audio ('+audioFile+')');
		var src = audioFilesPath+audioFile+'.mp3';
		console.log(src);
		PlayAudioFile(src);
//						$('#'+audioFile)[0].play();
		audioFilesArray = null;
}
var playAudio = function(audioFilesArray){
		var audioFilesArrayType = $.type(audioFilesArray);
		console.log('Playing audio from '+audioFilesArrayType);
		if(audioFilesArrayType === "array"){
				playRandomAudio(audioFilesArray);
		} else if(audioFilesArrayType === "string"){
				$('#'+audioFilesArray)[0].play();
		}
		audioFilesArray = null;
}
var PlayAudioFile = function(src){
		/* Sources:
		 * http://stackoverflow.com/questions/10556437/audio-not-working-with-phonegap,
			* http://www.9lessons.info/2013/04/play-notification-sound-using-jquery.html,
			* http://www.w3schools.com/tags/ref_av_dom.asp,
			* http://docs.phonegap.com/en/2.0.0/cordova_media_media.md.html
		 */
		// HTML5 Audio
		if (typeof Audio != "undefined") { 
				new Audio(src).play() ;
				// Phonegap media
		} else if (typeof device != "undefined") {
				// Android needs the search path explicitly specified
				if (device.platform == 'Android') {
						src = '/android_asset/www/' + src;
				}
				var mediaRes = new Media(src,
				function onSuccess() {
						// release the media resource once finished playing
						mediaRes.release();
				},
				function onError(e){
						console.log("error playing sound: " + JSON.stringify(e));
				});
				mediaRes.play();
		} else {
				console.log("no sound API to play: " + src);
		}
}