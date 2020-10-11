/*
 
        @package    Pleisterman\Tutorials

        file:       app.js
        function:   this module is the container class for the application
                    all modules are linked to this module and can be accessed through the functions
                    linked to this module.

        Last revision: 03-10-2020
 
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
        
        // create content module
        self.modules['content'] = new app.contentModule();
        
        // debug info
        jsProject.debug( 'App running' );

    // DONE FUNCTION: start( void ) void
    };
    
    // start on window load
    window.onload = function(){

        // start the application
        self.start();

    };
    // done add onload event    
    
    // DONE PRIVATE

    // DONE MODULE: app( void ) void 
    
})();
// done create module function
 


