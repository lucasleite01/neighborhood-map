var map;

//Função de tratamento de erro de autenticação para a API do Google Maps
function gmAuthFailure() {
  alert("Erro no carregamento do mapa!");
}

function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  largeInfowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -20.2802387, lng: -40.3023809},
    zoom: 15,
    mapTypeControl: false
  });

  //Creates new markers
  markers = createNewMarkers();
  //Calls the showListings fuction that will show the markers
  showListings();
}

// This function uses the currentList array from viewModel to create an array of markers
function createNewMarkers() {
  var newMarkers = [];

  // Style the markers a bit. This will be our listing marker icon.
  var defaultIcon = makeMarkerIcon('0091ff');

  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  var highlightedIcon = makeMarkerIcon('FFFF24');

  var currentList = viewModel.currentList().myLocations();
  //onsole.log(currentList);
  for (var i = 0; i < currentList.length; i++) {
    // Get the position from the currentList array from viewModel.
    var position = currentList[i].location;
    var info = currentList[i].info;
    var name = currentList[i].name;
    var show = currentList[i].show();
    var id = currentList[i].id();
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      name: name,
      position: position,
      info: info,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: id,
      show: show
    });

    // Push the marker to our array of markers.
    newMarkers.push(marker);

    // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function() {

      populateInfoWindow(this, largeInfowindow);
      // Trecho pego de https://developers.google.com/maps/documentation/javascript/examples/marker-animations?hl=pt-br
      if (this.getAnimation() !== null) {
          this.setAnimation(null);
      }else {
        viewModel.markerAnimation(this.id);
      }
    });
    // Two event listeners - one for mouseover, one for mouseout,
    // to change the colors back and forth.
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
  }
  return newMarkers;
}
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    // Clear the infowindow content to give the streetview time to load.
    infowindow.setContent('');
    infowindow.marker = marker;
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
      marker.setAnimation(null);
    });

    //Request data from Wikipedia API
    wikipedia(infowindow, marker);

    // Open the infowindow on the correct marker.
    infowindow.open(map, marker);
  }
}

//Função que executa a requisição assíncrona da API da Wikipedia e preenche
//o conteúdo do infowindow para ser mostrado. Baseada em código-fonte de aulas.
function wikipedia(infowindow, marker) {

  var wikiUrl = "http://pt.wikipedia.org/w/api.php?action=opensearch&" +
  "search=" + marker.name + "&format=json&callback=wikiCallback";

  //Requisição assíncrona da API da Wikipedia
  $.ajax({
    url: wikiUrl,
    dataType: "jsonp",
    success: function(response) {
      var articleList = response[1];
      var wikiStr = "<p><b>"+marker.name+"</b><br>"+marker.info+"</p>" + "<p>Artigos na Wikipedia:</p>";

      if (articleList.length == 0) {
        articleStr = "No articles found!";
        wikiStr = wikiStr + '<p>' +
        articleStr + '</p>';
      }
      for (var i = 0; i < articleList.length; i++) {
        articleStr = articleList[i];
        var url = "http://pt.wikipedia.org/wiki/" + articleStr;
        wikiStr = wikiStr + '<li><a href="' + url + '">' +
        articleStr + '</a></li>';
      }
      infowindow.setContent(wikiStr);
    }
  }).fail(function (jqXHR, textStatus) {
      // error handling
      alert("Falha ao carregar arquivos da Wikipedia!");
  });
}

// This function will loop through the markers array and display them all.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].show == true)
      markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  google.maps.event.addDomListener(window, 'resize', function() {
    map.fitBounds(bounds); // `bounds` is a `LatLngBounds` object
  });
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}
