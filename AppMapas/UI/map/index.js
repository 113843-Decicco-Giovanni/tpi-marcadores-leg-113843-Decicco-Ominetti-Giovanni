const platform = new H.service.Platform({
    apikey: 'LBn6WuYnPkkiOJH-PIdwkIWAyLVWpDE46zLm3su2Ulo',
  });
  
  function moverACordoba(map) {
    map.setCenter({ lat: -31.437325096187514, lng: -64.1934164527255 });
    map.setZoom(14);
  }
  
  var marcadores = [];
  
  $(document).ready(function () {
    const url = 'https://localhost:7116/api/Marcador/getMarcadores';
    $.get(url, function(data) {

      console.log(data);
  

      if (data.hasOwnProperty('litadoMarcadores')) {

        var listaMarcadores = data.litadoMarcadores;
  
       
        $.each(listaMarcadores, function(index, marcador) {
          
          var latitud = marcador.latitud;
          var longitud = marcador.longitud;
          var info = marcador.info;
  
          
          var nuevoMarcador = {
            latitud: latitud,
            longitud: longitud,
            info: info
          };
          marcadores.push(nuevoMarcador);
        });
  
       
        console.log(marcadores);
  
        
        crearMarcadores(marcadores);
      }
    }).fail(function() {
      console.log('Error al realizar la solicitud GET.');
    });
  });
  

  
  var defaultLayers = platform.createDefaultLayers();
  

  var map = new H.Map(
    document.getElementById('map'),
    defaultLayers.vector.normal.map,
    {
      center: { lat: 50, lng: 5 },
      zoom: 4,
      pixelRatio: window.devicePixelRatio || 1,
    }
  );

  window.addEventListener('resize', () => map.getViewPort().resize());
  
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  

  var ui = H.ui.UI.createDefault(map, defaultLayers);
  
  const crearMarcadores = (marcadores) => {
    marcadores.forEach((marcador) => {
      const nuevoMarcador = new H.map.Marker({
        lat: parseFloat(marcador.latitud),
        lng: parseFloat(marcador.longitud),
      });
      const customBubble = new H.ui.InfoBubble(
        { lat: parseFloat(marcador.latitud), lng: parseFloat(marcador.longitud) },
        {
          content: marcador.info,
        }
      );
  
      nuevoMarcador.addEventListener('pointerenter', function () {
        ui.addBubble(customBubble);
      });
  
      nuevoMarcador.addEventListener('pointerleave', function () {
        ui.removeBubble(customBubble);
      });
      map.addObject(nuevoMarcador);
    });
  };
  

  moverACordoba(map);
  