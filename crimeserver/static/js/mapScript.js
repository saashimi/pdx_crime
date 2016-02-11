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

/*var geojsonObject = { //KS: TODO:  turning this into a function
    'type': 'FeatureCollection',
    'crs': {
      'type': 'name',
      'properties': {
        'name': 'EPSG:3857'
      }
    },
    'features': [{
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [0, 0]
      }
    }]
};*/

//var vectorSource = new ol.source.Vector({
//    features:(new ol.format.GeoJSON()).readFeatures(geojsonObject)
//});

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
                layer: 'toner-lite'
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


