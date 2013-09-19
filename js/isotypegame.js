/*  This is a general javascript library for miscellaneous useful functions */

//This method is used to debug the application
//Change the iDebugLevel to turn it on/off
var iDebugLevel = 1;
var dbAlert = function(message,errorLevel){
    try{
        if (errorLevel == null){
            alert(message);
        }
        else{
            if (errorLevel <= iDebugLevel){
                alert(message);
            }
        }
    }
    catch(e) {}
};
/* This code prevents users from dragging the page */
var preventDefaultScroll = function(event) {
    event.preventDefault();
    window.scroll(0,0);
    return false;
};

var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
var IsNumeric = function(val){
    if (isNaN(parseFloat(val))){
      return false;
    }
    return true
};
function isInt(n) {
   return typeof n === 'number' && parseFloat(n) == parseInt(n, 10) && !isNaN(n);
}

var preloadImages = function(imageFilesArray){
	var imagesArray = new Array();
	for (var x=0;x<imageFilesArray.length;x++){
		imagesArray[x]=new Image();
		imagesArray[x].src=imageFilesArray[x];
	}
}
//random number generator
var getRandomNumber = function(i){
	return Math.floor(Math.random()*i);
}
/* Time events */
function rightNow() {
  if (window['performance'] && window['performance']['now']) {
    return window['performance']['now']();
  } else {
    return +(new Date());
  }
}
//random time duration generator
var getRandomTime = function(){
	return Math.floor(Math.random()*11)*1000;
}
var initTimer = function(id,duration){
		if(timers){
				timers[id] = false;
				console.log('Timer initialized ('+id+')')
				setTimeout(function(){
						timers[id] = true;
						console.log('Timeout (timers.'+id+' = true)');
				},duration);
		} else {
				console.log('timers Object undefined');
		}
}
var getRandom = function(obj){
		console.log('getRandom from '+toType(obj));
		console.log(obj);
		if(toType(obj) == 'array'){
				var x = Math.floor(Math.random()*obj.length);
				return obj[x];
		} else if(toType(obj) == 'object'){
    var result, count = 0;
    for (var property in obj)
						if (Math.random() < 1/++count)
								result = property;
				console.log(result);
    return result;
		}
}
Array.prototype.shuffle = function() {
	var s = [];
	while (this.length) s.push(this.splice(Math.random() * this.length, 1)[0]);
	while (s.length) this.push(s.pop());
	return this;
};
/* window width
 * Look at http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
	*/
