/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
		// Application Constructor
		initialize: function() {
						this.bindEvents();
		},
		// Bind Event Listeners
		//
		// Bind any events that are required on startup. Common events are:
		// 'load', 'deviceready', 'offline', and 'online'.
		bindEvents: function() {
				document.addEventListener('deviceready', this.onDeviceReady, false);
				document.addEventListener('load', this.onLoad, false);
		},
		// deviceready Event Handler
		//
		// The scope of 'this' is the event. In order to call the 'receivedEvent'
		// function, we must explicity call 'app.receivedEvent(...);'
		onDeviceReady: function() {
				var firstPage = 'splash';
				var defaultLanguage = 'it';
				var navigatorLanguage = navigator.language || navigator.userLanguage;
				if(!window.localStorage.getItem("userPreferredLanguage")){
						if(navigatorLanguage){
								if(navigatorLanguage=='it_IT' || navigatorLanguage=='it-IT'){navigatorLanguage = 'it';}
								window.localStorage.setItem("userPreferredLanguage", navigatorLanguage);
						} else {
								window.localStorage.setItem("userPreferredLanguage", defaultLanguage);
						}
				}
				var json;
				$.getJSON('facciamo_'+window.localStorage.getItem("userPreferredLanguage")+'.json')
						.done(function(data){json = data;})
						.fail(function( jqxhr, textStatus, error ) {
								var err = textStatus + ', ' + error;
								console.log( "Request Failed: " + err);
						}
				);
				//$.mobile.defaultPageTransition = 'slide';
				var defaultFaces = {
						"cucu": {
								"isPublished": true,
								"isBought": true
						},
						"testascura": {
								"isPublished": true,
								"isBought": true
						},
						"cattivo": {
								"isPublished": true,
								"isBought": true
						},
						"chicchirichi": {
								"isPublished": true,
								"isBought": false
						}
				};
				if(!window.localStorage.getItem("faces")){
						window.localStorage.setItem("faces", JSON.stringify(defaultFaces));
				}
				window.localStorage.setItem("faces", JSON.stringify(defaultFaces));
				var faces = JSON.parse(window.localStorage.getItem("faces"));
				console.log(faces);
				//random number generator
				var get_random = function(i){
					return Math.floor(Math.random()*i);
				}
				//random time duration generator
				var getRandomTime = function(){
					return Math.floor(Math.random()*11)*1000;
				}
				var getRandomValueFromArray = function(arrayName){
					var x = Math.floor(Math.random()*arrayName.length);
					return arrayName[x];
				}
				Array.prototype.shuffle = function() {
					var s = [];
					while (this.length) s.push(this.splice(Math.random() * this.length, 1)[0]);
					while (s.length) this.push(s.pop());
					return this;
				};
				var preloadImages = function(imageFilesArray){
					var imagesArray = new Array();
					for (var x=0;x<imageFilesArray.length;x++){
						imagesArray[x]=new Image();
						imagesArray[x].src=imageFilesArray[x];
					}
				}
				var audioFilesPath = 'res/raw/';
				var preloadAudios = function(audioFilesArray){
						for (var x=0;x<audioFilesArray.length;x++){
								$('<audio id="'+audioFilesArray[x]+'"><source src="'+audioFilesPath+audioFilesArray[x]+'.mp3" type="audio/mpeg" preload="auto"></audio>').appendTo('.content');
						}
				}
				var playRandomAudio = function(audioFilesArray){
						var audioFile = getRandomValueFromArray(audioFilesArray);
						console.log('Playing random audio ('+audioFile+')');
						$('#'+audioFile)[0].play();
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
				function changePage(pageUrl,interval){
						setTimeout(function(){
								$.mobile.changePage(pageUrl);
						}, interval);
				}
				function checkAnimatingClass(){
						
				}
				var animate = function(target,classAttribute,audioFilesArray){
						if(target.hasClass("animating") && !target.hasClass("blinks")){
								console.log("Animation "+target.attr("class")+" is being played");
						} else {
								var audioFilesArrayType = $.type(audioFilesArray);
								if(audioFilesArrayType === "string" || audioFilesArrayType === "array"){
										playAudio(audioFilesArray);
										audioFilesArray = null;
								} else {
										console.log('No sound')
								}
								target.addClass(classAttribute);
								audioFilesArray = null;
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
/*
multi page template
navigate from A to B

page B---pagebeforecreate

page B---pagecreate

page B---pageinit

page A---pagebeforehide

page B---pagebeforeshow

page A---pageremove

page A---pagehide

page B---pageshow
*/
				if(firstPage){
						changePage(firstPage+"_"+window.localStorage.getItem("userPreferredLanguage")+".html",0);
				} else {
						alert("firstPage undefined");
				}
				$(document).on('pageshow', '#splash', function(event){
						changePage("menu_"+window.localStorage.getItem("userPreferredLanguage")+".html",4000);
				});
				$(document).on('pageshow', '#menu', function(event){
						var thumbnails = $('.face_thumbnail');
						thumbnails.each(function(index){
								var id = $(this).attr('id');
								id = id.substring(0, id.indexOf("_"));
								if(faces[id] && faces[id].isPublished && faces[id].isPublished == true){
										$(this).addClass('is_published');
								} else {
										$(this).addClass('not_published');
								}
								if(faces[id] && faces[id].isBought && faces[id].isBought == true){
										$(this).find('a').attr("href",id+"_"+window.localStorage.getItem("userPreferredLanguage")+".html");
								}
						});
				});
				$(document).on('pagebeforeshow', '#chicchirichi-inapp', function(event){
						$("#text").html(json.faces.chicchirichi.web_title);
						var imageFiles = new Array('res/raw/chicchirichi_gallo_sprite.svg');
						preloadImages(imageFiles);
						chicchirichi_gallo_animal_sounds = ["chicchirichi_gallo_sound_animal_001"];
						chicchirichi_gallo_kid_sounds = ["chicchirichi_gallo_sound_kid_001"];
				});
				$(document).on('pageshow', '#chicchirichi-inapp', function(event){
						var face = $(".face");
						face.height(face.width());
				});
				$(document).on('pagebeforeshow', '#cattivo-inapp', function(event){
						$("#text").html(json.faces.cattivo.web_title);
						var imageFiles = new Array('res/raw/cattivo_sprite.svg');
						preloadImages(imageFiles);
						cattivo_am_sounds = ["cattivo_sound_am_001","cattivo_sound_am_002","cattivo_sound_am_003"];
						cattivo_bu_sounds = ["cattivo_sound_bu_001"];
						preloadAudios(cattivo_am_sounds);
						preloadAudios(cattivo_bu_sounds);
				});
				$(document).on('pageshow', '#cattivo-inapp', function(event){
						var isBuTime;
						function initBuTimer(){
								isBuTime = false;
								console.log('Bu Timer initialized')
								setTimeout(function(){
										isBuTime = true;
										console.log('It’s bu time!');
								},20000);
						}
						var face = $(".face");
						initBuTimer();
						face.height(face.width());
						face.bind("webkitAnimationStart oAnimationStart msAnimationStart animationstart", function(e){
								console.log($(this).attr("class")+' animation started');
								$(this).addClass("animating");
						});
						face.bind("webkitAnimationEnd oAnimationEnd msAnimationEnd animationend", function(e){
								console.log($(this).attr("class")+' animation ended');
								if($(this).hasClass("animating")){
										$(this).removeClass("animating");
								}
								if($(this).hasClass("blinks")){
										$(this).removeClass("blinks");
								}
								if($(this).hasClass("bites")){
										$(this).removeClass("bites");
								}
								if($(this).hasClass("bu")){
										initBuTimer();
										$(this).removeClass("bu");
								}
								if($(this).hasClass("starts")){
										$(this).removeClass("starts");
										console.log("Starting blinking every 3s");
										setInterval(function(){
												animate(face,"blinks");
										},3000);
								}
						});
						animate(face,"starts");
						face.on("tap",function(event){
								console.log("Face tapped");
								console.log('isBuTime :'+isBuTime);
								if(isBuTime == true){
										animate(face,"bu",cattivo_bu_sounds);
								} else {
										animate(face,"bites",cattivo_am_sounds);
								}
						});
				});
		}
}
