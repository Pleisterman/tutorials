/*
 
    @package    Pleisterman\Tutorials\PacMan O.O.

    file:       getUniqueIndexModule.js
    function:   creates the function app.getUniqueIndex
                The function returns a unique index

    Last revision: 01-10-2020
 
*/    

// create module function
( function( app ){
        
    // MODULE: getUniqueIndexModule( app ) void
        
    app.getUniqueIndexModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;
        self.debugOn = false;
        self.MODULE = 'getUniqueIndexModule';
        self.index = 0;
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // create buffer
            var array = new Uint32Array(10);
            
            // create random values 
            window.crypto.getRandomValues( array );
            
            // get random id
            var id = Math.floor( Math.random() * 10 );
            
            // set initial index
            self.index = array[id] % 1024;
            
            // add the extensions to app
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add get interface index function
            app.getUniqueIndex = self.get;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.get = function( name ) {
        // FUNCTION get( void ) integer
        
            // hide id / else
            if( app.hideElementIds ){
                
                // return and increment
                return 'element_' + self.index++;
                
            }
            else {
                
                // return and increment
                return name + '_' + self.index++;

            }
            // hide id / else
            
            
        // DONE FUNCTION get( void ) var
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // call global debug
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
    // DONE MODULE: getUniqueIndexModule( void ) void 
    
})( app );
// done create module function


