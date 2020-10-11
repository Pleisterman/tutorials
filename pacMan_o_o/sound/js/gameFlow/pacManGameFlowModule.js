/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManGameFlowModule.js
        function:   show the start dialog
                    shows the game over dialog
                    shows the game won dialog
                    handels next level delay

        Last revision: 05-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManGameFlowModule( html element: parentId ) void 
    
    app.pacManGameFlowModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManGameFlowModule';                       // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element
        self.modules = {};                                          // named array                         
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
                        
            // create modules
            self.createModules();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.createModules = function() {
        // FUNCTION: createModules( void ) void
            
            // debug info
            self.debug( 'createModules' );

            // create dialogs
            self.modules['dialogs'] = new app.pacManGameFlowDialogsModule( self.parentId );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeModules = function() {
        // FUNCTION: removeModules( void ) void
            
            // debug info
            self.debug( 'removeModules' );

            // loop over modules
            $.each( self.modules, function( index, module ) {
                
                // destroy module
                module.destruct();
                
            } );
            // loop over modules
            
            // unset modules
            self.modules = null;

        // DONE FUNCTION: removeModules( void ) void
        };
        self.startGame = function() {
        // FUNCTION: startGame( void ) void
            
            // show game start dialog
            self.modules['dialogs'].showGameStart();            
            
        // DONE FUNCTION: startGame( void ) void
        };
        self.setDimensions = function( dimensions ) {
        // FUNCTION: layoutChange( named array: dimensions ) void

            // adjust dialogs
            self.modules['dialogs'].setDimensions( dimensions );            

        // DONE FUNCTION: setDimensions( named array: dimensions ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );

            // remove modules
            self.removeModules();

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
            
            // FUNCTION: startGame( void ) void
            startGame :function( ){
                
                // call internal
                self.startGame( );
                
            },
            // FUNCTION: layoutChange( named array: dimensions ) void
            setDimensions :function( dimensions ){
                
                // call internal
                self.setDimensions( dimensions );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManGameFlowModule( html element: parentId ) void
    
})( app );
// done create module function
