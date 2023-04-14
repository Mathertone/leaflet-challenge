//Creating the map object
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this URL to get the GeoJSON data
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Getting our GeoJSON data
d3.json(link).then(function(data) {
    // Console log the data retrieved
    console.log(data);
});

// Create arrays to hold the data
let lats = [];
let lons = [];
let magnitudes = [];
let depths = [];

// Loop through the data and push the lats, lons, magnitudes, and depths to their respective arrays
for (let i = 0; i < data.features.length; i++) {
    lats.push(data.features[i].geometry.coordinates[1]);
    lons.push(data.features[i].geometry.coordinates[0]);
    magnitudes.push(data.features[i].properties.mag);
    depths.push(data.features[i].geometry.coordinates[2]);
}

// Function to determine marker color by depth
function chooseColor(depth) {
    if (depth < 10) return "#00FF00";
    else if (depth < 30) return "greenyellow";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "orange";
    else if (depth < 90) return "orangered";
    else return "#FF0000";
}

// Add a marker for each earthquake to the map
for (let i = 0; i < lats.length; i++) {
    let cirle = L.circle([lats[i], lons[i]], {
        color: "black",
        fillColor: chooseColor(depths[i]),
        fillOpacity: 0.75,
        radius: magnitudes[i] * 10000
    }).addTo(myMap);

    circle.bindPopup("<h3>Location: " + data.features[i].properties.place + "</h3><hr><p>Magnitude: " + magnitudes[i] + "</p><p>Depth: " + depths[i] + "</p>");
}

// Create a legend
let legend = L.control({ position: "bottomright" });

legend.addTo(myMap);

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);
