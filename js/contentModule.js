/*
 
        @package    Pleisterman\Tutorials
  
        file:       contentModule.js
        function:   Creates the content
  
        Last revision: 03-10-2020
 
*/

// create module function
( function( app ){

    // MODULE: contentModule( void ) void 
    
    app.contentModule = function( ) {
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                                // object
        self.MODULE = 'contentModule';                                  // string
        self.debugOn = false;                                           // boolean
        self.titleOptions = {                                           // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Title' ), // string 
            'element'               :   'div',                          // html element type 
            'marginTop'             :   '110px',                        // css
            'text'                  :   'Tutorials',                    // string
            'fontSize'              :   '30px',                         // css
            'color'                 :   'DarkSlateGray',                // css
            'backgroundColor'       :   'transparent',                  // css
            'textAlign'             :   'center',                       // css
        };                                                              // done named array  
        self.contentOptions = {                                         // named array 
            'id'                    :   app.getUniqueIndex( self.MODULE + 'Content' ), // string 
            'element'               :   'div',                          // html element type 
            'display'               :   'flex',                         // css
            'justifyContent'        :   'center',                       // css
            'flexWrap'              :   'wrap',                         // css
            'maximumWidth'          :   '1400px',                       // css
            'styleWidth'            :   '100%',                         // css
            'marginTop'             :   '40px',                         // css
            'backgroundColor'       :   'transparent',                  // css
        };                                                              // done named array  
        self.lessonContainerOptions = {                                 // named array 
            'element'               :   'div',                          // html element type 
            'minimumWidth'          :   '200px',                        // css
            'maximumWidth'          :   '360px',                        // css
            'minimumHeight'         :   '400px',                        // css
            'margin'                :   'auto',                         // css
            'paddingBottom'         :   '75px',                         // css
            'backgroundColor'       :   'transparent',                  // css
            'cursor'                :   'pointer',                      // css
        };                                                              // done named array  
        self.lessonContentOptions = {                                   // named array 
            'element'               :   'div',                          // html element type 
            'background'            :   'linear-gradient( 0deg, DimGray 42% , DarkSlateGray )', // css
            'maximumWidth'          :   '100%',                         // css
            'styleWidth'            :   '100%',                         // css
            'styleHeight'           :   '100%',                         // css
            'padding'               :   '22px',                         // css
            'boxShadow'             :   '2px 2px 2px 1px rgba( 0, 168, 242, 0.3 )', // css
            'backgroundColor'       :   'transparent',                  // css
            'borderRadius'          :   '4px',                          // css
        };                                                              // done named array  
        self.lessonTitleOptions = {                                     // named array 
            'element'               :   'div',                          // html element type 
            'backgroundColor'       :   'transparent',                  // css
            'fontSize'              :   '25px',                         // css
            'color'                 :   'gold',                         // css
        };                                                              // done named array  
        self.lessonSubTitleOptions = {                                  // named array 
            'element'               :   'div',                          // html element type 
            'backgroundColor'       :   'transparent',                  // css
            'fontSize'              :   '20px',                         // css
            'color'                 :   'gold',                         // css
            'marginTop'             :   '10px',                         // css            
        };                                                              // done named array  
        self.lessonDescriptionOptions = {                               // named array 
            'element'               :   'div',                          // html element type 
            'backgroundColor'       :   'transparent',                  // css
            'fontSize'              :   '18px',                         // css
            'color'                 :   'silver',                       // css
            'marginTop'             :   '15px',                         // css            
        };                                                              // done named array  
        self.lessonScreenShotOptions = {                                // named array 
            'element'               :   'div',                          // html element type 
            'marginTop'             :   '15px',                         // css            
            'marginLeft'            :   '45px',                         // css            
            'marginBottom'          :   '15px',                         // css            
            'backgroundColor'       :   'transparent',                  // css
            'backgroundPosition'    :   'center center',                // css
            'backgroundSize'        :   '100% 100%',                    // css
        };                                                              // done named array  
        self.lessons = {                                                // named array 
            'pacMan_o_o' : {                                            // named array 
                'container' : {                                         // named array
                    'id'                :   app.getUniqueIndex( self.MODULE + 'Container' ),
                    'eventsModule'      :   null,                       // module / null
                    'linkOptions' : {                                   // named array 
                        'url'           :   './pacMan_o_o/example/', // string
                        'target'        :   '_self'                     // string
                    }                                                   // done named array 
                },                                                      // done named array  
                'content' : {                                           // named array
                    'id'                :   app.getUniqueIndex( self.MODULE + 'Content' ),
                },                                                      // done named array  
                'title' : {                                             // named array
                    'id'                :   app.getUniqueIndex( self.MODULE + 'Title' ),
                    'text'              :   'Pac Man O.O.',             // string
                },                                                      // done named array  
                'subTitle' : {                                          // named array
                    'id'                :   app.getUniqueIndex( self.MODULE + 'SubTitle' ),
                    'text'              :   'Building a game with Javascript', // string
                },                                                      // done named array  
                'description' : {                                       // named array
                    'id'                :   app.getUniqueIndex( self.MODULE + 'Description' ),
                    'textList' : [                                      // array    
                        'In this lesson we will build a Pac Man game ', // string
                        'in Object Oriented Javascript. ',              // string
                    ]                                                   // done array
                },                                                      // done named array  
                'screenShot' : {                                        // named array
                    'id'                :   app.getUniqueIndex( self.MODULE + 'ScreenShot' ),
                    'imageUrl'          :   'url( ./pacMan_o_o/common/assets/images/screenShot.png )', // css
                    'styleWidth'        :   '240px',                    // css
                    'styleHeight'       :   '240px',                    // css
                }                                                       // done named array  
            }                                                           // done named array  
        };                                                              // done named array  
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // add title
            self.addTitle();
            
            // add content
            self.addContent();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addTitle = function() {
        // FUNCTION: addTitle( void ) void

            // add title 
            $( document.body ).append( jsProject.jsonToElementHtml( self.titleOptions ) );

        // DONE FUNCTION: addTitle( void ) void
        };
        self.addContent = function() {
        // FUNCTION: addContent( void ) void

            // add content 
            $( document.body ).append( jsProject.jsonToElementHtml( self.contentOptions ) );

            // add lessons
            self.addLessons();
            
        // DONE FUNCTION: addContent( void ) void
        };
        self.addLessons = function() {
        // FUNCTION: addLessons( void ) void

            // create callbacks
            let callbacks = {
                'click'         :   self.lessonClick
            };
            // create callbacks
        
            // loop over lessons
            $.each( self.lessons, function( index, lesson ) {
                
                // copy lesson container options
                let lessonContainerOptions = jQuery.extend( true, {}, self.lessonContainerOptions, lesson['container'] );
                
                // create lesson
                lesson['eventsModule'] = new app.uiEventsModule( self.contentOptions['id'],
                                                                 lessonContainerOptions,
                                                                 callbacks );
                // create lesson
                
                // copy lesson content
                let lessonContent = jQuery.extend( true, {}, self.lessonContentOptions, lesson['content'] );
                
                // add lesson content
                $( '#' + lessonContainerOptions['id'] ).append( jsProject.jsonToElementHtml( lessonContent ) );
                
                // copy lesson title
                let lessonTitle = jQuery.extend( true, {}, self.lessonTitleOptions, lesson['title'] );
                
                // add lesson title
                $( '#' + lessonContent['id'] ).append( jsProject.jsonToElementHtml( lessonTitle ) );
                
                // copy lesson subtitle
                let lessonSubTitle = jQuery.extend( true, {}, self.lessonSubTitleOptions, lesson['subTitle'] );
                
                // add lesson subtitle
                $( '#' + lessonContent['id'] ).append( jsProject.jsonToElementHtml( lessonSubTitle ) );
                
                // copy lesson screen shot
                let lessonScreenShot = jQuery.extend( true, {}, self.lessonScreenShotOptions, lesson['screenShot'] );
                
                // add screen shot
                $( '#' + lessonContent['id'] ).append( jsProject.jsonToElementHtml( lessonScreenShot ) );

                // copy lesson description
                let lessonDescription = jQuery.extend( true, {}, self.lessonDescriptionOptions, lesson['description'] );
                
                // add text
                lessonDescription['text'] = '';
                
                // loop over text
                for( let i = 0; i < lesson['description']['textList'].length; i++ ){
                    
                    // add text
                    lessonDescription['text'] += lesson['description']['textList'][i];
                                        
                }
                // loop over text

                // add decription
                $( '#' + lessonContent['id'] ).append( jsProject.jsonToElementHtml( lessonDescription ) );

            });
            // loop over lessons

        // DONE FUNCTION: addLessons( void ) void
        };
        self.lessonClick = function( event, lesson ) {
        // FUNCTION: lessonClick( event: event, named array: lesson ) void

            // open link
            window.open( lesson['linkOptions']['url'], lesson['linkOptions']['target'] );

        // DONE FUNCTION: lessonClick( event: event, named array: lesson ) void
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
    // DONE MODULE: contentModule( void ) void
    
})( app );
// done create module function
