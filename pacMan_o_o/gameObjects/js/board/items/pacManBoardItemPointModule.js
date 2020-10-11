/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O
  
        file:       pacManBoardItemPointModule.js
        function:   Creates the point tile
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManBoardItemPointModule( html element id: parentId ) void 
    
    app.pacManBoardItemPointModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManBoardItemPointModule';                 // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element
        self.containerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex(  self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // html element type 
            'backgroundColor'       :   'blue',                     // css
        };                                                          // done named array  
        self.contentOptions = {                                     // named array 
            'id'                    :   app.getUniqueIndex(  self.MODULE + 'Content' ), // string 
            'element'               :   'div',                      // html element type 
            'backgroundColor'       :   'yellow',                   // css
            'borderRadius'          :   '50%',                      // css
            'marginTop'             :   '25%',                      // css    
            'marginLeft'            :   '25%',                      // css    
            'styleWidth'            :   '50%',                      // css    
            'styleHeight'           :   '50%',                      // css    
        };                                                          // done named array  
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
           
            // add content to container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.contentOptions ) );
           
        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // debug info
            self.debug( 'removeHtml' );

            // remove content
            $( '#' + self.contentOptions['id'] ).remove();

            // remove container
            $( '#' + self.containerOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.draw = function( left, top, tileWidth, tileHeight ) {
        // FUNCTION: draw( float: left, float: top, float: tileWidth, float: tileHeight ) void
            
            // debug info
            self.debug( 'draw' );

            // set left
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
            
            // set width
            $( '#' + self.containerOptions['id'] ).width( tileWidth );
            
            // set top
            $( '#' + self.containerOptions['id'] ).css( 'top', top + 'px' );
            
            // set height
            $( '#' + self.containerOptions['id'] ).height( tileHeight );

        // DONE FUNCTION: draw( float: left, float: top, float: tileWidth, float: tileHeight ) void
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
            
            // FUNCTION: draw( float: left, float: top, float: tileWidth, float: tileHeight ) void    
            draw : function( left, top, tileWidth, tileHeight ){
                
                // call internal
                self.draw( left, top, tileWidth, tileHeight );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManBoardItemPointModule( html element id: parentId ) void
    
})( app );
// done create module function
