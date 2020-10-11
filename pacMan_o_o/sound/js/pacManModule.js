/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManModule.js
        function:   Creates the game modules
                    Creates the game container
  
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
        self.debugOn = true;                                       // boolean
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
        self.powerUp = 0;                                           // integer
        self.modules = {};                                          // named array                                                          
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add application extensions
            self.addApplicationExtensions();
            
            // add html
            self.addHtml();

            // add game flow
            self.addGameFlow();

            // add game objects
            self.addGameObjects();

            // adjust layout
            self.layoutChange();

        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationExtensions = function() {
        // FUNCTION: addApplicationExtensions( void ) void
            
            // add get level
            app.getLevel = self.getLevel;
            
            // add level complete
            app.levelComplete = self.levelComplete;
            
            // add set power up
            app.setPowerUp = self.setPowerUp;
            
            // add get power up
            app.getPowerUp = self.getPowerUp;
            
            // add life lost
            app.lifeLost = self.lifeLost;
            
        // DONE FUNCTION: addApplicationExtensions( void ) void
        };
        self.getLevel = function() {
        // FUNCTION: getLevel( void ) integer
            
            // debug info
            return self.level;

        // DONE FUNCTION: getLevel( void ) integer
        };
        self.setPowerUp = function( level ) {
        // FUNCTION: setPowerUp( integer: level ) void
            
            // set power up
            return self.powerUp = level;

        // DONE FUNCTION: setPowerUp( integer: level ) void
        };
        self.getPowerUp = function( ) {
        // FUNCTION: getPowerUp( void ) integer
            
            // return power up
            return self.powerUp;

        // DONE FUNCTION: getPowerUp( void ) integer
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
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // debug info
            self.debug( 'removeHtml' );

            // remove content
            $( '#' + self.contentOptions['id'] ).remove();

            // remove container
            $( '#' + self.containerOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.addGameFlow = function() {
        // FUNCTION: addGameFlow( void ) void
            
            // create game flow module
            self.modules['gameFlow'] = new app.pacManGameFlowModule( self.containerOptions['id'] );
            
        // DONE FUNCTION: addGameFlow( void ) void
        };
        self.removeGameFlow = function() {
        // FUNCTION: removeGameFlow( void ) void
            
            // destroy game flow module
            self.modules['gameFlow'].destruct( );
            
            // unset game flow
            delete self.modules['gameFlow'];
            
        // DONE FUNCTION: removeGameFlow( void ) void
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
        self.removeGameObjects = function() {
        // FUNCTION: removeGameObjects( void ) void
        
            // remove board
            self.removeBoard();
            
            // remove side panel
            self.removeSidePanel();
            
            // remove header
            self.removeHeader();
            
            // remove levels
            self.removeLevels();
            
        // DONE FUNCTION: removeGameObjects( void ) void
        };
        self.addHeader = function() {
        // FUNCTION: addHeader( void ) void
            
            // create header module
            self.modules['header'] = new app.pacManHeaderModule( self.containerOptions['id'] );

            // set level
            self.modules['header'].setLevel( self.level );
            
        // DONE FUNCTION: addHeader( void ) void
        };
        self.removeHeader = function() {
        // FUNCTION: removeHeader( void ) void

            // header exists
            if( self.modules['header'] ){
                
                // destroy header
                self.modules['header'].destruct();
                
                // remove header
                delete self.modules['header'];
                
            }
            // header exists

        // DONE FUNCTION: removeHeader( void ) void
        };
        self.addSidePanel = function() {
        // FUNCTION: addSidePanel( void ) void
            
            // create side panel 
            self.modules['sidePanel'] = new app.pacManSidePanelModule( self.containerOptions['id'] );

        // DONE FUNCTION: addSidePanel( void ) void
        };
        self.removeSidePanel = function() {
        // FUNCTION: removeSidePanel( void ) void

            // side panel exists
            if( self.modules['sidePanel'] ){
                
                // destroy side panel
                self.modules['sidePanel'].destruct();
                
                // remove side panel
                delete self.modules['sidePanel'];
                
            }
            // side panel exists

        // DONE FUNCTION: removeSidePanel( void ) void
        };
        self.addBoard = function() {
        // FUNCTION: addBoard( void ) void
            
            // create board module
            self.modules['board'] = new app.pacManBoardModule( self.containerOptions['id'] );
            
        // DONE FUNCTION: addBoard( void ) void
        };
        self.removeBoard = function() {
        // FUNCTION: removeBoard( void ) void
            
            // board exists
            if( self.modules['board'] ){
                
                // destroy board
                self.modules['board'].destruct();
                
                // remove board
                delete self.modules['board'];
                
            }
            // board exists
            
        // DONE FUNCTION: removeBoard( void ) void
        };
        self.addLevels = function() {
        // FUNCTION: addLevels( void ) void
            
            // create levels module
            self.modules['levels'] = new app.pacManLevels( );
            
        // DONE FUNCTION: addLevels( void ) void
        };
        self.removeLevels = function() {
        // FUNCTION: removeLevels( void ) void
            
            // levels exists
            if( self.modules['levels'] ){
                
                // destroy levels
                self.modules['levels'].destruct();
                
                // remove levels
                delete self.modules['levels'];
                
            }
            // levels exists
            
        // DONE FUNCTION: removeLevels( void ) void
        };
        self.lifeLost = function() {
        // FUNCTION: lifeLost( void ) void

            // debug info
            self.debug( 'lifeLost' );

            // create options
            let soptions = {
                'id'        :   'lifeLost'
            };
            // create options
            
            // play sound
            app.playSound( soptions );
            
        // DONE FUNCTION: lifeLost( void ) void
        };
        self.levelComplete = function() {
        // FUNCTION: levelComplete( void ) void
            
            // debug info
            self.debug( 'levelComplete' );
            
            // stop audio
            app.stopAudio();

            // pause animations
            app.pauseAnimations();

            // show paused
            app.showPaused();

            // disable pause play
            app.disablePausePlayControl();
                
            // create options
            let options = {
                'id'        :   'levelComplete'
            };
            // create options
            
            // play sound
            app.playSound( options );            

        // DONE FUNCTION: levelComplete( void ) void
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

            // get side panel width
            let sidePanelWidth = self.modules['sidePanel'].getWidth();

            // subtract header height
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

            // create dimensions
            let dimensions = {
                'left'      :   sidePanelWidth,
                'top'       :   headerHeight,
                'width'     :   actualSize['width'],
                'height'    :   actualSize['height']
            };
            // create dimensions
            
            // set game flow dimensions
            self.modules['gameFlow'].setDimensions( dimensions );
            
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
            
            // pause animations
            app.pauseAnimations();
            
            // get board options
            let boardOptions = self.modules['levels'].getBoardOptions( self.level );
            
            // set board options
            self.modules['board'].createNewBoard( boardOptions );
            
            // adjust layout
            self.layoutChange();

            // start the flow
            self.modules['gameFlow'].startGame();

        // DONE FUNCTION: start( void ) void
        };
        self.getHeight = function() {
        // FUNCTION: getHeight( void ) float
        
            // return container height
            return $( '#' + self.containerOptions['id'] ).height();
        
        // DONE FUNCTION: getHeight( void ) float
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );

            // remove events
            self.removeEvents();
            
            // remove game flow
            self.removeGameFlow();
            
            // remove game objects
            self.removeGameObjects();
            
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
            
            // FUNCTION: start( void ) void
            start :function( ){
                
                return self.start( );
                
            },
            // FUNCTION: getHeight( void ) float
            getHeight :function( ){
                
                return self.getHeight( );
                
            },
            // FUNCTION: layoutChange( void ) void
            layoutChange :function( ){
                
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
    // DONE MODULE: pacManModule( void ) void
    
})( app );
// done create module function
