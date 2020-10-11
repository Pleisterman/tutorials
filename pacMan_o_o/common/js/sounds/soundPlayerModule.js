/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O
  
        file:       soundPlayerModule.js
        function:   loads and plays sounds
                    checks audio capabilities
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: soundPlayerModule( void ) void 
    
    app.soundPlayerModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'soundPlayerModule';                          // string
        self.debugOn = true;                                        // boolean
        self.modules = {};                                          // named array
        self.resources = {};                                        // named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create modules            
            self.createModules();
            
            // add the extensions to app
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add sound
            app.addSound = self.addSound;
            
            // remove sound
            app.removeSound = self.removeSound;
            
            // preload sound
            app.preloadSound = self.preload;
            
            // play sound
            app.playSound = self.playSound;
            
            // start sound effect
            app.startSoundEffect = self.startSoundEffect;
            
            // end sound effect
            app.endSoundEffect = self.endSoundEffect;
            
            // stop sound
            app.stopSound = self.stopSound;
            
            // pause audio
            app.pauseAudio = self.pauseAudio;
            
            // resume audio
            app.resumeAudio = self.resumeAudio;
            
            // stop audio
            app.stopAudio = self.stopAudio;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.createModules = function() {
        // FUNCTION: createModules( void ) void
            
            // debug info
            self.debug( 'createModules' );

            // create capabilities module
            self.modules['capabilities'] = new app.soundCapabilitiesModule();

            // create resource loader module
            self.modules['resourceLoader'] = new app.soundResourceLoaderModule();

        // DONE FUNCTION: createModules( void ) void
        };
        self.preload = function() {
        // FUNCTION: preload( void ) void
            
            // call resource loader
            self.modules['resourceLoader'].preload( self.resources, self.preloaded );
            
        // DONE FUNCTION: preload( void ) void
        };
        self.addSound = function( options ) {
        // FUNCTION: addSound( named array: options ) void
            
            // resource ! exists
            if( self.resources[options['id']] === undefined ){
                
                // create resource
                self.resources[options['id']] = new app.soundResourceModule( options );
                
            }
            // resource ! exists
            
        // DONE FUNCTION: addSound( named array: options ) void
        };
        self.removeSound = function( options ) {
        // FUNCTION: removeSound( named array: options ) void
            
            // resource ! exists
            if( self.resources[options['id']] === undefined ){
                
                // destroy resource
                self.resources[options['id']].destruct( );
                
                // remove resource
                delete self.resources[options['id']];
                
            }
            // resource ! exists
            
        // DONE FUNCTION: removeSound( named array: options ) void
        };
        self.playSound = function( options ) {
        // FUNCTION: playSound( named array: options ) void

            // sound ! exists
            if( self.resources[options['id']] === undefined ){

                // done
                return;
                
            }
            // sound ! exists
            
            // call resource
            self.resources[options['id']].play( options );
            
        // DONE FUNCTION: playSound( named array: options ) void
        };
        self.startSoundEffect = function( effectId ) {
        // FUNCTION: startSoundEffect( string: effectId ) void

            // loop over resources
            $.each( self.resources, function( index, resource ) {

                // call resource
                resource.startEffect( effectId );

            });
            // loop over resources

        // DONE FUNCTION: startSoundEffect( string: effectId ) void
        };
        self.endSoundEffect = function( effectId ) {
        // FUNCTION: endSoundEffect( string: effectId ) void

            // loop over resources
            $.each( self.resources, function( index, resource ) {

                // call resource
                resource.endEffect( effectId );

            });
            // loop over resources

        // DONE FUNCTION: endSoundEffect( string: effectId ) void
        };
        self.stopSound = function( options ) {
        // FUNCTION: stopSound( named array: options ) void
            
        // DONE FUNCTION: stopSound( named array: options ) void
        };
        self.pauseAudio = function() {
        // FUNCTION: pauseAudio( void ) void
            
            // loop over resources
            $.each( self.resources, function( index, resource ) {

                // call resource
                resource.pause( );

            });
            // loop over resources

        // DONE FUNCTION: pauseAudio( void ) void
        };
        self.resumeAudio = function() {
        // FUNCTION: resumeAudio( void ) void
            
            // loop over resources
            $.each( self.resources, function( index, resource ) {

                // call resource
                resource.resume( );

            });
            // loop over resources

        // DONE FUNCTION: resumeAudio( void ) void
        };
        self.stopAudio = function() {
        // FUNCTION: stopAudio( void ) void
            
            // loop over resources
            $.each( self.resources, function( index, resource ) {

                // call resource
                resource.stop( );

            });
            // loop over resources

        // DONE FUNCTION: stopAudio( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // call debug
                jsProject.debug( self.MODULE + ' ' + message );
                
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
    // DONE MODULE: soundPlayerModule( void ) void
    
})( app );
// done create module function
