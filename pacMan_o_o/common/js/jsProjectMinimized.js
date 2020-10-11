/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose: this file contains the global variable jsProject
*          The module jsProject contains 
*          the modules:
*               valuesModule    storage for global values by group name
*               eventsModule    event manager with subscription service
*               debugModule     displays debug info
*               ajaxModule      make ajex calls
*               browserModule   controls access to browser info
*               cookieModule    controls access to cookies 
*               resourcesModule controls preloading of resources ( images and sounds )
*               
* Usage:    Add the all the scripts, starting with the jsProject file, to the html page.
*           contstruct the jsProject:
*               jsProjects = new jsProject()
*           
*                         
* Last revision: 24-11-2015 
* 
* NOTICE OF LICENSE
*
* Copyright (C) 2015  Pleisterman
* 
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
* 
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// global var jsProject
var jsProject = ( function( ) {

    // jsProject    
    
    // private 
    var self = this;
    self.MODULE = 'jsProject';
    self.debugger = null;
    self.values = null;
    self.ajax = null;
    self.browser = null;
    self.storage = null;
    self.assets = null;
    self.events = null;
    self.debugger = null;
    self.functionsModule = null;
    self.jsonToElementHtmlModule = null;
    
    // construct the project only once
    self.constructed = false;

    // functions                          
    self.construct = function() {
        //only one instance of jsProject is constructed
        if( self.constructed ) {
            return false;
        }

        // create an empty debug function
        jsProject.debug = function(){};
        // will be overwritten by debugger 
        
        self.constructed = true;
        
        self.values = new jsProject.valuesModule();
        self.events = new jsProject.eventsModule();
        self.ajax = new jsProject.ajaxModule();
        self.browser = new jsProject.browserModule();
        self.storage = new jsProject.storageModule();
        self.assets = new jsProject.assetsModule();
        self.functions = new jsProject.functionsModule();
        self.jsonToElementHtmlModule = new jsProject.jsonToElementHtmlModule();
        
    };
    self.debugOn = function( debugOn, options ){
        if( debugOn ){
            // create the debugger
            jsProject.debugger = new jsProject.debugModule( options );
        }
    };
    // public
    return {
        construct : function() {
            self.construct();
        },
        debugOn : function( debugOn, options ) {
            self.debugOn( debugOn, options );
        }
    };
})();
 
/*
        @package    Pleisterman/jsProject
  
        file:       ajaxModule.js
        function:   handels ajax calls for the application
  
        Last revision: 26-01-2019
 
*/

