/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O
  
        file:       nextLessonLinkModule.js
        function:   Creates the link to the next lesson
  
        Last revision: 04-10-2020
 
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
            'position'              :   'absolute',                 // css
            'spacingTop'            :   160,                        // integer
        };                                                          // done named array  
        self.contentOptions = {                                     // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Content' ),  // string 
            'element'               :   'div',                      // html element type 
            'text'                  :   'Next Lesson: Pac Man: Game objects', // string
            'textAlign'             :   'center',                   // string
            'fontSize'              :   '2.0rem',                   // css
            'color'                 :   'green',                    // css
            'highlightColor'        :   'DarkKhaki',                // css
            'backgroundColor'       :   'transparent',              // css
            'linkOptions' : {                                       // named array 
                'url'               :   '../gameObjects/',          // string
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
        self.layoutChange = function( gameHeight ) {
        // FUNCTION: layoutChange( integer: gameHeight ) void
            
            // caculate top
            let top = gameHeight + self.containerOptions['spacingTop'];
            
            // set top
            $( '#' + self.containerOptions['id'] ).css( 'top', top + 'px' );
            
            // get window width
            let windowWidth = $( window ).width();
            
            // get content width
            let contentWidth = $( '#' + self.contentOptions['id'] ).width();
            
            // caculate left
            let left = ( windowWidth - contentWidth ) / 2;
            
            // set left
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
            
        // DONE FUNCTION: layoutChange( integer: gameHeight ) void
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
            
            // FUNCTION: layoutChange( integer: gameHeight ) void
            layoutChange :function( gameHeight ){
                
                // call internal
                self.layoutChange( gameHeight );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: nextLessonLinkModule( void ) void
    
})( app );
// done create module function
