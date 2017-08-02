/*jshint loopfunc: true */
//Some initial variables
var map;
var markers = [];
var originMarker;
//I chose to hardcode the places and their info
var places = [{
        "name": "Arches National Park",
        "position": {
            lat: 38.616011,
            lng: -109.619658
        },
        "attractions": "red rock formations such as the famous Delicate Arch",
        "imgsrc": "https://source.unsplash.com/1600x900/?arches,national,park",
        "nearTown": 'UT/Moab'
    },
    {
        "name": "Bryce Canyon National Park",
        "position": {
            lat: 37.640143,
            lng: -112.169235
        },
        "attractions": "wind-carved hoodoos filling a red-rock canyon",
        "imgsrc": "https://source.unsplash.com/1600x900/?bryce,canyon,national,park",
        "nearTown": 'UT/Bryce'
    },
    {
        "name": "Canyonlands National Park",
        "position": {
            lat: 38.459074,
            lng: -109.820500
        },
        "attractions": "red rock canyons and the famous Horseshoe Bend",
        "imgsrc": "https://source.unsplash.com/1600x900/?canyonlands,national,park",
        "nearTown": 'UT/Moab'
    },
    {
        "name": "Capitol Reef National Park",
        "position": {
            lat: 38.291872,
            lng: -111.261994
        },
        "attractions": "gorgeous red rock landscape and Hickman Bridge",
        "imgsrc": "https://source.unsplash.com/1600x900/?capitol,reef,national,park",
        "nearTown": 'UT/Torrey'
    },
    {
        "name": "Zion National Park",
        "position": {
            lat: 37.201817,
            lng: -112.988431
        },
        "attractions": "world-famous Narrows and Angel's Landing",
        "imgsrc": "https://source.unsplash.com/1600x900/?zion,national,park",
        "nearTown": 'UT/Springdale'
    },
    {
        "name": "Rocky Mountain National Park",
        "position": {
            lat: 40.393260,
            lng: -105.686552
        },
        "attractions": "explore the mountains so beautiful, John Denver wrote a song",
        "imgsrc": "https://source.unsplash.com/1600x900/?rocky,mountain,national,park",
        "nearTown": 'CO/Estes_Park'
    },
    {
        "name": "Great Basin National Park",
        "position": {
            lat: 39.010068,
            lng: -114.209032
        },
        "attractions": "caves, peaks, and ancient pines",
        "imgsrc": "https://source.unsplash.com/1600x900/?great,basin,national,park",
        "nearTown": 'NV/Baker'
    },
    {
        "name": "Death Valley National Park",
        "position": {
            lat: 36.792311,
            lng: -116.928338
        },
        "attractions": "hottest place you'll ever go...bring water",
        "imgsrc": "https://source.unsplash.com/1600x900/?death,valley,national,park",
        "nearTown": 'NV/Beatty'
    },
    {
        "name": "Mesa Verde National Park",
        "position": {
            lat: 37.338881,
            lng: -108.412092
        },
        "attractions": "ruins of Anasazi cliff dwellings built into overhangs",
        "imgsrc": "https://source.unsplash.com/1600x900/?mesa,verde,national,park",
        "nearTown": 'CO/Cortez'
    },
    {
        "name": "Grand Canyon National Park, North Rim",
        "position": {
            lat: 36.214524,
            lng: -112.058929
        },
        "attractions": "massive canyon carved into Arizona desert",
        "imgsrc": "https://source.unsplash.com/1600x900/?grand,canyon,national,park",
        "nearTown": 'AZ/North_Rim'
    },
    {
        "name": "Grand Canyon National Park, South Rim",
        "position": {
            lat: 36.052224,
            lng: -112.105492
        },
        "attractions": "you will never see anything else like this incredibly deep canyon",
        "imgsrc": "https://source.unsplash.com/1600x900/?grand,canyon,national,park",
        "nearTown": 'AZ/Grand_Canyon_National_Park'
    },
    {
        "name": "Yosemite National Park",
        "position": {
            lat: 37.931591,
            lng: -119.159023
        },
        "attractions": "hike through the Sierra Nevada to Half-Dome and El Capitan",
        "imgsrc": "https://source.unsplash.com/1600x900/?yosemite,national,park",
        "nearTown": 'CA/Yosemite_Natl_Park'
    },
    {
        "name": "Black Canyon of the Gunnison National Park",
        "position": {
            lat: 38.580750,
            lng: -107.716175
        },
        "attractions": "rare deep canyon with dark rock, including the famous Painted Wall",
        "imgsrc": "https://source.unsplash.com/1600x900/?black,canyon,national,park",
        "nearTown": 'CO/Montrose'
    },
    {
        "name": "Yellowstone National Park",
        "position": {
            lat: 44.135639,
            lng: -110.666785
        },
        "attractions": "beautiful views, and of course, Old Faithful Geyser",
        "imgsrc": "https://source.unsplash.com/1600x900/?yellowstone,national,park",
        "nearTown": 'WY/Yellowstone_Natl_Park'
    },
    {
        "name": "Grand Teton National Park",
        "position": {
            lat: 43.656431,
            lng: -110.719146
        },
        "attractions": "incredibly steep mountains rising straight up above Snake River",
        "imgsrc": "https://source.unsplash.com/1600x900/?grand,teton,national,park",
        "nearTown": 'WY/Jackson'
    }
];
// Style a customized version of one from Snazzy Maps, "Lost in the desert" by Diana Caballero: https://snazzymaps.com/style/93/lost-in-the-desert
var styles = [{
        "elementType": "labels",
        "stylers": [{
                "visibility": "on"
            },
            {
                "color": "black"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [{
                "color": "#f9ddc5"
            },
            {
                "lightness": -7
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [{
                "color": "#813033"
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [{
                "color": "#645c20"
            },
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [{
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
        "stylers": [{
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
        "stylers": [{
                "color": "black" //"#645c20"
            },
            {
                "lightness": 15 //39
            }
        ]
    },
    {
        "featureType": "poi.school",
        "stylers": [{
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
        "stylers": [{
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
        "stylers": [{
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
        "stylers": [{
                "color": "#9e5916"
            },
            {
                "lightness": 46
            }
        ]
    },
    {
        "featureType": "transit.station",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "transit.line",
        "stylers": [{
                "color": "#813033"
            },
            {
                "lightness": 22
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [{
            "lightness": 38
        }]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [{
                "color": "#f19f53"
            },
            {
                "lightness": -10
            }
        ]
    },
    {},
    {},
    {}
];


//All Javascript below works with Google Maps API, so I chose not to use Knockout
//However, a few of these functions are called by KO data-binds
function initMap() {
    //Center map on a point roughly in the center of Utah
    var mapCenter = {
        lat: 39.372571,
        lng: -111.579500
    };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: mapCenter,
        styles: styles
    });

    var infoWindow = new google.maps.InfoWindow();

    //Create 3 different colored icons for regular, highlighted, and origin point for when filtering by time
    var iconList = [createIcon('marker-pin-google.svg', 36, 34), createIcon('highlight-marker-pin-google.svg', 36, 34), createIcon('origin-pin-google.svg', 36, 34)];

    //Create each place marker
    for (var i = 0; i < places.length; i++) {
        var position = places[i].position;
        var title = places[i].name;

        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            id: i,
            animation: google.maps.Animation.DROP,
            icon: iconList[0],
            infowindow: infoWindow
        });

        markers.push(marker);

        //JS Hint doesn't like my use of the inline function, but this is how
        //we learned to do this through the Udacity videos on the Google APIs
        //UNUSABLE DUE TO UDACITY PORTAL REFUSING TO GRADE:
        //"""Your project could not be reviewed. Please resubmit after you address the issue noted by the reviewer.
        // Found 4 JSHint Errors in file: frontend-nanodegree-maps-project/js/app.js
        //
        // Error:W083 on line: 339 - Don't make functions within a loop.
        // Error:W083 on line: 344 - Don't make functions within a loop.
        // Error:W083 on line: 349 - Don't make functions within a loop. """
        //
        marker.addListener('click', function() {
            this.setAnimation(google.maps.Animation.DROP);
            fillInfoWindow(this, infoWindow);
        });

        //Highlight when moused-over
        marker.addListener('mouseover', function() {
            this.setIcon(iconList[1]);
        });

        //Set back to normal when not moused-over
        marker.addListener('mouseout', function() {
            this.setIcon(iconList[0]);
        });
    }

    //Initialize a placeholder for the origin marker that can then
    //be changed as needed
    originMarker = new google.maps.Marker({
        map: null,
        icon: iconList[2],
        position: null
    });

}

function onGoogleError() {
  alert('Sorry! Google Maps API is not working at the moment.');
}

//KnockOut Handling of the Page
var viewModel = {
    placesToDisplay: ko.observable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]),
    placesIncludes: function(id) {
        if (viewModel.placesToDisplay().indexOf(id) > -1) {
            return true;
        } else {
            return false;
        }
    },
    originPoint: ko.observable(""),
    times: ['1 hour', '2 hours', '3 hours', '4 hours', '5 hours', '6 hours', '7 hours', '10 hours'],
    timeRestriction: ko.observable(''),
    listMatch: ko.observable(""),
    applyTimeFilter: function() {
        filterByTime();
    },
    resetTimeFilter: function() {
        resetMap();
    }

};

ko.applyBindings(viewModel);

//Display infowindow function, called when map marker is clicked/triggered
function fillInfoWindow(marker, infowindow) {

    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        var placeInfo = places[marker.id].attractions.charAt(0).toUpperCase() + places[marker.id].attractions.substr(1);

        var ajaxURL = 'http://api.wunderground.com/api/0c66f851db7ced1d/' + places[marker.id].nearTown + '.json';

        //retrieve and display info from WUNDERGROUND API if it is retrievable
        $.ajax({
            url: ajaxURL,
            dataType: "jsonp",
            success: function(parsed_json) {
                if (parsed_json.forecast) {
                    var responseInfo = parsed_json.forecast.txt_forecast.forecastday;
                    var today = responseInfo[0].title + ': ' + responseInfo[0].fcttext;
                    var tomorrow = responseInfo[2].title + ': ' + responseInfo[2].fcttext;
                    var dayAfterTomorrow = responseInfo[4].title + ': ' + responseInfo[4].fcttext;
                    var weather = today + '\n' + tomorrow + '\n' + dayAfterTomorrow;

                    infowindow.setContent('<span><strong>' + marker.title.toUpperCase() +
                        '</strong></span><p>' + placeInfo + '</p><div><p>Weather Underground Forecast:</p><p>' + weather + '</p></div><div class="infowindow-picture"><img src="' +
                        places[marker.id].imgsrc + '" alt="' + marker.title + '"><p class="attribution">Photo provided Unsplash.com API</p></div>');
                    infowindow.open(map, marker);

                    infowindow.addListener('closeclick', function() {
                        infowindow.marker = null;
                    });

                } else {
                    alert('Sorry, Wunderground could not retrieve weather information at this time.');

                    infowindow.setContent('<span><strong>' + marker.title.toUpperCase() +
                        '</strong></span><p>' + placeInfo + '</p><div class="infowindow-picture"><img src="' +
                        places[marker.id].imgsrc + '" alt="' + marker.title + '"><p class="attribution">Photo provided Unsplash.com API</p></div>');
                    infowindow.open(map, marker);

                    infowindow.addListener('closeclick', function() {
                        infowindow.marker = null;
                    });
                }

            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert('#Sorry, Wunderground could not retrieve weather information at this time, due to: ' + thrownError);

                infowindow.setContent('<span><strong>' + marker.title.toUpperCase() +
                    '</strong></span><p>' + placeInfo + '</p><div class="infowindow-picture"><img src="' +
                    places[marker.id].imgsrc + '" alt="' + marker.title + '"><p class="attribution">Photo provided Unsplash.com API</p></div>');
                infowindow.open(map, marker);

                infowindow.addListener('closeclick', function() {
                    infowindow.marker = null;
                });
            }

        });

    }
}

//Tie a trigger so that map marker animates when corresponding list element is clicked
function clickPark(id) {
    fillInfoWindow(markers[id], markers[id].infowindow);
    markers[id].setAnimation(google.maps.Animation.DROP);
}

//Function to create cutom-colored map-marker icon
function createIcon(path, sizeX, sizeY) {
    var markerImage = new google.maps.MarkerImage(
        path,
        new google.maps.Size(sizeX, sizeY),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, sizeY),
        new google.maps.Size(sizeX, sizeY));
    return markerImage;
}

//Hides all parks to allow filtering
function hideParks() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

//Resets the map so that all parks are shown
function showParks() {
    var mapBounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        mapBounds.extend(markers[i].position);
    }
    map.fitBounds(mapBounds);
}

//Called by the ko.observable resetTimeFilter; calls the showParks() function,
//and clears input area to reset the page
function resetMap() {
    originMarker.setMap(null);
    originMarker.location = null;


    viewModel.originPoint(null);
    showParks();
    viewModel.placesToDisplay([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
}

//Calls helper functions to filter various park locations within set distance
//of the origin point, hiding all others, and marking the origin
function filterByTime() {
    var distanceMatrixService = new google.maps.DistanceMatrixService();
    var geocoder = new google.maps.Geocoder();

    var origin = viewModel.originPoint();

    if (origin === '') {
        window.alert('You must enter an origin!');
    } else {
        hideParks();
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

//Sets the origin point on the map with special origin marker
function markOrigin(geocoder, origin) {
    geocoder.geocode({
        'address': origin
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            originMarker.position = results[0].geometry.location;
            originMarker.setMap(map);

        } else {
            window.alert('Failed to find address for following reason: ' + status);
        }
    });
}

//Helper function to display only the markers within filtered time of origin
function displayMarkersWithinTime(response) {
    var timeRestriction = viewModel.timeRestriction();
    timeRestriction = 1 * timeRestriction.replace(/([\D])+/g, '');
    var origin = response.originAddresses;
    var destinations = response.destinationAddresses;

    var atLeastOnePark = false;

    var placesToDisplay = [];

    var mapBounds = new google.maps.LatLngBounds();

    var results = response.rows[0].elements;

    for (var j = 0; j < results.length; j++) {
        var element = results[j];

        if (element.status === "OK") {

            var duration = (element.duration.value / 60) / 60; //make it hours

            if (duration <= timeRestriction) {
                markers[j].setMap(map);
                mapBounds.extend(markers[j].position);

                atLeastOnePark = true;

                placesToDisplay.push(markers[j].id);

            }
        }
    }

    mapBounds.extend(originMarker.position);

    map.fitBounds(mapBounds);

    viewModel.placesToDisplay(placesToDisplay);

    if (!atLeastOnePark) {
        window.alert('We could not find any locations within that distance!');
    }
}

function parkListDistanceFilter(placeTitles) {
    var parkListItem = $(".parks-list-item:first");
    for (var parkNum = 0; parkNum < markers.length; parkNum++) {
        if (placeTitles.includes(parkListItem.text())) {
            parkListItem.show();
        } else {
            parkListItem.hide();
        }
        parkListItem = parkListItem.next();
    }
}

//Filters in live time the list and the markers, searching for those which
//match the text of the search (both names, and listed attractions)
viewModel.listMatch.subscribe(function(newValue) {
    //loop through markers && lists to see if they match
    newValue = newValue.toLowerCase();
    var mapBounds = new google.maps.LatLngBounds();
    var placesToDisplay = [];
    for (var i = 0; i < markers.length; i++) {

        var curPlaceInfo = places[i].name.toLowerCase() + places[i].attractions.toLowerCase();

        if (curPlaceInfo.includes(newValue)) {
            placesToDisplay.push(i);
            markers[i].setMap(map);
            markers[i].setAnimation(google.maps.Animation.DROP);
            mapBounds.extend(markers[i].position);
            map.fitBounds(mapBounds);
        } else {
            markers[i].setMap(null);
        }
    }
    viewModel.placesToDisplay(placesToDisplay);

});
