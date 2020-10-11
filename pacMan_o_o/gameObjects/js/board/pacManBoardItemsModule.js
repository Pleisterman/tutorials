/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManBoardItemsModule.js
        function:   Creates the game board tile modules and active items
                    
                    tiles
                    0 -> empty 
                    1 -> wall
                    2 -> ghost lair
                    4 -> point
                    5 -> power point
                    
                    active tiles
                    3 -> ghost 
                    6 -> avatar

        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManBoardItemsModule( void ) void 
    
    app.pacManBoardItemsModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManBoardItemsModule';                     // string
        self.debugOn = true;                                        // boolean
        self.activeItems = {                                        // named array
            'ghost' : {                                             // named array
                'id'            :   'ghost',                        // string
                'moduleObject'  :   app.pacManBoardItemGhostModule  // app module object
            },                                                      // done named array
            'avatar' : {                                            // named array    
                'id'            :   'avatar',                       // string
                'moduleObject'  :   app.pacManBoardItemAvatarModule // app module object
            }                                                       // done named array
        };                                                          // done named array
        self.activeTiles = {                                        // named array
            'tile_3' : {                                            // named array
                'id'            :   'ghost',                        // string
                'tileType'      :   'tile_2',                       // integer
            },                                                      // done named array
            'tile_6' : {                                            // named array    
                'id'            :   'avatar',                       // string
                'tileType'      :   'tile_0',                       // integer
            }                                                       // done named array
        };                                                          // done named array
        self.tileTypes = {                                          // named array
            'tile_0' : {                                            // named array
                'id'            :   'empty',                        // string
                'moduleObject'  :   app.pacManBoardItemEmptyModule  // app module object
            },                                                      // done named array
            'tile_1' : {                                            // named array    
                'id'            :   'wall',                         // string
                'moduleObject'  :   app.pacManBoardItemWallModule   // app module object
            },                                                      // done named array
            'tile_2' : {                                            // named array    
                'id'            :   'ghostLair',                    // string
                'moduleObject'  :   app.pacManBoardItemGhostLairModule // app module object
            },                                                      // done named array
            'tile_4' : {                                            // named array    
                'id'            :   'point',                        // string
                'moduleObject'  :   app.pacManBoardItemPointModule  // app module object
            },                                                      // done named array
            'tile_5' : {                                            // named array    
                'id'            :   'powerPoint',                   // string
                'moduleObject'  :   app.pacManBoardItemPowerPointModule // app module object
            }                                                       // done named array
        };                                                          // done named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
                        
        // DONE FUNCTION: construct( void ) void
        };
        self.createTile = function( parentId, type ) {
        // FUNCTION: createTile( html element id: parentId, integer: type ) module
            
            // create index
            let tileType = 'tile_' + type;
            
            // type ! exists
            if( self.tileTypes[tileType] === undefined &&
                self.activeTiles[tileType] === undefined ){
                
                // debug info
                self.debug( 'Error in createBoardItem type not found, type: ' + type );

            }
            // type ! exists

            // is active item / else
            if( self.activeTiles[tileType] !== undefined ){
                
                // get active item tile type
                tileType = self.activeTiles[tileType]['tileType'];
                
                // create tile
                let tile = new self.tileTypes[tileType]['moduleObject']( parentId );

                // return item
                return tile;
                
            }
            else {
                
                // create item
                let tile = new self.tileTypes[tileType]['moduleObject']( parentId );

                // return tile
                return tile;
                
            }
            // is active item / else

        // DONE FUNCTION: createTile( html element id: parentId, integer: type ) module
        };
        self.createGhost = function( parentId, tileIndex ) {
        // FUNCTION: createGhost( html element id: parentId, integer: tileIndex ) module
            
            // create ghost
            let ghost = new self.activeItems['ghost']['moduleObject']( parentId, tileIndex );

            // return ghost
            return ghost;
            
        // DONE FUNCTION: createGhost( html element id: parentId, integer: tileIndex ) module
        };
        self.createAvatar = function( parentId, tileIndex ) {
        // FUNCTION: createAvatar( html element id: parentId, integer: tileIndex ) module

            // create avatar
            let avatar = new self.activeItems['avatar']['moduleObject']( parentId, tileIndex );

            // return avatar
            return avatar;
            
        // DONE FUNCTION: createAvatar( html element id: parentId, integer: tileIndex ) module
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );

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
            
            // FUNCTION: createTile( html element id: parentId, integer: type ) module    
            createTile : function( parentId, type ){
                
                // return internal call
                return self.createTile( parentId, type );
                
            },
            // FUNCTION: createGhost( html element id: parentId, integer: tileIndex ) module    
            createGhost : function( parentId, tileIndex ){
                
                // return internal call
                return self.createGhost( parentId, tileIndex );
                
            },
            // FUNCTION: createAvatar( html element id: parentId, integer: tileIndex ) module    
            createAvatar : function( parentId, tileIndex ){
                
                // return internal call
                return self.createAvatar( parentId, tileIndex );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManBoardItemsModule( void ) void
    
})( app );
// done create module function
