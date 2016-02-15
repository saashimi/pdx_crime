var styles = {
    'DUII' : new ol.style.Style({
      image: DUIIImage
    }),
    'Homicide': new ol.style.Style({
      image: homicideImage
    }),
};

var styleFunction = function(checkboxID) {
    return styles[checkboxID];
};

function loadGeoJSON(checkboxID) {
  //input is an array of params
  serviceURL = 'http://localhost:8000/crimeserver/';
  database = 'Crime2014'; // KS TODO: Differentiate by dropdown once we populate the DB.
  trailer = '?format=json';
  offenseID = '&offense=' + checkboxID;

  var vectorLayer = new ol.layer.Vector({
    name: checkboxID,
    source: new ol.source.Vector({
        projection: 'EPSG:3857',
        url: serviceURL + database + trailer + offenseID,
        format: new ol.format.GeoJSON(),
        }),
    style: styleFunction(checkboxID)
  }); 
  map.addLayer(vectorLayer);
  console.log(vectorLayer);
};

function removeLayer(checkboxID) {
  map.removeLayer(vectorLayer);
}

var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
          source: new ol.source.Stamen({
              layer: 'toner'
          })
      }),
    ],
    view: new ol.View({
        projection: 'EPSG:3857',
        center: ol.proj.fromLonLat([-122.6819, 45.5200]),
        // KS we are reprojecting from geographic 4326 into web mercator;
        zoom: 12,
    })
});

$(document).ready(function() {
  // Checkbox event listener
  $(":checkbox").click(function() {
    var $this = $(this);
    var checkID = $this.attr('id');
    if ($this.is(':checked')) {
      loadGeoJSON(checkID);  
    } else {
      map.getLayers().forEach(function(layer){
        if (layer.get('name') === checkID)
          layer.setVisible(checkID.checked);
      })
    } 
  });
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


