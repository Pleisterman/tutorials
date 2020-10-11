/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O
  
        file:       pacManBoardItemGhostModule.js
        function:   Creates a ghost
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManBoardItemGhostModule( html element id: parentId, 
    //                                     integer: tileIndex ) void 
    
    app.pacManBoardItemGhostModule = function( parentId, tileIndex ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManBoardItemGhostModule';                 // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element
        self.tileIndex = tileIndex;                                 // integer
        self.ghostImages = [                                        // array
            'url( ../common/assets/images/ghost01.png )',           // url string
            'url( ../common/assets/images/ghost02.png )',           // url string
            'url( ../common/assets/images/ghost03.png )'            // url string
        ];                                                          // done array
        self.containerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex(  self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css 
            'backgroundColor'       :   'transparent',              // css
            'imageUrl'              :   'url( ../common/assets/images/ghost01.png )', // css
        };                                                          // done named array  
        self.animationOptions = {                                   // named array 
            'frameCount'            :   3,                          // integer
            'frame'                 :   0,                          // integer
        };                                                          // done named array  
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
                        
            // choose random image
            self.chooseRandomImage();
            
            // add html
            self.addHtml();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.chooseRandomImage = function() {
        // FUNCTION: chooseRandomImage( void ) void
        
            // create selection
            let selection = Math.floor( ( Math.random() * self.ghostImages.length ) );
            
            // set image
            self.containerOptions['imageUrl'] = self.ghostImages[selection];
        
        // DONE FUNCTION: chooseRandomImage( void ) void
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

            // remove container
            $( '#' + self.containerOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.draw = function( options ) {
        // FUNCTION: draw( named array: options ) void
            
            // debug info
            self.debug( 'draw' );

            // set margin
            let left = options['boardMargins']['left'];
            
            // calculate left
            left += ( self.tileIndex % options['columnCount'] ) * options['tileWidth'];

            // set left
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
            
            // set margin
            let top = options['boardMargins']['top'];
                  
            // calculate top
            top += Math.floor( self.tileIndex / options['columnCount'] ) * options['tileHeight'];

            // set top
            $( '#' + self.containerOptions['id'] ).css( 'top', top + 'px' );
            
            // set width
            $( '#' + self.containerOptions['id'] ).width( options['tileWidth'] );
            
            // set height
            $( '#' + self.containerOptions['id'] ).height( options['tileHeight'] );

            // adjust background
            self.adjustBackground( options );

        // DONE FUNCTION: draw( named array: options ) void
        };
        self.adjustBackground = function( options ) {
        // FUNCTION: adjustBackground( named array: options ) void
        
            // calculate background width
            let backgroundWidth = options['tileWidth'] * self.animationOptions['frameCount'];
        
            // create background size
            let backgroundSize = backgroundWidth + 'px ' + options['tileHeight']  + 'px ';
        
            // set background size
            $( '#' + self.containerOptions['id'] ).css( 'background-size', backgroundSize );

            // calculate left
            let left = options['tileWidth'] * self.animationOptions['frame'];
        
            // create background position
            let backgroundPosition = left + 'px 0px';
        
            // set background position
            $( '#' + self.containerOptions['id'] ).css( 'background-position', backgroundPosition );
            
        // DONE FUNCTION: adjustBackground( named array: options ) void
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
            
            // FUNCTION: draw( named array: options ) void    
            draw : function( options ){
                
                // call internal
                self.draw( options );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManBoardItemGhostModule( html element id: parentId, 
    //                                          integer: tileIndex ) void
    
})( app );
// done create module function
