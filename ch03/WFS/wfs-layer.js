var esrijsonFormat = new ol.format.EsriJSON();

var map = new ol.Map({
    view: new ol.View({
        zoom: 6,
        center: [-415817, 6790054]
    }),
    target: 'js-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM
        })
    ]
});

// var vectorSource = new ol.source.Vector({
//     // format: new ol.format.WFS(),
//     url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NOS_Observations/CO_OPS_Stations/FeatureServer/0',
//     strategy: ol.loadingstrategy.all,
//     attributions: [
//         new ol.Attribution({
//             html: 'Contains <a href="http://bgs.ac.uk/">British Geological Survey</a> ' +
//             'materials &copy; NERC 2015'
//         })
//     ]
// });

var serviceUrl = 'https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/' +
          'Petroleum/KSFields/FeatureServer/';
      var layer = '0';

      var esrijsonFormat = new ol.format.EsriJSON();

var vectorSource = new ol.source.Vector({
    loader: function(extent, resolution, projection) {
      var url = serviceUrl + layer + '/query/?f=json&' +
          
      $.ajax({url: url, dataType: 'jsonp', success: function(response) {
        if (response.error) {
          alert(response.error.message + '\n' +
              response.error.details.join('\n'));
        } else {
          // dataProjection will be read from document
          var features = esrijsonFormat.readFeatures(response, {
            featureProjection: projection
          });
          if (features.length > 0) {
            vectorSource.addFeatures(features);
          }
        }
      }});
    },
    strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
      tileSize: 512
    }))
  });

var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    opacity: 0.4
});

map.addLayer(vectorLayer);




// case 'wfs-tide-gages':
//             return new ol.layer.Vector({
//               name: 'wfs-tide-gages',
//               hoverable: true,
//               // legend: {
//               //   name: 'conditions-tide-gages',
//               //   url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/guidance_meteoceanhydro_pts_geolinks/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=7&width=300'
//               // },
//               source: new ol.source.Vector({
//                 url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NOS_Observations/CO_OPS_Stations/FeatureServer',
//                 params: {
//                   layers: 'show:0'
//                 },
//                 crossOrigin: 'anonymous'
//               }),
//               format: new ol.format.WFS({

//               }),
//               visible: true
//             });