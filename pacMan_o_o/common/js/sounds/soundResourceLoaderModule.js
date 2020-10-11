/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O
  
        file:       soundResourceLoaderModule.js
        function:   loads sound resources
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: soundResourceLoaderModule( void ) void 
    
    app.soundResourceLoaderModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'soundResourceLoaderModule';                  // string
        self.debugOn = true;                                        // boolean
        self.resources = null;                                      // named array / null
        self.preloadCallback = null;                                // function / null
        self.resourcesToLoadCount = 0;                              // integer
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.preload = function( resources, callback ) {
        // FUNCTION: preload( named array: resources, function: callback ) void
            
            // remember resources
            self.resources = resources;
            
            // remember callback
            self.preloadCallback = callback;

            // reset resources to load count
            self.resourcesToLoadCount = 0;
            
            // loop over resources
            $.each( self.resources, function( index, resource ) {

                // load resource
                resource.load( self.resourceLoaded );
                
                // add to resources to load count
                self.resourcesToLoadCount++;
                
            });
            // loop over resources
            
        // DONE FUNCTION: preload( named array: resources, function: callback ) void
        };
        self.resourceLoaded = function( ) {
        // FUNCTION: resourceLoaded( void ) void
            
            // subtract from resources to load count
            self.resourcesToLoadCount--;
            
            
            
            
        // DONE FUNCTION: resourceLoaded( void ) void
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
            
            // FUNCTION: preload( named array: resources, function: callback ) void    
            preload : function( resources, callback ){
                
                // call internal
                self.preload( resources, callback );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: soundResourceLoaderModule( void ) void
    
})( app );
// done create module function
