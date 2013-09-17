var preloadAudios = function(audioFilesArray,collectionName){
		/* Sources:
		 * http://stackoverflow.com/questions/10556437/audio-not-working-with-phonegap,
			* http://www.9lessons.info/2013/04/play-notification-sound-using-jquery.html,
			* http://www.w3schools.com/tags/ref_av_dom.asp,
			* http://docs.phonegap.com/en/2.0.0/cordova_media_media.md.html
		 */
		var filesToLoad = audioFilesArray.length;
		var filesLoaded = 0;
		collectionName = typeof collectionName !== 'undefined' ? collectionName : false;
		if(collectionName){
				audios[collectionName] = new Object();
				var collection = audios[collectionName];
		} else {
				var collection = audios;
		}
		console.log(collection);
		console.log(device);
		console.log('cordova: '+device.cordova);
		console.log('platform: '+device.platform);
		if(device.cordova == undefined && typeof Audio != "undefined") {
				for (var x=0;x<audioFilesArray.length;x++){
//						var src = audioFilesPath+audioFilesArray[x]+'.mp3';
						var src = audioFilesArray[x];
						collection[audioFilesArray[x]] = new Audio(src);
						collection[audioFilesArray[x]].load();
						console.log('HTML5 Audio Preloaded ('+src+')');
						console.log(audios);
				}
		} else if (device.cordova != undefined && typeof Media != "undefined") {
				console.log('Using Phonegap Media API ('+device.platform+')');
				function onSuccess() {
								console.log("Phonegap Media Preloaded");
				}
		
				function onError(error) {
								alert('code: '    + error.code    + '\n' +
														'message: ' + error.message + '\n');
				}
				for (var x=0;x<audioFilesArray.length;x++){
//						var src = audioFilesPath+audioFilesArray[x]+'.mp3';
						var src = audioFilesArray[x];
						// Android needs the search path explicitly specified
						if (device.platform == 'Android') {
//								src = '/android_asset/www/' + src;
						}
						console.log("Preloading Phonegap Media ("+src+")");
						collection[audioFilesArray[x]] = new Media(src, onSuccess, onError);
				}
		} else {
				console.log("no sound API to preload and play: " + src);
		}
		filesLoaded = 0;
}
var playRandomAudio = function(audios){
//		console.log(audios);
		property = getRandom(audios);
		var audio = audios[property];
		console.log('Playing random audio ('+property+')');
		console.log(audio);
		return audio.play();
}
var playAudio = function(audios){
		console.log('playAudio');
		console.log(audios);
		if(toType(audios) == "object"){
				playRandomAudio(audios);
		} else if(toType(audios) == "array"){
				playRandomAudio(audios);
		}
}