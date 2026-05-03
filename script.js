// script.js
import { getLiveData } from "./api.js";

const map = L.map("map").setView([53.165, 6.776], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);

const markers = {};

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

async function pollLive() {
    try {
        const data = await getLiveData();
        updateMarkers(data);
    } catch (err) {
        console.error("Live poll error:", err);
    }
}

setInterval(pollLive, 2000);
pollLive();
