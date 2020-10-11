/*
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManBoardModule.js
        function:   Creates the game board and items
  
        Last revision: 01-10-2020
 
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
            'id'                    :  self.MODULE + 'Container',   // string 
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
            
            // add application extensions
            self.addApplicationExtensions();
            
            // create board items module
            self.modules['boardItems'] = new app.pacManBoardItemsModule( );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationExtensions = function() {
        // FUNCTION: addApplicationExtensions( void ) void
            
            // add avatar move to
            app.avatarMoveTo = self.avatarMoveTo;
            
            // add ghost move to
            app.ghostMoveTo = self.ghostMoveTo;
            
        // DONE FUNCTION: addApplicationExtensions( void ) void
        };
        self.avatarMoveTo = function( tileIndex, direction ) {
        // FUNCTION: avatarMoveTo( integer tileIndex, string: direction ) boolean
            
            // get tile to move to
            let tileToMoveTo = self.getTileToMoveTo( tileIndex, direction );
            
            // can move to
            if( self.grid[tileToMoveTo].isPassable() ){
                
                // get points
                let points = self.grid[tileToMoveTo].getPoints();
                
                // has points
                if( points > 0 ){

                    // add points to score
                    app.addPointToScore( points );
                    
                    // add points to earned points
                    self.boardOptions['earnedPoints'] += points;
                    
                }
                // has points

                // loop over ghosts
                for( let i = 0; i < self.boardOptions['ghosts'].length; i++ ){
                    
                    // tile to move to is ghost tile
                    if( self.boardOptions['ghosts'][i] === tileToMoveTo ){
                        
                        // life lost
                        app.lifeLost();
                        
                    }
                    // tile to move to is ghost tile
                    
                }
                // loop over ghosts
                
                // level is done
                if( self.boardOptions['earnedPoints'] === self.boardOptions['totalPoints'] &&
                    !self.boardOptions['levelCompleteCalled'] ){
                    
                    // set next level called
                    self.boardOptions['levelCompleteCalled'] = true;
                    
                    // next level
                    app.levelComplete();
                    
                }
                // level is done
                
                // update avatar position
                self.boardOptions['avatar'] = tileToMoveTo;
                
                // return can move in direction
                return tileToMoveTo;
                
            }
            // can move to

            // return cannot move in direction
            return false;
            
        // DONE FUNCTION: avatarMoveTo( integer tileIndex, string: direction ) boolean
        };
        self.ghostMoveTo = function( tileIndex, direction ) {
        // FUNCTION: ghostMoveTo( integer tileIndex, string: direction ) boolean
            
            // get tile to move to
            let tileToMoveTo = self.getTileToMoveTo( tileIndex, direction );
            
            // can move to
            if( self.grid[tileToMoveTo].isPassable() ){
                
                // tile to move to is avatar tile
                if( self.boardOptions['avatar'] === tileToMoveTo ){
                        
                    // life lost
                    app.lifeLost();

                }
                // tile to move to is avatar tile

                // tile index ! ghost lair to move to is ghost lair tile
                if( self.grid[tileIndex].isGhostLair === undefined &&
                    self.grid[tileToMoveTo].isGhostLair !== undefined ){
                
                    // return cannot move in direction
                    return false;
                        
                }
                // tile index ! ghost lair to move to is ghost lair tile

                // tile index is ghost lair to move to is ghost lair tile
                if( self.grid[tileIndex].isGhostLair !== undefined &&
                    self.grid[tileToMoveTo].isGhostLair !== undefined ){
                
                    // get next
                    let nextTileIndex = self.getTileToMoveTo( tileToMoveTo, direction );

                    // next is ! passable
                    if( !self.grid[nextTileIndex].isPassable() ){
                        
                        // return cannot move in direction
                        return false;
                        
                    }
                    // next is ! passable
                        
                }
                // tile index is ghost lair to move to is ghost lair tile
                
                // loop over ghosts
                for( let i = 0; i < self.boardOptions['ghosts'].length; i++ ){
                    
                    // tile to move to is ghost tile
                    if( self.boardOptions['ghosts'][i] === tileToMoveTo ){
                        
                        // return cannot move in direction
                        return false;
                        
                    }
                    // tile to move to is ghost tile
                    
                }
                // loop over ghosts

                // loop over ghosts
                for( let i = 0; i < self.boardOptions['ghosts'].length; i++ ){
                    
                    // is current ghost
                    if( self.boardOptions['ghosts'][i] === tileIndex ){
                        
                        // update tile index
                        self.boardOptions['ghosts'][i] = tileToMoveTo;
                        
                        // return can move in direction
                        return tileToMoveTo;

                    }
                    // is current ghost
                        
                }
                // loop over ghosts
                    
                
            }
            // can move to

            // return cannot move in direction
            return false;
            
        // DONE FUNCTION: ghostMoveTo( integer tileIndex, string: direction ) boolean
        };
        self.getTileToMoveTo = function( tileIndex, direction ) {
        // FUNCTION: getTileToMoveTo( integer tileIndex, string: direction ) integer
            
            // create tile to move to
            let tileToMoveTo = null;

            // direction up
            if( direction === 'up' ){

                // calculate index    
                tileToMoveTo = tileIndex - self.boardOptions['columnCount'];
                
                // index is negative
                if( tileToMoveTo < 0 ){

                    // go to end of the tiles
                    tileToMoveTo = tileToMoveTo + self.boardOptions['tiles'].length;
                    
                }
                // index is negative
                
            }
            // direction up
            
            // direction down
            if( direction === 'down' ){

                // calculate index    
                tileToMoveTo = tileIndex + self.boardOptions['columnCount'];
                
                // index is bigger then tiles count
                if( tileToMoveTo > self.boardOptions['tiles'].length ){

                    // go to beginning of the tiles
                    tileToMoveTo -= self.boardOptions['tiles'].length;
                    
                }
                // index is bigger then tiles count
                
            }
            // direction down
            
            // direction left
            if( direction === 'left' ){

                // is first row / else
                if( tileIndex % self.boardOptions['columnCount'] === 0 ){

                    // calculate
                    tileToMoveTo = tileIndex + ( self.boardOptions['columnCount'] - 1 );
                    
                }
                else {
                    
                    // calculate index    
                    tileToMoveTo = tileIndex - 1;
                    
                }
                // is first row / else
                
            }
            // direction left
            
            // direction right
            if( direction === 'right' ){

                // is last row / else
                if( tileIndex % self.boardOptions['columnCount'] === self.boardOptions['columnCount'] - 1 ){

                    // calculate
                    tileToMoveTo = tileIndex - ( self.boardOptions['columnCount'] - 1 );
                    
                }
                else {
                    
                    // calculate index    
                    tileToMoveTo = tileIndex + 1;
                    
                }
                // is last row / else
                
            }
            // direction left
            
            // return result
            return tileToMoveTo;
            
        // DONE FUNCTION: getTileToMoveTo( integer tileIndex, string: direction ) integer
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
            
            // add next level called
            self.boardOptions['levelCompleteCalled'] = false;
            
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
            
            // create totalPoints
            let totalPoints = 0;
            
            // loop over board
            for( let i = 0; i < self.boardOptions['tiles'].length; i++ ){
                
                // create tile
                let tile = self.modules['boardItems'].createTile( self.containerOptions['id'],
                                                                  self.boardOptions['tiles'][i] );
                // create tile
                
                // get point value exists
                if( tile.getPointValue !== undefined ){
                    
                    // add points
                    totalPoints += tile.getPointValue();
                    
                }
                // get point value exists
                
                // add to grid
                self.grid.push( tile ); 
                
            }
            // loop over board
            
            // set total points
            self.boardOptions['totalPoints'] = totalPoints;
            
            // set earned points
            self.boardOptions['earnedPoints'] = 0;
            
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
            
            // FUNCTION: setLeft( float: left ) void    
            setLeft : function( left ){
                
                // call internal
                self.setLeft( left );
                
            },
            // FUNCTION: getActualSize( float: boardSize ) integer    
            getActualSize : function( boardSize ){
                
                // return internal call
                return self.getActualSize( boardSize );
                
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
