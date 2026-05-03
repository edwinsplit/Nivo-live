// api.js
const API_BASE = "https://nivo-backend-production.up.railway.app";

export async function getLiveData() {
    const res = await fetch(`${API_BASE}/api/live`);
    return res.json();
}

export async function registerTag(data) {
    const res = await fetch(`${API_BASE}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
}
