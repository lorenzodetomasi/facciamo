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
var getRandomValueFromArray = function(array){
	var x = Math.floor(Math.random()*array.length);
	return array[x];
}
Array.prototype.shuffle = function() {
	var s = [];
	while (this.length) s.push(this.splice(Math.random() * this.length, 1)[0]);
	while (s.length) this.push(s.pop());
	return this;
};
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