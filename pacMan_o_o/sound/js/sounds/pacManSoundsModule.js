/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O
  
        file:       pacManSoundsModule.js
        function:   contains the sounds for the app
                    adds the sounds to the player
                    calls the preload
  
        Last revision: 05-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManSoundsModule( void ) void 
    
    app.pacManSoundsModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManSoundsModule';                         // string
        self.debugOn = true;                                        // boolean
        self.sounds = {                                             // named array
            'point' : {                                             // named array
                'id'            :   'eatPoint',                     // boolean
                'copies'        :   8,                              // integer
                'sources' : {                                       // named aray
                    'ogg'       :   '../common/assets/sounds/point.ogg', // path
                    'mp3'       :   '../common/assets/sounds/point.mp3'  // path
                },                                                  // done named array
                'loop'          :   false,                          // boolean
                'playbackRate'  :   1.0,                            // float,
                'volume'        :   0.4                             // float,
            },                                                      // done named array    
            'background01' : {                                      // named array
                'id'            :   'background01',                 // boolean
                'effects' : {                                       // named array
                    'powerUp' : {                                   // named array
                        'volume'        :   0.5,                    // float
                        'playbackRate'  :   1.2,                    // float
                    },                                              // done named array
                },                                                  // done named array
                'sources' : {                                       // named aray
                    'ogg'       :   '../common/assets/sounds/background01.ogg', // path
                    'mp3'       :   '../common/assets/sounds/background01.mp3'  // path
                },                                                  // done named array
                'loop'          :   true,                           // boolean
                'canBePaused'   :   true,                           // boolean
                'volume'        :   0.2                             // float,
            },                                                      // done named array    
            'powerUp' : {                                           // named array
                'id'            :   'powerUp',                      // boolean
                'sources' : {                                       // named aray
                    'ogg'       :   '../common/assets/sounds/powerUp.ogg', // path
                    'mp3'       :   '../common/assets/sounds/powerUp.mp3'  // path
                },                                                  // done named array
                'loop'          :   false,                          // boolean
                'volume'        :   0.6                             // float,
            },                                                      // done named array    
            'lifeLost' : {                                          // named array
                'id'            :   'lifeLost',                     // boolean
                'sources' : {                                       // named aray
                    'ogg'       :   '../common/assets/sounds/pacmanIsDead.ogg', // path
                    'mp3'       :   '../common/assets/sounds/pacmanIsDead.mp3'  // path
                },                                                  // done named array
                'loop'          :   false,                          // boolean
                'playbackRate'  :   1.0,                            // float,
                'volume'        :   1.0                             // float,
            },                                                      // done named array    
            'levelComplete' : {                                     // named array
                'id'            :   'levelComplete',                // boolean
                'sources' : {                                       // named aray
                    'ogg'       :   '../common/assets/sounds/levelComplete.ogg', // path
                    'mp3'       :   '../common/assets/sounds/levelComplete.mp3'  // path
                },                                                  // done named array
                'loop'          :   true,                           // boolean
                'canBePaused'   :   true,                           // boolean
                'volume'        :   0.2                             // float,
            },                                                      // done named array    
            'gameOver' : {                                          // named array
                'file'          :   '',                             // url
            },                                                      // done named array    
            'gameWon' : {                                           // named array
                'file'          :   '',                             // url
            }                                                       // done named array    
        };                                                          // done named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // preload            
            self.preload();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.preload = function() {
        // FUNCTION: preload( void ) void
            
            // debug info
            self.debug( 'preload' );

            // loop over sounds
            $.each( self.sounds, function( index, sound ) {
            
                // sources exists
                if( sound['sources'] !== undefined ){

                    // add sound
                    app.addSound( sound );
                    
                }
                // sources exists

            });
            // loop over sounds

            // preload
            app.preloadSound();

        // DONE FUNCTION: preload( void ) void
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
    // DONE MODULE: pacManSoundsModule( void ) void
    
})( app );
// done create module function
