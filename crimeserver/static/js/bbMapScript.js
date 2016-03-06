//$(function(){

    var Model = Backbone.Model.extend({
        // KS: Consider wrapping this as a default object?
        urlRoot: '/crimeserver/',
        selectedDB: null,
        trailer: '?format=json',
        offenseID: '&offense=', 
        checkboxID: null, 

        initialize: function() {
            // Is anything necessary here? 
            this.listenTo
        },

        returnFullURL: function() {
            complete = (this.urlRoot + this.selectedDB + this.trailer + 
                this.offenseID + this.checkboxID);
            console.log(complete);
            return complete;

        },

        /*updateCheckboxID: function() {
            //this.
        },*/
        
        /*updateDB: function() {
            console.log(this.selectedDB);
            //return this.set({'selectedDB' : dbToUse});
            this.selectedDB = dbToUse;
        },*/

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
            this.listenTo(AppView.events,  this.updateURLRoot ) // KS: Watch this for instancing errors.
            // The advantage to listenTo is that it allows the object to keep track
            // of the events
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
            activeModel.checkboxID = this.$(':checkbox').filter(':checked').attr('id');
            console.log(activeModel.checkboxID); 
        }       

    })

    //----The Application----//
    var AppView = Backbone.View.extend({
        el: $('#page-content-wrapper'), // Formerly '#map'

        events: {
            'click #menu-toggle'            : 'menuToggle',
            'change #dataset'               : 'dbSelect', 
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
            // Updates the Model per database selection.
            activeModel.selectedDB = this.$('#dataset').val();
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
    var Crime = new CrimeView();
    var activeModel = new Model();

//}); // End JQuery Wrapper