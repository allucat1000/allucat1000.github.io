let light = localStorage.getItem("theme") === "true";

const themetoggle = document.querySelector(".themetoggle");
themetoggle.addEventListener("click", () => {
    light = !light;
    localStorage.setItem("theme", light);
    setTheme();
})

function setTheme() {
    const old = document.querySelector(".theme");;
    const el = document.createElement("link");
    el.rel = "stylesheet";
    el.href = `${light ? "light.css" : "dark.css"}`;
    el.classList.add("theme");
    themetoggle.textContent = light ? "Good morning" : "Nighty night";
    document.head.append(el);
    if (old) old.remove()
}

const h = document.querySelector("blue");
h.addEventListener("click", async() => {
    if (h.classList.contains("boop")) return;
    void h.offsetWidth;
    h.classList.add("boop");
    setTimeout(() => h.classList.remove("boop"), 2000);
});

setTheme();