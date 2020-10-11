/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManSidePanelModule.js
        function:   Creates the side panel 
  
        Last revision: 03-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManSidePanelModule( html element: parentId ) void 
    
    app.pacManSidePanelModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManSidePanelModule';                      // string
        self.debugOn = true;                                        // boolean
        self.parentId = parentId;                                   // html element
        self.containerOptions = {                                   // named array 
            'id'                    :    self.MODULE + 'Container', // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'fontSize'              :   '2.0rem',                   // css
            'color'                 :   'green',                    // css
            'overflow'              :   'hidden',                   // css
            'text'                  :   '<br>s<br>i<br>d<br>e<br><br><br>p<br>a<br>n<br>e<br>l', // css
            'textAlign'             :   'center',                   // css
            'styleWidth'            :   '60px',                     // css
            'borderRight'           :   true,                       // boolean
            'borderWidth'           :   '1px',                      // css
            'borderColor'           :   'black',                    // css 
            'borderStyle'           :   'solid',                    // css 
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
        self.createModules = function() {
        // FUNCTION: createModules( void ) void
            
            // debug info
            self.debug( 'createModules' );

        // DONE FUNCTION: createModules( void ) void
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
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManSidePanelModule( html element: parentId ) void
    
})( app );
// done create module function
