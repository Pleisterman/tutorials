/*
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManLivesDisplayModule.js
        function:   Creates the lives display
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManLivesDisplayModule( html element id: parentId ) void 
    
    app.pacManLivesDisplayModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManLivesDisplayModule';                   // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element
        self.containerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex(  self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'styleWidth'            :   '100%',                     // css
            'styleHeight'           :   '100%',                     // css
            'fontSize'              :   '18px',                     // css
            'color'                 :   'gold',                     // css
        };                                                          // done named array 
        self.livesContainerOptions = {                              // named array 
            'id'                    :   app.getUniqueIndex(  self.MODULE + 'LivesContainer' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'styleWidth'            :   '100%',                     // css
            'backgroundColor'       :   'transparent',              // css
        };                                                          // done named array 
        self.lifeOptions = {                                        // named array 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'styleWidth'            :   '20px',                     // css
            'spacing' : {                                           // named array
                    'top'           :   10,                         // integer
                    'vertical'      :   10,                         // integer
                    'bottom'        :   10,                         // integer
            },                                                      // done named array
            'styleHeight'           :   '20px',                     // css
            'imageUrl'              :   'url( ../common/assets/images/lives.png )', // css
            'backgroundSize'        :   '100% auto',                // css
            'backgroundPosition'    :   'center center',            // css
        };                                                          // done named array 
        self.lives = [];                                            // integer                                                           
        self.lifeCount = 3;                                         // integer                                                           
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
                        
            // add html
            self.addHtml();
            
            // create lifes
            self.createLives();
            
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

            // remove image container
            $( '#' + self.livesContainerOptions['id'] ).remove();

            // remove container
            $( '#' + self.containerOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.createLives = function() {
        // FUNCTION: createLives( void ) void
            
            // debug info
            self.debug( 'createLives' );

            // add lives container to container
            $( '#' + self.containerOptions['id'] ).append( jsProject.jsonToElementHtml( self.livesContainerOptions ) );
           
            // loop for life count
            for( let i = 0; i < self.lifeCount; i++ ){
                
                // copy life options
                let lifeOptions = jQuery.extend( true, {}, self.lifeOptions );
                
                // add id
                lifeOptions['id'] = app.getUniqueIndex(  self.MODULE + 'Life' );
                
                // create element
                $( '#' + self.livesContainerOptions['id'] ).append( jsProject.jsonToElementHtml( lifeOptions ) );
                
                // add life to lives
                self.lives.push( lifeOptions );
                
            }
            // loop for life count
            
        // DONE FUNCTION: createLives( void ) void
        };
        self.removeLives = function() {
        // FUNCTION: removeLives( void ) void
            
            // debug info
            self.debug( 'removeLives' );

            // loop for lives
            for( let i = 0; i < self.lives.length; i++ ){
                
                // remove life
                $( '#' + self.lifes[i]['id'] ).remove();
            
            }
            // loop for lives

        // DONE FUNCTION: removeLives( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

            // get container width
            let containerWidth = $( '#' + self.containerOptions['id'] ).width();
            
            // create top
            let top = self.lifeOptions['spacing']['top'];
            
            // create left
            let left = 0;
            
            // loop for lives
            for( let i = 0; i < self.lives.length; i++ ){

                // get life width
                let lifeWidth = $( '#' + self.lives[i]['id'] ).outerWidth();

                // get life height
                let lifeHeight = $( '#' + self.lives[i]['id'] ).outerHeight();
                
                // calculate left
                left = ( containerWidth - lifeWidth ) / 2;
                
                // set left
                $( '#' + self.lives[i]['id'] ).css( 'left', left + 'px' );

                // set top
                $( '#' + self.lives[i]['id'] ).css( 'top', top + 'px' );

                // add spacing to top
                top += self.lifeOptions['spacing']['vertical'];

                // add height
                top += lifeHeight;

            }
            // loop for lives
                
            // calculate lives height
            let livesHeight = top + self.lifeOptions['spacing']['bottom'];
            
            // get container height
            let containerHeight = $( '#' + self.containerOptions['id'] ).height();

            // calculate top
            let livesContainerTop = containerHeight - livesHeight;

            // set height
            $( '#' + self.livesContainerOptions['id'] ).height( livesHeight );

            // set top
            $( '#' + self.livesContainerOptions['id'] ).css( 'top', livesContainerTop + 'px' );

        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );

            // remove life items
            self.removeLiveItems();

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
    // DONE MODULE: pacManLivesDisplayModule( html element id: parentId ) void
    
})( app );
// done create module function
