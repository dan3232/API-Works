fetch("https://apis.scrimba.com/bored/api/activity")
    .then(response => response.json())
    .then(data => document.getElementById("btn").addEventListener("click", () => (document.getElementById("text").textContent = data.activity)))
