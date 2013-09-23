var preloadAudios = function(audioFilesArray,collectionId){
		/* Sources:
		 * http://stackoverflow.com/questions/10556437/audio-not-working-with-phonegap,
			* http://www.9lessons.info/2013/04/play-notification-sound-using-jquery.html,
			* http://www.w3schools.com/tags/ref_av_dom.asp,
			* http://docs.phonegap.com/en/2.0.0/cordova_media_media.md.html
		 */
		var src;
		console.log('audioFilesArray is '+toType(audioFilesArray));
		audioFilesArray = typeof audioFilesArray !== 'undefined' ? audioFilesArray : false;
		collectionId = typeof collectionId !== 'undefined' ? collectionId : false;
		if(collectionId){
				audios[collectionId] = new Object();
				var collection = audios[collectionId];
				console.log('New audio collection "'+collectionId+'" created:');
				console.log(collection);
		} else {
				var collection = audios;
		}
		console.log(device);
		console.log('cordova: '+device.cordova);
		console.log('platform: '+device.platform);
		if(audioFilesArray){
				var filesToLoad,
								filesLoaded = 0;
				if(device.cordova == undefined && typeof Audio != "undefined") {
						if(toType(audioFilesArray) == 'string'){
								filesToLoad = 1;
								src = audioFilesPath+audioFilesArray+'.mp3';
								collection[audioFilesArray] = new Audio(src);
								collection[audioFilesArray].load();
								filesLoaded++;
								console.log('HTML5 Audio Preloaded ('+src+') ['+filesLoaded+'/'+filesToLoad+']');
						} else if(toType(audioFilesArray) == 'array') {
								filesToLoad = audioFilesArray.length;
								for (var x=0;x<audioFilesArray.length;x++){
										src = audioFilesPath+audioFilesArray[x]+'.mp3';
										collection[audioFilesArray[x]] = new Audio(src);
										collection[audioFilesArray[x]].load();
										console.log('HTML5 Audio Preloaded ('+src+') ['+filesLoaded+'/'+filesToLoad+']');
								}
						}
				} else if (device.cordova != undefined && typeof Media != "undefined") {
						console.log('Using Phonegap Media API ('+device.platform+')');
						// Android needs the search path explicitly specified
						if (device.platform == 'Android') {
								src = '/android_asset/www/';
						}
						function onSuccess() {
										console.log('Phonegap Media Preloaded ('+src+') ['+filesLoaded+'/'+filesToLoad+']');
						}
						function onError(error) {
								alert('code: '    + error.code    + '\n' +
														'message: ' + error.message + '\n');
						}
						if(toType(audioFilesArray) == 'string'){
								filesToLoad = 1;
								src = src+audioFilesPath+audioFilesArray+'.mp3';
								console.log("Preloading Phonegap Media ("+src+")");
								collection[audioFilesArray] = new Media(src, onSuccess, onError);
						} else if(toType(audioFilesArray) == 'array') {
								filesToLoad = audioFilesArray.length;
								for (var x=0;x<audioFilesArray.length;x++){
//										var src = audioFilesPath+audioFilesArray[x]+'.mp3';
										var src = audioFilesArray[x];
										console.log("Preloading Phonegap Media ("+src+")");
										collection[audioFilesArray[x]] = new Media(src, onSuccess, onError);
								}
						}
				} else {
						console.log("no sound API to preload and play: " + src);
				}
				filesLoaded = 0;
		} else {
				console.log('preloadAudios(): no files specified');
		}
}
var playRandomAudio = function(audios){
		property = getRandom(audios);
		var audio = audios[property];
		console.log('Playing random audio ('+property+')');
		console.log(audio);
		return audio.play();
}
var playAudio = function(audios){
		console.log('playAudio from '+toType(audios)+', typeof: '+typeof audios);
		console.log(audios);
		if(toType(audios) == 'htmlaudioelement'){
				return audios.play();
		} else {
				playRandomAudio(audios);
		}
}