//----Instances----//
//var mainApp;
//mainApp = {};
// mainApp.layer = new ol.layer(); // TODO: check proper OL3 syntax
//mainApp.mapView = null;


// Think of a layer as a collection of items. FeatureCollectionView class is 
// initialized with a Map object.
// KS: Here's the opportunity to feed in all our arguments in the wrapper)

$(function(){

    var Models = Backbone.Model.extend({
        urlRoot: '/crimeserver/';
        trailer = '?format=json';
        offenseID = '&offense=' + checkboxID;
    })

    var MapView = Backbone.View.extend({
        
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

    var LayerView = Backbone.View.extend({


    })


    //----The Application----//
    var map = new MapView();
    map.render();

}); // End JQuery Wrapper