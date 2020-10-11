/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManHeaderModule.js
        function:   Creates the game header 
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManHeaderModule( html element: parentId ) void 
    
    app.pacManHeaderModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManHeaderModule';                         // string
        self.debugOn = true;                                        // boolean
        self.parentId = parentId;                                   // html element
        self.containerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'imageUrl'              :   'url( ../common/assets/images/headerBackground.png )', // css
            'backgroundSize'        :   '100% 100%',                // css
            'styleWidth'            :   '100%',                     // css
            'styleHeight'           :   '60px',                     // css
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
            
            // create modules
            self.createModules();
            
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
        self.createModules = function() {
        // FUNCTION: createModules( void ) void
            
            // debug info
            self.debug( 'createModules' );

            // create level module
            self.modules['level'] = new app.pacManLevelDisplayModule( self.containerOptions['id'] );

            // create score module
            self.modules['score'] = new app.pacManScoreDisplayModule( self.containerOptions['id'] );
            
        // DONE FUNCTION: createModules( void ) void
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
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
         
            // loop over modules
            $.each( self.modules, function( index, module ) {
                
                // destroy module
                module.layoutChange();
                
            } );
            // loop over modules
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.getHeight = function() {
        // FUNCTION: getHeight( void ) float
        
            // return container height
            return $( '#' + self.containerOptions['id'] ).outerHeight();
        
        // DONE FUNCTION: getHeight( void ) float
        };
        self.setLevel = function( level ) {
        // FUNCTION: setLevel( integer: level ) void
            
            // call level module
            self.modules['level'].setLevel( level );
            
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
                
                // call internal
                self.setLevel( level );
                
            },
            // FUNCTION: getHeight( void ) float
            getHeight :function( ){
                
                // return internal call
                return self.getHeight( );
                
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
    // DONE MODULE: pacManHeaderModule( html element: parentId ) void
    
})( app );
// done create module function
