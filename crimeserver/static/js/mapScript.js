//----Global functions--------------------------------------------------------//
var dbToUse; // Necessary for database selection.

var styleFunction = function(checkboxID) {
    return styles[checkboxID];
};

// Dude this is genuine KS brainpower or something.
function loadGeoJSON(checkboxID) {
  serviceURL = 'http://localhost:8000/crimeserver/';
  database = dbToUse; 
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

var element = document.getElementById('popup');

var popup = new ol.Overlay({
  element: element,
  stopEvent: false
});
map.addOverlay(popup);

$(document).ready(function() {
  // Checkbox event listener
  $(":checkbox").click(function() {
    var $this = $(this);
    var checkID = $this.attr('id');
    if ($this.is(':checked')) {
      loadGeoJSON(checkID);  
    } else {
  // Removes selected layer based on 'name' property
      map.getLayers().forEach(function(layer){
        if (layer.get('name') === checkID)
          layer.setVisible(checkID.checked);
      })
    } 
  });
  // KS popup addition. It's all copypasta, alas.
  map.on('click', function(evt) {
    // copypasta from https://github.com/openlayers/ol3/blob/v3.0.0-gamma.1/examples/icon.js#L65-L84
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer) {
          return feature;
        });
    if (feature) {
      var geometry = feature.getGeometry();
      var coord = geometry.getCoordinates();
      popup.setPosition(coord);
      $(element).popover({
        'placement': 'top',
        'html': true,
        'content': ('<p>' + feature.get('offense') + '</p>' +
                    '<p>' + feature.get('date') + '</p>' +
                    '<p>' + feature.get('time') + '</p>')
      });
      $(element).popover('show');
    } else {
      $(element).popover('destroy');
    }
  });
  $('#dataset').change(function() {
    dbToUse = $(this).val();
    console.log(dbToUse)
    loadGeoJSON(dbToUse);
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


