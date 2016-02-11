      function applyMargins() {
        var leftToggler = $(".mini-submenu-left");
        if (leftToggler.is(":visible")) {
          $("#map .ol-zoom")
            .css("margin-left", 0)
            .removeClass("zoom-top-opened-sidebar")
            .addClass("zoom-top-collapsed");
        } else {
          $("#map .ol-zoom")
            .css("margin-left", $(".sidebar-left").width())
            .removeClass("zoom-top-opened-sidebar")
            .removeClass("zoom-top-collapsed");
        }
      }
      function isConstrained() {
        return $(".sidebar").width() == $(window).width();
      }
      function applyInitialUIState() {
        if (isConstrained()) {
          $(".sidebar-left .sidebar-body").fadeOut('slide');
          $('.mini-submenu-left').fadeIn();
        }
      }
      $(function(){
        $('.sidebar-left .slide-submenu').on('click',function() {
          var thisEl = $(this);
          thisEl.closest('.sidebar-body').fadeOut('slide',function(){
            $('.mini-submenu-left').fadeIn();
            applyMargins();
          });
        });
        $('.mini-submenu-left').on('click',function() {
          var thisEl = $(this);
          $('.sidebar-left .sidebar-body').toggle('slide');
          thisEl.hide();
          applyMargins();
        });
        $(window).on("resize", applyMargins);
        
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
        applyInitialUIState();
        applyMargins();
      });


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




