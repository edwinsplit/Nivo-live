// ------------------------------------------------------
//  DUMMY MARKERS (tijdelijk om de kaart te testen)
// ------------------------------------------------------
const dummyData = [
    {
        id: "DUIF-001",
        lat: 53.165,
        lon: 6.776,
        rssi: -55
    },
    {
        id: "DUIF-002",
        lat: 53.167,
        lon: 6.780,
        rssi: -72
    }
];

// ------------------------------------------------------
//  KAART INITIALISEREN
// ------------------------------------------------------
const map = L.map("map").setView([53.165, 6.776], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);

const markers = {};

// ------------------------------------------------------
//  MARKERS TEKENEN
// ------------------------------------------------------
function updateMarkers(liveData) {
    liveData.forEach(bird => {
        const { id, lat, lon, rssi } = bird;

        const color =
            rssi > -60 ? "green" :
            rssi > -75 ? "orange" :
            "red";

        const icon = L.divIcon({
            className: "custom-marker",
            html: `<div style="
                width:18px;
                height:18px;
                background:${color};
                border-radius:50%;
                border:2px solid white;
            "></div>`
        });

        if (!markers[id]) {
            markers[id] = L.marker([lat, lon], { icon }).addTo(map);
        } else {
            markers[id].setLatLng([lat, lon]);
            markers[id].setIcon(icon);
        }
    });
}

// ------------------------------------------------------
//  DUMMY MARKERS TONEN
// ------------------------------------------------------
updateMarkers(dummyData);

// ------------------------------------------------------
//  LIVE POLLING UITGESCHAKELD
// ------------------------------------------------------
// setInterval(pollLive, 2000);
// pollLive();
