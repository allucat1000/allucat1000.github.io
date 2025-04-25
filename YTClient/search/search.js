const proxy = "https://api.codetabs.com/v1/proxy?quest=";

(async () => {
    const url = new URL(window.location.href);
    const searchQuery = url.searchParams.get("q");

    if (!searchQuery) {
        console.error("No query parameter provided.");
        return;
    }

    const VidSearch = encodeURIComponent(searchQuery);
    const baseYTURL = `https://www.youtube.com/results?search_query=${VidSearch}`;
    const response = await fetch(proxy + encodeURIComponent(baseYTURL));


    if (response.ok) {
        const text = await response.text();
        const matchArray = text.match(/\/watch\?v=([a-zA-Z0-9_-]{11})/g) || [];
        const videoIds = [...new Set(matchArray.map(match => match.slice(9)))];

        for (const id of videoIds.slice(0, 25)) {
            await generateVideoInfo(id);
        }
    } else {
        console.error("Failed to fetch:", response.status);
    }
})();

async function generateVideoInfo(vidID) {
    try {
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${vidID}&format=json`);
        if (response.ok) {
            const jsonData = await response.json();

            const searchDiv = document.getElementById("searchResults");

            const videoCard = document.createElement("div");
            videoCard.style.margin = "30px";
            videoCard.style.padding = "15px";
            videoCard.style.border = "1.5px solid #444";
            videoCard.style.borderRadius = "10px";
            videoCard.style.backgroundColor = "#222";
            videoCard.style.display = "flex";
            videoCard.style.alignItems = "center";
            videoCard.style.gap = "15px";

            const thumbnail = document.createElement("img");
            thumbnail.src = jsonData.thumbnail_url;
            thumbnail.alt = jsonData.title;
            thumbnail.width = 170;
            thumbnail.style.borderRadius = "8px";

            const title = document.createElement("a");
            title.textContent = jsonData.title;
            title.href = `https://yout-ube.com/watch?v=${vidID}`;
            title.target = "_blank";
            title.style.color = "white";
            title.style.fontSize = "1.2em";
            title.style.textDecoration = "none";

            const author = document.createElement("a");
            const authorUrl = jsonData.author_url;
            const authorHandle = authorUrl.split("/").pop();

            author.textContent = authorHandle;
            author.href = authorUrl;
            author.target = "_blank";
            author.style.color = "#ccc";
            author.style.fontSize = "1em";
            author.style.textDecoration = "none";
            author.style.display = "block";
            author.style.marginTop = "5px";

            const textContainer = document.createElement("div");
            textContainer.appendChild(title);
            textContainer.appendChild(author);

            videoCard.appendChild(thumbnail);
            videoCard.appendChild(textContainer);
            searchDiv.appendChild(videoCard);
        } else {
            console.warn("Video fetch failed:", vidID);
        }
    } catch (e) {
        console.error("Error fetching video info:", e);
    }
}
