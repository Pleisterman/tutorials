/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O

        file:       app.js
        function:   this module is the container class for the application
                    all modules are linked to this module and can be accessed through the functions
                    linked to this module.

        Last revision: 04-10-2020

*/    

// create module function
( function() {

    // MODULE: app( void ) void 
    
    // create the app
    window.app = window.app ? window.app : {};
    
    // PRIVATE:

    // MEMBERS
    var self = window.app;                              // object
    self.MODULE = 'app';                                // string
    self.debugOn = false;                               // boolean
    self.debugOptions = {                               // named array
        'zIndex'    :   1000,                           // integer
        'top'       :   470,                            // integer
        'left'      :   20,                             // integer
        'width'     :   500,                            // integer    
        'height'    :   200                             // integer
    };                                                  // done named array
    self.modules = {};                                  // json
    // DONE MEMBERS     

    // FUNCTIONS
    self.start = function() {
    // FUNCTION: start( void ) void

        // create the jsProject module
        jsProject.construct();
        
        // add debug functions
        jsProject.debugOn( self.debugOn, self.debugOptions );

        // debug info
        jsProject.debug( 'App started' );
        
        // create get unique index
        self.modules['getUniqueIndex'] = new app.getUniqueIndexModule();
        
        // create menu module
        self.modules['menu'] = new app.menuModule();
        
        // create pac man module
        self.modules['pacMan'] = new app.pacManModule(); 
        
        // create next level link module
        self.modules['nextLevelLink'] = new app.nextLessonLinkModule(); 

        // add events
        self.addEvents();
            
        // adjust layout
        self.layoutChange();
            
        // start the game
        self.modules['pacMan'].start();
        
        // debug info
        jsProject.debug( 'App running' );

    // DONE FUNCTION: start( void ) void
    };
    self.addEvents = function() {
    // FUNCTION: addEvents( void ) void

        // override window.onresize
        window.onresize = function( ) {

            // adjust layout
            self.layoutChange();

        };
        // done override window.onresize

        // override window.onresize
        $( window ).on( "orientationchange", function( event ) {

            // debig info
            self.debug( 'orientationChange' );

            // adjust layout
            self.layoutChange();

        });
        // done override window.onresize

    // DONE FUNCTION: addEvents( void ) void
    };
    self.layoutChange = function() {
    // FUNCTION: layoutChange( void ) void

        // adjust pac man game
        self.modules['pacMan'].layoutChange();

        // get pac man game height
        let gameHeight = self.modules['pacMan'].getHeight();

        // adjust next level link 
        self.modules['nextLevelLink'].layoutChange( gameHeight );

    // DONE FUNCTION: layoutChange( void ) void
    };
    
    // start on window load
    window.onload = function(){

        // start the application
        self.start();

    };
    // done start on window load
    
    // DONE PRIVATE

    // DONE MODULE: app( void ) void 
    
})();
// done create module function
 


