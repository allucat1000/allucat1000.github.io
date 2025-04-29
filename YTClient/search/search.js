const proxy = "https://api.codetabs.com/v1/proxy?quest=";

(async () => {
    const url = new URL(window.location.href);
    let searchQuery = url.searchParams.get("q");
    const searchDiv = document.getElementById("searchResults");

    if (!searchQuery) {
        
        const resultErrorTitle = document.createElement("h1");
        resultErrorTitle.textContent = 'No results found.';
        resultErrorTitle.classList.add("smallTitle")
        searchDiv.appendChild(resultErrorTitle);
        const resultErrorBackButton = document.createElement("button");
        resultErrorBackButton.classList.add("button")
        resultErrorBackButton.textContent = 'Go back';
        resultErrorBackButton.onclick = function() {
            window.location.href = "../index.html"
        }
        searchDiv.appendChild(resultErrorBackButton);
        return;
    }
    const SearchLoadingText = document.createElement("h1");
    SearchLoadingText.textContent = "Searching...";
    SearchLoadingText.classList.add("smallTitle");
    searchDiv.append(SearchLoadingText);

    if (searchQuery.charAt(0) === '@') {
        searchQuery = (searchQuery.split('@')[1])
        const searchQueryChannel = true;
    } else {
        const searchQueryChannel = false;
    }
    const VidSearch = encodeURIComponent(searchQuery);
    const baseYTURL = `https://www.youtube.com/results?search_query=${VidSearch}&gl=GB&hl=en`;
    const response = await fetch(proxy + encodeURIComponent(baseYTURL));
    if (searchQueryChannel = true) {
        try {
            const channelHandle = (searchQuery.split(' ')[0])
            const response = await fetch(proxy + encodeURIComponent(`https://youtube.com/@${channelHandle}`));
            if (response.ok) {
                const text = await response.text();
                let match, pattern;
                let showChannel = true
        
                // Sub Count
                let SubCount = 0;
                pattern = /"metadataParts":\[\{"text":\{"content":"([^"]+)"/g;
                match = [...text.matchAll(pattern)];
                if (match && match[1]) {
                  let count = match[1][1];
                  count = count.split(/\s+/);
                  SubCount = count.length > 2 ? `${count[0]} ${count[1]}` : count[0];
                  console.log(SubCount)
                } else { 
                    console.error('Sub Count not found. Most likely invalid URL.'); 
                    showChannel = false;
                }

                // PFP
                pattern = /https:\/\/yt3\.googleusercontent\.com\/([a-zA-Z0-9_.+-=]+)/;
                match = text.match(pattern);
                const pfp = match && match[1] ? "https://yt3.googleusercontent.com/" + match[1] : "";

                // Name
                pattern = /<meta\s+property="og:title"\s+content="([^"]+)">/;
                match = text.match(pattern);
                const ChannelName = match && match[1] ? match[1] : "";

                if (showChannel === true) {
                    const searchDiv = document.getElementById("searchResults");

                    // Elem creation
                    const channelCard = document.createElement("button");
                    const channelCardTitle = document.createElement("a");
                    const channelCardSubCount = document.createElement("p");
                    const channelCardPFP = document.createElement("img");

                    // Styling
                    channelCard.style.width = "50%"
                    channelCard.style.margin = "30px auto";
                    channelCard.style.padding = "15px";
                    channelCard.style.border = "1.5px solid #444";
                    channelCard.style.borderRadius = "10px";
                    channelCard.style.backgroundColor = "#222";
                    channelCard.style.display = "flex";
                    channelCard.style.alignItems = "center";
                    channelCard.style.gap = "15px";

                    channelCardTitle.textContent = ChannelName;
                    channelCardTitle.href = `https://youtube.com/${channelHandle}`;
                    channelCardTitle.target = "_blank";
                    channelCardTitle.style.color = "white";
                    channelCardTitle.style.fontSize = "3em";
                    channelCardTitle.style.textDecoration = "none";
                    channelCardTitle.style.textAlign = "left";
                    channelCardTitle.style.margin = "15px 0px";

                    channelCardSubCount.textContent = `${SubCount} subscribers`;
                    channelCardSubCount.style.color = "#ccc";
                    channelCardSubCount.style.fontSize = "1.5em";
                    channelCardSubCount.style.textDecoration = "none";
                    channelCardSubCount.style.textAlign = "left";
                    channelCardSubCount.style.margin = "0px 15px";

                    channelCardPFP.src = pfp;
                    channelCardPFP.width = 65;
                    channelCardPFP.style.borderRadius = "100%";
                    channelCardPFP.style.margin = "0px 15px"

                    // Appending
                    searchDiv.appendChild(channelCard);
                    channelCard.appendChild(channelCardPFP);
                    channelCard.appendChild(channelCardTitle);
                    channelCard.appendChild(channelCardSubCount);
                }

            } else {
                console.error('Failed to fetch:', response.status)
            }
        } catch (e){
            console.log('Failed to fetch user info', e);
        }
    }

    if (response.ok) {
        const text = await response.text();
        const matchArray = text.match(/\/watch\?v=([a-zA-Z0-9_-]{11})/g) || [];
        const videoIds = [...new Set(matchArray.map(match => match.slice(9)))];
        if (videoIds.length !== 0) {
            SearchLoadingText.remove()
            for (const id of videoIds.slice(0, 25)) {
                await generateVideoInfo(id);
            }
        } else {
            SearchLoadingText.textContent = "No results found."
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
            const videoCard = document.createElement("button");
            videoCard.style.width = "90%"
            videoCard.style.margin = "30px auto";
            videoCard.style.padding = "15px";
            videoCard.style.border = "1.5px solid #444";
            videoCard.style.borderRadius = "10px";
            videoCard.style.backgroundColor = "#222";
            videoCard.style.display = "flex";
            videoCard.style.alignItems = "center";
            videoCard.style.gap = "15px";
            videoCard.style.transition = "0.1s"
            videoCard.addEventListener('mouseenter', () => {
                videoCard.style.cursor = "pointer";
                videoCard.style.backgroundColor = "#333";
            });
            videoCard.addEventListener('mouseleave', () => {
                videoCard.style.cursor = "default";
                videoCard.style.backgroundColor = "#222";
            });

            videoCard.onclick = function() {
                window.location.href = `../watch/index.html?v=${vidID}`;
            }

            const thumbnail = document.createElement("img");
            thumbnail.src = jsonData.thumbnail_url;
            thumbnail.alt = jsonData.title;
            thumbnail.width = 170;
            thumbnail.style.borderRadius = "8px";

            const title = document.createElement("a");
            title.textContent = jsonData.title;
            title.href = `../watch/index.html?v=${vidID}`;
            title.target = "_blank";
            title.style.color = "white";
            title.style.fontSize = "1.2em";
            title.style.textDecoration = "none";
            title.style.textAlign = "left";

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
            author.style.textAlign = "left";

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
