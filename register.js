// register.js
import { registerTag } from "./api.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const tag = document.getElementById("tag").value.trim();
    const name = document.getElementById("name").value.trim();

    if (!tag || !name) {
        alert("Vul beide velden in.");
        return;
    }

    const result = await registerTag({ tag, name });

    if (result.success) {
        alert("Duif geregistreerd!");
    } else {
        alert("Fout: " + result.error);
    }
});
