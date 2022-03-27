// Initialize and add the map
function initMap() {
  // The location of Kyiv
  const kyiv = { lat: 50.47440145340556, lng: 30.525033384276952 };
  // The map, centered at Kyiv
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: kyiv,
  });
  // The marker, positioned at Kyiv
  const marker = new google.maps.Marker({
    position: kyiv,
    map: map,
  });
}