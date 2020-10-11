/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManBoardItemPowerPointModule.js
        function:   Creates the power point tile
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManBoardItemPowerPointModule( html element id: parentId ) void 
    
    app.pacManBoardItemPowerPointModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManBoardItemPowerPointModule';            // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element
        self.containerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex(  self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // html element type 
            'backgroundColor'       :   'blue',                     // css
        };                                                          // done named array  
        self.contentOptions = {                                     // named array 
            'id'                    :   app.getUniqueIndex(  self.MODULE + 'Content' ), // string 
            'element'               :   'div',                      // html element type 
            'backgroundColor'       :   'green',                    // css
            'borderRadius'          :   '50%',                      // css
            'marginTop'             :   '15%',                      // css    
            'marginLeft'            :   '15%',                      // css    
            'styleWidth'            :   '70%',                      // css    
            'styleHeight'           :   '70%',                      // css    
        };                                                          // done named array  
        self.powerUpOptions = {                                     // named array 
            'minimumDuration'       :   600,                        // integer
            'levelDuration'         :   100,                        // integer
            'value'                 :   4,                          // integer 
            'frameId'               :   null,                       // integer / null
        };                                                          // done named array  
        self.emptyBackgroundColor = 'black';                        // color                                                          
        self.value = 5;                                             // integer                                                          
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
        self.draw = function( left, top, tileWidth, tileHeight ) {
        // FUNCTION: draw( float: left, float: top, float: tileWidth, float: tileHeight ) void
            
            // debug info
            self.debug( 'draw' );

            // set left
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
            
            // set width
            $( '#' + self.containerOptions['id'] ).width( tileWidth );
            
            // set top
            $( '#' + self.containerOptions['id'] ).css( 'top', top + 'px' );
            
            // set height
            $( '#' + self.containerOptions['id'] ).height( tileHeight );

        // DONE FUNCTION: draw( float: left, float: top, float: tileWidth, float: tileHeight ) void
        };
        self.getPoints = function() {
        // FUNCTION: getPoints( void ) integer
            
            // has value
            if( self.value > 0 ){

                // start power up
                self.startPowerUp();
                
            }
            // has value
            
            // copy value
            let value = self.value;
            
            // reset value
            self.value = 0;
            
            // hide content
            $( '#' + self.contentOptions['id'] ).hide( );

            // set background
            $( '#' + self.containerOptions['id'] ).css( 'background-color', self.emptyBackgroundColor );

            // return value
            return value;
            
        // DONE FUNCTION: getPoints( void ) integer
        };
        self.startPowerUp = function() {
        // FUNCTION: startPowerUp( void ) void
            
            // start sound effect
            app.startSoundEffect( 'powerUp' );
            
            // create sound options
            let soundOptions = {
                'id'        :   'powerUp'
            };
            // create options
            
            // play sound
            app.playSound( soundOptions );
            
            // set power up
            app.setPowerUp( self.powerUpOptions['value'] );
                        
            // create delay
            let delay = self.powerUpOptions['minimumDuration'];
            
            // get level
            let level = app.getLevel();
            
            // add level delay
            delay += level * self.powerUpOptions['levelDuration'];
            
            // create options
            let options = {
                'frameDelay'    :   delay,
                'callback'      :   self.endPowerUp
            };
            // create options
        
            // add walk frame
            self.powerUpOptions['frameId'] = app.addAnimationFrame( options );
            
        // DONE FUNCTION: startPowerUp( void ) integer
        };
        self.endPowerUp = function() {
        // FUNCTION: endPowerUp( void ) void
            
            // unset frame id
            self.powerUpOptions['frameId'] = null;
            
            // end sound effect
            app.endSoundEffect( 'powerUp' );
            
            // reset power up
            app.setPowerUp( 0 );
            
        // DONE FUNCTION: endPowerUp( void ) integer
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
            
            // FUNCTION: draw( float: left, float: top, float: tileWidth, float: tileHeight ) void    
            draw : function( left, top, tileWidth, tileHeight ){
                
                // call internal
                self.draw( left, top, tileWidth, tileHeight );
                
            },
            // FUNCTION: isPassable( void ) boolean    
            isPassable : function( ){
                
                // return passable
                return true;
                
            },
            // FUNCTION: getPointValue( void ) integer
            getPointValue : function( ){
                
                // return value
                return self.value;
                
            },
            // FUNCTION: getPoints( void ) integer
            getPoints : function( ){
                
                // return passable
                return self.getPoints();
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManBoardItemPowerPointModule( html element id: parentId ) void
    
})( app );
// done create module function
