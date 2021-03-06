function init_map() {
  var myOptions = {
    zoom: 15,
    center: new google.maps.LatLng(28.6036527,77.077775328 ),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
  marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(28.6036527,77.077775328 )
  });
  infowindow = new google.maps.InfoWindow({
    content:
    `<p style="color:black"><strong>Anurag's Place</strong><br></p>`
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
  infowindow.open(map, marker);
}
google.maps.event.addDomListener(window, 'load', init_map);
