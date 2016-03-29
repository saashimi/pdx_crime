//$(function(){

    var Model = Backbone.Model.extend({
        // KS: Consider wrapping this as a default object?
        urlRoot: '/crimeserver/',
        //selectedDB: null, TODO: FIX THIS. HACKY
        trailer: '?format=json',
        offenseID: '&offense=', 
        checkboxID: null, 

        initialize: function() {
            // Is anything necessary here? 
            console.log("we've initialized.");
            this.listenTo(this, 'change:checkboxID', this.returnFullURL);
        },

        returnFullURL: function() {
            var complete = (this.urlRoot + dbToUse + this.trailer + 
                this.offenseID + this.changed['checkboxID']);
            console.log(complete);
            return complete;

        },

    })

    var Layer = Backbone.Model.extend({
        urlRoot: 'something', // TODO something real goes here.
        defaults: function() {
            return {
                name: 'New Layer',
                visible: true
            };
        },
        initialize: function() {
            this.listenTo(activeModel, 'change:selectedDB', activeModel.returnFullURL ) // KS: Watch this for instancing errors.
        }
    })


    var MapView = Backbone.View.extend({
        // KS: This is the background map to render.
        
        render: function() {
            this.map = this.loadMap()
        },

        loadMap: function() {
            var layer = new ol.layer.Tile({ // Alternative is this.layer = ...
                name: 'main',
                source: new ol.source.Stamen({
                    layer: 'toner-lite'
                })
            });

            return new ol.Map({
                layers: [layer],
                renderer: 'canvas',
                target: 'map',
                view: new ol.View({
                    projection: 'EPSG:3857',
                    center: ol.proj.fromLonLat([-122.6819, 45.5200]),
                    // KS we are reprojecting from geographic 4326 into web mercator;
                    zoom: 12,
                })
            });
        }
    });

    var CrimeView = Backbone.View.extend({
        el: $('#sidebar-wrapper'),

        events: {
            'change :checkbox'  : 'checkboxSelect',
        },       
        
        checkboxSelect: function() {
            var checkID = this.$(':checkbox').filter(':checked');
            
            if (checkID.length > 1) {
                console.log("we're in the first condition!");
                console.log(checkID[-1].attr('id'));
                activeModel.set({checkboxID : checkID[-1].attr('id')});
            } else {
                console.log("we're in the second condition!");
                console.log(checkID.attr('id'));
                activeModel.set({checkboxID : checkID.attr('id')});

            }

            //} else {
            //    console.log("we're in the second condition!");
            //  } 
            //activeModel.set({checkboxID : this.$(':checkbox').filter(':checked').attr('id')});
            //activeModel.checkboxID = this.$(':checkbox').filter(':checked').attr('id')
            //console.log(activeModel.checkboxID); 
        },
    })

    //----The Application----//
    var AppView = Backbone.View.extend({
        el: $('#page-content-wrapper'), // Formerly '#map'

        events: {
            'click #menu-toggle' : 'menuToggle',
            'change #dataset'    : 'dbSelect', 
        },

        initialize: function() {
            // TODO Stuff goes here!
        },

        menuToggle: function(evt) {
            // Toggles the flyout menu.
            evt.preventDefault();
            $("#wrapper").toggleClass("toggled");
        },

        dbSelect: function() {
            // HACK database selection.
            dbToUse = this.$('#dataset').val();
        },

        render: function() { 
            // KS: is this redundant to have in AppView? MapView already renders
            // this...
            var map = new MapView();
            map.render()
        }

    })

    //----Initialize----//
    var App = new AppView();
    App.render();
    var dbToUse; // HACK GLOBAL VARIABLE ALERT
    var Crime = new CrimeView(); // Checkbox doesn't work unless it's in a new view.
    var activeModel = new Model();
    //var activeLayer = new Layer();

//}); // End JQuery Wrapper