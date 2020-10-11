/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O
  
        file:       nextLessonLinkModule.js
        function:   Creates the link to the next lesson
  
        Last revision: 03-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: nextLessonLinkModule( void ) void 
    
    app.nextLessonLinkModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'nextLessonLinkModule';                       // string
        self.debugOn = true;                                        // boolean
        self.containerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Container' ),  // string 
            'element'               :   'div',                      // html element type 
            'marginTop'             :   '20px',                     // css
            'margin'                :   'auto',                     // css
        };                                                          // done named array  
        self.contentOptions = {                                     // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Content' ),  // string 
            'element'               :   'div',                      // html element type 
            'text'                  :   'Next Lesson: Pac Man: Hello World', // string
            'textAlign'             :   'center',                   // string
            'fontSize'              :   '2.0rem',                   // css
            'color'                 :   'green',                    // css
            'highlightColor'        :   'DarkKhaki',                // css
            'backgroundColor'       :   'transparent',              // css
            'linkOptions' : {                                       // named array 
                'url'               :   '../helloWorld/',           // string
                'target'            :   '_self'                     // string
            },                                                      // done named array 
        };                                                          // done named array  
        self.linkModule = {};                                       // named array                                                          
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

            // add container to window
            $( document.body ).append( jsProject.jsonToElementHtml( self.containerOptions ) );

            // create callbacks
            let callbacks = {
                'click'         :   self.click
            };
            // create callbacks

            // add link
            self.linkModule = new app.uiEventsModule( self.containerOptions['id'],
                                                      self.contentOptions,
                                                      callbacks );
            // add link
           
        // DONE FUNCTION: addHtml( void ) void
        };
        self.click = function(  ) {
        // FUNCTION: click( void ) void

            // open link
            window.open( self.contentOptions['linkOptions']['url'], 
                         self.contentOptions['linkOptions']['target'] );
            // open link

        // DONE FUNCTION: click( void ) void
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
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: nextLessonLinkModule( void ) void
    
})( app );
// done create module function
