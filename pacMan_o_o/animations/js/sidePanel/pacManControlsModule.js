/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManControlsModule.js
        function:   displays the control buttons and handels the events
                    buttons
                        pause
                        sound on / off
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManControlsModule( html element id: parentId ) void 
    
    app.pacManControlsModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManControlsModule';                       // string
        self.debugOn = false;                                       // boolean
        self.parentId = parentId;                                   // html element
        self.containerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex(  self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'styleWidth'            :   '100%',                     // css
            'styleHeight'           :   '100%',                     // css
            'color'                 :   'gold',                     // css
        };                                                          // done named array 
        self.buttonOptions = {                                      // named array 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'styleWidth'            :   '30px',                     // css
            'spacing' : {                                           // named array
                    'top'           :   20,                         // integer
                    'vertical'      :   10,                         // integer
                    'bottom'        :   10,                         // integer
            },                                                      // done named array
            'styleHeight'           :   '30px',                     // css
            'backgroundSize'        :   '200% 100%',                // css
            'backgroundPosition'    :   '0 center',                 // css
            'cursor'                :   'pointer',                  // css
        };                                                          // done named array 
        self.buttons = {                                            // named array
            'pausePlay' : {                                         // named array
                'isPlaying'         :   true,                       // boolean      
                'imageIndexes' : {                                  // named array
                    'play'          :   1,                          // integer
                    'pause'         :   0                           // integer
                },                                                  // done named array
                'buttonId'          :   'pausePlay',                // string
                'id'                :   app.getUniqueIndex( self.MODULE + 'PausePlayButton' ), // html element id
                'imageUrl'          :   'url( ../common/assets/images/pausePlayButton.png )', // css
            },                                                      // done named array
            'soundOnOff' : {                                        // named array
                'isOn'              :   true,                       // boolean      
                'imageIndexes' : {                                  // named array
                    'on'            :   1,                          // integer
                    'off'           :   0                           // integer
                },                                                  // done named array
                'buttonId'          :   'soundOnOff',               // string
                'id'                :   app.getUniqueIndex( self.MODULE + 'SoundOnOffButton' ), // html element id
                'imageUrl'          :   'url( ../common/assets/images/soundOnOffButton.png )', // css
            }                                                       // done named array    
        };                                                          // done named array
        self.buttonModules = [];                                    // array                         
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
                        
            // add html
            self.addHtml();
            
            // create buttons
            self.createButtons();
            
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

            // remove container
            $( '#' + self.containerOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.createButtons = function() {
        // FUNCTION: createButtons( void ) void
            
            // create pause play button
            self.createPausePlayButton();
            
            // create sound on off button
            self.createSoundOnOffButton();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.createPausePlayButton = function() {
        // FUNCTION: createPausePlayButton( void ) void
            
            // create callbacks
            let callbacks = {
                'mouseOver'     :   self.pausePlayMouseOver,
                'mouseOut'      :   self.pausePlayMouseOut,
                'click'         :   self.pausePlayClick
            };
            // create callbacks
            
            // copy button
            let buttonOptions = jQuery.extend( true, {}, self.buttons['pausePlay'], self.buttonOptions );

            // create button module
            let buttonModule = new app.uiEventsModule( self.containerOptions['id'],
                                                       buttonOptions,
                                                       callbacks );
            // add menu to header

            // add to button modules
            self.buttonModules.push( buttonModule );

            // create image index
            let imageIndex = 0;
            
            // is playing / else
            if( buttonOptions['isPlaying'] ){

                // set image index
                imageIndex = buttonOptions['imageIndexes']['play'];

            }
            else {

                // set image index
                imageIndex = buttonOptions['imageIndexes']['pause'];

            }
            // is playing / else
            
            // set background position
            self.setBackgroundPosition( buttonOptions['id'], imageIndex );
                        
        // DONE FUNCTION: createPausePlayButton( void ) void
        };
        self.createSoundOnOffButton = function() {
        // FUNCTION: createSoundOnOffButton( void ) void
            
            // debug info
            self.debug( 'createButtons' );

            // create callbacks
            let callbacks = {
                'mouseOver'     :   self.soundOnOffMouseOver,
                'mouseOut'      :   self.soundOnOffMouseOut,
                'click'         :   self.soundOnOffClick
            };
            // create callbacks
            
            // copy button
            let buttonOptions = jQuery.extend( true, {}, self.buttons['soundOnOff'], self.buttonOptions );

            // create button module
            let buttonModule = new app.uiEventsModule( self.containerOptions['id'],
                                                       buttonOptions,
                                                       callbacks );
            // add menu to header

            // add to button modules
            self.buttonModules.push( buttonModule );
                
            // create image index
            let imageIndex = 0;
            
            // is on / else
            if( buttonOptions['isOn'] ){

                // set image index
                imageIndex = buttonOptions['imageIndexes']['on'];

            }
            else {

                // set image index
                imageIndex = buttonOptions['imageIndexes']['off'];

            }
            // is on / else
            
            // set background position
            self.setBackgroundPosition( buttonOptions['id'], imageIndex );
            
        // DONE FUNCTION: createSoundOnOffButton( void ) void
        };
        self.removeButtons = function() {
        // FUNCTION: removeButtons( void ) void
            
            // debug info
            self.debug( 'removeButtons' );

            // loop over button modules
            for( let i = 0; i < self.buttonModules.length; i++ ) {
                
                // remove button
                self.buttonModules[i].destruct();
            
            }
            // loop over button modules
            
            // unset button modules
            self.buttonModules = null;

        // DONE FUNCTION: removeButtons( void ) void
        };
        self.pausePlayMouseOver = function( event, buttonOptions ) {
        // FUNCTION: pausePlayMouseOver( event: event, named array: buttonOptions ) void
            
            // get button id
            let buttonId = buttonOptions['buttonId'];
            
            // create image index
            let imageIndex = 0;
            
            // is playing / else
            if( self.buttons[buttonId]['isPlaying'] ){

                // set image index
                imageIndex = self.buttons[buttonId]['imageIndexes']['pause'];

            }
            else {

                // set image index
                imageIndex = self.buttons[buttonId]['imageIndexes']['play'];

            }
            // is playing / else
            
            // set background position
            self.setBackgroundPosition( buttonOptions['id'], imageIndex );
            
        // DONE FUNCTION: pausePlayMouseOver( event: event, named array: buttonOptions ) void
        };
        self.pausePlayMouseOut = function( event, buttonOptions ) {
        // FUNCTION: pausePlayMouseOut( event: event, named array: buttonOptions ) void
            
            // get button id
            let buttonId = buttonOptions['buttonId'];
            
            // create image index
            let imageIndex = 0;
            
            // is playing / else
            if( self.buttons[buttonId]['isPlaying'] ){

                // set image index
                imageIndex = self.buttons[buttonId]['imageIndexes']['play'];

            }
            else {

                // set image index
                imageIndex = self.buttons[buttonId]['imageIndexes']['pause'];

            }
            // is playing / else
            
            // set background position
            self.setBackgroundPosition( buttonOptions['id'], imageIndex );
            
        // DONE FUNCTION: pausePlayMouseOut( event: event, named array: buttonOptions ) void
        };
        self.pausePlayClick = function( event, buttonOptions ) {
        // FUNCTION: pausePlayClick( event: event, named array: buttonOptions ) void
            
            // get button id
            let buttonId = buttonOptions['buttonId'];
            
            // set playing
            self.buttons[buttonId]['isPlaying'] = !self.buttons[buttonId]['isPlaying'];
            
            // is playing / else
            if( self.buttons[buttonId]['isPlaying'] ){

                // set image index
                imageIndex = self.buttons[buttonId]['imageIndexes']['play'];

                // resume animations
                app.resumeAnimations();
                
            }
            else {

                // set image index
                imageIndex = self.buttons[buttonId]['imageIndexes']['pause'];

                // pause animations
                app.pauseAnimations();
                
            }
            // is playing / else
            
        // DONE FUNCTION: pausePlayClick( event: event, named array: buttonOptions ) void
        };
        self.soundOnOffMouseOver = function( event, buttonOptions ) {
        // FUNCTION: soundOnOffMouseOver( event: event, named array: buttonOptions ) void
            
            // get button id
            let buttonId = buttonOptions['buttonId'];
            
            // create image index
            let imageIndex = 0;
            
            // is on / else
            if( self.buttons[buttonId]['isOn'] ){

                // set image index
                imageIndex = self.buttons[buttonId]['imageIndexes']['off'];

            }
            else {

                // set image index
                imageIndex = self.buttons[buttonId]['imageIndexes']['on'];

            }
            // is on / else
            
            // set background position
            self.setBackgroundPosition( buttonOptions['id'], imageIndex );
            
        // DONE FUNCTION: soundOnOffMouseOver( event: event, named array: buttonOptions ) void
        };
        self.soundOnOffMouseOut = function( event, buttonOptions ) {
        // FUNCTION: soundOnOffMouseOut( event: event, named array: buttonOptions ) void
            
            // get button id
            let buttonId = buttonOptions['buttonId'];
            
            // create image index
            let imageIndex = 0;
            
            // is on / else
            if( self.buttons[buttonId]['isOn'] ){

                // set image index
                imageIndex = self.buttons[buttonId]['imageIndexes']['on'];

            }
            else {

                // set image index
                imageIndex = self.buttons[buttonId]['imageIndexes']['off'];

            }
            // is on / else
            
            // set background position
            self.setBackgroundPosition( buttonOptions['id'], imageIndex );
            
        // DONE FUNCTION: soundOnOffMouseOut( event: event, named array: buttonOptions ) void
        };
        self.soundOnOffClick = function( event, buttonOptions ) {
        // FUNCTION: soundOnOffClick( event: event, named array: buttonOptions ) void
            
            
            
        // DONE FUNCTION: soundOnOffClick( event: event, named array: buttonOptions ) void
        };
        self.setBackgroundPosition = function( buttonId, imageIndex ) {
        // FUNCTION: click( html element id: buttonId, integer: imageIndex ) void
            
            // get button width
            let buttonWidth = $( '#' + buttonId ).width();
           
            // get button height
            let buttonHeight = $( '#' + buttonId ).height();
           
            // create background position
            let backgroundPosition = imageIndex * buttonWidth + 'px ' + buttonHeight + 'px'; 
            
            // set background position
            $( '#' + buttonId ).css( 'background-position', backgroundPosition );
            
        // DONE FUNCTION: click( html element id: buttonId, integer: imageIndex ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void

            // get container width
            let containerWidth = $( '#' + self.containerOptions['id'] ).width();
            
            // create top
            let top = self.buttonOptions['spacing']['top'];
            
            // create left
            let left = 0;
            
            // loop over buttons
            $.each( self.buttons, function( index, button ) {
                
                // get button width
                let buttonWidth = $( '#' + button['id'] ).outerWidth();

                // get button height
                let buttonHeight = $( '#' + button['id'] ).outerHeight();
                
                // calculate left
                left = ( containerWidth - buttonWidth ) / 2;
                
                // set left
                $( '#' + button['id'] ).css( 'left', left + 'px' );

                // set top
                $( '#' + button['id'] ).css( 'top', top + 'px' );

                // add spacing to top
                top += self.buttonOptions['spacing']['vertical'];

                // add height
                top += buttonHeight;

            });
            // loop over buttons
                
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );

            // remove buttons
            self.removeButtons();

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
    // DONE MODULE: pacManControlsModule( html element id: parentId ) void
    
})( app );
// done create module function
