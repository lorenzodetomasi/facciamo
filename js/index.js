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
				//$.mobile.defaultPageTransition = 'slide';
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
				$.getJSON('facciamo_'+window.localStorage.getItem("userPreferredLanguage")+'.json')
						.done(function(data){
								json = data;
								console.log("Json loaded");
								inAppStore = {
										"dovesei": {
												"isPublished": true,
												"isBought": false
										},
										"chicchirichi": {
												"isPublished": true,
												"isBought": true
										},
										"cattivo": {
												"isPublished": true,
												"isBought": true
										},
								};
								/* # Merge inAppStore in faces and create/update faces locally*/
								if(inAppStore && json.faces){
										jQuery.extend(true, json.faces, inAppStore);
										if(!window.localStorage.getItem("json")){
												console.log('Local Storage Item "json" created');
										} else {
												console.log('Local Storage Item "json" updated');
										}
										window.localStorage.setItem("json", JSON.stringify(json));
								}
								console.log(json);
						})
						.fail(function( jqxhr, textStatus, error ) {
								var err = textStatus + ', ' + error;
								console.log( "Json request failed: " + err);
						}
				);
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
								if(json.faces[id] && json.faces[id].isPublished && json.faces[id].isPublished == true){
										$(this).addClass('is_published');
								} else {
										$(this).addClass('not_published');
								}
								if(json.faces[id] && json.faces[id].isBought && json.faces[id].isBought == true){
										$(this).find('a').attr("href",id+"_"+window.localStorage.getItem("userPreferredLanguage")+".html");
								}
						});
				});
				$(document).on('pageshow', '#testaudio-inapp', function(event){
						function testAudio(src) {
/*
										if (device.platform == 'Android') {
														src = '/android_asset/www/' + src;
										}
*/
										var media = new Media(src, success, error_error);
										console.log(media);
										console.log('imagesArray:');
										console.log(imagesArray);
										media.play();
						}
						function success() {
										// ignore
						}
						function error_error(e) {
										alert('great error');
										alert(e.message);
						}
						$("#testaudio").on("tap", function(event){
								var src = $("#testaudiosrc").val();
								audios = null;
								audios = new Object;
								preloadAudios([src]);
								setTimeout(function(){
										playAudio(audios);
								},5000);
//								testAudio(src);
						});
						$("#testaudioselect").on("tap", function(event){
								audios = null;
								audios = new Object;
								var src = $("#selectsrc").val();
								preloadAudios([src]);
								setTimeout(function(){
										playAudio(audios);
								},5000);
//								testAudio(src);
						});
				});
				$(document).on('pagebeforeshow', '#chicchirichi-inapp', function(event){
						$("#text").html(json.faces.chicchirichi.web_title);
						var imageFiles = new Array('res/raw/chicchirichi_gallo_sprite.svg');
						preloadImages(imageFiles);
						chicchirichi_gallo_animal_sounds = "res/raw/chicchirichi_gallo_sound_animal_001.mp3";
						chicchirichi_gallo_kid_sounds = "res/raw/chicchirichi_gallo_sound_kid_001.mp3";
						preloadAudios(chicchirichi_gallo_animal_sounds,'chicchirichi_gallo_animal');
						preloadAudios(chicchirichi_gallo_kid_sounds,'chicchirichi_gallo_kid');
						console.log(audios);
				});
				$(document).on('pageshow', '#chicchirichi-inapp', function(event){
						generateNav('chicchirichi');
						var stage = $("#stage");
						var canvas = document.getElementById('chicchirichi');
						canvas.width = stage.width();
						canvas.height = stage.width();
						var context = canvas.getContext('2d');
						createSpritesheet('chicchirichi','chicchirichi_gallo','res/raw/chicchirichi_gallo_sprite.svg',768);
						spritesheet = sprites.chicchirichi.chicchirichi_gallo;
//						var framesSequence = {"chicchirichi": [1,2,3,4,5,6,5,4,3,2,1]};
						framesSequence = [1,2,3,4,5,6,5,4,3,2,1];
						setSprite(spritesheet, framesSequence);
						var renderingWidth = canvas.width,
										renderingHeight = canvas.height,
										durationMs = 500;
						drawSpriteFrame(context, spritesheet, 1, renderingWidth, renderingHeight);
						function playChicchirichi(){
								animateSprite(context, spritesheet, framesSequence, renderingWidth, renderingHeight, durationMs);
								playAudio(audios.chicchirichi_gallo_animal);
						}
						playChicchirichi();
						$('#chicchirichi').on("tap",function(event){
								console.log('#chicchirichi tapped');
								playChicchirichi();
						});
				});
				$(document).on('pagebeforeshow', '#cattivo-inapp', function(event){
						$("#text").html(json.faces.cattivo.web_title);
						var imageFiles = new Array('res/raw/cattivo_sprite.svg');
						preloadImages(imageFiles);
						cattivo_am_sounds = ["res/raw/cattivo_sound_am_001.mp3","res/raw/cattivo_sound_am_002.mp3","res/raw/cattivo_sound_am_003.mp3"];
						cattivo_bu_sounds = ["res/raw/cattivo_sound_bu_001.mp3"];
						preloadAudios(cattivo_am_sounds,'cattivo_am');
						preloadAudios(cattivo_bu_sounds,'cattivo_bu');
						console.log(audios);
				});
				$(document).on('pageshow', '#cattivo-inapp', function(event){
						var face = $(".face");
						timers['bu'] = new Object();
						function initTimerBu(){
								timers['bu']['status'] = false;
								timers['bu']['id'] = setTimeout(function(){
										timers['bu']['status'] = true;
										console.log('Timeout (timers.bu.status = '+timers['bu']['status']+')');
								},20000);
						}
						initTimerBu();
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
										initTimerBu();
										$(this).removeClass("bu");
								}
								if($(this).hasClass("starts")){
										$(this).removeClass("starts");
										console.log("Starting blinking every 3s");
										timers.blinksInterval = setInterval(function(){
												animate(face,"blinks");
										},3000);
								}
						});
						animate(face,"starts");
						face.on("tap",function(event){
								console.log("Face tapped");
								console.log('isBuTime: '+timers.bu.status);
								if(timers.bu.status == true){
										animate(face,"bu",audios.cattivo_bu);
								} else {
										animate(face,"bites",audios.cattivo_am);
								}
						});
				});
				$(document).on('pagebeforehide', '#cattivo-inapp', function(event){
						clearInterval(timers.blinksInterval);
						console.log('Interval cleared (blinksInterval)');
				});
		}
}
