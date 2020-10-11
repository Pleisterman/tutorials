/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManScoreDisplayModule.js
        function:   Creates the game header score display
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManScoreDisplayModule( html element: parentId ) void 
    
    app.pacManScoreDisplayModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManScoreDisplayModule';                   // string
        self.debugOn = true;                                        // boolean
        self.parentId = parentId;                                   // html element
        self.containerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // string
            'top'                   :   '32px',                     // string
            'spacingRight'          :   120,                        // integer
            'fontSize'              :   '16px',                     // css
            'text'                  :   'Score ',                   // string
            'color'                 :   'gold',                     // css
        };                                                          // done named array  
        self.score = 0;                                             // integer
        self.scoreLength = 5;                                       // integer
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

            // show score
            self.showScore();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationExtensions = function() {
        // FUNCTION: addApplicationExtensions( void ) void
            
            // add add points to score
            app.addPointToScore = self.addPointToScore;
            
        // DONE FUNCTION: addApplicationExtensions( void ) void
        };
        self.addPointToScore = function( points ) {
        // FUNCTION: addPointToScore( integer: points ) void
            
            // add point to score
            self.score += points;
            
            // show score
            self.showScore();
            
        // DONE FUNCTION: addPointToScore( integer: points ) void
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
        self.showScore = function() {
        // FUNCTION: showScore( void ) void
            
            // create text
            let text = self.containerOptions['text'] + jsProject.pad( self.score, '0', self.scoreLength );
            
            // set text
            $( '#' + self.containerOptions['id'] ).html( text );
            
        // DONE FUNCTION: showScore( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
         
            // get parent width
            let parentWidth = $( '#' + self.parentId ).width();
            
            // calculate left
            let left = parentWidth - self.containerOptions['spacingRight'];
            
            // set left
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
         
        // DONE FUNCTION: layoutChange( void ) void
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
    // DONE MODULE: pacManScoreDisplayModule( html element: parentId ) void
    
})( app );
// done create module function
