/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManLevels.js
        function:   Creates levels
  
        Last revision: 03-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManLevels( void ) void 
    
    app.pacManLevels = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManLevels';                               // string
        self.debugOn = false;                                       // boolean
        self.levels = [                                             // array
            {                                                       // named array
                'moduleObject'    :   app.pacManLevel_1,            // module name
                'module'          :   null                          // module / null
            },                                                      // done named array
            {                                                       // named array
                'moduleObject'    :   app.pacManLevel_2,            // module name
                'module'          :   null                          // module / null
            },                                                      // done named array
            {                                                       // named array
                'moduleObject'    :   app.pacManLevel_3,            // module name
                'module'          :   null                          // module / null
            },                                                      // done named array
            {                                                       // named array
                'moduleObject'    :   app.pacManLevel_4,            // module name
                'module'          :   null                          // module / null
            },                                                      // done named array
            {                                                       // named array
                'moduleObject'    :   app.pacManLevel_5,            // module name
                'module'          :   null                          // module / null
            },                                                      // done named array
            {                                                       // named array
                'moduleObject'    :   app.pacManLevel_6,            // module name
                'module'          :   null                          // module / null
            },                                                      // done named array
            {                                                       // named array
                'moduleObject'    :   app.pacManLevel_7,            // module name
                'module'          :   null                          // module / null
            },                                                      // done named array
            {                                                       // named array
                'moduleObject'    :   app.pacManLevel_8,            // module name
                'module'          :   null                          // module / null
            },                                                      // done named array
            {                                                       // named array
                'moduleObject'    :   app.pacManLevel_9,            // module name
                'module'          :   null                          // module / null
            },                                                      // done named array
            {                                                       // named array
                'moduleObject'    :   app.pacManLevel_10,           // module name
                'module'          :   null                          // module / null
            }                                                       // done named array
        ];                                                          // done array                                                          
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
                        
            
        // DONE FUNCTION: construct( void ) void
        };
        self.getBoardOptions = function( level ) {
        // FUNCTION: getBoardOptions( integer: level ) named array

            // create level index
            let levelIndex = level - 1;

            // level not in levels
            if( levelIndex > self.levels.length - 1 ){

                // debug info
                self.debug( 'error: level not found. level: ' + level );
                
                // return with error
                return false;
                
            }
            // level not in levels
            
            // level module ! exists
            if( self.levels[levelIndex]['module'] === null ){

                // create module
                self.levels[levelIndex]['module'] = new self.levels[levelIndex]['moduleObject']();
                
            }
            // level module ! exists
            
            // return level module call
            return self.levels[levelIndex]['module'].getBoardOptions();
            
        // DONE FUNCTION: getBoardOptions( integer: level ) named array
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );

            // remove levels
            self.removeLevels();
            
        // DONE FUNCTION: destruct( void ) void
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
            
            // FUNCTION: getBoardOptions( integer: level ) named array    
            getBoardOptions : function( level ){
                
                // return internal call 
                return self.getBoardOptions( level );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManLevels( void ) void
    
})( app );
// done create module function
