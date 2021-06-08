const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];


mapboxgl.accessToken = 'pk.eyJ1IjoidmVyc29uLXRlY2giLCJhIjoiY2tvaWJ5Z3RuMGpjbTMyczFib2F6eDg3MiJ9.0P__eXNxNw5FaClyThj8-A';


let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
});


let marker = new mapboxgl.Marker().setLngLat([-71.092761, 42.357575]).addTo(map);

async function getBusLocation(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json = await response.json();

  let data = json.data;
  let bus = data[0].attributes;
  let longitude = bus.longitude;
  let latitude = bus.latitude;

  return [longitude, latitude];
}

let counter = 0;
async function move() {

  let location = await getBusLocation();

  marker.setLngLat(location);
 
  setTimeout(move, 15000);
}
if (typeof module !== 'undefined') {
  module.exports = { move };
}



