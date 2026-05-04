// ------------------------------------------------------
//  DUMMY MARKERS (blijven altijd zichtbaar)
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

const markers = {}; // opslag voor alle markers (dummy + BLE)

// ------------------------------------------------------
//  MARKERS TEKENEN
// ------------------------------------------------------
function updateMarkers(data) {
    console.log("Teken markers:", data);

    data.forEach(bird => {
        const { id, lat, lon, rssi } = bird;

        const color =
            rssi > -60 ? "green" :
            rssi > -75 ? "orange" :
            "red";

        const icon = L.divIcon({
            className: "custom-marker",
            html: `<div style="
                width:20px;
                height:20px;
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
//  DUMMY MARKERS TONEN (ALTIJD)
// ------------------------------------------------------
updateMarkers(dummyData);

// ------------------------------------------------------
//  BLE LIVE DATA (AAN)
// ------------------------------------------------------
async function pollLive() {
    try {
        const response = await fetch("https://nivo-backend-production.up.railway.app/api/live");
        const liveData = await response.json();

        console.log("BLE data:", liveData);

        // BLE markers toevoegen
        updateMarkers(liveData);
    } catch (err) {
        console.log("BLE fout:", err);
    }
}

// Polling AAN — elke 2 seconden
setInterval(pollLive, 2000);
pollLive();

