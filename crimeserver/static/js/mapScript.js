var image = new ol.style.Circle({
    radius: 8,
    fillColor: 'red', //KS why isn't this working?
    stroke: new ol.style.Stroke({
        color: 'red', 
        width:4
    })
})

var styles = {
    'Point': new ol.style.Style({
        image: image
    }),
};

var styleFunction = function(feature) {
    return styles[feature.getGeometry().getType()];
};

var vectorLayer = new ol.layer.Vector({
    title: 'added Layer',
    source: new ol.source.Vector({
        projection: 'EPSG:3857',
        url: 'http://localhost:8000/crimeserver/Crime2014?format=json&offense=Homicide',
        format: new ol.format.GeoJSON()
        }),
    style: styleFunction
});

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({
                layer: 'toner'
            })
        }),
        vectorLayer
    ],
    view: new ol.View({
        projection: 'EPSG:3857',
        center: ol.proj.fromLonLat([-122.6819, 45.5200]),
        // KS we are reprojecting from geographic 4326 into web mercator;
        zoom: 12,
    })
});


// Copypasta from http://stackoverflow.com/questions/14925913/how-can-i-set-up-openlayers-to-use-backbone-js
// In Backbone, the View is the mediator between a model and a piece of the DOM.
// In OpenLayers, instead of a piece of the DOM, we have an OpenLayers Feature, 
// Vector, Marker, Popup, Whatever. We could recreate this special relationsip
// between the View and its OpenLayers object. The view listenting to model changes
// and updating the OpenLayers object comes naturally. What about listening and
// responding to events on the OpenLayers object?

/*
Now for structuring your Views. I tend to think of an OpenLayers Layer as a 
collection of items. Let's say you want to render a collection of features. You 
might create a FeatureCollectionView class that is initialized with a Map object.
It would then create a Layer for its collection. */


