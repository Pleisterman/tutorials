/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManBoardItemAvatarModule.js
        function:   Creates the avatar
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManBoardItemAvatarModule( html element id: parentId, 
    //                                      integer: tileIndex ) void 
    
    app.pacManBoardItemAvatarModule = function( parentId, tileIndex ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManBoardItemAvatarModule';                // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element
        self.tileIndex = tileIndex;                                 // integer
        self.keyCodes = {                                           // named array
            '38'                    :   'up',                       // string
            '40'                    :   'down',                     // string
            '37'                    :   'left',                     // string
            '39'                    :   'right'                     // string
        };                                                          // done named array
        self.pressedKey = null;                                     // integer / null
        self.containerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex(  self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // html element type 
            'backgroundColor'       :   'transparent',              // css
            'imageUrl'              :   'url( ../common/assets/images/avatar.png )', // css
        };                                                          // done named array  
        self.animationOptions = {                                   // named array 
            'columnCount'           :   0,                          // integer
            'tileWidth'             :   0,                          // integer
            'tileHeight'            :   0,                          // integer
            'margins' : {                                           // named array
                'left'              :   0,                          // integer
                'top'               :   0                           // integer
            },                                                      // done named array
            'frameCount'            :   4,                          // integer
            'frame'                 :   0,                          // integer
            'frames' : {                                            // named array
                'up'                :   2,                          // integer
                'down'              :   3,                          // integer
                'left'              :   1,                          // integer
                'right'             :   0,                          // integer
            }                                                       // done named array
        };                                                          // done named array  
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
                        
            // add html
            self.addHtml();
            
            // add kayboard events
            self.addkeyBoardEvents();
            
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

            // remove container
            $( '#' + self.containerOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.addkeyBoardEvents = function(){
        // FUNCTION: addkeyBoardEvents( void ) void
            
            // add key down
            $( document.body ).keydown( function( event ){ self.keyDown( event ); });
            
            // add key up
            $( document.body ).keyup( function( event ){ self.keyUp( event ); });
            
        // DONE FUNCTION: addkeyBoardEvents( void ) void
        };
        self.keyDown = function( event ){
        // FUNCTION: keyDown( event: event ) void

            // pressed key in key codes
            if( self.keyCodes[event.keyCode] !== undefined ){

                // prevent default
                event.preventDefault();

                // animations paused
                if( app.animationsPaused() ){

                    // done
                    return;

                }
                // animations paused

                // remember pressed key
                self.pressedKey = event.keyCode;

                // move
                self.move( self.keyCodes[self.pressedKey] );
                
            }
            // pressed key in key codes

        // DONE FUNCTION: keyDown( event: event ) void
        };
        self.keyUp = function( event ){
        // FUNCTION: keyUp( event: event ) void
        
            // unset pressed kay
            self.pressedKey = null;
                                    
        // DONE FUNCTION: keyUp( event: event ) void
        };
        self.move = function( direction ){
        // FUNCTION: move( string: direction ) void

            // set frame
            self.setFrame( direction );
             
            // move to 
            let tileIndex = app.avatarMoveTo( self.tileIndex, direction );
            
            // tile index exists
            if( tileIndex ){

                // set tile index
                self.tileIndex = tileIndex;
                
                // redraw
                self.reDraw();
                
            }
            // tile index exists

        // DONE FUNCTION: move( string: direction ) void
        };
        self.setFrame = function( direction ) {
        // FUNCTION: setFrame( string: direction ) void
        
            // set frame
            self.animationOptions['frame'] = self.animationOptions['frames'][direction];

            // calculate left
            let left = self.animationOptions['tileWidth'] * self.animationOptions['frame'];
        
            // create background position
            let backgroundPosition = -left + 'px 0px';
        
            // set background position
            $( '#' + self.containerOptions['id'] ).css( 'background-position', backgroundPosition );
            
        // DONE FUNCTION: setFrame( string: direction ) void
        };
        self.draw = function( options ) {
        // FUNCTION: draw( named array: options ) void
            
            // debug info
            self.debug( 'draw' );

            // copy margins
            self.animationOptions['margins'] = jQuery.extend( true, self.animationOptions['margins'], options['boardMargins'] );
            // set tile width
            self.animationOptions['tileWidth'] = options['tileWidth'];
            // set tile height
            self.animationOptions['tileHeight'] = options['tileHeight'];
            // set column count
            self.animationOptions['columnCount'] = options['columnCount'];
        
            // set margin
            let left = self.animationOptions['margins']['left'];
            
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
        self.reDraw = function( ) {
        // FUNCTION: reDraw( void ) void
            
            // debug info
            self.debug( 'draw' );

            // set margin
            let left = self.animationOptions['margins']['left'];
            
            // calculate left
            left += ( self.tileIndex % self.animationOptions['columnCount'] ) * self.animationOptions['tileWidth'];

            // set left
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
            
            // set margin
            let top = self.animationOptions['margins']['top'];
                  
            // calculate top
            top += Math.floor( self.tileIndex / self.animationOptions['columnCount'] ) * self.animationOptions['tileHeight'];

            // set top
            $( '#' + self.containerOptions['id'] ).css( 'top', top + 'px' );
            
        // DONE FUNCTION: reDraw( named array: options ) void
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
            let left = self.animationOptions['tileWidth'] * self.animationOptions['frame'];
        
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
    // DONE MODULE: pacManBoardItemAvatarModule( html element id: parentId, 
    //                                           integer: tileIndex ) void
    
})( app );
// done create module function
