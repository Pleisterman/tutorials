/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManLevelDisplayModule.js
        function:   Creates the game header level display
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManLevelDisplayModule( html element: parentId ) void 
    
    app.pacManLevelDisplayModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManLevelDisplayModule';                   // string
        self.debugOn = true;                                        // boolean
        self.parentId = parentId;                                   // html element
        self.containerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // string
            'top'                   :   '8px',                      // string
            'spacingRight'          :   120,                        // integer
            'fontSize'              :   '16px',                     // css
            'text'                  :   'Level ',                   // string
            'color'                 :   'gold',                     // css
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
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
         
            // get parent width
            let parentWidth = $( '#' + self.parentId ).width();
            
            // calculate left
            let left = parentWidth - self.containerOptions['spacingRight'];
            
            // set left
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
         
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.setLevel = function( level ) {
        // FUNCTION: setLevel( integer: level ) void
            
            // create text
            let text = self.containerOptions['text'] + jsProject.pad( level, '0', 2 );
            
            // set text
            $( '#' + self.containerOptions['id'] ).html( text );
            
        // DONE FUNCTION: setLevel( integer: level ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );

            // remove html
            self.removeHtml();
            
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
            
            // FUNCTION: setLevel( integer: level ) void
            setLevel :function( level ){
                
                self.setLevel( level );
                
            },
            // FUNCTION: layoutChange( void ) void    
            layoutChange : function( ){
                
                // call internal
                self.layoutChange( );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManLevelDisplayModule( html element: parentId ) void
    
})( app );
// done create module function
