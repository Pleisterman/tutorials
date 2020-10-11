/*
 
        @package    Pleisterman/Tutorials
  
        file:       uiEventsModule.js
        function:   displays a clickable html element and handles the events
                        mouse over
                        mouse out
                        click
                        touch start
                        touch end
                        key down
                        key up
  
        Last revision: 03-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: uiEventsModule( html element id: parentId, 
    //                         named array: options, 
    //                         named array: callbacks ) void 
    
    app.uiEventsModule = function( parentId, options, callbacks ) {
    // PRIVATE:
        
        // MEMBERS
        var self = this;                                         // object
        self.MODULE = 'uiEventsModule';                          // string
        self.debugOn = false;                                    // boolean
        self.parentId = parentId;                                // html element id
        self.options = options;                                  // named array
        self.callbacks = callbacks;                              // function
        self.mouseIsOver = false;                                // boolean
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );

            // add html
            self.addHtml();
            
            // add events
            self.addEvents();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // debug info
            self.debug( 'addHtml' );

            // add container to parent
            $( '#' + self.parentId ).append( jsProject.jsonToElementHtml( self.options ) );

        // DONE FUNCTION: addHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void
            
            // debug info
            self.debug( 'removeHtml' );

            // remove container
            $( '#' + self.options['id'] ).remove();
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.addEvents = function() {
        // FUNCTION: addEvents( void ) void
         
            // debug info
            self.debug( 'addEvents: ' + self.options['id']);
        
            // add basic
            self.addBasicEvents();

            // add key events
            self.addKeyEvents();

        // DONE FUNCTION: addEvents( void ) void
        };            
        self.addBasicEvents = function() {
        // FUNCTION: addBasicEvents( void ) void
            
            // add button events
            $( '#' + self.options['id'] ).mouseover( function( event ){ self.mouseOver( event ); }); 
            $( '#' + self.options['id'] ).mouseout( function( event ){ self.mouseOut(event ); }); 
            $( '#' + self.options['id'] ).click( function( event ){ self.click( event ); }); 
            $( '#' + self.options['id'] ).on( "touchstart", function( event ){ self.touchStart( event ); });
            $( '#' + self.options['id'] ).on( "touchend", function( event ){ self.touchEnd( event ); });
            // add button events

        // DONE FUNCTION: addBasicEvents( void ) void
        };            
        self.addKeyEvents = function() {
        // FUNCTION: addKeyEvents( void ) void
            
            // callback exists
            if( self.callbacks['keyDown'] !== undefined ){

                // call key down 
                $( '#' + self.options['id'] ).keydown( function( ){ self.keyDown( event ); });
                
            }
            // callback exists
            
            // callback exists
            if( self.callbacks['keyUp'] !== undefined ){

                // call key up 
                $( '#' + self.options['id'] ).keyup( function( ){ self.keyUp( event ); });
                
            }
            // callback exists
            
        // DONE FUNCTION: addKeyEvents( void ) void
        };            
        self.removeEvents = function() {
        // FUNCTION: removeEvents( void ) void
        
            // remove button events
            $( '#' + self.options['id'] ).off( );
            
        // DONE FUNCTION: removeEvents( void ) void
        };            
        self.mouseOver = function( event ){
        // FUNCTION: mouseOver( event: event ) void
        
            // debug info
            self.debug( 'mouseOver' + self.options['id'] );
            
            // remember mouse over
            self.mouseIsOver = true;
            
            // highlight
            self.highlight();
            
            // callback exists
            if( self.callbacks['mouseOver'] !== undefined ){
            
                // call callback
                self.callbacks['mouseOver']( event, self.options  );
                
            }
            // callback exists
            
        // DONE FUNCTION: mouseOver( event: event ) void
        };
        self.mouseOut = function( ){
        // FUNCTION: mouseOut( event: event ) void
        
            // debug info
            self.debug( 'mouseOut' );
            
            // remember mouse out
            self.mouseIsOver = false;
            
            // reset
            self.reset();
            
            // callback exists
            if( self.callbacks['mouseOut'] !== undefined ){
            
                // call callback
                self.callbacks['mouseOut']( event, self.options );
                
            }
            // callback exists
            
        // DONE FUNCTION: mouseOut( event: event ) void
        };
        self.touchStart = function( event ){
        // FUNCTION: touchstart( event: event ) void
        
            // debug info
            self.debug( 'touchStart' );
            
            // remember mouse over
            self.mouseIsOver = true;
            
            // highlight
            self.highlight();
            
            // callback exists
            if( self.callbacks['mouseOver'] !== undefined ){
            
                // call callback
                self.callbacks['mouseOver']( event, self.options );
                
            }
            // callback exists
            
        // DONE FUNCTION: touchStart( event: event ) void
        };
        self.touchEnd = function( event ){
        // FUNCTION: touchEnd( event: event ) void
        
            // debug info
            self.debug( 'touchEnd' );
            
            // remember mouse out
            self.mouseIsOver = false;
            
            // reset
            self.reset();
            
            // callback exists
            if( self.callbacks['mouseOut'] !== undefined ){
            
                // call callback
                self.callbacks['mouseOut']( event, self.options );
                
            }
            // callback exists
            
        // DONE FUNCTION: touchEnd( event: event ) void
        };
        self.highlight = function( ){
        // FUNCTION: highlight( void ) void

            // has image url highlight
            if( self.options['highlightImageUrl'] !== undefined ){
                
                // mouse over -> highlight image url 
                $( '#' + self.options['id'] ).css( 'background-image', self.options['highlightImageUrl'] );
                
            }
            // has image url highlight

            // has background color highlight
            if( self.options['highlightBackgroundColor'] !== undefined ){
                
                // mouse over -> highlight background color
                $( '#' + self.options['id'] ).css( 'background-color', self.options['highlightBackgroundColor'] );
                
            }
            // has background color highlight

            // has color highlight
            if( self.options['highlightColor'] !== undefined ){
                
                // mouse over -> highlight color
                $( '#' + self.options['id'] ).css( 'color', self.options['highlightColor'] );
                
            }
            // has color highlight
            
            // has border highlight color
            if( self.options['highlightBorderColor'] !== undefined ){
                
                // mouse over -> highlight border color
                $( '#' + self.options['id'] ).css( 'border-color', self.options['highlightBorderColor'] );
                
            }
            // has border highlight color
            
        // DONE FUNCTION: highlight( void ) void
        };
        self.reset = function( ){
        // FUNCTION: reset( void ) void
        
            // has image url highlight
            if( self.options['imageUrl'] !== undefined ){
                
                // mouse out -> image url 
                $( '#' + self.options['id'] ).css( 'background-image', self.options['imageUrl'] );
                
            }
            // has image url
            
            // has background color
            if( self.options['backgroundColor'] !== undefined ){
                
                // mouse out -> reset background color
                $( '#' + self.options['id'] ).css( 'background-color', self.options['backgroundColor'] );
                
            }
            // has background color

            // has color
            if( self.options['color'] !== undefined ){
                
                // mouse out -> reset color
                $( '#' + self.options['id'] ).css( 'color', self.options['color'] );
                
            }
            // has color
            
            // has border color
            if( self.options['borderColor'] !== undefined ){
                
                // mouse over -> reset border color 
                $( '#' + self.options['id'] ).css( 'border-color', self.options['borderColor'] );
                
            }
            // has border color
            
        // DONE FUNCTION: reset( void ) void
        };
        self.click = function( event ){
        // FUNCTION: click( event: event ) void
        
            // debug info
            self.debug( 'Click' + self.options['id'] );
            
            // callback exists
            if( self.callbacks['click'] !== undefined ){
            
                // call callback
                self.callbacks['click']( event, self.options );
                
            }
            // callback exists
                        
        // DONE FUNCTION: click( event: event ) void
        };
        self.keyDown = function( event ){
        // FUNCTION: keyDown( event: event ) void
                        
            // call callback
            self.callbacks['keyDown']( event, self.options );
                
        // DONE FUNCTION: keyDown( event: event ) void
        };
        self.keyUp = function( event ){
        // FUNCTION: keyUp( event: event ) void
                        
            // call callback
            self.callbacks['keyUp']( event, self.options );
                
        // DONE FUNCTION: keyUp( event: event ) void
        };
        self.refresh = function( ){
        // FUNCTION: refresh( void ) void
        
            // debug info
            self.debug( 'refresh' );

            // mouse is over / else
            if( self.mouseIsOver ){
            
                // highlight
                self.highlight();
                
            }
            else {
                
                // reset
                self.reset();
                
            }
            // mouse is over / else
            
        // DONE FUNCTION: refresh( void ) void
        };
        self.refreshEvents = function( ){
        // FUNCTION: refreshEvents( void ) void
        
            // remove events
            self.removeEvents();
        
            // add events
            self.addEvents();
        
        // DONE FUNCTION: refreshEvents( void ) void
        };
        self.setColors = function( colors ){
        // FUNCTION: setColors( named array: colors  ) void
        
            // debug info
            self.debug( 'setColors' );
            
            // set colors
            self.options['color'] = colors['color'] !== undefined ? 
                                    colors['color'] : 
                                    self.options['color'];
            // set colors
            
            // set highlight color
            self.options['highlightColor'] = colors['highlightColor'] !== undefined ? 
                                             colors['highlightColor'] : 
                                             self.options['highlightColor'];
            // set highlight color
            
            // set background color
            self.options['backgroundColor'] = colors['backgroundColor'] !== undefined ? 
                                              colors['backgroundColor'] : 
                                              self.options['backgroundColor'];
            // set background color
            
            // set background color highlight
            self.options['highlightBackgroundColor'] = colors['highlightBackgroundColor'] !== undefined ? 
                                                       colors['highlightBackgroundColor'] : 
                                                       self.options['highlightBackgroundColor'];
            // set background color highlight
            
            // refresh
            self.refresh();

        // DONE FUNCTION: setColors( named array: colors ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // degug info
            self.debug( 'destruct' );

            // remove html
            self.removeHtml();
            
            // remove events
            self.removeEvents();
            
            // unset options
            self.options = null;
            
            // unset click callback
            self.clickCallback = null;
        
        // DONE FUNCTION: destruct( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                // call global debug
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
            
            // FUNCTION: getContainerId( void ) html element id
            getContainerId : function( ){
                
                // return id
                return self.options['id'];
                
            },
            // FUNCTION: getOptions( void ) named array
            getOptions : function( ){
                
                // return options
                return self.options;
                
            },
            // FUNCTION: getOptions( named array: colors ) void
            setColors : function( colors ){
                
                // call internal
                self.setColors( colors );
                
            },
            // FUNCTION: refresh( void ) void    
            refresh : function( ){
                
                // call internal
                self.refresh( );
                
            },
            // FUNCTION: refreshEvents( void ) void    
            refreshEvents : function( ){
                
                // call internal
                self.refreshEvents( );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: uiEventsModule( html element id: parentId, 
    //                              named array: options, 
    //                              named array: callbacks ) void 
    
})( app );
// done create module function
