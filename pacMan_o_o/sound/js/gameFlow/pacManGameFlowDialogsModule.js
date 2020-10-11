/*
 
        @package    Pleisterman\Tutorials\PacMan O.O.
  
        file:       pacManGameFlowDialogsModule.js
        function:   Creates the game side panel 
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: pacManGameFlowDialogsModule( html element: parentId ) void 
    
    app.pacManGameFlowDialogsModule = function( parentId ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                            // object
        self.MODULE = 'pacManGameFlowDialogsModule';                // string
        self.debugOn = true;                                       // boolean
        self.parentId = parentId;                                   // html element
        self.containerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Container' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
            'backgroundColor'       :   'rgba( 255, 255, 255, 0.3 )', // css
        };                                                          // done named array  
        self.contentOptions = {                                     // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Content' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'relative',                 // css
        };                                                          // done named array  
        self.dialogOptions = {                                      // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Dialog' ), // string 
            'element'               :   'div',                      // html element type 
            'position'              :   'absolute',                 // css
        };                                                          // done named array  
        self.messageOptions = {                                     // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Message' ), // string 
            'element'               :   'div',                      // html element type 
            'color'                 :   'silver',                   // css
        };                                                          // done named array  
        self.buttonOptions = {                                      // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Button' ), // string 
            'element'               :   'div',                      // html element type 
            'cursor'                :   'pointer',                  // css
            'color'                 :   'silver',                   // css
            'fontSize'              :   '16px',                     // css
            'marginTop'             :   '12px',                     // css
            'padding'               :   '10px 6px',                 // css
            'backgroundColor'       :   'black',                    // css
            'border'                :   true,                       // boolean
            'borderWidth'           :   '1px',                      // css
            'borderColor'           :   'silver',                   // css 
            'borderStyle'           :   'groove',                   // css 
            'borderRadius'          :   '4px',                      // css 
            'boxShadow'             :   '2px 4px 9px rgba( 220, 20, 20, 0.3 )', // css
        };                                                          // done named array  
        self.buttonModule = null;                                   // module / null
        self.timer = null;                                          // timer object / null
        self.dialogs = {                                            // named array
            'gameStart' : {                                         // named array
                'button' : {                                        // named array
                    'text'          :   'New game',                 // string
                }                                                   // done named array
            },                                                      // done named array
            'lifeLost' : {                                          // named array
                'message'           :   'Life lost',                // string
                'duration'          :   1000,                       // integer
            },                                                      // done named array
            'levelComplete' : {                                     // named array
                'message'           :   'Level complete',           // string
                'duration'          :   1000,                       // integer
            },                                                      // done named array
            'gameLost' : {                                          // named array
                'message'           :   'Game over',                // string
                'buttonText'        :   'Retart',                   // string
            },                                                      // done named array
            'gameWon' : {                                           // named array
                'message'           :   'You are the winner',       // string
                'buttonText'        :   'Retart',                   // string
            }                                                       // done named array
        };                                                          // done named array
        self.dimensions = null;                                     // named array / null
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
                        
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
        // FUNCTION: removeContainer( void ) void
            
            // debug info
            self.debug( 'removeHtml' );

            // remove content
            $( '#' + self.contentOptions['id'] ).remove();

            // remove container
            $( '#' + self.containerOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.showGameStart = function() {
        // FUNCTION: showGameStart( void ) void
         
            // add html
            self.addHtml();
            
            // create dialog
            self.createDialog( 'gameStart' );
            
        // DONE FUNCTION: showGameStart( void ) void
        };
        self.createDialog = function( dialogId ) {
        // FUNCTION: createDialog( string: dialogId ) void
         
            // dialog ! exists
            if( !$( '#' + self.dialogOptions['id'] ).length ){
                
                // add message
                $( '#' + self.contentOptions['id'] ).append( jsProject.jsonToElementHtml( self.dialogOptions ) );
                
            }
            // dialog ! exists
         
            // has message
            if( self.dialogs[dialogId]['message'] !== undefined ){

                // add message
                self.addMessage( self.dialogs[dialogId]['message'] );
                
            }
            // has message

            // has button
            if( self.dialogs[dialogId]['button'] !== undefined ){

                // add button
                self.addButton( dialogId, self.dialogs[dialogId]['button'] );
                
            }
            // has button

            // has duration
            if( self.dialogs[dialogId]['duration'] !== undefined ){

                // start timer
                

            }
            // has duration
            
            // adjust layout
            self.layoutChange();
            
        // DONE FUNCTION: createDialog( string: dialogId ) void
        };
        self.addMessage = function( message ) {
        // FUNCTION: addMessage( string: message ) void
         
            // message ! exists
            if( !$( '#' + self.messageOptions['id'] ).length ){
                
                // add message
                $( '#' + self.dialogOptions['id'] ).append( jsProject.jsonToElementHtml( self.messageOptions ) );
                
            }
            // message ! exists
         
            // set text
            $( '#' + self.messageOptions['id'] ).html( message );
         
        // DONE FUNCTION: addMessage( string: message ) void
        };
        self.addButton = function( dialogId, button ) {
        // FUNCTION: addButton( string: dialogId, named array: button ) void
         
            // button ! exists
            if( self.buttonModule === null ){
                
                // copy button options
                let buttonOptions = jQuery.extend( true, {}, self.buttonOptions );

                // set dialog id
                buttonOptions['dialogId'] = dialogId;

                // create callbacks
                let callbacks = {
                    'click'         :   self.buttonClick
                };
                // create callbacks

                // create button
                self.buttonModule = new app.uiEventsModule( self.dialogOptions['id'],
                                                            buttonOptions,
                                                            callbacks );
                // create button
                
            }
            // button ! exists
         
            // set text
            $( '#' + self.buttonOptions['id'] ).html( button['text'] );
         
        // DONE FUNCTION: addButton( string: dialogId, named array: button ) void
        };
        self.buttonClick = function( event, buttonOptions ) {
        // FUNCTION: buttonClick( event: event, named array: buttonOptions ) void

            // debug info
            self.debug( 'click: ' + buttonOptions['dialogId'] );

            // is game start
            if( buttonOptions['dialogId'] === 'gameStart' ){

                // hide
                self.hide();

                // play background sound
                self.playBackgroundSound();

                // show playing
                app.showPlaying();
                
                // resume animations
                app.resumeAnimations();
                
                // enable pause play
                app.enablePausePlayControl();
                
            }
            // is game start

        // DONE FUNCTION: buttonClick( event: event, named array: buttonOptions ) void
        };
        self.playBackgroundSound = function() {
        // FUNCTION: playBackgroundSound( void ) void
            
            // create options
            let options = {
                'id'        :   'background01'
            };
            // create options
            
            // play sound
            app.playSound( options );
            
        // DONE FUNCTION: playBackgroundSound( void ) void
        };
        self.hide = function( ){
        // FUNCTION: hide( void ) void

            // button exists
            if( self.buttonModule !== null ){
                
                // destroy button
                self.buttonModule.destruct();
                
                // unset button
                self.buttonModule = null;
                
            }
            // button exists

            // message exists
            if( $( '#' + self.messageOptions['id'] ).length ){
                
                // remove message
                $( '#' + self.messageOptions['id'] ).remove( );
                
            }
            // message exists

            // remove dialog
            $( '#' + self.dialogOptions['id'] ).remove( );
                
            // remove html
            self.removeHtml();

        // DONE FUNCTION: hide( event: event, named array: buttonOptions ) void
        };
        self.setDimensions = function( dimensions ){
        // FUNCTION: layoutChange( named array: dimensions ) void

                // call internal
                self.dimensions = dimensions;
                
                // adjust layout
                self.layoutChange();
        
        // DONE FUNCTION: setDimensions( named array: dimensions  ) void
        };
        self.layoutChange = function( ){
        // FUNCTION: layoutChange( void ) void

            // dialog ! exists
            if( !$( '#' + self.dialogOptions['id'] ).length ){

                // done
                return;
                
            }
            // dialog ! exists

            // set container width
            $( '#' + self.containerOptions['id'] ).width( self.dimensions['width'] );
            
            // set container height
            $( '#' + self.containerOptions['id'] ).height( self.dimensions['height'] );
            
            // set left
            $( '#' + self.containerOptions['id'] ).css( 'left', self.dimensions['left'] + 'px' );
            
            // set top
            $( '#' + self.containerOptions['id'] ).css( 'top', self.dimensions['top'] + 'px' );

            // get dialog width
            let dialogWidth = $( '#' + self.dialogOptions['id'] ).outerWidth();
            
            // get dialog height
            let dialogHeight = $( '#' + self.dialogOptions['id'] ).outerHeight();
            
            // calculate left
            let left = parseInt( self.dimensions['width'] - dialogWidth ) / 2;

            // calculate top
            let top = parseInt( self.dimensions['height'] - dialogHeight ) / 2;

            // set left
            $( '#' + self.dialogOptions['id'] ).css( 'left', left + 'px' );

            // set top
            $( '#' + self.dialogOptions['id'] ).css( 'top', top + 'px' );

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
            
            // FUNCTION: showGameStart( void ) void    
            showGameStart : function( ){
                
                // call internal
                self.showGameStart( );
                
            },
            // FUNCTION: setDimensions( named array: dimensions ) void
            setDimensions :function( dimensions ){
                
                // call internal
                self.setDimensions( dimensions );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: pacManGameFlowDialogsModule( html element: parentId ) void
    
})( app );
// done create module function
