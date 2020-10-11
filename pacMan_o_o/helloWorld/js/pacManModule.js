/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O
  
        file:       pacManModule.js
        function:   Creates the pac man game
  
        Last revision: 03-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManModule( void ) void 
    
    app.pacManModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManModule';                               // string
        self.debugOn = true;                                        // boolean
        self.containerOptions = {                                   // named array 
            'id'                    :  self.MODULE + 'Container',   // string 
            'element'               :   'div',                      // html element type 
            'text'                  :   'Hello World',              // string
            'textAlign'             :   'center',                   // string
            'fontSize'              :   '2.0rem',                   // css
            'color'                 :   'green',                    // css
            'backgroundColor'       :   'white',                    // css
            'styleWidth'            :   '200px',                    // css
            'styleHeight'           :   '110px',                    // css
            'padding'               :   '40px',                     // css
            'paddingTop'            :   '70px',                     // css
            'marginTop'             :   '120px',                    // css
            'margin'                :   'auto',                     // css
            'border'                :   true,                       // boolean
            'borderWidth'           :   '1px',                      // css
            'borderColor'           :   'black',                    // css 
            'borderStyle'           :   'solid',                    // css 
        };                                                          // done named array  
        self.modules = {};                                          // named array                                                          
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
                        
            // add html
            self.addHtml();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // add container to window
            $( document.body ).append( jsProject.jsonToElementHtml( self.containerOptions ) );
           
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // debug info
            self.debug( 'removeHtml' );

        // DONE FUNCTION: removeHtml( void ) void
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
    // DONE MODULE: pacManModule( void ) void
    
})( app );
// done create module function
