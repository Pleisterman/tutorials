/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManHeaderModule.js
        function:   Creates the header
  
        Last revision: 03-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManHeaderModule( html element: parentId ) void 
    
    app.pacManHeaderModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManHeaderModule';                         // string
        self.debugOn = true;                                        // boolean
        self.parentId = parentId;                                   // html element
        self.containerOptions = {                                   // named array 
            'id'                    :  self.MODULE + 'Container',   // string 
            'element'               :   'div',                      // html element type 
            'textAlign'             :   'center',                   // string
            'fontSize'              :   '2.0rem',                   // css
            'color'                 :   'green',                    // css
            'text'                  :   'Header',                   // css
            'styleWidth'            :   '100%',                     // css
            'styleHeight'           :   '60px',                     // css
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

            // add container to parent
            $( '#' + self.parentId ).append( jsProject.jsonToElementHtml( self.containerOptions ) );
           
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // debug info
            self.debug( 'removeHtml' );

            // remove container from parent
            $( '#' + self.containerOptions['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.getHeight = function() {
        // FUNCTION: getHeight( void ) float
        
            // return container height
            return $( '#' + self.containerOptions['id'] ).outerHeight();
        
        // DONE FUNCTION: getHeight( void ) float
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
            
            // FUNCTION: getHeight( void ) float
            getHeight :function( ){
                
                return self.getHeight( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManHeaderModule( html element: parentId ) void
    
})( app );
// done create module function
