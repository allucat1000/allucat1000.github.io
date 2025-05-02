const proxy = "https://api.codetabs.com/v1/proxy?quest=";

(async () => {

  await new Promise(r => setTimeout(r, 500));
  let loadRecommendations = false
      if (localStorage.getItem('recommendationQueryStore')) {
        if (localStorage.getItem('recommendationQueryStore').split(' ').length > 8) {
          loadRecommendations = true
        }
      }

      if (!loadRecommendations) {
          const searchRecommendationTitle = document.createElement("h1");
          searchRecommendationTitle.textContent = "No recommendations right now. Try watching a few videos first.";
          searchRecommendationTitle.style.padding = "0.5em";
          searchRecommendationTitle.style.fontSize = "2.5em";
          searchRecommendationTitle.classList.add("smallTitle");
          const siteDiv = document.getElementById("siteDiv");
          siteDiv.append(searchRecommendationTitle);
      } else{
        let recommendationQueryStore = localStorage.getItem('recommendationQueryStore')
        if (recommendationQueryStore.length > 8) {
          recommendationQueryStore.slice((recommendationQueryStore.length - 8),(recommendationQueryStore.length))
        }
        const suggestionQuery = encodeURIComponent(recommendationQueryStore);
        const response = await fetch(`${proxy}${encodeURIComponent(`https://www.youtube.com/results?search_query=${suggestionQuery}&gl=GB&hl=en`)}`);
          if (response.ok) {
            const text = await response.text();
            const matchArray = text.match(/\/watch\?v=([a-zA-Z0-9_-]{11})/g) || [];
            const videoIds = [...new Set(matchArray.map(match => match.slice(9)))];
            if (videoIds.length !== 0) {
                for (const id of videoIds.slice(0, 25)) {
                    await generateVideoInfo(id);
                }
            } else {

            }
        } else {
          console.error("Failed to fetch:", response.status);
        } 
    }
  })();
  
async function generateVideoInfo(vidID) {
    try {
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${vidID}&format=json`);
        if (response.ok) {
            const mainPage = document.getElementById("mainItems")
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
                window.location.href = `watch/index.html?v=${vidID}`;
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
            title.style.display = "block";

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
            mainPage.appendChild(videoCard);
        } else {
            console.warn("Video fetch failed:", vidID);
        }
    } catch (e) {
        console.error("Error fetching video info:", e);
    }
}


function openPatchNotes() {
    const siteDiv = document.getElementById("mainItems");
    siteDiv.innerHTML = "";

    // Elem creation
    const patchNotesTitle = document.createElement("h1")

    // Content
    patchNotesTitle.textContent = "Patch notes";

    // Classes
    patchNotesTitle.classList.add("mainTitle");

    // Extra Styling
    patchNotesTitle.style.fontSize = "3em";
    patchNotesTitle.style.webkitTextStroke = "0px #fff";

    // Appending
    siteDiv.append(patchNotesTitle);

    // Patch notes
    const patchNotesData = "v0.71 — Limited algorithm query length\n\n• Clamped algorithm length. \\e v0.7 — Bug fixes & HUGE Recommendation feature\n\n• You can now view recommendations on the homepage. \n• Fixed some pesky bugs!\\e v0.62 — Main page as trending \n\n• Made homepage show trending videos.\\e v0.61 — Name change & Mobile changes \n\n• Changed name to be unshortened (YT Client to YouTube Client). \n• Made top search bar align to the right on mobile.\\e v0.6 — Added patch notes. \n\n• Added way to view updates on homepage. \n• Small bugfixes. \\e v0.5 — Mobile improvements & Fixes \n\n• Made mobile layout better. \n• Fixed some small bugs. \\e v0.49 - 0.1 — I'm too lazy to check my commits for the older patch notes, sorry! \n\nAlso thanks for taking the time to go look at the patch notes!"
    const patchNotesElems = patchNotesData.split('\\e ')
    
    for (let i = 0; i < patchNotesElems.length; i++) {
        // Elem creation
        const patchNoteDiv = document.createElement("div");
        const patchNoteData = document.createElement("p");

        // Content
        patchNoteData.textContent = patchNotesElems[i];

        // Classes
        patchNoteDiv.classList.add("patchNoteDiv");
        patchNoteData.classList.add("patchNotesText");

        // Appending
        patchNoteDiv.append(patchNoteData)
        siteDiv.append(patchNoteDiv)
    }

}