// create module function
( function( jsProject ){

    // MODULE: ajaxModule( void ) void 
    
    jsProject.ajaxModule = function( ) {
    // PRIVATE:
    
        // MEMBERS
        var self = this;                                    // object
        self.MODULE = 'ajaxModule';                         // string
        self.debugOn = false;                               // boolean
        self.procesId = 0;                                  // integer
        self.processes = {};                                // named array
        self.errorHandler = null;                           // function / null
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // add the extensions to pleisterman
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add post
            jsProject.post = self.post;
            // add set ajax error handler
            jsProject.setAjaxErrorHandler = self.setErrorHandler;
            // add download
            jsProject.download = self.download;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.post = function( url, data, callback ) {
        // FUNCTION post( string: url, named array: data, function: callback ) void

            // add procesId to data
            data['procesId'] = self.procesId;
                
            // debug info
            self.debug( 'new post procesId: ' + data['procesId']  + ' url: ' + url + ' subject: ' + data['subject'] );
            
            // create a process
            var proces = {  'id'            : self.procesId,
                            'url'           : url,
                            'isSecure'      : false,
                            'data'          : data,
                            'callback'      : callback 
                        };
            // done create a process
            
            // increment procesId
            self.procesId++;
            
            // add the proces to the list
            self.processes[proces['id']] = proces;
            
            // make ajax call
            $.ajax({
                type: "POST",
                async: true,
                url: url,
                data: data,
                dataType: 'json',
                success: function( result )
                {
                    // debug info
                    self.debug( 'ajax succes' );
                    // call succes
                    self.succes( result );
                },
                error: function( jqXHR, textStatus, errorThrown )
                {
                    // handle errors
                    self.handleErrors( jqXHR, textStatus, errorThrown );
                }
            });
            // done make ajax call
            
        // FUNCTION post( string: url, named array: data, function: callback ) void
        };
        self.setErrorHandler = function( errorHandler ) {
        // FUNCTION setErrorHandler( function: errorHandler ) void

            // set error handler
            self.errorHandler = errorHandler;

        // FUNCTION setErrorHandler( function: errorHandler ) void
        };
        self.download = function( url, token, data ) {
        // FUNCTION download( string: url, string: token, named array: data ) void
            
            // debug info
            self.debug( 'start download: ' + data['procesId']  + ' url: ' + url );
            
            // add token to data
            data['token'] = token;
            // create request
            var xhr = new XMLHttpRequest();
            // open request
            xhr.open('POST', url, true);
            // set response
            xhr.responseType = 'arraybuffer';
            
            // create onload
            xhr.onload = function () {
                
                // status 200
                if ( this.status === 200 ) {
                    
                    // create file name
                    var filename = "";
                    // get disposition
                    var disposition = xhr.getResponseHeader( 'Content-Disposition' );
                    
                    // disposition exists and has attachment
                    if ( disposition && disposition.indexOf( 'attachment' ) !== -1 ) {
                        
                        // create rexeg
                        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        // find filename matches
                        var matches = filenameRegex.exec( disposition );
                        
                        // has matches
                        if ( matches !== null && matches[1] ) { 
                            
                            // set file name
                            filename = matches[1].replace( /['"]/g, '' );
                            
                        }
                        // has matches
                        
                    }
                    // disposition exists and has attachment
                    
                    // get content type
                    var type = xhr.getResponseHeader('Content-Type');
                        
                    // create blob    
                    var blob = new Blob( [this.response], { type: type } );
                    
                    // navigator is microsoft / else
                    if( typeof window.navigator.msSaveBlob !== 'undefined' ){
                        
                        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                        window.navigator.msSaveBlob(blob, filename);
                        
                    } 
                    else {
                        
                        // create url
                        var URL = window.URL || window.webkitURL;
                        // create download url
                        var downloadUrl = URL.createObjectURL( blob );
                        
                        // file name exists / else
                        if ( filename ) {
                            
                            // use HTML5 a[download] attribute to specify filename
                            var a = document.createElement("a");
                            
                            // safari / else
                            if( typeof a.download === 'undefined' ) {
                                // set download url
                                window.location = downloadUrl;
                            } 
                            else {
                                // set download url
                                a.href = downloadUrl;
                                // set download
                                a.download = filename;
                                // append to body
                                document.body.appendChild(a);
                                // open file
                                a.click();
                                
                            }
                            // safari / else
                            
                        }
                        else {
                            // set location
                            window.location = downloadUrl;
                        }
                        // file name exists / else

                         // cleanup
                        setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100);
                        
                    }
                    // navigator is microsoft / else
                    
                }
                // status 200
                
            };
            // create onload

            // create header
            xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
            // send
            xhr.send( $.param( data ) );
            
        // FUNCTION download( string: url, string: token, named array: data ) void
        };
        self.downloadSucces = function( result ) {
        // FUNCTION downloadSucces( named array: result ) void

            // has download callback
            if( self.downloadCallback ){
                
                // call callback
                self.downloadCallback( result );
                // unset download callback 
                self.downloadCallback = null;
                
            }
            // has download callback
            
        // FUNCTION downloadSucces( named array: result ) void
        };
        self.succes = function( result ) {
        // FUNCTION succes( named array: result ) void
            
            // debug info
            self.debug( 'succes' );
            
            // procesId not defined / else
            if( result['procesId'] === undefined ){
                
                // log to console
                console.log( 'procesId = null error ' );
                
                // loop over result
                $.each( result, function( index, value ) {
                    
                    // log result
                    console.log( index + ": " + value );
                    
                } );
                // loop over result
                
            }
            else {
                
                // debug info
                self.debug( 'succes proces: ' + result['procesId'] );
                
                // create temp proces
                var proces = self.processes[result['procesId']];
                
                // remove proces
                delete self.processes[result['procesId']];

                // error hanler defined
                if( self.errorHandler ){
                    
                    // call error handler
                    self.errorHandler( result['result'], proces['callback'] );
                    
                }
                else {
                    
                    // make callback call
                    proces['callback']( result['result'] );
                    
                }
                // error hanler defined
                
            }
            // procesId not defined / else
            
        // FUNCTION succes( named array: result ) void
        };
        self.handleErrors = function( jqXHR, textStatus, errorThrown ) {
        // FUNCTION handleErrors( response: jqXHR, string: textStatus, string: errorThrown ) void
            
            // log error 
            console.log( 'ajax error' );
            
            // loop over response
            $.each( jqXHR, function( index, value ) {
                
                // log response
                console.log( index + ": " + value );
                
            } );
            // loop over response
                
            // debug info
            self.debug( '-------- ajax failed ---------' + textStatus );
            // debug info
            self.debug( 'textStatus:' + textStatus );
            // debug info
            self.debug( 'errorThrown:' + errorThrown );
            // debug info
            self.debug( '-------- end ajax failed ---------' + textStatus );
                    
        // FUNCTION handleErrors( response: jqXHR, string: textStatus, string: errorThrown ) void
        };
        self.debug = function( message ) {
        // FUNCTION debug( string: message ) void
        
            // debug is on
            if( self.debugOn ) {
                
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + message );
                
            }
            // done debug is on
            
        // FUNCTION debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        // DONE PRIVATE
            
        // PUBLIC
        return {
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: ajaxModule( void ) void 
    
})( jsProject );
// done create module function
/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose: this module controls the resources for the application 
*          resources are images, sounds, [ // later more? ]
*          when load is called the module will load the resources in the list
*          and call the callback when finished   
* Last revision: 03-11-2014
* 
* NOTICE OF LICENSE
*
* Copyright (C) 2014  Pleisterman
* 
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
* 
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

( function( jsProject ){
    jsProject.assetsModule = function( ) {


        /*
        *  module assetsModule 
        *  purpose:
        *          this module controls the resources for the application 
        *          resources are images, sounds, [ // later more? ]
        *          when load is called the module will load the resources in the list
        *          and call the callback when finished
        *          
        *   functions: 
        *       private:
        *           construct:      parameters: ( void ) return: void 
        *                           called by the module for initialization
        *           debug:          parameters: ( string string ) return: void
        *                           calls the jsProject.debug( string ) when self.debugOn
        *                           
        *  event subscription loadCancel                         
        */
    
        // private
        var self = this;
        self.MODULE = 'assetsModule';
        self.debugOn = false;

        // array to save the resources in
        self.resources = new Array();
        self.audioExtensions = [ "ogg", "wav", "mp3" ];
        self.playableAudioExtionsions = [];
        self.checkLoadTimer = null;
        self.checkLoadDelay = 2000;
        
        // store the callback for load
        self.callback = null;
        
        // functions
        self.construct = function() {
            self.debug( 'construct' );

            jsProject.addValue( "loadedResource", "resourceLoader", "" );

            self.checkAudioCapabilities();
            
            // add the acces functions for the app
            jsProject.addResource = self.add;
            jsProject.loadResources = self.load;
            jsProject.getResource = self.get;
            jsProject.freeResource = self.free;
            jsProject.canPlaySoundType = self.canPlaySoundType;
            
            jsProject.subscribeToEvent( 'loadCancel', self.loadCancel );
            
        };
        self.checkAudioCapabilities = function() {
            var audio = new Audio();
            for( var i = 0; i < self.audioExtensions.length; i++ ){
                if( audio.canPlayType( "audio/" + self.audioExtensions[i] ) ){
                    self.playableAudioExtionsions.push(self.audioExtensions[i]);
                }
            }
            for( var i = 0; i < self.playableAudioExtionsions.length; i++ ){
                self.debug( 'i can play ==== ' +  self.playableAudioExtionsions[i] );
            }
        };
        self.canPlaySoundType = function( type ) {
            for( var i = 0; i < self.playableAudioExtionsions.length; i++ ){
                if( self.playableAudioExtionsions[i] == type ){
                    return true;
                }
            }
            return false;
        };
        self.add = function( id, src, type  ) {
            self.debug( 'addResource: ' + id );
            var resource = { 'id' : id,
                             'loaded' : false, 
                             'src' : src,      
                             'type'  : type, 
                             'resource' : null };
           self.resources.push( resource );                  
        };
       
        self.load = function( callback ) {
            self.debug( 'load' );
            self.callback = callback;
            // loop the resource array and start loading
            var hasResourcesToLoad = false;
            self.resources.forEach( function( resource ) {
                // if resource is empty
                if( !resource['resource']) {
                    hasResourcesToLoad = true;
                    switch( resource['type'] ) {
                        case 'image' : {
                            resource['resource'] = new Image();
                            resource['resource'].onload = function() {
                                self.loaded( resource['id'] );
                            };
                            resource['resource'].src = resource['src'];
                            break;
                        }
                        case 'sound' : {
                            resource['resource'] = new Audio();
                            resource['resource'].src = resource['src'];
                            resource['resource'].onloadeddata = function() {
                                self.loaded( resource['id'] );
                            };
                            break;
                        }
                        default : {
                            self.debug( 'error unknown resource type: ' + resource['type'] );
                            break;
                        }
                    }
                }    
            });
            if(!hasResourcesToLoad){
                self.callback();
            }
            else {
                self.checkLoadTimer = setTimeout( function () { self.loadCheck(); }, self.checkLoadDelay );
            }            
        };
        self.loadCancel = function( ) {
            clearTimeout( self.checkLoadTimer );
        };
        self.loaded = function( id ) {
            self.debug( ' sceneResourceLoaded: ' + id );
           
            jsProject.setValue( "loadedResource", "resourceLoader", id );
            jsProject.callEvent( "resourceLoaded" );

            var allLoaded = true;
            self.resources.forEach( function( resource ) {
                // set loaded to true 
                if( resource['id'] == id ) {
                    resource['loaded'] = true;
                    resource['resource'].onloadeddata = null;
                }
                // check if all resource are loaded
                if( !resource['loaded'] ) {
                    allLoaded = false;
                }
            });
            if( allLoaded ){
                clearTimeout( self.checkLoadTimer );
                self.debug( 'allLoaded' );
                self.callback();
            }
        };        
        self.loadCheck = function( ) {
            self.debug( 'loadCheck' );
            self.callback();
        };
        
/*      
        self.load = function( callback ) {
            self.callback = callback;
            self.loadResource();
        }
        self.loadResource = function() {
            self.debug( 'loadResource' );
            if( self.checkLoadTimer ){
                clearTimeout( self.checkLoadTimer );
                self.checkLoadTimer = null;
            }
            var resourcesToLoad = false;
            self.resources.forEach( function( resource ) {
                if( !resource['resource'] && !resourcesToLoad ) {
                    resourcesToLoad = true;
                    switch( resource['type'] ) {
                        case 'image' : {
                            resource['resource'] = new Image();
                            resource['resource'].onload = function() {
                                self.loaded( resource['id'] );
                            };
                            resource['resource'].src = resource['src'];
                            break;
                        }
                        case 'sound' : {
                            resource['resource'] = new Audio();
                            resource['resource'].onloadeddata = function() {
                                self.debug( 'setting load event for' + resource['id'] );
                                self.loaded( resource['id'] );
                            };
                            resource['resource'].src = resource['src'];
                            break;
                        }
                        default : {
                            self.debug( 'error unknown resource type: ' + resource['type'] );
                            break;
                        }
                    }
                }                
            }); 
            if( !resourcesToLoad ){
                self.debug( 'allLoaded' );
                if( self.callback ){
                    self.callback();
                }
            }
            else {
                self.checkLoadTimer = setTimeout( function () { self.loadCheck(); }, self.checkLoadDelay );                
            }
        };
        self.loaded = function( id ) {
            self.debug( 'resourceLoaded: ' + id );
            if( self.checkLoadTimer ){
                clearTimeout( self.checkLoadTimer );
                self.checkLoadTimer = null;
            }
            self.loadResource();
        };
        self.loadCheck = function( ) {
            self.debug( 'loadCheck' );
            self.loadResource();
        };
*/        
        self.get = function( id, type ) {
            self.debug( 'resourceItem get id=' + id + ' type:'  + type );
            var resource = null;
            self.resources.forEach( function( resourceItem ) {
                if( resourceItem['id'] == id && resourceItem['type'] == type ) {
                   resource = resourceItem['resource'];
                }
            });
            if( resource ){
                return resource
            }
            else {
                self.debug( ' resource not found id: ' + id + ' type: ' + type );
            }
        };
        self.free = function( id, type ) {
            self.debug( 'resourceItem free id=' + id + ' type:'  + type );
            var resourceIndex = null;
            for( var i = 0; i < self.resources.length; i++ ){
                if( self.resources[i]['id'] == id && self.resources[i]['type'] == type ) {
                   self.resources[i]['resource'] = null;
                   resourceIndex = i;
                }
            }
            self.resources.splice( i, 1 );
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };
        
        // initialize the module 
        self.construct();

    };
})( jsProject );/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
*   // this module is part of jsProject
*   
* Purpose:  this module handles access to browser settings for the application 
*           the browser can be tested for capabilities, version, language
*           
*  ... Under development ...         
*           
* Last revision: 24-11-2015
* 
* NOTICE OF LICENSE
*
* Copyright (C) 2015  Pleisterman
* 
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
* 
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

( function( jsProject ){
    jsProject.browserModule = function( ) {
        
        // browserModule
        
        // private
        var self = this;
        self.MODULE = 'browserModule';
        self.debugOn = false;
        
        // functions
        self.construct = function() {
            self.debug( 'construct' );
            

        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the module 
        self.construct();
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds the check email syntax function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.checkEmailSyntaxFunction = function( ) {

        // checkEmailSyntaxFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'checkEmailSyntaxFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.checkEmailSyntax = self.checkEmailSyntax;
        };
        self.checkEmailSyntax = function( emailAdress ) {
            // create regular expression
            var regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,64})$/;
            // done
            return regEx.test( emailAdress );
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds the check email syntax function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.cookiesEnabledFunction = function( ) {

        // cookiesEnabledFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'cookiesEnabledFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add cookies enabled function
            jsProject.cookiesEnabled = self.cookiesEnabled;
        };
        self.cookiesEnabled = function( ) {
            
            try {
              document.cookie = 'cookietest=1';
              var cookiesEnabled = document.cookie.indexOf('cookietest=') !== -1;
              document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
              return cookiesEnabled;
            } catch (e) {
              return false;
            }
            
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds date json object to db date format function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.dateObjectToDbDateFunction = function( ) {

        // dateObjectToDbDateFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'dateObjectToDbDateFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.dateObjectToDbDate = self.dateObjectToDbDate;
        };
        self.dateObjectToDbDate = function( dateObject ){
            // create db date
            var dbDate = '';
            // get day
            dbDate = dateObject['year'];
            // get month
            dbDate += jsProject.pad( dateObject['month'], '0', 2 );
            // get year
            dbDate += jsProject.pad( dateObject['day'], '0', 2 );

            return dbDate;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds date json object to text format  function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.dateObjectToTextFunction = function( ) {

        // dateObjectToTextFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'dateObjectToTextFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.dateObjectToText = self.dateObjectToText;
        };
        self.dateObjectToText = function( dateObject ){
            // create text
            var text = '';
            // get day
            text = jsProject.pad( dateObject['day'], '0', 2 );
            text += '-';
            // get month
            text += jsProject.pad( dateObject['month'], '0', 2 );
            text += '-';
            // get year
            text += dateObject['year'];

            return text;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get tofday db datefunction to the
 *          application jsProject
 *          returns a dbDate format form a json date object
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.dbDateIsAfterDbDateFunction = function( ) {

        // dbDateIsAfterDbDateFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'dbDateIsAfterDbDateFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add db date after db date function
            jsProject.dbDateIsAfterDbDate = self.dbDateIsAfterDbDate;
        };
        self.dbDateIsAfterDbDate = function( dbDateAfter, dbDateBefore ){
            
            // get after date object
            var afterDateObject = jsProject.dbDateToDateObject( dbDateAfter );
            // get before date object
            var beforeDateObject = jsProject.dbDateToDateObject( dbDateBefore );
            
            // create before date
            var beforeDate = new Date( beforeDateObject['year'], parseInt( beforeDateObject['month'] ) - 1, beforeDateObject['day'] );
            // create after date
            var afterDate = new Date( afterDateObject['year'], parseInt( afterDateObject['month'] ) - 1, afterDateObject['day'] );
            
            // after is after
            if( afterDate > beforeDate ){
                // after
                return true;
            } 
            // after is after
            
            // ! after
            return false;
            
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module db date format to date json object function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.dbDateToDateObjectFunction = function( ) {

        // dbDateToDateObjectFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'dbDateToDateObjectFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.dbDateToDateObject = self.dbDateToDateObject;
        };
        self.dbDateToDateObject = function( dbDate ){
            // create object from db date
            var dateObject = {
                'day'   : parseInt( dbDate.slice( 6, 8 ) ),
                'month' : parseInt( dbDate.slice( 4, 6 ) ),
                'year'  : parseInt( dbDate.slice( 0, 4 ) ) 
            };
            // done create object from db date

            return dateObject;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
*   // this module is part of jsProject
* 
* Purpose:  this module displays debug info for the application.
*           
* Usage:    call jsProject.debugOn( true, zIndex );
*           the module will add a dragable window on the screen with the provided zIndex.
*           the module adds the function debug to the jsProject module
*           jsProject.debug( string message );
*           will prepend the provided message to the debug window
*           
* Last revision: 24-11-2015
* 
* NOTICE OF LICENSE
*
* Copyright (C) 2015  Pleisterman
* 
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
* 
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

( function( jsProject ){
    jsProject.debugModule = function( options ) {

        // debugModule

        // private
        var self = this;
        self.debugOn = true;
        self.MODULE = 'debugModule';
        self.options = options;
        self.lineCounter = 0;
        
        // functions
        self.construct = function(){

            // create the html for the window
            var html = '';
            // debug div
            html += '<div id="jsProjectDebugDiv" ';
                html += 'style="';
                    html += ' position:absolute; ';
                    html += ' top: ' + self.options['top'] + 'px; ';
                    html += ' left: ' + self.options['left'] + 'px;';
                    html += ' z-index: ' + self.options['zIndex'] + ';';
                    html += ' border: lightblue 1px groove; ';
                    html += ' border-radius: 5px; ';
                html += '"';
            html += '>';
                // drag handle
                html += '<div id="jsProjectDebugDivDragHandle" ';
                    html += 'style="';
                        html += ' width:100%; ';
                        html += ' height:20px; ';
                        html += ' background-color:green; ';
                    html += '"';
                html += '>';
                
                html += '</div>';
                html += '<div id="jsProjectDebugDivContent" ';
                    html += 'style="';
                        html += ' overflow: auto; ';
                        html += ' width: ' + self.options['width'] + 'px; ';
                        html += ' height: ' + self.options['height'] + 'px;';
                        html += ' background-color:black;color:white;font-size:18px;font-family ';
                        html += ' font-size:18px;font-family:times new roman';
                    html += '"';
                html += '>';

                html += '</div>';
            html += '</div>';
            // done debug div
            $( document.body ).append( html );
            

            // add functions to application 
            jsProject.debug = self.debug;
            
                // add the drag events
            // store the className of the button div element
            $("#jsProjectDebugDivDragHandle" ).mouseenter( function( ){ self.dragHandleMouseIn(); } );
            $("#jsProjectDebugDivDragHandle" ).mouseout( function(){ self.dragHandleMouseOut(); } );
            $("#jsProjectDebugDivDragHandle" ).mousedown( function( event ){ self.dragHandleMouseClick( event ); } );
        };
        self.dragHandleMouseIn = function( ) {
            //self.debug( ' over');
            $("#jsProjectDebugDivDragHandle" ).css('background-color', 'lightgreen' ); 
        };
        self.dragHandleMouseOut = function( ) {
            //self.debug( ' out' );
            $("#jsProjectDebugDivDragHandle" ).css('background-color', 'green' ); 
        };
        self.dragHandleMouseClick = function( event ) {
            //self.debug( ' down' );
            self.lastPosition = { 'x' : event.pageX, 'y' : event.pageY };
            
            $(document).on( 'mousemove', function( event ) { self.move( event ); } );
            $(document).on( 'mouseup', function( event ) { self.up( event ); } );
        };
        self.move = function( event ) {
            //self.debug( ' move' );
            self.positionChange = { 'x' : 0, 'y' : 0 };
            self.positionChange['y'] = self.lastPosition['y'] - event.pageY;
            self.positionChange['x'] = self.lastPosition['x'] - event.pageX;
            var newTop = parseFloat( $('#jsProjectDebugDiv').offset().top ) - parseFloat( self.positionChange['y'] ),
                newLeft = parseFloat( $('#jsProjectDebugDiv').offset().left ) - parseFloat( self.positionChange['x'] );
            if( newTop < 0 ){
                newTop = 0;
            } 
            if( newLeft < 0 ){
                newLeft = 0;
            } 
            
            $( '#jsProjectDebugDiv' ).css( 'top', newTop );
            $( '#jsProjectDebugDiv' ).css( 'left', newLeft );
            self.lastPosition = { 'x' : event.pageX, 'y' : event.pageY };
        }; 
        self.up = function( event ) { 
            //self.debug( ' up' );
            $(document).off('mousemove');
            $(document).off('mouseup');
        }; 
        self.debug = function( message ){
            // function prepends the message to the div
            if( self.debugOn ) {
                $( '#jsProjectDebugDivContent' ).prepend( jsProject.pad( self.lineCounter, '0', 2 ) + '-' + message + '<br/>' );
                self.lineCounter++;
                self.lineCounter %= 10; 
            }
        };
        
        // initialize the class
        self.construct();
    };
    
})( jsProject );


/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds element is visible function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.elementIsVisibleFunction = function( ) {

        // elementIsVisibleFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'elementIsVisibleFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.elementIsVisible = self.elementIsVisible;
        };
        self.elementIsVisible = function( elementId, parentId ) {
            var elementTop = $( '#' + elementId ).offset().top;
            var parentTop = $( '#' + parentId ).offset().top;
            var screenHeight = $( '#' + parentId ).height();
            self.debug( 'elementTop: ' + elementTop );
            self.debug( 'parentTop: ' + parentTop );
            self.debug( 'screenHeight: ' + screenHeight );
            
            if( elementTop > screenHeight ){ 
                self.debug( 'item not visible' );
                // doen elenent not visible
                return false;
            }
            if( elementTop < parentTop ){ 
                self.debug( 'item not visible' );
                // doen elenent not visible
                return false;
            }
            self.debug( 'item visible' );
            // done element visible
            return true;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
* Purpose:  this module controls custom events for the application 
*           application objects can subscribe to an event with a callback 
*           application objects can call events and subscribed object's callbacks will be called
*           events are called synchronious in order of addition
*           application objects can unsubscribe from events
*           
* Usage:    call jsProject.subscribeToEvent( eventId, callback );
*               to add an event subscription
*           call jsProject.unSubscribeFromEvent( eventId, callback );
*               to remove an added event subscription
*           call jsProject.callEvent( eventId );
*               call all subscribed events 
*               
* Last revision: 24-11-2015
* 
* NOTICE OF LICENSE
*
* Copyright (C) 2015  Pleisterman
* 
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
* 
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

( function( jsProject ){
    jsProject.eventsModule = function( ) {

        // eventsModule
        
        // private
        var self = this;
        self.debugOn = false;
        self.MODULE = 'eventsModule';
        
        // the event object to store the events
        self.events = {};

        // functions                              
        self.construct = function() {
            self.debug( 'construct ' );
             
            // add the functions to jsProject
            jsProject.subscribeToEvent = self.subscribe;
            jsProject.unSubscribeFromEvent = self.unSubscribe;
            jsProject.callEvent = self.call;
            // done add the functions to jsProject

        };
        self.subscribe = function( eventId, callback ) {
            self.debug( 'subscribe: '  + eventId );
            // check if the eventId exists
            if( !self.events[eventId] ){
                // no event so create a new callback list
                self.events[eventId] = new Array();
            }
            // add the callback to the list
            var eventObject = {
                'callback'  :   callback
            };
            self.events[eventId].push( eventObject );
        };
        self.unSubscribe = function( eventId, callback ) {
            self.debug( 'unSubscribe: ' + eventId );
            // check if the eventId exists
            if( self.events[eventId] ){
                for( var i = self.events[eventId].length - 1; i >= 0 ; i-- ) {
                    // check if the callback matches
                    if( self.events[eventId][i]['callback'] === callback ) {
                        // remove the callback from the list 
                        self.events[eventId].splice( i, 1 );
                    }
                }
            }
        };
        self.call = function( eventId, options ) {
            self.debug( 'call: ' + eventId );
            // check if the eventId exists
            if( self.events[eventId] ){
                var callbacks = [];
                // call the callbacks
                for( var i = 0; i < self.events[eventId].length; i++ ) {
                    callbacks.push( self.events[eventId][i]['callback'] );
                }
                for( var i = 0; i < callbacks.length; i++ ) {
                    callbacks[i]( options );
                }
            }
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };
        // initialize the module 
        self.construct();
        
    };
    
})( jsProject );


/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds the functions to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.functionsModule = function( ) {

        // functionsModule 
        
        // private
        var self = this;
        self.MODULE = 'functionsModule';
        self.debugOn = false;  
        // common functions
        self.getLinearGradientPrefixFunction = null;// function module
        self.getJsonValueFunction = null;           // function module
        self.elementIsVisibleFunction = null;       // function module
        self.scrollElementFunction = null;          // function module
        self.getElementPositionFunction = null;     // function module
        // text functions
        self.padfunction = null;                    // function module
        self.checkEmailSyntaxFunction = null;       // function module
        self.xorStringFunction = null;              // function module
        self.orderArrayFunction = null;             // function module
        // date functions
        self.dateObjectToDbDateFunction = null;     // function module
        self.dateObjectToTextFunction = null;       // function module
        self.dbDateToDateObjectFunction = null;     // function module
        self.getNextDayFunction = null;             // function module
        self.getPreviousDayFunction = null;         // function module
        self.getTodayDbDateFunction = null;         // function module
        self.getTodayTextFunction = null;           // function module
        self.getWeekFunction = null;                // function module
        self.textToDateObjectFunction = null;       // function module
        self.dbDateIsAfterDbDateFunction = null;    // function module
        // color functions
        self.hexStringToRgbFunction = null;         // function module
        self.hsvToRgbFunction = null;               // function module
        self.rgbIsRgbFunction = null;               // function module
        self.rgbToHexStringFunction = null;         // function module
        self.rgbToHsvFunction = null;               // function module
        self.rgbToStringFunction = null;            // function module
        self.stringToRgbFunction = null;            // function module
        // cookie functions
        self.cookiesEnabledFunction = null;         // function module
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create common functions 
            self.addCommonFunctions();
            // create text functions 
            self.addTextFunctions();
            // create date functions 
            self.addDateFunctions();
            // create color functions 
            self.addColorFunctions();
            // create cookie functions 
            self.addCookieFunctions();
            
        };
        self.addCommonFunctions = function( ){
            // add get gradient prefix value
            self.getLinearGradientPrefixFunction = new jsProject.getLinearGradientPrefixFunction();
            // add get json value
            self.getJsonValueFunction = new jsProject.getJsonValueFunction();
            // add get element position
            self.getElementPositionFunction = new jsProject.getElementPositionFunction();
            // add get element is visible
            self.elementIsVisibleFunction = new jsProject.elementIsVisibleFunction();
            // add scroll element
            self.scrollElementFunction = new jsProject.scrollElementFunction();
        };
        self.addTextFunctions = function( ){
            // add pad
            self.padfunction = new jsProject.padFunction();
            // add check email syntax
            self.checkEmailSyntaxFunction = new jsProject.checkEmailSyntaxFunction();
            // add xor string
            self.xorStringFunction = new jsProject.xorStringFunction();
            // add order array
            self.orderArrayFunction = new jsProject.orderArrayFunction();

        };
        self.addDateFunctions = function( ){
            // add json date object to db date
            self.dateObjectToDbDateFunction = new jsProject.dateObjectToDbDateFunction();
            // add json date object to text
            self.dateObjectToTextFunction = new jsProject.dateObjectToTextFunction();
            // add db date to json date object
            self.dbDateToDateObjectFunction = new jsProject.dbDateToDateObjectFunction();
            // add get next day 
            self.getNextDayFunction = new jsProject.getNextDayFunction();
            // add get previous day 
            self.getPreviousDayFunction = new jsProject.getPreviousDayFunction();
            // add get today as string
            self.getTodayDbDateFunction = new jsProject.getTodayDbDateFunction();
            // add get today as string
            self.getTodayTextFunction = new jsProject.getTodayTextFunction();
            // add get week 
            self.getWeekFunction = new jsProject.getWeekFunction();
            // add text to date
            self.textToDateObjectFunction = new jsProject.textToDateObjectFunction();
            // add ia after date
            self.dbDateIsAfterDbDateFunction = new jsProject.dbDateIsAfterDbDateFunction();
        };
        self.addColorFunctions = function( ){
            // add string to rgb
            self.stringToRgbFunction = new jsProject.stringToRgbFunction();
            // add hex string to rgb
            self.hexStringToRgbFunction = new jsProject.hexStringToRgbFunction();
            // add hsv to rgb
            self.hsvToRgbFunction = new jsProject.hsvToRgbFunction();
            // add rgb is rgb
            self.rgbIsRgbFunction = new jsProject.rgbIsRgbFunction();
            // add rgb to hex string
            self.rgbToHexStringFunction = new jsProject.rgbToHexStringFunction();
            // add rgb to hsv json object
            self.rgbToHsvFunction = new jsProject.rgbToHsvFunction();
            // add rgb to string
            self.rgbToStringFunction = new jsProject.rgbToStringFunction();

        };
        self.addCookieFunctions = function( ){
            
            // add cookies enabled
            self.cookiesEnabledFunction = new jsProject.cookiesEnabledFunction();

        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get element position function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.getElementPositionFunction = function( ) {

        // getElementPositionFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'getElementPositionFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.getElementPosition = self.getElementPosition;
        };
        self.getElementPosition = function( elementId ){

            // create position
            var position = {
                'top'     :   0,
                'left'     :   0
            };        
            // done create position
            
            // get first element
            var element = document.getElementById( elementId ); 

            // loop over element.offsetParent
            while ( element ) {
                // add top and offset
                position['top'] += ( element.offsetTop + element.clientTop );
                // add left and offset
                position['left'] += ( element.offsetLeft + element.clientLeft );

                // get offset parent
                element = element.offsetParent;
            }
            // done loop over element.offsetParent

            // get first element        
            element = document.getElementById( elementId ); 
            // loop over element.parent
            while ( element ) {
                if ( element.tagName !== "BODY" ) {
                    // add scroll top
                    position['top'] -=  element.scrollTop || 0;
                    // add scroll left
                    position['left'] -=  element.scrollLeft || 0;
                }
                element = element.parentNode;
            }
            // done loop over element.parent
            
            return position;            
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get json value function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.getJsonValueFunction = function( ) {

        // getJsonValueFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'getJsonValueFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.getJsonValue = self.getJsonValue;
        };
        self.getJsonValue = function( jsonObject, indexArray ){
            // debug info
            self.debug( 'get json value' );
            
            // create depth
            var depth = 0;
            // get current object
            var currentObject = jsonObject;
            
            for( var i = 0; i < indexArray.length; i++ ){
            
                if( $.isArray( currentObject ) ){
                    self.debug( 'found array' + indexArray[depth] );
                    var indexValues = indexArray[depth].split( '=' );
                    var index = indexValues[0];
                    var value = indexValues[1];
                    // loop over jsonArray
                    $.each( currentObject, function( objectIndex, object ) {
                        if( object[index] === value ){
                            currentObject = object;
                            depth++;
                        }                        
                    }); 
                }
                else {
                    self.debug( 'found object' + indexArray[depth] );
                    currentObject = currentObject[indexArray[depth]];
                    depth++;
                }
            }
            
            // found the correct object
            if( depth === indexArray.length ){
                self.debug( 'value found: ' + currentObject );
                return currentObject;
            }
            // done found the correct object
            else {
                // not found
                console.log( 'error getJsonValue object not found ' );
                console.log( 'object' +  JSON.stringify( jsonObject ) );
                console.log( 'search array' + JSON.stringify( indexArray ) );
                
                return undefined;
            }
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get json value function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.getLinearGradientPrefixFunction = function( ) {

        // getLinearGradientPrefixFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'getLinearGradientPrefixFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.getLinearGradientPrefix = self.getLinearGradientPrefix;
            // add pad function
            jsProject.getLinearGradient = self.getLinearGradient;
        };
        self.getLinearGradientPrefix = function( ){
            // debug info
            self.debug( 'getLinearGradientPrefix; ');
            
            var styles = window.getComputedStyle( document.documentElement, '' );
            var pre = ( Array.prototype.slice
                            .call(styles)
                            .join('') 
                            .match( /-(moz|webkit|ms)-/ ) || ( styles.OLink === '' && [ '', 'o' ] ) )[1];
            var dom = ( 'WebKit|Moz|MS|O' ).match( new RegExp( '(' + pre + ')', 'i' ) )[1];
            if( pre !== '' ){
                pre = '-' + pre + '-';
            }
            return pre;
        };
        self.getLinearGradient = function( gradientOptions ){

            var userAgent = window.navigator.userAgent;
            var isIe = false;
            if( userAgent.indexOf("MSIE ") >= 0 ){
                isIe = true;
            };
            var linearGradient = '';
            
            // is ie
            if( !isIe ){
                // add prefix
                linearGradient += self.getLinearGradientPrefix( );
            }
            // done is ie
            
            // open gradient
            linearGradient += 'linear-gradient(';
            // is ie
            if( isIe ){
                // add prefix
                linearGradient += 'to ';
            }
            // done is ie
            
            // add direction
            linearGradient += gradientOptions['direction'] + ',';
            
            // loop over colors
            for ( var i = 0; i < gradientOptions['colors'].length; i++ ) {
                // add color
                linearGradient += gradientOptions['colors'][i];
                
                // not last color
                if( i < gradientOptions['colors'].length - 1 ){
                    // add comma
                    linearGradient += ',';
                }
                // done not last color
            }
            // done loop over colors
            
            // close gradient
            linearGradient += ')';
            
            // return gradient
            return linearGradient;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get next day function to the
 *          application jsProject
 *          returns json date object
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.getNextDayFunction = function( ) {

        // getNextDayFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'getNextDayFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.getNextDay = self.getNextDay;
        };
        self.getNextDay = function( dateObject ){
            var date = new Date( dateObject['year'], parseInt( dateObject['month'] ) - 1, dateObject['day'] );
            date.setHours(0, 0, 0, 0);
            date.setDate( date.getDate() + 1 ); 
            dateObject['year'] = date.getFullYear().toString();
            dateObject['month'] = date.getMonth() + 1;
            dateObject['day'] = date.getDate();
            return dateObject;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get previous day function to the
 *          application jsProject
 *          returns json date object
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.getPreviousDayFunction = function( ) {

        // getPreviousDayFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'getPreviousDayFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.getPreviousDay = self.getPreviousDay;
        };
        self.getPreviousDay = function( dateObject ){
            var date = new Date( dateObject['year'], parseInt( dateObject['month'] ) - 1, dateObject['day'] );
            date.setHours(0, 0, 0, 0);
            date.setDate( date.getDate() - 1 ); 
            dateObject['year'] = date.getFullYear().toString();
            dateObject['month'] = date.getMonth() + 1;
            dateObject['day'] = date.getDate();
            return dateObject;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get tofday db datefunction to the
 *          application jsProject
 *          returns a dbDate format form a json date object
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.getTodayDbDateFunction = function( ) {

        // getTodayDbDateFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'getTodayDbDateFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.getTodayDbDate = self.getTodayDbDate;
        };
        self.getTodayDbDate = function(){
            // create today text
            var date = new Date();
            var year = date.getFullYear().toString();
            var month = jsProject.pad( date.getMonth() + 1, '0', 2 );
            var day = jsProject.pad( date.getDate(), '0', 2 );
            return year + month + day;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get today text function to the
 *          application jsProject
 *          returns todays day in text format
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.getTodayTextFunction = function( ) {

        // getTodayTextFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'getTodayTextFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.getTodayText = self.getTodayText;
        };
        self.getTodayText = function(){
            // create today text
            var date = new Date();
            var year = date.getFullYear().toString();
            var month = jsProject.pad( date.getMonth() + 1, '0', 2 );
            var day = jsProject.pad( date.getDate(), '0', 2 );
            return day + '-' + month + '-' + year;
            
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds get json value function to the
 *          application jsProject
 *          returns week number
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.getWeekFunction = function( ) {

        // getWeekFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'getWeekFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.getWeek = self.getWeek;
        };
        self.getWeek = function( dateObject ){
            // calculate week number from date
            var date = new Date( dateObject['year'], dateObject['month'], dateObject['day'] );
            date.setHours(0, 0, 0, 0);
            date.setDate( date.getDate() + 3 - ( date.getDay() + 6 ) % 7 );
            var week = new Date( date.getFullYear(), 0, 4);
            return 1 + Math.round( ( ( date.getTime() - week.getTime()) / 86400000 - 3 + ( week.getDay() + 6 ) % 7 ) / 7 );
            // done calculate week number from date
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds hex json object to rgb string function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.hexStringToRgbFunction = function( ) {

        // hexStringToRgbFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'hexStringToRgbFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.hexStringToRgb = self.hexStringToRgb;
        };
        self.hexStringToRgb = function( hexString ){
            var r = parseInt( hexString.substring( 0, 2 ), 16 );
            if( isNaN( r ) ){
                r = 0;
            }
            var g = parseInt( hexString.substring( 2, 4 ), 16 );
            if( isNaN( g ) ){
                g = 0;
            }
            
            var b = parseInt( hexString.substring( 4, 6 ), 16 );
            if( isNaN( b) ){
                b = 0;
            }
            
            // return rgb object
            return { 
                'r' : r, 
                'g' : g, 
                'b' : b
            };
            // done return rgb object
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds hsv json object to rgs json object function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.hsvToRgbFunction = function( ) {

        // hsvToRgbFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'hsvToRgbFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.hsvToRgb = self.hsvToRgb;
        };
        self.hsvToRgb = function( hsv ){
                // create values
                var hue = hsv['h'];
                var saturation = hsv['s'];
                var value = hsv['v'];
                // done create values
                
                // create rgb
                var rgb = {
                    'r'     :   0,
                    'g'     :   0,
                    'b'     :   0
                };
                // done create rgb
                
                // calculate rgb
                var u = Math.round( 255 * ( value / 100 ) );
                if ( hue === null) {
                    rgb['r'] = u;
                    rgb['g'] = u;
                    rgb['b'] = u;
                    return rgb;
                }

                hue /= 60;
                saturation /= 100;
                var i = Math.floor( hue );
                var f = i % 2 ? hue - i : 1 - ( hue - i );
                var m = Math.round(  u * ( 1 - saturation ) );
                var n = Math.round( u * (1 - saturation * f ) );
                switch ( i ) {
                    case 1  :   {
                        rgb['r'] = n;
                        rgb['g'] = u;
                        rgb['b'] = m;
                        return rgb;
                    }  
                    case 2  :   {
                        rgb['r'] = m;
                        rgb['g'] = u;
                        rgb['b'] = n;
                        return rgb;
                    }  
                    case 3  :   {
                        rgb['r'] = m;
                        rgb['g'] = n;
                        rgb['b'] = u;
                        return rgb;
                    }  
                    case 4  :   {
                        rgb['r'] = n;
                        rgb['g'] = m;
                        rgb['b'] = u;
                        return rgb;
                    }  
                    case 5  :   {
                        rgb['r'] = u;
                        rgb['g'] = m;
                        rgb['b'] = n;
                        return rgb;
                    }  
                    default :   {
                        rgb['r'] = u;
                        rgb['g'] = n;
                        rgb['b'] = m;
                        return rgb;
                    }    
                }
                // done create rgb
                
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: 
 * 
 * Last revision: 15-11-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.jsonToElementHtmlModule = function( ) {

        // dataDivModule 
    
        // private
        var self = this;
        self.MODULE = 'jsonToElementHtmlModule';
        self.debugOn = false;
        self.closeElements = [
            'a',
            'div',
            'form',
            'svg',
            'iframe'
        ];
        self.properties = [
            'id',
            'name',
            'class',
            'type',
            'value',
            'src',
            'href',
            'target',
            'method',
            'action',
            'title',
            'size',
            'cols',
            'rows',
            'width',
            'height',
            'maxlength',
            'rowspan',
            'colspan'
            
        ];
        self.styles = {
            'zIndex'            :   'z-index',  
            'position'          :   'position',  
            'float'             :   'float',  
            'clear'             :   'clear',  
            'top'               :   'top',  
            'left'              :   'left',  
            'display'           :   'display',  
            'justifyContent'    :   'justify-content',  
            'alignItems'        :   'align-items',  
            'alignContent'      :   'align-content',  
            'flexWrap'          :   'flex-wrap',  
            'flexDirection'     :   'flex-direction',  
            'opacity'           :   'opacity',  
            'overflow'          :   'overflow',  
            'overflowX'         :   'overflow-x',  
            'overflowY'         :   'overflow-y',  
            'cursor'            :   'cursor',  
            'background'        :   'background',
            'backgroundColor'   :   'background-color',
            'backgroundRepeat'  :   'background-repeat',
            'backgroundPosition':   'background-position',
            'backgroundSize'    :   'background-size',
            'color'             :   'color',
            'minimumWidth'      :   'min-width',
            'maximumWidth'      :   'max-width',
            'minimumHeight'     :   'min-height',
            'maximumHeight'     :   'max-height',
            'styleWidth'        :   'width',
            'styleHeight'       :   'height',
            'fontFamily'        :   'font-family',
            'fontSize'          :   'font-size',
            'lineHeight'        :   'line-height',
            'letterSpacing'     :   'letter-spacing',
            'fontWeight'        :   'font-weight',
            'textAlign'         :   'text-align',
            'textDecoration'    :   'text-decoration',
            'verticalAlign'     :   'vertical-align',
            'margin'            :   'margin',
            'marginTop'         :   'margin-top',
            'marginLeft'        :   'margin-left',
            'marginRight'       :   'margin-right',
            'marginBottom'      :   'margin-bottom',
            'padding'           :   'padding',
            'paddingTop'        :   'padding-top',
            'paddingLeft'       :   'padding-left',
            'paddingRight'      :   'padding-right',
            'paddingBottom'     :   'padding-bottom',
            'imageUrl'          :   'background-image',
            'transformOrigin'   :   'transform-origin',
            'boxShadow'         :   'box-shadow',
            'textShadow'        :   'text-shadow'
        };
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // add the extensions to jsProject
            self.addApplicationsExtensions();

        };
        self.addApplicationsExtensions = function(){
            // add get element html
            jsProject.jsonToElementHtml = self.jsonToElementHtml;
            // add get element html
            jsProject.jsonIndexToCssIndex = self.jsonIndexToCssIndex;
        };
        self.jsonIndexToCssIndex = function( jsonIndex ) {
            // translate value
            return self.styles[jsonIndex];
        };
        self.jsonToElementHtml = function( options ) {
            var html = '';
            
            // element
            html += '<' + options['element'];
                html += self.addProperties( options );
                html += self.addStyle( options );
            html += '>';
            // done div header
                
            // text
            if( options['text'] ){
                html += options['text'];
            }
            // done text
            
            // close element
            if( self.closeElements.indexOf( options['element'] ) >= 0 ){
                html += '</' + options['element'] + '>';
            }
            
            return html;
        };
        self.addProperties = function( options ){
            var html = '';
            
            // add properties
            $.each( self.properties, function( index, value ) {
                if( options[value] !== undefined ){
                    html += ' ' + value + '="' + options[value]; 
                    if( typeof( options[value] ) === 'number' ){
                         html += 'px;';
                    }
                    html += '"';
                }
            } );
            // done add properties

            // read only
            if( options['readOnly'] ){
                html += ' readOnly '; 
            }
            // done read only

            // multiple
            if( options['multiple'] ){
                html += ' multiple '; 
            }
            // done multiple

            // checked
            if( options['checked'] ){
                html += ' checked '; 
            }
            // done checked

            // controls
            if( options['controls'] ){
                html += ' controls '; 
            }
            // done controls

            return html;
        };
        self.addStyle = function( options ){
            var html = '';
            // add style
            html += ' style="';
            
            // 
            $.each( self.styles, function( index, value ) {
                if( options[index] !== undefined ){
                    html += value + ' : ' + options[index];
/*                    if( typeof( options[index] ) === 'number' ){
                         html += 'px';
                    }
*/
                    html += ';';
                }
            });
            html += self.addBorder( options );
            
            
            html += '"';
            
            // done add style
            
            return html;
        };
        self.addBorder = function( options ){
            var html = '';
            
            // border
            if( options['border'] !== undefined  ){
                html += ' border: ';
                html += self.getBorderHtml( options );
            }
            // top border
            if( options['borderTop'] !== undefined ){
                html += ' border-top: ';
                html += self.getBorderHtml( options );
            }
            // left border
            if( options['borderLeft'] !== undefined ){
                html += ' border-left: ';
                html += self.getBorderHtml( options );
            }
            // right border
            if( options['borderRight'] !== undefined ){
                html += ' border-right: ';
                html += self.getBorderHtml( options );
            }
            // bottom border
            if( options['borderBottom'] !== undefined ){
                html += ' border-bottom: ';
                html += self.getBorderHtml( options );
            }
            
            // bottom radius
            if( options['borderRadius'] !== undefined ){
                html += ' border-radius: ';
                html += options['borderRadius'];
                if( typeof( options['borderRadius'] === 'number' ) ){
//                     html += 'px;';
                }
                html += ';';
            }
            return html;
        };
        self.getBorderHtml = function( options ){
            var html = '';
            html += options['borderWidth'];
            if( typeof( options['borderWidth'] === 'number' ) ){
            //     html += 'px ';
            }
            html += ' ';
            html += options['borderColor'];
            html += ' ';
            html += options['borderStyle'];
            html += ';';
            
            return html;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/* 
 *  Project: jsProject 
 * 
 *  File: mbCommon/js/data/orderArrayFunction.js
 * 
 *  Last revision: 02-01-2017
 * 
 *  Purpose: 
 *          this module ordering data by given text field
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2016 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( jsProject ){

    // FUNCTION: orderArrayFunction( void ) void
    
    jsProject.orderArrayFunction = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.FUNCTION = 'orderArrayFunction';               // string: FUNCTION
        self.debugOn = false;                               // boolean: debug
        
        // functions
        self.construct = function() {
        // FUNCTION: construct( void ) void
        
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function( ){
        // FUNCTION: addApplicationsExtensions( void ) void
        
            // add pad function
            jsProject.orderArray = self.orderArray;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.orderArray = function( textA, textB, textFieldId ) {
        // FUNCTION: orderArray( string: textA, string: textB, textFieldId: id of text files to order by ) array
        
            if ( textA[textFieldId] < textB[textFieldId] ){
              return 1;
            }
            if ( textA[textFieldId] > textB[textFieldId] ){
              return -1;
            }
            return 0;
            
        // DONE FUNCTION: orderArray( string: textA, string: textB, textFieldId: id of text files to order by ) array
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                // call global debug
                jsProject.debug( self.FUNCTION + ' ' + message );
            }
            // done debug on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        // DONE PRIVATE
        
        // PUBLIC
        return {
        };
        // DONE PUBLIC
    };
    // DONE FUNCTION: orderTextArrayFunction( void ) void 
})( jsProject );
//// done create module function

/* 
 *  Project: jsProject 
 * 
 *  File: mbCommon/js/data/orderTextArrayFunction.js
 * 
 *  Last revision: 02-01-2017
 * 
 *  Purpose: 
 *          this module ordering data by given text field
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2016 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( jsProject ){

    // FUNCTION: orderTextArrayFunction( void ) void
    
    jsProject.orderTextArrayFunction = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.FUNCTION = 'orderTextArrayFunction';           // string: FUNCTION
        self.debugOn = false;                               // boolean: debug
        
        // functions
        self.construct = function() {
        // FUNCTION: construct( void ) void
        
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function( ){
        // FUNCTION: addApplicationsExtensions( void ) void
        
            // add pad function
            jsProject.orderTextArray = self.orderTextArray;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.orderTextArray = function( textA, textB, textFieldId ) {
        // FUNCTION: orderTextArray( string: textA, string: textB, textFieldId: id of text files to order by ) array
        
            if ( textA[textFieldId] < textB[textFieldId] ){
              return 1;
            }
            if ( textA[textFieldId] > textB[textFieldId] ){
              return -1;
            }
            return 0;
            
        // DONE FUNCTION: orderTextArray( string: textA, string: textB, textFieldId: id of text files to order by ) array
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                // call global debug
                jsProject.debug( self.FUNCTION + ' ' + message );
            }
            // done debug on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        // DONE PRIVATE
        
        // PUBLIC
        return {
        };
        // DONE PUBLIC
    };
    // DONE FUNCTION: orderTextArrayFunction( void ) void 
})( jsProject );
//// done create module function

/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds pad function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.padFunction = function( ) {

        // padFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'padFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.pad = self.pad;
        };
        self.pad = function( string, padWith, padCount ) {
            // add padding to a string
            string = string.toString();
            // string lenght < pad count
            while( string.length < padCount ){
                string = padWith + string;
            }
            // done string lenght < pad count
            
            return string;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds check rgb json object vakues = rgb json object values function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.rgbIsRgbFunction = function( ) {

        // rgbIsRgbFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'rgbIsRgbFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.rgbIsRgb = self.rgbIsRgb;
        };
        self.rgbIsRgb = function( rgbA, rgbB ){
            if( rgbA['r'] === rgbB['r'] &&
                rgbA['g'] === rgbB['g'] &&
                rgbA['b'] === rgbB['b'] ) {
                return true;
            }
            return false;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds rgb json object to hex string function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.rgbToHexStringFunction = function( ) {

        // rgbToHexStringFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'rgbToHexStringFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.rgbToHexString = self.rgbToHexString;
        };
        self.rgbToHexString = function( rgb ){
            // create string
            var string = '';
            // add r
            string += jsProject.pad( rgb['r'].toString(16), '0', 2 );
            // add g
            string += jsProject.pad( rgb['g'].toString(16), '0', 2 );
            // add b
            string += jsProject.pad( rgb['b'].toString(16), '0', 2 );
            // done
            return string;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds rgb json object to hsv object function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.rgbToHsvFunction = function( ) {

        // rgbToHsvFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'rgbToHsvFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.rgbToHsv = self.rgbToHsv;
        };
        self.rgbToHsv = function( rgbToConvert ){
            // r: 0-255
            // g: 0-255
            // b: 0-255
            //
            // returns: [ 0-360, 0-100, 0-100 ]
            //
            
            // create hsv
            var hsv = {
                'h'     : 0,
                's'     : 0,
                'v'     : 0
            };
            // create hsv

            // copy rgbConvert
            var rgb = JSON.parse( JSON.stringify( rgbToConvert ) );
            
            rgb['r'] /= 255;
            rgb['g'] /= 255;
            rgb['b'] /= 255;
            
            // calculate hsv
            var n = Math.min( Math.min( rgb['r'], rgb['g'] ), rgb['b'] );
            var v = Math.max( Math.max( rgb['r'], rgb['g'] ), rgb['b'] );
            var m = v - n;
            if ( m === 0 ) { 
                hsv['h'] = null;
                hsv['s'] = 0;
                hsv['v'] = 100 * v;
                return hsv;
            }
            var h = rgb['r'] === n ? 3 + ( rgb['b'] - rgb['g'] ) / m : ( rgb['g'] === n ? 5 + ( rgb['r'] - rgb['b'] ) / m : 1 + ( rgb['g'] - rgb['r'] ) / m );
            hsv['h'] = 60 * ( h === 6 ? 0 : h );
            hsv['s'] = 100 * ( m / v );
            hsv['v'] = 100 * v;
            // done calculate hsv
            
            return hsv;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds rgb json object to rgb string function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.rgbToStringFunction = function( ) {

        // rgbToStringFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'rgbToStringFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.rgbToString = self.rgbToString;
        };
        self.rgbToString = function( rgb ){
            // create string
            var string = 'rgb( ';
            // add r
            string += Math.round( rgb['r'] );
            string += ',';
            // g
            string += Math.round( rgb['g'] );
            string += ',';
            // b
            string += Math.round( rgb['b'] );
            string += ' )';
            
            return string;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds element is visible function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.scrollElementFunction = function( ) {

        // scrollElementFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'scrollElementFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.scrollElement = self.scrollElement;
        };
        self.scrollElement = function( elementId, parentId ) {
            var elementTop = $( '#' + elementId ).offset().top;
            var parentTop = $( '#' + parentId ).offset().top;
            var screenHeight = $( '#' + parentId ).height();
            self.debug( 'elementTop: ' + elementTop );
            self.debug( 'parentTop: ' + parentTop );
            self.debug( 'screenHeight: ' + screenHeight );
            
            if( elementTop > screenHeight ){
                // debug info
                self.debug( 'item not visible' );

                // get element
                var element = document.getElementById( elementId );
                // make shure object is visible
                element.scrollIntoView( false );

                // done 
                return;
            }
            if( elementTop < parentTop ){ 
                // debug info
                self.debug( 'item not visible' );
                
                // get element
                var element = document.getElementById( elementId );
                // make shure object is visible
                element.scrollIntoView( true );

                // done 
                return;
            }
            // debug info
            self.debug( 'item visible' );
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
*   // this module is part of jsProject
*   
* Purpose:  this module controls acces to client storage for the application 
*           the module decides can store values in a cookie and local storage
*           
*           
* Last revision: 24-11-2015
* 
* NOTICE OF LICENSE
*
* Copyright (C) 2015  Pleisterman
* 
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
* 
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

( function( jsProject ){
    jsProject.storageModule = function( ) {
        /*
        *  module storageModule 
        * Purpose:  this module controls the cookies for the application 
        *           the module can be used to store values that persist over 
        *           different sessions of the application.
        *           
        *   functions: 
        *       private:
        *           construct:      parameters: ( void ) return: void 
        *                           called by the module for initialization
        *           getValue:       parameters: ( string id ) return: string / null
        *                           call to get a value associated with the id  
        *           setValue:       parameters: ( string id, string  value ) return: true / false 
        *                           call to set a value associated with the id  
        *           deleteValue:    parameters: ( string id ) return:  true / false 
        *                           call to delete a value associated with the id  
        *           debug:          parameters: ( string string ) return: void
        *                           calls the jsProject.debug( string ) when self.debugOn
        *           *       
        *  public: 
        *  The module will add the function setCookieValue to the application    
        *  The module will add the function getCookieValue to the application    
        *  The module will add the function deleteCookieValue to the application    
        */
    
        // private
        var self = this;
        self.MODULE = 'storageModule';
        self.debugOn = false;

        // functions
        self.construct = function() {
            self.debug( 'construct' );
 
            // add functions to application 
            jsProject.setCookieValue = self.setValue;
            jsProject.getCookieValue = self.getValue;
            jsProject.deleteCookieValue = self.deleteValue;
            
        };
        self.getValue = function ( id ) {
            // get the value associated with the id from the cookie
            var encodedId = encodeURIComponent( id ).replace( /[\-\.\+\*]/g, "\\$&" );
            var regularExpression = new RegExp( "(?:(?:^|.*;)\\s*" + encodedId + "\\s*\\=\\s*([^;]*).*$)|^.*$" );
            return decodeURIComponent( document.cookie.replace( regularExpression, "$1" ) ) || null;
        };        
        self.setValue = function ( id, domain, path, value, lifeTime ) {

            var sExpires = "";
            var date = new Date();
            date.setTime( date.getTime() + ( lifeTime * 1000 ) );
            sExpires = date.toUTCString();

            var cookieValue = '';
            cookieValue = encodeURIComponent( id )+ "=" + encodeURIComponent( value ) + ";";
            cookieValue += "Expires=" + sExpires; + ';';
            if( domain !== null ){
                cookieValue += "domain=" + domain  + ';';
            }
            if( path !== null ){
                cookieValue += "path=" + path  + ';';
            }
            cookieValue += "secure;";
            document.cookie = cookieValue;

        }
        self.deleteValue = function ( id ) {
            // check if the cookie was authorized.
            if( self.getValue( 'authorized' ) || id === 'authorized' ) {
                var sExpires = "";
                var date = new Date();
                // set the date to now - 1 to delete the cookie
                date.setTime( date.getTime() - 1 );
                sExpires = date.toUTCString();
                self.debug( sExpires );


                var cookieValue = '';
                cookieValue = encodeURIComponent( id )+ "=" + encodeURIComponent( ' ' ) + ";";
                cookieValue += "expires=" + sExpires;
                cookieValue += "domain=" + jsProject.getValue( 'cookieDomain', 'jsProject' );
                cookieValue +=  ";path=" + jsProject.getValue( 'cookiePath', 'jsProject' );
                if( jsProject.getValue( 'cookieSecure', 'jsProject' ) ){
                    cookieValue += ";secure";
                }
                document.cookie = cookieValue;
                return true;
            }
            else {
                self.debug( 'trying to delete cookie while not authorized cookie:' + id );
            }
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };
        
        // initialize the class if required 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds rgb string to json rgb object function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.stringToRgbFunction = function( ) {

        // stringToRgbFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'stringToRgbFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.stringToRgb = self.stringToRgb;
        };
        self.stringToRgb = function( string ){
            // get r
            var current = string.indexOf( "(" );
            current++;
            var next = string.indexOf( "," );
            var r = parseInt( string.slice( current, next ) );
            // get g
            current = next + 1;
            next = string.indexOf( ",", current );
            var g = parseInt( string.slice( current, next ) );
            // get b
            current = next + 1;
            next = string.indexOf( ")", current );
            var b = parseInt( string.slice( current, next ) );
            
            // return rgb object
            return { 
                'r' : r, 
                'g' : g, 
                'b' : b
            };
            // done return rgb object
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
 * Author: Pleisterman
 * Info: 
 * Web: www.pleisterman.nl 
 * Mail: info@pleisterman.nl 
 * GitHub: Pleisterman 
 * 
 * Purpose: this module adds text to date json object function to the
 *          application jsProject
 *          
 * Last revision: 29-10-2016
 * 
 * Copyright (C) 2016  Pleisterman
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

( function( jsProject ){
    jsProject.textToDateObjectFunction = function( ) {

        // textToDateObjectFunction 
        
        // private
        var self = this;
        self.FUNCTION = 'textToDateObjectFunction';
        self.debugOn = false;   
        
        // functions
        self.construct = function() {
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
        };
        self.addApplicationsExtensions = function( ){
            // add pad function
            jsProject.textToDateObject = self.textToDateObject;
        };
        self.textToDateObject = function( text ){
            // create object from db date
            var dateObject = {
                'day'   : parseInt( text.slice( 0, 2 ) ),
                'month' : parseInt( text.slice( 3, 5 ) ),
                'year'  : parseInt( text.slice( 6, 10 ) )  
            };
            // done create object from db date

            return dateObject;
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };

        // initialize the class 
        self.construct();
        
        // public
        return {
        };
    };
})( jsProject );/*
* Author: Pleisterman
* Info: 
* Web: www.pleisterman.nl 
* Mail: info@pleisterman.nl 
* GitHub: Pleisterman 
* 
*   // this module is part of jsProject
* 
* Purpose:  this module controls access to global values for the application
*           the values are mutable declarations which have global scope    
*           values are stored within a group
*           the module will add the functions:
*               addValue        create a new global value
*               addValueList    create a list of global values
*               getValue        get a value
*               setValue        set a value
*           to the jsProject Module
* 
* Usage:  
*           jsProject.getValue( string name, string group )
*           jsProject.addValueList( array[string id, misc value,..], string group )
*           jsProject.getValue( string name, string group )
*           jsProject.setValue( string name, string group, misc value )
* 
*          
* Last revision: 24-11-2015
* 
* NOTICE OF LICENSE
*
* Copyright (C) 2015  Pleisterman
* 
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
* 
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

( function( jsProject ){
    jsProject.valuesModule = function( ) {

        // valuesModule
        
        // private
        var self = this;
        self.MODULE = 'valuesModule';
        self.debugOn = false;
        
        // the groups object
        self.groups = {};

        // functions
        self.construct = function() {
            self.debug( 'construct' );

            // add functions to application 
            jsProject.addValue = self.addValue;
            jsProject.addValueList = self.addValueList;
            jsProject.getValue = self.getValue;
            jsProject.setValue = self.setValue;
                        
        };
        // add a value according to id
        self.addValue = function( id, group, value ) {
            self.debug( 'addValue: ' + 'id:' + id + ', group, :' + group + ', value:' + value );
            
            // check if the group exists
            if( self.groups[group] === undefined ){
                // create the group
                self.groups[group] = {};
            }    
            // check if the value exists
            if( self.groups[group][id] !== undefined ){
                if( self.debugOn ) {
                    // value exists error
                    self.debug( 'add value warning value already exists id: ' +  id );
                }                
            }
            else {
                // add the value
                self.groups[group][id] = value;
            } 
        };
        // add values according to list json{id,value}
        self.addValueList = function( valueList, group ) {
            self.debug( 'addValueList: group, :' + group );
            for (var key in valueList ) {
                self.addValue( key, group, valueList[key] );
            }                
        };
        // get  a value according to id
        self.getValue = function( id, group ) {
            self.debug( 'getValue: ' + 'id:' + id + ', group, :' + group );
            // check if the id exists
            if( self.groups[group][id] !== undefined ){
                // return the value
                return self.groups[group][id];
            }
            // id not found error
            self.debug( 'get value error value not found id: ' +  id );
            return false;
        };
        // set  a value according to id
        self.setValue = function( id, group, value ) {
            self.debug( 'setValue: ' + 'id:' + id + ', group, :' + group + ', value:' + value );
            // check if the value existst
            if( self.groups[group][id] !== undefined ){
                // set the value
                self.groups[group][id] = value;
            }
            // value not found error
            else if( self.debugOn ) {
                self.debug( 'set value error value not found id: ' +  id );
            }
        };
        self.debug = function( string ) {
            // debug on
            if( self.debugOn ) {
                // jsProject debug
                jsProject.debug( self.MODULE + ' ' + string );
            }
            // done debug on
        };
        
        // initialize the module 
        self.construct();
    };
    
})( jsProject );


/* 
 *  Project: jsProject 
 * 
 *  File: /js/jsProject/functions/xorStringFunction.js
 * 
 *  Last revision: 02-01-2017
 * 
 *  Purpose: 
 *          this module xor's 2 strings
 * 
 *  Author: Sharesoft
 *  Web: www.sharesoft.nl 
 *  Mail: info@sharesoft.nl 
 *  GitHub: SharesoftNL 
 * 
 *  Copyright (C) 2016 Sharesoft 
 *  GNU General Public License 3+ 
 *  see <http://www.gnu.org/licenses/>
 */

// create module function
( function( jsProject ){

    // FUNCTION: xorStringFunction( void ) void
    
    jsProject.xorStringFunction = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object: self
        self.FUNCTION = 'xorStringFunction';                  // string: FUNCTION
        self.debugOn = false;                               // boolean: debug
        
        // functions
        self.construct = function() {
        // FUNCTION: construct( void ) void
        
            // debug info
            self.debug( 'construct' );
            
            // create functions 
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function( ){
        // FUNCTION: addApplicationsExtensions( void ) void
        
            // add pad function
            jsProject.xorString = self.xorString;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.xorString = function( string, key ) {
        // FUNCTION: xorString( string: string, key ) string
        
            var result = '';
            // loop over chars of key string
            for( var i = 0; i < key.length; i++ ){
                if( i < string.length ){
                    // encode string char and key char
                    result += self.xorChar( string[i], key[i] );
                }
                else {
                    // encode space and key char
                    result += self.xorChar( ' ', key[i] );
                }
            }
            // done loop over chars of key string
            return result;
            
        // DONE FUNCTION: xorString( string: string, key ) string
        };
        self.xorChar = function( char, key ){
        // FUNCTION: xorChar( char: char, char: key ) char
        
            // get the integer of the char
            var intChar = parseInt( char.charCodeAt( 0 ) );
            // get the integer of the key
            var intKey = parseInt( key.charCodeAt( 0 ) );
            // char XOR key
            var xor = intChar ^ intKey;
            // return char
            return String.fromCharCode( xor );
            
        // DONE FUNCTION: xorChar( char: char, char: key ) char
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                // call global debug
                jsProject.debug( self.FUNCTION + ' ' + message );
            }
            // done debug on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        // DONE PRIVATE
        
        // PUBLIC
        return {
        };
        // DONE PUBLIC
    };
    // DONE FUNCTION: xorStringFunction( void ) void 
})( jsProject );
//// done create module function

