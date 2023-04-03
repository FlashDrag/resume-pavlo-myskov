/**
 * "Create a new map object, and place it in the div with the id of map."
 */
function initMap() {
  // map object contains all the information about the map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: {
      lat: 46.619261,
      lng: -33.134766
    }
  });

  const labels = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ']  // labels
  // vivsited places
  let locations = [
    { lat: 40.785091, lng: -73.968285 },
    { lat: 41.084045, lng: -73.874245 },
    { lat: 40.754932, lng: -73.984016 },
  ];

  // Creating a new marker(that has a label from labels string) for each location in the locations array.
  let markers = locations.map(function (location, i) {
    return new google.maps.Marker({
      position: location,
      // The reason for using the %operator is so that if we have more than 26 locations,
      // then it will loop around to the start of our string again and go from Z back to A, instead of throwing an error.
      label: labels[i % labels.length]
    });
  });

  /* And this is going to create both the marker image for our map, but it's also going to create them in a cluster
   if they're close together using that clusterer library that we already loaded. */
  let markerCluster = new MarkerClusterer(map, markers,
    { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}