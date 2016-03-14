mw.kalturaPluginWrapper(function(){

    mw.PluginManager.add( 'myComponent', mw.KBaseComponent.extend({
        defaultConfig: {
            parent: "controlsContainer",    // the container for the button
            order: 41,                      // the display order ( based on layout )
            displayImportance: 'low',       // the display importance, determines when the item is removed from DOM
            align: "right",                 // the alignment of the button

            cssClass: 'kaltura-logo',       // the css name of the logo
            href: 'http://www.kaltura.com', // the link for the logo
            title: 'Turn off the lights',               // title
            img: 'bulb.png'                       // image
        },
        isSafeEnviornment:function(){
                // any runtime checks to determine the plugin can be active
                // for example if you need to check if this partner has a key against your service:
               //  var deferred = $.Deferred();
               // $.ajax ( myAjaxRequst, function( data ){
               //     deferred.resolve( !!data.isUserAllowed );
               //  });
               //  return deferred.promise();
        },
        setup: function(){
               // The place to set any of your player bindings like:
              this.bind( 'playerReady', function(){
                      // do something on player ready
               });
        },
        getComponent: function() {
            console.log("inside the component");
            function clickHandler(){

              if(window.parent.document.getElementsByTagName('body')[0].className === 'lights-out'){
                window.parent.document.getElementsByTagName('body')[0].className = '';
              }else{
                window.parent.document.getElementsByTagName('body')[0].className = 'lights-out';
              }
            }
            if( !this.$el ) {
                var $img = [];
                if( this.getConfig('img') ){
                    $img = $( '<img />' )
                                .attr({
                                    alt: this.getConfig('title'),
                                    src: this.getConfig('img'),
                                    style: 'height:100%;margin-left:10px;background-image:null'
                                });
                }
                this.$el = $('<div />')
                                .addClass ( this.getCssClass() )
                                .attr('style','background-image:none')
                                .click(function(){
                                  clickHandler();
                                })
                                .append(
                                $( '<a />' )
                                .attr({
                                    'title': this.getConfig('title'),
                                    'id': 'bulb'
                                }).append( $img )
                            );
            }

            return this.$el;
        }
    }));

});
