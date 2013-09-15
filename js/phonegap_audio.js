var preloadAudios = function(audioFilesArray,collectionName){
		/* Sources:
		 * http://stackoverflow.com/questions/10556437/audio-not-working-with-phonegap,
			* http://www.9lessons.info/2013/04/play-notification-sound-using-jquery.html,
			* http://www.w3schools.com/tags/ref_av_dom.asp,
			* http://docs.phonegap.com/en/2.0.0/cordova_media_media.md.html
		 */
		function isAppLoaded(audio){
				console.log('Sound preloaded: '+audio.src);
//				console.log(collection[audioFilesArray[x]]);
				return audio;
		}
		var filesToLoad = audioFilesArray.length;
		var filesLoaded = 0;
		collectionName = typeof collectionName !== 'undefined' ? collectionName : false;
		if(collectionName){
				audios[collectionName] = new Object();
				var collection = audios[collectionName];
		} else {
				var collection = audios;
		}
		console.log(device);
		console.log('platform: '+device.platform);
		for (var x=0;x<audioFilesArray.length;x++){
//				console.log(collection);
				var src = audioFilesPath+audioFilesArray[x]+'.mp3';
				if (typeof Audio != "undefined") {
						collection[audioFilesArray[x]] = new Audio(src);
				}
				if (typeof device != "undefined") {
						// Android needs the search path explicitly specified
						if (device.platform == 'Android') {
								src = '/asset/www/' + src;
								console.log(src);
								collection[audioFilesArray[x]] = new Media(src,
										function onSuccess() {
												// release the media resource once finished playing
												collection[audioFilesArray[x]].release();
										},
										function onError(e){
												console.log("error playing sound: " + JSON.stringify(e));
										}
								);
						}
				} else {
						console.log("no sound API to preload and play: " + src);
				}
				collection[audioFilesArray[x]].src = src;
				collection[audioFilesArray[x]].addEventListener('canplaythrough', isAppLoaded(collection[audioFilesArray[x]]), false);
//				$('<audio id="'+audioFilesArray[x]+'"><source src="'+audioFilesPath+audioFilesArray[x]+'.mp3" type="audio/mpeg" preload="auto"></audio>').appendTo('.content');
		}
		filesLoaded = 0;
}
var playRandomAudio = function(audios){
		console.log(audios);
		property = getRandom(audios);
		var audio = audios[property];
		console.log('Playing random audio ('+property+')');
		console.log(audio);
		return audio.play();
}
var playAudio = function(audios){
		console.log(audios);
		if(toType(audios) == "object"){
				playRandomAudio(audios);
		} else if(toType(audios) == "array"){
				playRandomAudio(audios);
		}
}
var PlayAudioFile = function(src){
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