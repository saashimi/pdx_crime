$(function(){

    var Model = Backbone.Model.extend({
        urlRoot: '/crimeserver/',
        dbToUse: null,
        trailer: '?format=json',
        offenseID: '&offense=', 
        checkboxID: null, 
        initialize: function() {
            var completeURL = (this.urlRoot + this.trailer + this.offenseID +
                               this.checkboxID);
            console.log(completeURL);
            this.listenTo(this.model, )
        },
        updateCheckboxID: function() {
            //this.
        },
        updateDB: function() {
            // TODO: Update Selected Database
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

    //----The Application----//
    var AppView = Backbone.View.extend({
        el: $('#page-content-wrapper'), // Formerly '#map'

        events: {
            'click #menu-toggle' : 'menuToggle',
            'change #dataset'    : 'dbSelect', // This might not work.
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
            dbToUse = this.$('#dataset').val();
            console.log(dbToUse)
            //loadGeoJSON(dbToUse);
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
    var activeModel = new Model();
    var dbToUse;

}); // End JQuery Wrapper