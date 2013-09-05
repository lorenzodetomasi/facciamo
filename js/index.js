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
						var defaultLanguage = 'it';
						var userPreferredLanguage;
						var lang;
						var navigatorLanguage = navigator.language || navigator.userLanguage;
						if(userPreferredLanguage){
								lang = userPreferredLanguage;
						} else if(navigatorLanguage){
								lang = navigatorLanguage;
						}
						if(lang=='it_IT'){
								lang = 'it';
						}
						//$.mobile.defaultPageTransition = 'slide';
						function changePage(pageUrl,interval){
								setTimeout(function(){
										$.mobile.changePage(pageUrl);
								}, interval);
						}
						changePage("splash_"+lang+".html",0);
						$(document).on('pageshow', '#splash', function(event, ui){
								changePage("menu_"+lang+".html",4000);
						});
    },
};
