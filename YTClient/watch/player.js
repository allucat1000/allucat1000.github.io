const url = new URL(window.location.href);
const vidURL = url.searchParams.get("v");
const videoPlayerPage = document.getElementById("videoPlayerPage");

if (!vidURL) {
    const videoLoadErrorTitle = document.createElement("h1");
    videoLoadErrorTitle.classList.add("smallTitle");
    videoLoadErrorTitle.textContent = "Unable to find video.";
    videoPlayerPage.append(videoLoadErrorTitle);

    const videoLoadErrorButton = document.createElement("button");
    videoLoadErrorButton.classList.add("button");
    videoLoadErrorButton.textContent = "Go back";
    videoPlayerPage.append(videoLoadErrorButton);

    videoLoadErrorButton.onclick = function() {
        window.location.href = "../index.html";
    }
} else {
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video-container");


    const videoPlayer = document.createElement("iframe");
    videoPlayer.src = `https://www.youtube-nocookie.com/embed/${vidURL}?playlist=${vidURL}&autoplay=1&iv_load_policy=3&loop=1&start=0`;
    videoPlayer.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    videoPlayer.allowFullscreen = true;


    videoPlayer.width = "75%";
    videoPlayer.height = "720em";

    videoPlayer.style.maxWidth = "100%";
    videoPlayer.style.border = "none";

    videoContainer.append(videoPlayer);
    videoPlayerPage.append(videoContainer);

    const videoId = vidURL;
    const vidPlayerTitle = document.createElement("h1");
    const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    fetch(oEmbedUrl)
        .then(response => response.json())
        .then(data => {
            const vidTitleValue = data.title;
            vidPlayerTitle.textContent = vidTitleValue;
        })
    .catch(error => {
        console.error('Error fetching video title:', error);
        vidPlayerTitle.textContent = "Failed to load title";
    });

 
    
    vidPlayerTitle.classList.add("titleText");
    videoPlayerPage.append(vidPlayerTitle);
}

