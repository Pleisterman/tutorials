/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O
  
        file:       soundCapabilitiesModule.js
        function:   loads and plays sounds
                    checks audio capabilities
  
        Last revision: 05-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: soundCapabilitiesModule( void ) void 
    
    app.soundCapabilitiesModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'soundCapabilitiesModule';                    // string
        self.debugOn = true;                                        // boolean
        self.soundTypes = [ "ogg", "wav", "mp3" ];                  // array
        self.playableSoundTypes = [];                               // array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // get capabilities
            self.getCapabilities();
            
            // add the extensions to app
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add can play sound type
            app.canPlaySoundType = self.canPlayType;
                        
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.canPlayType = function( type ) {
        // FUNCTION: canPlayType( string: type ) boolean
            
            // playable sound types has type
            if( self.playableSoundTypes.indexOf( type ) ){
                
                // return can play type
                return true;
                
            }
            // playable sound types has type
            
            // return cannot play type
            return false;
                        
        // DONE FUNCTION: canPlayType( string: type ) boolean
        };
        self.getCapabilities = function() {
        // FUNCTION: getCapabilities( void ) void
            
            // debug info
            self.debug( 'getCapabilities' );

            // create audio
            let audio = new Audio();
            
            // audio ! exists
            if( !audio ){
                
                // done
                return;
                
            }
            // audio ! exists
            
            // loop over sound types
            for( var i = 0; i < self.soundTypes.length; i++ ){

                // can play sound type
                if( audio.canPlayType( "audio/" + self.soundTypes[i] ) ){
                    
                    // add to playable sound types
                    self.playableSoundTypes.push( self.soundTypes[i] );
                    
                }
                // can play sound type
                
            }
            // loop over sound types
            
            // debug info
            self.debug( 'sound Capabilities: ' + self.playableSoundTypes.join() );

        // DONE FUNCTION: getCapabilities( void ) void
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
    // DONE MODULE: soundCapabilitiesModule( void ) void
    
})( app );
// done create module function
