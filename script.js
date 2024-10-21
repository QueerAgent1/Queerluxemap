// Set your Mapbox API token
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

// Initialize the map
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-117.15183, 32.74983], // Starting position [lng, lat] (San Diego)
    zoom: 14, // Starting zoom level
    pitch: 45, // Tilt the map to see 3D buildings
    bearing: -17.6, // Rotate the map for an angled view
});

// Add 3D buildings
map.on('load', () => {
    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
                'interpolate', ['linear'], ['zoom'],
                15, 0, 15.05, ['get', 'height']
            ],
            'fill-extrusion-opacity': 0.6
        }
    });

    // Add queer-friendly business locations
    const businesses = [
        { name: 'Gossip Grill', location: [-117.148738, 32.74985] },
        { name: 'Uptown Tavern', location: [-117.150863, 32.749302] },
        { name: 'Baja Betty\'s', location: [-117.148895, 32.750062] },
        { name: 'The Lafayette Hotel', location: [-117.145978, 32.759773] }
    ];

    // Create markers for each business
    businesses.forEach(business => {
        new mapboxgl.Marker({ color: '#ff69b4' }) // Pink candy-style icon
            .setLngLat(business.location)
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${business.name}</h3>`)) // Popup for each business
            .addTo(map);
    });

    // Flyover from user's location to destination
    const destination = [-117.15183, 32.74983]; // 1235 University Ave
    map.flyTo({
        center: destination,
        zoom: 16,
        pitch: 60,
        bearing: 0,
        speed: 0.5,
        curve: 1.5,
        essential: true
    });
});
