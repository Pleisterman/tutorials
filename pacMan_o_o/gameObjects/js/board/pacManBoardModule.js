/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O
  
        file:       pacManBoardModule.js
        function:   Creates the game board and items
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManBoardModule( html element: parentId ) void 
    
    app.pacManBoardModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManBoardModule';                          // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element
        self.containerOptions = {                                   // named array 
            'id'                    :  app.getUniqueIndex( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'relative',                 // css
            'backgroundColor'       :   'brown',                    // css
        };                                                          // done named array  
        self.modules = {};                                          // named array                                                          
        self.grid = [];                                             // array                                                          
        self.ghosts = [];                                           // array                                                          
        self.avatar = null;                                         // module / null                                                          
        self.boardOptions = null;                                   // named array / null
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
                        
            // add html
            self.addHtml();
            
            // create board items module
            self.modules['boardItems'] = new app.pacManBoardItemsModule( );
            
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
        self.setSize = function( size ) {
        // FUNCTION: setSize( float: size ) void
            
            // set width
            $( '#' + self.containerOptions['id'] ).width( size );
            
            // set height
            $( '#' + self.containerOptions['id'] ).height( size );

            // draw
            self.draw();
            
        // DONE FUNCTION: setSize( float: size ) void
        };
        self.draw = function( ) {
        // FUNCTION: draw( void) void

            // board options ! exist
            if( self.boardOptions === null ){

                // done
                return;
                
            }
            // board options ! exist
            
            // calculate tile width
            let tileWidth = self.calculateTileWidth();
            
            // calculate tile height
            let tileHeight = self.calculateTileHeight();
            
            // calculate board margins
            let boardMargins = self.calculateBoardMargins( tileWidth, tileHeight );
            
            // draw grid
            self.drawGrid( tileWidth, tileHeight, boardMargins );
            
            // draw active items
            self.drawActiveItems( tileWidth, tileHeight, boardMargins );
            
        // DONE FUNCTION: draw( void ) void
        };
        self.createNewBoard = function( boardOptions ) {
        // FUNCTION: createNewBoard( named array: boardOptions ) void
            
            // set board options
            self.boardOptions = boardOptions;
            
            // create grid
            self.createGrid( );
            
            // create active items
            self.createActiveItems( );
            
            // draw
            self.draw();
            
        // DONE FUNCTION: createNewBoard( named array: boardOptions ) void
        };
        self.createGrid = function( ) {
        // FUNCTION: createGrid( void ) void
            
            // loop over board
            for( let i = 0; i < self.boardOptions['tiles'].length; i++ ){
                
                // create tile
                let tile = self.modules['boardItems'].createTile( self.containerOptions['id'],
                                                                  self.boardOptions['tiles'][i] );
                // create tile
                
                // add to grid
                self.grid.push( tile ); 
                
            }
            // loop over board
            
        // DONE FUNCTION: createGrid( array: board ) void
        };
        self.drawGrid = function( tileWidth, tileHeight, boardMargins ) {
        // FUNCTION: drawGrid( interger: tileWidth, integer: tileHeight, named array: boardMargins ) void
            
            // no grid
            if( self.grid.length <= 0 ){

                // done
                return;
                
            }
            // no grid
            
            // create left
            let left = boardMargins['left'];
            
            // create top
            let top = boardMargins['top'];
            
            // loop over grid
            for( let i = 0; i < self.grid.length; i++ ){
                
                // is last column
                if( i !== 0 && i % self.boardOptions['columnCount'] === 0 ){
                    
                    // reset left
                    left = boardMargins['left'];
                    
                    // add height to top
                    top += tileHeight;
                    
                }
                // is last column / else
                
                // draw grid item
                self.grid[i].draw( left, top, tileWidth, tileHeight );
                
                // add width to left
                left += tileWidth;
                
            }
            // loop over grid
            
        // DONE FUNCTION: drawGrid( interger: tileWidth, integer: tileHeight, named array: boardMargins ) void
        };
        self.createActiveItems = function( ) {
        // FUNCTION: createActiveItems( void ) void

            // create ghosts
            self.createGhosts();
                
            // create avatar
            self.createAvatar();
                
        // DONE FUNCTION: createActiveItems( void ) void
        };
        self.createGhosts = function( ) {
        // FUNCTION: createGhosts( void ) void
        
            // loop over ghosts
            for( let i = 0; i < self.boardOptions['ghosts'].length; i++ ){
                
                // create ghost
                let ghost = self.modules['boardItems'].createGhost( self.containerOptions['id'],
                                                                    self.boardOptions['ghosts'][i] );
                // create board item
                
                // add to ghosts
                self.ghosts.push( ghost ); 
                
            }
            // loop over ghosts

        // DONE FUNCTION: createGhosts( void ) void
        };
        self.createAvatar = function( ) {
        // FUNCTION: createAvatar( void ) void

            // create avatar
            self.avatar = self.modules['boardItems'].createAvatar( self.containerOptions['id'],
                                                                   self.boardOptions['avatar'] );
            // create avatar

        // DONE FUNCTION: createAvatar( void ) void
        };
        self.drawActiveItems = function( tileWidth, tileHeight, boardMargins ) {
        // FUNCTION: drawActiveItems( interger: tileWidth, integer: tileHeight, named array: boardMargins ) void

            // create options
            let options = {
                'columnCount'   :   self.boardOptions['columnCount'],
                'tileWidth'     :   tileWidth,
                'tileHeight'    :   tileHeight,
                'boardMargins'  :   boardMargins
            };
            // create options

            // loop over ghosts
            for( let i = 0; i < self.ghosts.length; i++ ){
                
                // draw ghost
                self.ghosts[i].draw( options );
                
            }
            // loop over ghosts
                
            // draw avatar
            self.avatar.draw( options );
                
        // DONE FUNCTION: drawActiveItems( void ) void
        };
        self.calculateTileWidth = function( ) {
        // FUNCTION: calculateTileWidth( void ) float
            
            // get container width
            let containerWidth = $( '#' + self.containerOptions['id'] ).width( );
            
            // calculate tile width
            let tileWidth = parseInt( containerWidth / self.boardOptions['columnCount'] );
            
            // debug info
            self.debug( 'tileWidth: ' + tileWidth );
            
            // return result
            return tileWidth;
            
        // DONE FUNCTION: calculateTileWidth( void ) float
        };
        self.calculateTileHeight = function( ) {
        // FUNCTION: calculateTileHeight( void ) float
            
            // get container height
            let containerHeight = $( '#' + self.containerOptions['id'] ).height( );
            
            // calculate tile height
            let tileHeight = parseInt( containerHeight / self.boardOptions['rowCount'] );
            
            // debug info
            self.debug( 'tileHeight: ' + tileHeight );
            
            // return result
            return tileHeight;
            
        // DONE FUNCTION: calculateTileHeight( void ) float
        };
        self.calculateBoardMargins = function( tileWidth, tileHeight ) {
        // FUNCTION: calculateBoardMargins( integer: tileWidth, integer: tileHeight ) named array
            
            // get container width
            let containerWidth = $( '#' + self.containerOptions['id'] ).width( );
            
            // calculate tiles width
            let tilesWidth = self.boardOptions['columnCount'] * tileWidth;
            
            // get container height
            let containerHeight = $( '#' + self.containerOptions['id'] ).height( );
            
            // calculate tiles height
            let tilesHeight = self.boardOptions['rowCount'] * tileHeight;
            
            // create margins
            let margins = {};
            
            // calculate margin left
            margins['left'] = parseInt(( containerWidth - tilesWidth ) / 2 );
            
            // calculate margin top
            margins['top'] = parseInt(( containerHeight - tilesHeight ) / 2 );
            
            // return result
            return margins;
            
        // DONE FUNCTION: calculateBoardMargins( integer: tileWidth, integer: tileHeight ) named array
        };
        self.getActualSize = function( boardSize ) {
        // FUNCTION: getActualSize( float: boardSize ) integer

            // calculate dimensions
            let dimensions = {
                'width'     :   boardSize,
                'height'    :   boardSize
            };
            // calculate dimensions
            
            // board options ! exist
            if( self.boardOptions === null ){

                // done
                return dimensions;
                
            }
            // board options ! exist
            
            // calculate tile height
            let tileHeight = parseInt( boardSize / self.boardOptions['rowCount'] );
            
            // calculate tile width
            let tileWidth = parseInt( boardSize / self.boardOptions['columnCount'] );
            
            // calculate width
            dimensions['width'] = tileWidth * self.boardOptions['columnCount'];
            
            // calculate height
            dimensions['height'] =  tileHeight * self.boardOptions['rowCount'];
            
            // return result
            return dimensions;
            
        // DONE FUNCTION: getActualSize( float: boardSize ) integer
        };
        self.setLeft = function( left ) {
        // FUNCTION: setLeft( float: left ) void
            
            // set left
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
            
        // DONE FUNCTION: setLeft( float: left ) void
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
            
            // FUNCTION: getActualSize( float: boardSize ) integer    
            getActualSize : function( boardSize ){
                
                // return internal call
                return self.getActualSize( boardSize );
                
            },
            // FUNCTION: setLeft( float: left ) void    
            setLeft : function( left ){
                
                // call internal
                self.setLeft( left );
                
            },
            // FUNCTION: setSize( float: size ) void    
            setSize : function( size ){
                
                // call internal
                self.setSize( size );
                
            },
            // FUNCTION: createNewBoard( named array: boardOptions ) void    
            createNewBoard : function( boardOptions ){
                
                // call internal
                self.createNewBoard( boardOptions );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManBoardModule( html element: parentId ) void
    
})( app );
// done create module function
