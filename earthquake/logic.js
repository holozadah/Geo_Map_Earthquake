// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(population) {
  return population / 40;
}

// Each city object contains the city's name, location and population
d3.json("all_week.geojson",function(feature){
console.log(feature.features.length);
// Loop through the cities array and create one marker for each city object

function getColor(d) {
  return d <= 1 ? 'rgb(200,255,0)' : // Means: if (d >= 1966) return 'green' else…
    d <= 2 ? 'rgb(255,220,0)' : // if (d >= 1960) return 'black' else etc…
    d <= 3 ? 'rgb(255,175,0)' :
    d <= 4 ? 'rgb(255,130,0)' :
    d <= 5 ? 'rgb(255,82,0)' : // Note that numbers must be in descending order
    'rgb(255,0,0)';
}

for (var i = 0; i < feature.features.length; i++) {
  L.circle([feature.features[i].geometry.coordinates[1], feature.features[i].geometry.coordinates[0]],{
    fillOpacity: 0.75,
    color: getColor(feature.features[i].properties.mag),
    fillColor: getColor(feature.features[i].properties.mag),
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: markerSize(feature.features[i].properties.mag*500000)
  }).bindPopup("<h1>" + feature.features[i].properties.place  + "</h1> <hr> <h3>magnitude: " + feature.features[i].properties.mag+ "</h3>").addTo(myMap);
}

// Adding Legend
// var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");
//     var limits = ['0-1','1-2','2-3','3-4','4-5','5+'];
//     var colors = ['rgb(200,255,0)','rgb(255,220,0)','rgb(255,175,0)','rgb(255,130,0)','rgb(255,82,0)','rgb(255,0,0)'];
//     var labels = [];

//     // Add min & max
//     var legendInfo = "<h1>EarthQuake Magnitude</h1>"
      

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//       labels.push("<hr>"+limit+"</hr>"+"<li style=\"background-color: " + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };

//   // Adding legend to the map
//   legend.addTo(myMap);

// });

var legend = L.control({position: 'bottomright'});


legend.onAdd = function (map) {
  

    var div = L.DomUtil.create('div', 'info legend'),
        colors = ['rgb(200,255,0)','rgb(255,220,0)','rgb(255,175,0)','rgb(255,130,0)','rgb(255,82,0)','rgb(255,0,0)'],
        labels  = ['0-1','1-2','2-3','3-4','4-5','>5'];
        
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < colors.length; i++) {
        div.innerHTML +=
          ("<li style=\"background-color: " + colors[i] + "\"></li>" ) + "  " + labels[i] + '<br>';
    }

    return div;
};

legend.addTo(myMap)});