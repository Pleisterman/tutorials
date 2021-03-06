/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O
  
        file:       pacManModule.js
        function:   Creates the pac man game
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManModule( void ) void 
    
    app.pacManModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManModule';                               // string
        self.debugOn = true;                                        // boolean
        self.containerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'textAlign'             :   'center',                   // string
            'position'              :   'absolute',                 // css
            'fontSize'              :   '2.0rem',                   // css
            'color'                 :   'green',                    // css
            'backgroundColor'       :   'white',                    // css
            'styleWidth'            :   '200px',                    // css
            'styleHeight'           :   '110px',                    // css
            'layoutOptions' : {                                     // named array
                'marginTop'         :   120,                        // integer
                'marginLeft'        :   20,                         // integer
                'marginRight'       :   20,                         // integer    
                'marginBottom'      :   60,                         // integer
            },                                                      // done named array
        };                                                          // done named array  
        self.contentOptions = {                                     // named array 
            'id'                    :  self.MODULE + 'Content',     // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'relative',                 // css
        };                                                          // done named array  
        self.level = 1;                                             // integer
        self.modules = {};                                          // named array                                                          
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
                        
            // add html
            self.addHtml();

            // add game objects
            self.addGameObjects();

        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // add container to window
            $( document.body ).append( jsProject.jsonToElementHtml( self.containerOptions ) );
           
            // add content to container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.contentOptions ) );
           
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addGameObjects = function() {
        // FUNCTION: addGameObjects( void ) void
            
            // add header
            self.addHeader();

            // add side panel
            self.addSidePanel();

            // add board
            self.addBoard();

            // add levels
            self.addLevels();

        // DONE FUNCTION: addGameObjects( void ) void
        };
        self.addHeader = function() {
        // FUNCTION: addHeader( void ) void
            
            // create header module
            self.modules['header'] = new app.pacManHeaderModule( self.contentOptions['id'] );

            // set level
            self.modules['header'].setLevel( self.level );
            
        // DONE FUNCTION: addHeader( void ) void
        };
        self.addSidePanel = function() {
        // FUNCTION: addSidePanel( void ) void
            
            // create sidePanel module
            self.modules['sidePanel'] = new app.pacManSidePanelModule( self.contentOptions['id'] );
            
        // DONE FUNCTION: addSidePanel( void ) void
        };
        self.addBoard = function() {
        // FUNCTION: addBoard( void ) void
            
            // create board module
            self.modules['board'] = new app.pacManBoardModule( self.contentOptions['id'] );
            
        // DONE FUNCTION: addBoard( void ) void
        };
        self.addLevels = function() {
        // FUNCTION: addLevels( void ) void
            
            // create levels module
            self.modules['levels'] = new app.pacManLevels( );
            
        // DONE FUNCTION: addLevels( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // get layout options
            let layoutOptions = self.containerOptions['layoutOptions'];
            
            // create available width
            let availableWidth = self.getAvailableWidth( layoutOptions );
            
            // get header height
            let headerHeight = self.modules['header'].getHeight();

            // get available height
            let availableBoardHeight = self.getAvailableBoardHeight( layoutOptions );

            // subtract header height
            availableBoardHeight -= headerHeight;

            // get side panel width
            let sidePanelWidth = self.modules['sidePanel'].getWidth();

            // subtract side panel width
            availableBoardHeight -= headerHeight;

            // calculate board size
            let boardSize = Math.min( availableWidth, availableBoardHeight );

            // get actual size
            let actualSize = self.modules['board'].getActualSize( boardSize );

            // calculate width
            let width = actualSize['width'] + sidePanelWidth;
            
            // set width
            $( '#' + self.containerOptions['id'] ).width( width );
            
            // calculate height
            let height = actualSize['height'] + headerHeight;
            
            // set height
            $( '#' + self.containerOptions['id'] ).height( height );

            // set side panel height
            self.modules['sidePanel'].setHeight( actualSize['height'] );
            
            // set side panel height
            self.modules['sidePanel'].layoutChange( );
            
            // calculate left
            let left = ( $( window ).width() - actualSize['width'] ) / 2;

            // set left
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );

            // set top
            $( '#' + self.containerOptions['id'] ).css( 'top', layoutOptions['marginTop'] + 'px' );

            // adjust header
            self.modules['header'].layoutChange();
            
            // set board left
            self.modules['board'].setLeft( sidePanelWidth );

            // set board size
            self.modules['board'].setSize( actualSize['width'] );

        // DONE FUNCTION: layoutChange( void ) void
        };
        self.getAvailableWidth = function( layoutOptions ) {
        // FUNCTION: getAvailableWidth( named array: layoutOptions ) void
            
            // get window width
            let availableWidth = $( window ).width();
            
            // subtract spacing
            availableWidth -= layoutOptions['marginLeft'] + layoutOptions['marginRight'];
            
            // return result
            return availableWidth;
            
        // DONE FUNCTION: getAvailableWidth( named array: layoutOptions ) void
        };
        self.getAvailableBoardHeight = function( layoutOptions ) {
        // FUNCTION: getAvailableBoardHeight( named array: layoutOptions ) void
            
            // get window height
            let availableHeight = $( window ).height();
            
            // subtract spacing
            availableHeight -= layoutOptions['marginTop'] + layoutOptions['marginBottom'];
            
            // return result
            return availableHeight;
            
        // DONE FUNCTION: getAvailableBoardHeight( named array: layoutOptions ) void
        };
        self.start = function() {
        // FUNCTION: start( void ) void
            
            // get board options
            let boardOptions = self.modules['levels'].getBoardOptions( self.level );
            
            // set board options
            self.modules['board'].createNewBoard( boardOptions );
            
            // adjust layout
            self.layoutChange();

        // DONE FUNCTION: start( void ) void
        };
        self.getHeight = function() {
        // FUNCTION: getHeight( void ) float
        
            // return container height
            return $( '#' + self.containerOptions['id'] ).height();
        
        // DONE FUNCTION: getHeight( void ) float
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
            
            // FUNCTION: start( void ) void
            start :function( ){
                
                return self.start( );
                
            },
            // FUNCTION: getHeight( void ) float
            getHeight :function( ){
                
                return self.getHeight( );
                
            },
            // FUNCTION: layoutChange( void ) float
            layoutChange :function( ){
                
                // call internal
                self.layoutChange( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManModule( void ) void
    
})( app );
// done create module function
