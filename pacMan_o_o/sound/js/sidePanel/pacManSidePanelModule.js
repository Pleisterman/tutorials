/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManSidePanelModule.js
        function:   Creates the game side panel 
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManSidePanelModule( html element: parentId ) void 
    
    app.pacManSidePanelModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManSidePanelModule';                      // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element
        self.containerOptions = {                                   // named array 
            'id'                    :    self.MODULE + 'Container', // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'fontSize'              :   '18px',                     // css
            'color'                 :   'Gainsboro',                // css
            'backgroundColor'       :   'black',                    // css
            'styleWidth'            :   '60px',                     // css
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

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.createModules = function() {
        // FUNCTION: createModules( void ) void
            
            // debug info
            self.debug( 'createModules' );

            // create controls
            self.modules['controls'] = new app.pacManControlsModule( self.containerOptions['id'] );
            
            // create lives module
            self.modules['lives'] = new app.pacManLivesDisplayModule( self.containerOptions['id'] );
            
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
        self.getWidth = function() {
        // FUNCTION: getWidth( void ) float
        
            // return container width
            return $( '#' + self.containerOptions['id'] ).outerWidth();
        
        // DONE FUNCTION: getWidth( void ) float
        };
        self.setHeight = function( height ) {
        // FUNCTION: setHeight( float: height ) void
            
            // set height
            $( '#' + self.containerOptions['id'] ).height( height );
            
        // DONE FUNCTION: setHeight( float: height ) void
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
            
            // FUNCTION: setHeight( float: height ) void    
            setHeight : function( height ){
                
                // call internal
                self.setHeight( height );
                
            },
            // FUNCTION: getWidth( void ) float
            getWidth :function( ){
                
                // return internal call
                return self.getWidth( );
                
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
    // DONE MODULE: pacManSidePanelModule( html element: parentId ) void
    
})( app );
// done create module function
