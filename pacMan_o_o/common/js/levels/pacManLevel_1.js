/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManLevel_1.js
        function:   Contains the data for level 1                    
  
        Last revision: 03-10-2020

*/

// create module function
( function( app ){

    // MODULE: pacManLevel_1( void ) void 
    
    app.pacManLevel_1 = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManLevel_1';                              // string
        self.debugOn = false;                                       // boolean
        self.boardOptions = {                                       // named array
            'ghostType'         :   3,                              // integer
            'avatarType'        :   6,                              // integer
            'columnCount'       :   28,                             // integer
            'tiles' : [                                             // array
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                1,4,4,4,4,4,4,4,4,4,4,4,4,1,1,4,4,4,4,4,4,4,4,4,4,4,4,1,
                1,4,1,1,1,1,4,1,1,1,1,1,4,1,1,4,1,1,1,1,1,4,1,1,1,1,4,1,
                1,5,1,1,1,1,4,1,1,1,1,1,4,1,1,4,1,1,1,1,1,4,1,1,1,1,5,1,
                1,4,1,1,1,1,4,1,1,1,1,1,4,1,1,4,1,1,1,1,1,4,1,1,1,1,4,1,
                1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,
                1,4,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,1,1,4,1,
                1,4,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,1,1,4,1,
                1,4,4,4,4,4,4,4,4,4,4,4,4,1,1,4,4,4,4,4,4,4,4,4,4,4,4,1,
                1,1,1,1,1,1,4,1,1,1,1,1,4,1,1,4,1,1,1,1,1,4,1,1,1,1,1,1,
                1,1,1,1,1,1,4,1,1,0,0,0,0,0,0,0,0,0,0,1,1,4,1,1,1,1,1,1,
                1,1,1,1,1,1,4,1,1,0,1,1,1,2,2,1,1,1,0,1,1,4,1,1,1,1,1,1,
                1,1,1,1,1,1,4,1,1,0,1,2,2,3,3,2,2,1,0,1,1,4,1,1,1,1,1,1,
                0,0,0,0,0,0,4,4,4,0,1,2,2,3,3,2,2,1,0,4,4,4,0,0,0,0,0,0,
                1,1,1,1,1,1,4,1,1,0,1,2,2,2,2,2,2,1,0,1,1,4,1,1,1,1,1,1,
                1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,
                1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,
                1,4,4,4,4,4,4,4,4,0,0,0,0,0,6,0,0,0,0,4,4,4,4,4,4,4,4,1,
                1,4,1,1,1,1,4,1,1,1,1,1,4,1,1,4,1,1,1,1,1,4,1,1,1,1,4,1,
                1,4,1,1,1,1,4,1,1,1,1,1,4,1,1,4,1,1,1,1,1,4,1,1,1,1,4,1,
                1,5,4,4,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,4,4,5,1,
                1,1,1,4,1,1,4,1,1,4,1,1,1,1,1,1,1,1,4,1,1,4,1,1,4,1,1,1,
                1,1,1,4,1,1,4,1,1,4,1,1,1,1,1,1,1,1,4,1,1,4,1,1,4,1,1,1,
                1,4,4,4,4,4,4,1,1,4,4,4,4,1,1,4,4,4,4,1,1,4,4,4,4,4,4,1,
                1,4,1,1,1,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,1,1,1,1,1,4,1,
                1,4,1,1,1,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,1,1,1,1,1,4,1,
                1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
            ]                                                       // done array    
        };                                                          // done named array  
        self.modules = {};                                          // named array                                                          
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
                        
        // DONE FUNCTION: construct( void ) void
        };
        self.getBoardOptions = function() {
        // FUNCTION: getBoardOptions( void ) named array
            
            // copy board options
            boardOptions = jQuery.extend( true, {}, self.boardOptions );
            
            // add rows
            boardOptions['rowCount'] = self.boardOptions['tiles'].length / self.boardOptions['columnCount'];
            
            // get ghosts
            boardOptions['ghosts'] = self.getGhosts();
            
            // get avatar
            boardOptions['avatar'] = self.getAvatar();
            
            // return board options
            return boardOptions;
            
        // DONE FUNCTION: getBoardOptions( void ) named array
        };
        self.getGhosts = function() {
        // FUNCTION: getGhosts( void ) array
            
            // create ghosts
            let ghosts = [];
            
            // loop over tiles
            for( let i = 0; i < self.boardOptions['tiles'].length; i++ ){
            
                // is ghost type
                if( self.boardOptions['tiles'][i] === self.boardOptions['ghostType'] ){
                    
                    // add ghost
                    ghosts.push( i );
                    
                }
                // is ghost type
                
            }
            // loop over tiles
            
            // return result
            return ghosts;
            
        // DONE FUNCTION: getGhosts( void ) array
        };
        self.getAvatar = function() {
        // FUNCTION: getAvatar( void ) array
            
            // loop over tiles
            for( let i = 0; i < self.boardOptions['tiles'].length; i++ ){
            
                // is avatar type
                if( self.boardOptions['tiles'][i] === self.boardOptions['avatarType'] ){
                    
                    // return index
                    return i;
                    
                }
                // is avatar type
                
            }
            // loop over tiles
            
        // DONE FUNCTION: getAvatar( void ) array
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
            
            // FUNCTION: getBoardOptions( ) named array
            getBoardOptions : function( ){
                
                // return internal call
                return self.getBoardOptions();
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManLevel_1( void ) void
    
})( app );
// done create module function
