

let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

let options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}


function preload() {

  firstPath = loadTable('track_points.csv', 'csv', 'header');

}


function setup() {
  canvas = createCanvas(800, 800);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(clear);


  myMap.onChange(drawPath.bind(null, firstPath));

}


function draw() {
}


function drawPath(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'reclat'));
    const longitude = Number(path.getString(i, 'reclon'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      
      stroke('white');
      strokeWeight(0.25);
      fill(200, 100, 100, 10);
      ellipse(pos.x, pos.y, 20, 20)


      noStroke();
      fill(200, 100, 100, 10);
      ellipse(pos.x, pos.y, 3, 3)

    }
  }
}
