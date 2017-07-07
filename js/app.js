//Some initial variables
var map;
var markers = [];
var originMarker;
var places = [
  {
    "name": "Arches National Park",
    "position": {lat: 38.616011, lng: -109.619658},
    "attractions": "red rock formations such as the famous Delicate Arch"
  },
  {
    "name": "Bryce Canyon National Park",
    "position": {lat: 37.640143, lng: -112.169235},
    "attractions": "wind-carved hoodoos filling a red-rock canyon"
  },
  {
    "name": "Canyonlands National Park",
    "position": {lat: 38.459074, lng: -109.820500},
    "attractions": "red rock canyons and the famous Horseshoe Bend"
  },
  {
    "name": "Capitol Reef National Park",
    "position": {lat: 38.291872, lng: -111.261994},
    "attractions": "gorgeous red rock landscape and Hickman Bridge"
  },
  {
    "name": "Zion National Park",
    "position": {lat: 37.201817, lng: -112.988431},
    "attractions": "world-famous Narrows and Angel's Landing"
  },
  {
    "name": "Rocky Mountain National Park",
    "position": {lat: 40.393260, lng: -105.686552},
    "attractions": "explore the mountains so beautiful, John Denver wrote a song"
  },
  {
    "name": "Great Basin National Park",
    "position": {lat: 39.010068, lng: -114.209032},
    "attractions": "caves, peaks, and ancient pines"
  },
  {
    "name": "Death Valley National Park",
    "position": {lat: 36.792311, lng: -116.928338},
    "attractions": "hottest place you'll ever go...bring water"
  },
  {
    "name": "Mesa Verde National Park",
    "position": {lat: 37.338881, lng: -108.412092},
    "attractions": "ruins of Anasazi cliff dwellings built into overhangs"
  },
  {
    "name": "Grand Canyon National Park, North Rim",
    "position": {lat: 36.214524, lng: -112.058929},
    "attractions": "massive canyon carved into Arizona desert"
  },
  {
    "name": "Grand Canyon National Park, South Rim",
    "position": {lat: 36.052224, lng: -112.105492},
    "attractions": "you will never see anything else like this incredibly deep canyon"
  },
  {
    "name": "Yosemite National Park",
    "position": {lat: 37.931591, lng: -119.159023},
    "attractions": "hike through the Sierra Nevada to Half-Dome and El Capitan"
  },
  {
    "name": "Black Canyon of the Gunnison National Park",
    "position": {lat: 38.580750, lng: -107.716175},
    "attractions": "rare deep canyon with dark rock, including the famous Painted Wall"
  },
  {
    "name": "Yellowstone National Park",
    "position": {lat: 44.135639, lng: -110.666785},
    "attractions": "beautiful views, and of course, Old Faithful Geyser"
  },
  {
    "name": "Grand Teton National Park",
    "position": {lat: 43.656431, lng: -110.719146},
    "attractions": "incredibly steep mountains rising straight up above Snake River"
  }
];
var styles = [
    {
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "black"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#f9ddc5"
            },
            {
                "lightness": -7
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#1994bf"
            },
            {
                "saturation": -69
            },
            {
                "gamma": 0.99
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "weight": 1.3
            },
            {
                "visibility": "on"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi.business"
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "color": "black" //"#645c20"
            },
            {
                "lightness": 15 //39
            }
        ]
    },
    {
        "featureType": "poi.school",
        "stylers": [
            {
                "color": "#a95521"
            },
            {
                "lightness": 35
            }
        ]
    },
    {},
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 38
            },
            {
                "visibility": "off"
            }
        ]
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {
        "elementType": "labels"
    },
    {
        "featureType": "poi.sports_complex",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 32
            }
        ]
    },
    {},
    {
        "featureType": "poi.government",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 46
            }
        ]
    },
    {
        "featureType": "transit.station",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 22
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "lightness": -10
            }
        ]
    },
    {},
    {},
    {}];


//KnockOut Handling of the Page
var viewModel = {
    headerTitle: ko.observable(),
    parksList: ko.observableArray(),
    footerSection: ko.observable()
};

viewModel.headerTitle('Utah National Park Nexis');
for (var curPark = 0; curPark < places.length; curPark++) {
  var entryString = '<a href="#map" onclick="clickPark(' + curPark +');"><strong>' + places[curPark].name + '</strong></a>';
  viewModel.parksList.push({ "entry": entryString });
};
viewModel.footerSection('Created by Emily Keator');

ko.applyBindings(viewModel);


