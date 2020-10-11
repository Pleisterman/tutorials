/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManBoardModule.js
        function:   Creates the board
  
        Last revision: 03-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManBoardModule( html element: parentId ) void 
    
    app.pacManBoardModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManBoardModule';                          // string
        self.debugOn = true;                                        // boolean
        self.parentId = parentId;                                   // html element
        self.containerOptions = {                                   // named array 
            'id'                    :  self.MODULE + 'Container',   // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'text'                  :   'Game board',               // string
            'textAlign'             :   'center',                   // string
            'fontSize'              :   '2.0rem',                   // css
            'color'                 :   'green',                    // css
            'backgroundColor'       :   'white',                    // css
            'styleWidth'            :   '100%',                     // css
            'styleHeight'           :   '60px',                     // css
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

            // add container to parent
            $( '#' + self.parentId ).append( jsProject.jsonToElementHtml( self.containerOptions ) );
           
        // DONE FUNCTION: addHtml( void ) void
        };
        self.setSize = function( size ) {
        // FUNCTION: setSize( float: size ) void
            
            // set width
            $( '#' + self.containerOptions['id'] ).width( size );
            
            // set height
            $( '#' + self.containerOptions['id'] ).height( size );
            
        // DONE FUNCTION: setSize( float: size ) void
        };
        self.setLeft = function( left ) {
        // FUNCTION: setLeft( float: left ) void
            
            // set left
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
            
        // DONE FUNCTION: setLeft( float: left ) void
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
            
            // FUNCTION: setLeft( float: left ) void    
            setLeft : function( left ){
                
                // call internal
                self.setLeft( left );
                
            },
            // FUNCTION: setSize( float: size ) void    
            setSize : function( size ){
                
                // call internal
                self.setSize( size );
                
            }
            
        };
        // DONE PUBLIC
    };
    // DONE MODULE: pacManBoardModule( html element: parentId ) void
    
})( app );
// done create module function
