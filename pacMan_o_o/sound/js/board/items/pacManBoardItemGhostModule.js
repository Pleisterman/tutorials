/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManBoardItemGhostModule.js
        function:   Creates a ghost
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManBoardItemGhostModule( html element id: parentId, 
    //                                     integer: tileIndex ) void 
    
    app.pacManBoardItemGhostModule = function( parentId, tileIndex ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManBoardItemGhostModule';                 // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element
        self.tileIndex = tileIndex;                                 // integer
        self.directions = [                                         // array
            'up',                                                   // string
            'down',                                                 // string
            'left',                                                 // string
            'right'                                                 // string
        ];                                                          // done array
        self.ghostImages = [                                        // array
            'url( ../common/assets/images/ghost01.png )',           // url string
            'url( ../common/assets/images/ghost02.png )',           // url string
            'url( ../common/assets/images/ghost03.png )'            // url string
        ];                                                          // done array
        self.containerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex(  self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css 
            'backgroundColor'       :   'transparent',              // css
            'imageUrl'              :   'url( ../common/assets/images/ghost01.png )', // css
        };                                                          // done named array  
        self.animationOptions = {                                   // named array 
            'frameCount'            :   3,                          // integer
            'frame'                 :   0,                          // integer
            'startDelay'            :   20,                         // integer
            'frameId'               :   null,                       // integer / null
            'minimumDelay'          :   30,                         // integer
            'maximumDelay'          :   90,                         // integer
        };                                                          // done named array  
        self.visibilityOptions = {                                  // named array 
            'default' : {                                           // named array
                'minimum'           :   70,                         // integer
                'maximum'           :   90,                         // integer
            },                                                      // done named array
            'powerUp' : {                                           // named array
                'minimum'           :   30,                         // integer
                'maximum'           :   80,                         // integer
            }                                                       // done named array
        };                                                          // done named array  
        self.walkOptions = {                                        // named array 
            'startDelay'            :   200,                        // integer
            'frameId'               :   null,                       // integer / null
            'minimumDelay'          :   12,                         // integer
            'maximumDelay'          :   14,                         // integer
            'direction'             :   null,                       // string / null
        };                                                          // done named array  
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
                        
            // choose random image
            self.chooseRandomImage();
            
            // add html
            self.addHtml();
            
            // start animations
            self.startAnimations();
            
            // start walking
            self.startWalking();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.chooseRandomImage = function() {
        // FUNCTION: chooseRandomImage( void ) void
        
            // create selection
            let selection = Math.floor( ( Math.random() * self.ghostImages.length ) );
            
            // set image
            self.containerOptions['imageUrl'] = self.ghostImages[selection];
        
        // DONE FUNCTION: chooseRandomImage( void ) void
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

            // remove container
            $( '#' + self.containerOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.draw = function( options ) {
        // FUNCTION: draw( named array: options ) void
            
            // debug info
            self.debug( 'draw' );

            // stop animations
            self.stopAnimations();

            // stop walking
            self.stopWalking();

            // copy margins
            self.animationOptions['margins'] = jQuery.extend( true, self.animationOptions['margins'], options['boardMargins'] );
            // set tile width
            self.animationOptions['tileWidth'] = options['tileWidth'];
            // set tile height
            self.animationOptions['tileHeight'] = options['tileHeight'];
            // set column count
            self.animationOptions['columnCount'] = options['columnCount'];
            
            // set margin
            let left = options['boardMargins']['left'];
            
            // calculate left
            left += ( self.tileIndex % options['columnCount'] ) * options['tileWidth'];

            // set left
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
            
            // set margin
            let top = options['boardMargins']['top'];
                  
            // calculate top
            top += Math.floor( self.tileIndex / options['columnCount'] ) * options['tileHeight'];

            // set top
            $( '#' + self.containerOptions['id'] ).css( 'top', top + 'px' );
            
            // set width
            $( '#' + self.containerOptions['id'] ).width( options['tileWidth'] );
            
            // set height
            $( '#' + self.containerOptions['id'] ).height( options['tileHeight'] );

            // adjust background
            self.adjustBackground( options );

            // start animations
            self.startAnimations();

            // start walking
            self.startWalking();

        // DONE FUNCTION: draw( named array: options ) void
        };
        self.reDraw = function( ) {
        // FUNCTION: reDraw( void ) void
            
            // debug info
            self.debug( 'draw' );

            // set margin
            let left = self.animationOptions['margins']['left'];
            
            // calculate left
            left += ( self.tileIndex % self.animationOptions['columnCount'] ) * self.animationOptions['tileWidth'];

            // set left
            $( '#' + self.containerOptions['id'] ).css( 'left', left + 'px' );
            
            // set margin
            let top = self.animationOptions['margins']['top'];
                  
            // calculate top
            top += Math.floor( self.tileIndex / self.animationOptions['columnCount'] ) * self.animationOptions['tileHeight'];

            // set top
            $( '#' + self.containerOptions['id'] ).css( 'top', top + 'px' );
            
        // DONE FUNCTION: reDraw( named array: options ) void
        };
        self.adjustBackground = function( options ) {
        // FUNCTION: adjustBackground( named array: options ) void
        
            // calculate background width
            let backgroundWidth = options['tileWidth'] * self.animationOptions['frameCount'];
        
            // create background size
            let backgroundSize = backgroundWidth + 'px ' + options['tileHeight']  + 'px ';
        
            // set background size
            $( '#' + self.containerOptions['id'] ).css( 'background-size', backgroundSize );

            // calculate left
            let left = options['tileWidth'] * self.animationOptions['frame'];
        
            // create background position
            let backgroundPosition = left + 'px 0px';
        
            // set background position
            $( '#' + self.containerOptions['id'] ).css( 'background-position', backgroundPosition );
            
        // DONE FUNCTION: adjustBackground( named array: options ) void
        };
        self.startAnimations = function() {
        // FUNCTION: startAnimations( void ) void
        
            // create options
            let options = {
                'frameDelay'    :   self.animationOptions['startDelay'],
                'callback'      :   self.animate
            };
            // create options
        
            // add animation frame
            self.animationOptions['frameId'] = app.addAnimationFrame( options );
            
        // DONE FUNCTION: startAnimations( void ) void
        };
        self.animate = function() {
        // FUNCTION: animate( void ) void
            
            // unset frame id
            self.animationOptions['frameId'] = null;
            
            // calculate left
            let left = self.animationOptions['tileWidth'] * self.animationOptions['frame'];
        
            // create background position
            let backgroundPosition = -left + 'px 0px';
        
            // set background position
            $( '#' + self.containerOptions['id'] ).css( 'background-position', backgroundPosition );
            
            // set visibility
            self.setVisibiity();
            
            // next frame
            self.animationOptions['frame']++;
            
            // is last frame
            if( self.animationOptions['frame'] >= self.animationOptions['frameCount'] - 1 ){
                
                // reset frame
                self.animationOptions['frame'] = 0;
                
            }
            // is last frame

            // randomize animation delay
            self.randomizeAnimationDelay();
            
            // create options
            let options = {
                'frameDelay'    :   self.animationOptions['delay'],
                'callback'      :   self.animate
            };
            // create options
        
            // add animation frame
            self.animationOptions['frameId'] = app.addAnimationFrame( options );
            
        // DONE FUNCTION: animate( void ) void
        };
        self.stopAnimations = function() {
        // FUNCTION: stopAnimations( void ) void

            // frame id exists
            if( self.animationOptions['frameId'] !== null ){
                
                // remove frame
                app.removeAnimationFrame( self.animationOptions['frameId'] );
                
                // unset frame id
                self.animationOptions['frameId'] = null;
                
            }
            // frame id exists
            
        // DONE FUNCTION: stopAnimations( void ) void
        };
        self.randomizeAnimationDelay = function() {
        // FUNCTION: randomizeAnimationDelay( void ) void
        
            // set minimum delay
            self.animationOptions['delay'] = self.animationOptions['minimumDelay'];

            // calculate delay margin
            let delayMargin = self.animationOptions['maximumDelay'] - self.animationOptions['minimumDelay'];

            // get random delay
            let randomDelayMargin = Math.floor( ( Math.random() * delayMargin ) );
            
            // add delay margin
            self.animationOptions['delay'] += randomDelayMargin;
        
        // DONE FUNCTION: randomizeAnimationDelay( void ) void
        };
        self.setVisibiity = function() {
        // FUNCTION: setVisibiity( void ) void

            // create visibility
            let visibility = 100;
            
            // create minimum
            let visibilityMinimum = 0; 

            // create margin
            let visibilityMargin = 0; 

            // get power up
            let powerUp = app.getPowerUp();
            
            // has power up
            if( powerUp > 0 ){

                // get power up options
                let powerUpOptions = self.visibilityOptions['powerUp'];

                // set visibility minimum
                visibilityMinimum = powerUpOptions['minimum'];
                
                // calculate visibility margin
                visibilityMargin = powerUpOptions['maximum'] - powerUpOptions['minimum'];
                
            }
            else {
                
                // get default options
                let defaultOptions = self.visibilityOptions['default'];

                // set visibility minimum
                visibilityMinimum = defaultOptions['minimum'];
                
                // calculate visibility margin
                visibilityMargin = defaultOptions['maximum'] - defaultOptions['minimum'];
                
            }
            // has power up

            // get random visibility
            let randomVisibilityMargin = Math.floor( ( Math.random() * visibilityMargin ) );
            
            // caculate opacity
            let opacity = ( visibilityMinimum + randomVisibilityMargin ) / 100;
            
            // set opacity
            $( '#' + self.containerOptions['id'] ).css( 'opacity', opacity );

        // DONE FUNCTION: setVisibiity( void ) void
        };
        self.startWalking = function() {
        // FUNCTION: startWalking( void ) void
        
            // create options
            let options = {
                'frameDelay'    :   self.walkOptions['startDelay'],
                'callback'      :   self.walk
            };
            // create options
        
            // add walk frame
            self.walkOptions['frameId'] = app.addAnimationFrame( options );
            
        // DONE FUNCTION: startAnimations( void ) void
        };
        self.walk = function() {
        // FUNCTION: walk( void ) void
            
            // unset frame id
            self.walkOptions['frameId'] = null;
            
            // get direction
            let direction = self.chooseWalkDirection();
            
            // move to
            let tileIndex = app.ghostMoveTo( self.tileIndex, direction );

            for( let i = 0; i < 8 && !tileIndex; i++ ){
                
                // unset direction
                self.walkOptions['direction'] = null;
                
                tileIndex = app.ghostMoveTo( self.tileIndex, direction );
                
            }

            // tile index exists / else
            if( tileIndex ){

                // remember direction
                self.walkOptions['direction'] = direction;

                // set tile index
                self.tileIndex = tileIndex;
                
                // redraw
                self.reDraw();
                
            }
            // tile index exists / else
            
            // randomize walk delay
            self.randomizeWalkDelay();
            
            // create options
            let options = {
                'frameDelay'    :   self.walkOptions['delay'],
                'callback'      :   self.walk
            };
            // create options
        
            // add walk frame
            self.walkOptions['frameId'] = app.addAnimationFrame( options );
            
        // DONE FUNCTION: walk( void ) void
        };
        self.chooseWalkDirection = function() {
        // FUNCTION: chooseWalkDirection( void ) void
            
            // has direction
            if( self.walkOptions['direction'] !== null ){

                // create selection
                let random = Math.floor( ( Math.random() * 5 ) );
                
                if( random % 4 !== 1 ){
                    
                    // return direction
                    return  self.walkOptions['direction'];
                    
                }



            }
            // has direction
            
            // create selection
            let selection = Math.floor( ( Math.random() * self.directions.length ) );
            
            // return direction
            return self.directions[selection];
            
        // DONE FUNCTION: chooseWalkDirection( void ) void
        };
        self.stopWalking = function() {
        // FUNCTION: stopWalking( void ) void

            // frame id exists
            if( self.walkOptions['frameId'] !== null ){
                
                // remove frame
                app.removeAnimationFrame( self.walkOptions['frameId'] );
                
                // unset frame id
                self.walkOptions['frameId'] = null;
                
            }
            // frame id exists
            
        // DONE FUNCTION: stopWalking( void ) void
        };
        self.randomizeWalkDelay = function() {
        // FUNCTION: randomizeWalkDelay( void ) void
        
            // set minimum delay
            self.walkOptions['delay'] = self.walkOptions['minimumDelay'];

            // calculate delay margin
            let delayMargin = self.walkOptions['maximumDelay'] - self.walkOptions['minimumDelay'];

            // get random delay
            let randomDelayMargin = Math.floor( ( Math.random() * delayMargin ) );
            
            // add delay margin
            self.walkOptions['delay'] += randomDelayMargin;
        
            // get level
            let level = app.getLevel();
            
            // subtract level
            self.walkOptions['delay'] -= level;
            
            // get power up
            let powerUp = app.getPowerUp();
            
            // subtract level
            self.walkOptions['delay'] -= powerUp;
            
            // set minimum
            self.walkOptions['delay'] = Math.max( self.walkOptions['delay'], 0 );
            
        // DONE FUNCTION: randomizeWalkDelay( void ) void
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
            
            // FUNCTION: draw( named array: options ) void    
            draw : function( options ){
                
                // call internal
                self.draw( options );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManBoardItemGhostModule( html element id: parentId, 
    //                                          integer: tileIndex ) void
    
})( app );
// done create module function