//All Javascript below works with Google Maps API
function initMap() {
  var mapCenter = {lat: 39.372571, lng: -111.579500};

  map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: mapCenter,

          // Style from Snazzy Maps, "Lost in the desert" by Diana Caballero: https://snazzymaps.com/style/93/lost-in-the-desert
          styles: styles
        });

  var infoWindow = new google.maps.InfoWindow();

  var iconList =[createIcon('marker-pin-google.svg', 36, 34), createIcon('highlight-marker-pin-google.svg', 36, 34), createIcon('origin-pin-google.svg', 36, 34)];

  for (var i = 0; i < places.length; i++) {
    var position = places[i].position;
    var title = places[i].name

    var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        id: i,
        animation: google.maps.Animation.DROP,
        icon: iconList[0]
    });

    markers.push(marker);

    marker.addListener('click', function() {
        fillInfoWindow(this, infoWindow, iconList);
    });

    marker.addListener('mouseover', function() {
      this.setIcon(iconList[1]);
    });

    marker.addListener('mouseout', function() {
      this.setIcon(iconList[0]);
    });
  }

  originMarker = new google.maps.Marker({
    map: null,
    icon: iconList[2],
    position: null
  });

  document.getElementById('time-filter-go').addEventListener('click', function() {
    filterByTime();
  });

  document.getElementById('time-filter-reset').addEventListener('click', function() {
    resetMap();
  });

};

function clickPark(id) {
  google.maps.event.trigger(markers[id], 'click');
  markers[id].setAnimation(google.maps.Animation.DROP);
}

function fillInfoWindow(marker, infowindow, iconList) {
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      var placeInfo = places[marker.id].attractions.charAt(0).toUpperCase() + places[marker.id].attractions.substr(1);

      infowindow.setContent('<span><strong>' + marker.title.toUpperCase() + '</strong></span><p>' + placeInfo + '</p>');
      infowindow.open(map, marker);

      infowindow.addListener('closeclick', function() {
          infowindow.marker = null;
      });
    }
};

function createIcon(path, sizeX, sizeY) {
    var markerImage = new google.maps.MarkerImage(
      path,
      new google.maps.Size(sizeX, sizeY),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, sizeY),
      new google.maps.Size(sizeX, sizeY));
    return markerImage;
}

function hideParks() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function hideParkList() {
  document.getElementById('parks-list').style.display = "none";
}

function showParksList() {
  document.getElementById('parks-list').style.display = "block";
}

function showParks() {
  var mapBounds = new google.maps.LatLngBounds();

  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    mapBounds.extend(markers[i].position);
  }
  map.fitBounds(mapBounds);
}

function resetMap() {
  originMarker.setMap(null);
  originMarker.location = null;
  $('#pre-distance-info-div').empty();
  document.getElementById('time-filter-input').value = "";
  showParks();
  showParksList();
}

function filterByTime() {
  var distanceMatrixService = new google.maps.DistanceMatrixService;
  var geocoder = new google.maps.Geocoder();
  var origin = document.getElementById('time-filter-input').value;

  if (origin == '') {
    window.alert('You must enter an origin!');
  } else {
    hideParks();
    hideParkList();
    markOrigin(geocoder, origin);
    var destinations = [];
    for (var i = 0; i < markers.length; i++) {
      destinations[i] = markers[i].position;
    }

    distanceMatrixService.getDistanceMatrix({
      origins: [origin],
      destinations: destinations,
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    }, function(response, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        window.alert('Error was: ' + status);
      } else {
        displayMarkersWithinTime(response);
      }
    });
  }
}


//add clickable events
//add CSS


function markOrigin(geocoder, origin) {
  geocoder.geocode( {'address': origin}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      originMarker.position = results[0].geometry.location;
      originMarker.setMap(map);

    } else {
      window.alert('Failed to find address for following reason: ' + status);
    }
  });
}

function displayMarkersWithinTime(response) {
        var timeRestriction = document.getElementById('max-time').value;
        var origin = response.originAddresses;
        var destinations = response.destinationAddresses;

        var atLeastOnePark = false;

        var mapBounds = new google.maps.LatLngBounds();

        var distanceInfo = "<div class='distance-info'><ul>";
        var infoString;

        var results = response.rows[0].elements;

        for (var j = 0; j < results.length; j++) {
          var element = results[j];

          if (element.status === "OK") {

            var distanceText = element.distance.text;

            var duration = (element.duration.value / 60) / 60; //make it hours
            var durationText = element.duration.text;

            if (duration <= timeRestriction) {
              markers[j].setMap(map);
              mapBounds.extend(markers[j].position);

              atLeastOnePark = true;

              infoString = '<li><strong>' + markers[j].title + ':</strong> ' + durationText + ' away, ' + distanceText + '</li>';
              distanceInfo += infoString;

            }
          }
        }
        distanceInfo += '</ul></div>'
        $('#pre-distance-info-div').empty();
        $('#pre-distance-info-div').append(distanceInfo);

        mapBounds.extend(originMarker.position);

        map.fitBounds(mapBounds);

        if (!atLeastOnePark) {
          window.alert('We could not find any locations within that distance!');
        }
      }
