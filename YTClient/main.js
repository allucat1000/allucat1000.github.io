(async () => {
    try {
      const response = await fetch("https://api.tubo.media/api/v1/services/0/kiosks/Trending?region=GB", {
        headers: {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/json",
          "pragma": "no-cache",
          "priority": "u=1, i",
          "sec-ch-ua": '"Chromium";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        },
        referrer: "https://tubo.media/",
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "GET",
        mode: "cors",
        credentials: "omit"
        });
  
        const data = await response.json();
        const trendingVideos = data["related-streams"];
        const loadTitle = document.getElementById("loadTitle");
        loadTitle.remove()
        for (let i = 0; i < 15; i++) {
            const mainPage = document.getElementById("siteDiv");
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

            let thumbnailURL = (trendingVideos[i].thumbnails)[2].url
            console.log(thumbnailURL)
            const thumbnail = document.createElement("img");
            thumbnail.src = thumbnailURL;
            thumbnail.alt = trendingVideos[i].name;
            thumbnail.width = 170;
            thumbnail.style.borderRadius = "8px";

            const title = document.createElement("a");
            title.textContent = trendingVideos[i].name;
            title.href = `watch/index.html?v=${trendingVideos[i].url.replace('https://www.youtube.com/watch?v=','')}`;
            title.target = "_blank";
            title.style.color = "white";
            title.style.fontSize = "1.2em";
            title.style.textDecoration = "none";
            title.style.textAlign = "left";
            title.style.display = "block";

            const textContainer = document.createElement("div");
            textContainer.appendChild(title);
            videoCard.appendChild(thumbnail);
            videoCard.appendChild(textContainer);
            mainPage.appendChild(videoCard);
        }

    } catch (error) {
      console.error('Failed to fetch trending:', error);
    }
  })();
  

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
    const patchNotesData = "v0.62 — Main page as trending \n\n• Made homepage show trending videos.\\e v0.61 — Name change & Mobile changes \n\n• Changed name to be unshortened (YT Client to YouTube Client). \n• Made top search bar align to the right on mobile.\\e v0.6 — Added patch notes. \n\n• Added way to view updates on homepage. \n• Small bugfixes. \\e v0.5 — Mobile improvements & Fixes \n\n• Made mobile layout better. \n• Fixed some small bugs. \\e v0.49 - 0.1 — I'm too lazy to check my commits for the older patch notes, sorry! \n\nAlso thanks for taking the time to go look at the patch notes!"
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