Element.prototype.width = function() {
	if (typeof this.clip !== "undefined") {
		return this.clip.width;
	} else {
		if (this.style.pixelWidth) {
			return this.style.pixelWidth;
		} else {
			return this.offsetWidth;
		}
	}
};
Element.prototype.height = function() {
	if (typeof this.clip !== "undefined") {
		return this.clip.height;
	} else {
		if (this.style.pixelHeight) {
			return this.style.pixelHeight;
		} else {
			return this.offsetHeight;
		}
	}
};
// Animations
var animate = function(target,classAttribute,audios){
		if(target.hasClass("animating") && !target.hasClass("blinks")){
				console.log("Animation "+target.attr("class")+" is being played");
		} else {
				if(toType(audios) == 'object'){
						console.log('playAudio('+classAttribute+')');
						playAudio(audios);
				} else {
						console.log('No sound')
				}
				target.addClass(classAttribute);
		}
}
var createCollection = function(){
		
}
var createSpritesheet = function(collectionId, id, src, framesWidth, framesHeight){
		console.log('Creating sprite "'+id+'" from '+src);
		collectionId = typeof collectionId !== 'undefined' ? collectionId : false;
		var collection;
		if(collectionId){
				// Check if collectionId already exists
//				console.log(sprites[collectionId]);
				if(sprites[collectionId] === undefined){
						sprites[collectionId] = new Object();
						console.log('New sprite collection "'+collectionId+'" created');
				}
				collection = sprites[collectionId];
		} else {
				collection = sprites;
		}
		collection[id] = new Object();
		var sprite = collection[id];
		sprite['id'] = id;
		sprite['image'] = new Image();
		sprite.image.src = 'res/raw/chicchirichi_gallo_sprite.svg';
		framesHeight = typeof framesHeight !== 'undefined' ? framesHeight : collection[id].image.height;
		var numberOfRows = collection[id].image.height / framesHeight;
		if(isInt(numberOfRows)){
				sprite['numberOfRows'] = numberOfRows;
		} else {
				alert('sprites.'+collectionId+'.'+id+' height ('+collection[id].image.height+') is not a multiple of frame height('+framesHeight+')');
		}
		var numberOfFrames = collection[id].image.width / framesWidth;
		if(isInt(numberOfFrames)){
				sprite['numberOfFrames'] = numberOfFrames;
				sprite['framesWidth'] = framesWidth;
				sprite['framesHeight'] = framesHeight;
		} else {
				alert('sprites.'+collectionId+'.'+id+' width ('+collection[id].image.width+') is not a multiple of frame width('+framesWidth+')');
		}		
		console.log('New spritesheet image loaded (width: '+collection[id].image.width+'; height: '+collection[id].image.height+'; rows: '+sprite['numberOfRows']+'; frames: '+sprite['numberOfFrames']+')');
		if(numberOfRows == 1){
				sprite['frames'] = new Array();
				for (var spriteNum=0;spriteNum<sprite.numberOfFrames;spriteNum++){
						sprite.frames[spriteNum] = new Object();
						var frame = sprite.frames[spriteNum];
						frame['y'] = 0;
						frame['x'] = framesWidth * spriteNum;
				}
		}
}
/* http://awardwinningfjords.com/2012/03/08/image-sequences.html */
function setSprite(spritesheet, framesSequence){
		console.log(toType(framesSequence));
		if(toType(framesSequence) == 'object'){
				$.extend(spritesheet, framesSequence);
		} else if(toType(framesSequence) == 'array'){
				spritesheet['framesSequence'] = framesSequence;
		}
}
function drawSpriteFrame(context,spritesheet,frameNum, renderingWidth, renderingHeight){
		/* based on http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas/#drawing-images-to-the-canvas */
		frameNum = typeof frameNum !== 'undefined' ? frameNum : 1;
		var frameIndex = frameNum-1;
		console.log('Drawing frame '+spritesheet.id+'-'+frameNum+'/'+spritesheet.numberOfFrames+' in canvas #'+context.canvas.id);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
//		context.drawImage([Source image], [Source clipping start x-position], [Source clipping start y-position], [Source clipping width], [Source clipping height], [Canvas start x-position], [Canvas start y-position], [Canvas image width], [Canvas image height]);
		context.drawImage(spritesheet.image, spritesheet.frames[frameIndex].x, spritesheet.frames[frameIndex].y, spritesheet.framesWidth, spritesheet.framesHeight, 0, 0, renderingWidth, renderingHeight);
}
(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}
		
		if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
						var currTime = new Date().getTime();
						var timeToCall = Math.max(0, 16 - (currTime - lastTime));
						var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
						lastTime = currTime + timeToCall;
						return id;
				};
		
		if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
						clearTimeout(id);
				};
}());
function animateSprite(context, spritesheet, framesSequence, renderingWidth, renderingHeight, durationMs, fps){
		/* Based on:
		 * http://stackoverflow.com/questions/16540744/update-animation-based-on-time-in-javascriptindependent-of-frames
			* http://awardwinningfjords.com/2012/03/08/image-sequences.html
			*/
		fps = typeof fps !== 'undefined' ? fps : false;
		if(durationMs){
//				duration / numberOfFrames = 1 / fps
				fps = (spritesheet.numberOfFrames) / (durationMs / 1000);
		}
		if(fps) {
				console.log('Playing ('+fps+' frames per second (fps))');
		}
		var framesSequenceIndex = 0,
						startTime = rightNow(),
						lastTime  = rightNow();
		console.log('Animation started at : '+startTime+' (lastTime)');
		animateSequence();
		function animateSequence(){
				time = rightNow();
				elapsedTime = time - lastTime;
//				delta = elapsedTime/1000;
				console.log(elapsedTime+': frame '+framesSequenceIndex+'('+framesSequence[framesSequenceIndex]+')');
				drawSpriteFrame(context,spritesheet,framesSequence[framesSequenceIndex], renderingWidth, renderingHeight);
				framesSequenceIndex++;
				
				lastTime = time;
				if(framesSequenceIndex <= framesSequence.length-1){
						requestAnimationFrame(function() {
								animateSequence();
						});
				} else {
						console.log('Animation ended after '+(time - startTime));
				}
		}
/*  
  (function animloop(time){
    var delta = (time - currentTime) / 1000;
    
    currentFrame += (delta * fps);
    
    var frameNum = Math.floor(currentFrame);
    
    if (frameNum >= framesSequence.lenght) {
      currentFrame = frameNum = 1;
    }
    
    requestAnimationFrame(animloop);
    
    drawSpriteFrame(context, spritesheet.image, frameNum);
    currentTime = time;
  })(currentTime);
*/
}
function menuKeyDown() {
		console.log('Menu button pressed.');
}
document.addEventListener("backbutton", backKeyDown, true);
function backKeyDown() {
		console.log('Back button pressed.');
		$.mobile.changePage('menu_'+window.localStorage.getItem("userPreferredLanguage")+'.html');
}
//Login & navigation
var faces = new Array();
var password = 'abc';
var loginIsActive = false;
var showNavContainer = function(){
	$('#nav-container').addClass('visible');
	if(loginIsActive == true){
		$("#nav").removeClass('visible');
		$("#login").addClass('visible');
	} else {
		$("#login").removeClass('visible');
		$("#nav").addClass('visible');
	}
};
var generateNav = function(previousFaceID,nextFaceID){
	if($("#nav-button")){
		var html = '<div id="nav-container"><div id="login"><label for="password">Password</label><input type="password" /></div><div id="nav"><a id="previous_face" class="thumbnail" href="'+previousFaceID+'-index.html" style="background-image: url(images/'+previousFaceID+'.png);"></a><a id="home" class="thumbnail" href="index.html" style="background-image: url(images/cover.png);"></a><a id="next_face" class="thumbnail" href="'+nextFaceID+'-index.html" style="background-image: url(images/'+nextFaceID+'.png);"></a></div></div>';
		$("#nav-button").append(html);
	}
}

/* Hide/show */
var displayNone = function(element){
	element.removeClass('visible');
};
var show =function(element) {
	element.addClass('visible');
}