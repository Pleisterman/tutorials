/*
 
        @package    Pleisterman\Tutorials\PacMan_O_O
  
        file:       menuModule.js
        function:   creates the menu
  
        Last revision: 04-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: menuModule( void ) void 
    
    app.menuModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'menuModule';                                     // string
        self.debugOn = false;                                           // boolean
        self.headerOptions = {                                          // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'MenuContainer' ), // string 
            'element'               :   'div',                          // html element type 
            'position'              :   'fixed',                        // html element type 
            'zIndex'                :   200,                            // css
            'backgroundColor'       :   'DarkSlateGray',                // css
            'top'                   :   '0px',                          // css
            'styleWidth'            :   '100%',                         // css
            'styleHeight'           :   '97px',                         // css
        };                                                              // done named array  
        self.titleOptions = {                                           // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Title' ), // string 
            'element'               :   'div',                          // html element type 
            'position'              :   'absolute',                     // css
            'top'                   :   '62px',                         // css
            'styleWidth'            :   '100%',                         // css
            'text'                  :   'Pac Man: Sound',          // string
            'fontSize'              :   '22px',                         // css
            'color'                 :   'silver',                       // css
            'backgroundColor'       :   'transparent',                  // css
            'textAlign'             :   'center',                       // css
        };                                                              // done named array  
        self.menuContainerOptions = {                                   // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'MenuContainer' ), // string 
            'element'               :   'div',                          // html element type 
            'display'               :   'table',                        // css
            'position'              :   'absolute',                     // css
            'top'                   :   '23px',                         // css
            'left'                  :   '20px',                         // css
            'padding'               :   '3px',                          // css
            'fontSize'              :   '22px',                         // css
            'backgroundColor'       :   'Bisque',                       // css
            'text'                  :   'Pleisterman Tutorials',        // string
            'cursor'                :   'pointer',                      // css
            'linkOptions' : {                                           // named array 
                'url'               :   '../../',                       // string
                'target'            :   '_self'                         // string
            }                                                           // done named array 
        };                                                              // done named array  
        self.menuContentOptions = {                                     // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'MenuContent' ), // string 
            'element'               :   'div',                          // html element type 
            'zIndex'                :   2,                              // css
            'position'              :   'relative',                     // css
        };                                                              // done named array  
        self.menuItemsContainerOptions = {                              // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'MenuItemsContainer' ), // string 
            'element'               :   'div',                          // html element type 
            'position'              :   'absolute',                     // css
            'top'                   :   '10px',                         // css
            'left'                  :   '20px',                         // css
            'maximumHeight'         :   '0px',                          // css
            'overflow'              :   'hidden',                       // css
        };                                                              // done named array  
        self.menuItemsContentOptions = {                                // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'MenuItemsContent' ), // string 
            'element'               :   'div',                          // html element type 
            'position'              :   'relative',                     // css
            'backgroundColor'       :   'Bisque',                       // css
            'padding'               :   '10px',                         // css
        };                                                              // done named array  
        self.menuItemsOptions = {                                       // named array 
            'element'               :   'div',                          // html element type 
            'backgroundColor'       :   'Bisque',                       // css
            'highlightBackgroundColor' : 'DarkKhaki',                   // css
            'animationOptions' : {                                      // named array 
                'timer'             :   null,                           // timer object / null
                'delay'             :   200,                            // integer
                'interval'          :   10,                             // integer
                'change'            :   10,                             // integer
                'animate'           :   null,                           // string / null
            }                                                           // done named array 
        };                                                              // done named array  
        self.menuItems = {                                              // named array
            'tutorialsHome' : {                                         // named array
                'id'                :   app.getUniqueIndex( self.MODULE + 'MenuItemHome' ), // html element id
                'text'              :   '<nobr>Tutorials</nobr>',       // string
                'linkOptions' : {                                       // named array 
                    'url'           :   '../../',                       // string
                    'target'        :   '_self'                         // string
                }                                                       // done named array 
            },                                                          // done named array  
            'packMan_O_O' : {                                           // named array
                'id'                :   app.getUniqueIndex( self.MODULE + 'MenuItemExample' ), // html element id
                'text'              :   '<nobr>Pac Man O.O. - Lesson 1. The example.</nobr>', // string
                'linkOptions' : {                                       // named array 
                    'url'           :   '../example/',                  // string
                    'target'        :   '_self'                         // string
                }                                                       // done named array 
            },                                                          // done named array  
            'helloWorld' : {                                            // named array
                'id'                :   app.getUniqueIndex( self.MODULE + 'MenuItemHelloWorld' ), // html element id
                'text'              :   '<nobr>Pac Man O.O. - Lesson 2. Hello World.</nobr>', // string
                'linkOptions' : {                                       // named array 
                    'url'           :   '../helloWorld/',               // string
                    'target'        :   '_self'                         // string
                }                                                       // done named array 
            },                                                          // done named array  
            'responsiveLayout' : {                                      // named array
                'id'                :   app.getUniqueIndex( self.MODULE + 'MenuItemResponsiveLayout' ), // html element id
                'text'              :   '<nobr>Pac Man O.O. - Lesson 3. Responsive layout.</nobr>', // string
                'linkOptions' : {                                       // named array 
                    'url'           :   '../responsiveLayout/',         // string
                    'target'        :   '_self'                         // string
                }                                                       // done named array 
            },                                                          // done named array  
            'gameObjects' : {                                           // named array
                'id'                :   app.getUniqueIndex( self.MODULE + 'MenuItemGameObjects' ), // html element id
                'text'              :   '<nobr>Pac Man O.O. - Lesson 4. Game objects.</nobr>', // string
                'linkOptions' : {                                       // named array 
                    'url'           :   '../gameObjects/',              // string
                    'target'        :   '_self'                         // string
                }                                                       // done named array 
            },                                                          // done named array  
            'animations' : {                                            // named array
                'id'                :   app.getUniqueIndex( self.MODULE + 'MenuItemAnimations' ), // html element id
                'text'              :   '<nobr>Pac Man O.O. - Lesson 5. Animations.</nobr>', // string
                'linkOptions' : {                                       // named array 
                    'url'           :   '../animations/',               // string
                    'target'        :   '_self'                         // string
                }                                                       // done named array 
            },                                                          // done named array  
            'sound' : {                                                 // named array
                'id'                :   app.getUniqueIndex( self.MODULE + 'MenuItemSound' ), // html element id
                'text'              :   '<nobr>Pac Man O.O. - Lesson 6. Sound.</nobr>', // string
                'linkOptions' : {                                       // named array 
                    'url'           :   '../sound/',                    // string
                    'target'        :   '_self'                         // string
                }                                                       // done named array 
            }                                                           // done named array  
        };                                                              // done named array  
        self.menuModule = null;                                         // module / null
        self.menuItemModules = [];                                      // array                         
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add header
            self.addHeader();
            
            // add title
            self.addTitle();
            
            // add menu
            self.addMenu();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addHeader = function() {
        // FUNCTION: addHeader( void ) void
            
            // debug info
            self.debug( 'addHeader' );

            // add header to window
            $( document.body ).append( jsProject.jsonToElementHtml( self.headerOptions ) );

        // DONE FUNCTION: addHeader( void ) void
        };
        self.addMenu = function() {
        // FUNCTION: addMenu( void ) void

            // create callbacks
            let callbacks = {
                'click'         :   self.menuClick
            };
            // create callbacks
            
            // add menu to header
            self.menuModule = new app.uiEventsModule( self.headerOptions['id'],
                                                      self.menuContainerOptions,
                                                      callbacks );
            // add menu to header

            // add menu content to menu container
            $( '#' + self.menuContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.menuContentOptions ) );

            // add events
            $( '#' + self.menuContainerOptions['id'] ).mouseover( function( event ){ self.showMenu( event ); }); 
            $( '#' + self.menuContainerOptions['id'] ).mouseout( function( event ){ self.hideMenu( event ); }); 
            // add events

            // add menu items container to menu
            $( '#' + self.menuContentOptions['id'] ).append( jsProject.jsonToElementHtml( self.menuItemsContainerOptions ) );

            // add menu items content to container
            $( '#' + self.menuItemsContainerOptions['id'] ).append( jsProject.jsonToElementHtml( self.menuItemsContentOptions ) );

            // add menu items
            self.addMenuItems();

        // DONE FUNCTION: addMenu( void ) void
        };
        self.menuClick = function(  ) {
        // FUNCTION: menuClick( void ) void

            // open link
            window.open( self.menuContainerOptions['linkOptions']['url'], self.menuContainerOptions['linkOptions']['target'] );

        // DONE FUNCTION: menuClick( void ) void
        };
        self.addMenuItems = function( event ){
        // FUNCTION: addMenuItems( event: event ) void
        
            // create callbacks
            let callbacks = {
                'click'         :   self.menuItemClick
            };
            // create callbacks
        
            // loop over menu items
            $.each( self.menuItems, function( index, menuItem ) {
                
                // copy item options
                let itemOptions = jQuery.extend( true, {}, self.menuItemsOptions, menuItem );
                
                // create item
                let item = new app.uiEventsModule( self.menuItemsContentOptions['id'],
                                                   itemOptions,
                                                   callbacks );
                // create item
                
                // add item to menu item modules
                self.menuItemModules.push( item );
                                
            });
            // loop over menu items
        
        // DONE FUNCTION: addMenuItems( void ) void
        };
        self.showMenu = function( event ){
        // FUNCTION: mouseOver( event: event ) void
        
            // debug info
            self.debug( 'showMenu' );
            
            // clear timer
            self.clearMenuAnimationTimer();
            
            // get animation options
            let animationOptions = self.menuItemsOptions['animationOptions'];
            
            // set is animate
            animationOptions['animate'] = 'opening'; 
            
            // start animation
            setTimeout( function () { self.animateMenu(); }, animationOptions['delay'] );
            
        // DONE FUNCTION: showMenu( event: event ) void
        };
        self.hideMenu = function( ){
        // FUNCTION: hideMenu( event: event ) void
        
            // debug info
            self.debug( 'mouseOut' );
            
            // clear timer
            self.clearMenuAnimationTimer();
            
            // get animation options
            let animationOptions = self.menuItemsOptions['animationOptions'];
            
            // set is animate
            animationOptions['animate'] = 'closing'; 
            
            // start animation
            setTimeout( function () { self.animateMenu(); }, animationOptions['delay'] );
            
        // DONE FUNCTION: hideMenu( event: event ) void
        };
        self.addTitle = function() {
        // FUNCTION: addTitle( void ) void

            // add menu to header
            $( '#' + self.headerOptions['id'] ).append( jsProject.jsonToElementHtml( self.titleOptions ) );

        // DONE FUNCTION: addTitle( void ) void
        };
        self.animateMenu = function() {
        // FUNCTION: animateMenu( void ) void

            // clear timer
            self.clearMenuAnimationTimer();
            
            // get animation options
            let animationOptions = self.menuItemsOptions['animationOptions'];
            
            // animate menu tic
            let ready = self.animateMenuTic( animationOptions );;
            
            // ! ready
            if( !ready ){
                
                // continue animation
                setTimeout( function () { self.animateMenu(); }, animationOptions['interval'] );
                
            }
            // ! ready
            
        // DONE FUNCTION: animateMenu( void ) void
        };
        self.animateMenuTic = function( animationOptions ) {
        // FUNCTION: animateMenuTic( named array: animationOptions ) boolean

            // animate is opening
            if( animationOptions['animate'] === 'opening' ){

                // return animate menu open
                return self.animateMenuOpen( animationOptions );
                
            }
            // animate is opening

            // animate is closing
            if( animationOptions['animate'] === 'closing' ){

                // return animate menu close
                return self.animateMenuClose( animationOptions );
                
            }
            // animate is opening

            // no animation return ready
            return true;

        // DONE FUNCTION: animateMenuTic( named array: animationOptions ) boolean
        };
        self.animateMenuOpen = function( animationOptions ) {
        // FUNCTION: animateMenuOpen( named array: animationOptions ) boolean

            // get height
            var height = $( '#' + self.menuItemsContainerOptions['id'] ).css( 'max-height' ).replace( "px", '' );
            
            // get integer
            height = parseInt( height );
            
            // add change
            height += animationOptions['change'];
            
            // set height
            $( '#' + self.menuItemsContainerOptions['id'] ).css( 'max-height', height + 'px' );

            // height < scroll height
            if( height >= $( '#' + self.menuItemsContainerOptions['id'] ).prop( 'scrollHeight' ) ){
                
                // unset animate
                animationOptions['animate'] = null;
                
                // return ready
                return true;
                
            }
            // height < scroll height
            
            // return ! ready
            return false;
                
        // DONE FUNCTION: animateMenuOpen( named array: animationOptions ) boolean
        };
        self.animateMenuClose = function( animationOptions ) {
        // FUNCTION: animateMenuClose( named array: animationOptions ) boolean

            // get height
            let height = $( '#' + self.menuItemsContainerOptions['id'] ).css( 'max-height' ).replace( "px", '' );
            
            // get integer
            height = parseInt( height );
            
            // subtract change
            height -= animationOptions['change'];

            // set minimum
            height = Math.max( 0, height );

            // set height
            $( '#' + self.menuItemsContainerOptions['id'] ).css( 'max-height', height + 'px' );

            // height <= 0
            if( height <= 0 ){
            
                // return ready
                return true;
                
            }
            // height < scroll height
            
            // return ! ready
            return false;

        // DONE FUNCTION: animateMenuClose( named array: animationOptions ) boolean
        };
        self.clearMenuAnimationTimer = function() {
        // FUNCTION: clearMenuAnimationTimer( void ) void

            // get animation options
            let animationOptions = self.menuItemsOptions['animationOptions'];
            
            // timer exists
            if( animationOptions['timer'] !== null ){

                // clear timer
                clearTimeout( animationOptions['timer'] );
                
                // unset timer
                animationOptions['timer'] = null;
                
            }
            // timer exists
            
        // DONE FUNCTION: clearMenuAnimationTimer( void ) void
        };
        self.menuItemClick = function( event, item ) {
        // FUNCTION: menuItemClick( event: event, named array: item ) void

            // stop propagation
            event.stopPropagation();

            // open link
            window.open( item['linkOptions']['url'], item['linkOptions']['target'] );

        // DONE FUNCTION: menuItemClick( event: event, named array: item ) void
        };
        self.setTitle = function( title ) {
        // FUNCTION: setTitle( string: title ) void

            // set title
            $( '#' + self.titleOptions['id'] ).html( title );

        // DONE FUNCTION: setTitle( string: title ) void
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
            
            // FUNCTION: setTitle( string: title ) void    
            setTitle : function( title ){
                
                // call internal
                self.setTitle( title );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: menuModule( void ) void
    
})( app );
// done create module function
