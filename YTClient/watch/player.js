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


    videoPlayer.width = "100%";
    videoPlayer.height = "720em";

    videoPlayer.style.maxWidth = "100%";
    videoPlayer.style.border = "none";
    videoPlayer.style.display = "none";

    videoContainer.append(videoPlayer);
    videoPlayerPage.append(videoContainer);


    // Video info element creation
    const videoId = vidURL;
    const vidPlayerTitle = document.createElement("h1");
    const vidPlayerAuthor = document.createElement("a");
    const vidPlayerLikeCount = document.createElement("p");
    const vidPlayerDate = document.createElement("h3");
    const vidPlayerDescription = document.createElement("h3");
    const vidPlayerExtraInfoContainer = document.createElement("div");

    // Video info fetching
    const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

    fetch(oEmbedUrl)
        .then(response => response.json())
        .then(data => {
            vidPlayerTitle.textContent = data.title;
            vidPlayerAuthor.textContent = data.author_name;
            vidPlayerAuthor.href = data.author_url;

            // Recommendations
            const match = (data.title).match(/#(\w+)/);
            const recommendationQueryStore = localStorage.getItem('recommendationQueryStore');
            const authorHandle = data.author_url.replace('https://www.youtube.com/', '')
            if (match) {
                localStorage.setItem('recommendationQueryStore', [recommendationQueryStore, match[0], authorHandle, '\\a'].join(' '));
            } else{
                localStorage.setItem('recommendationQueryStore',[recommendationQueryStore, authorHandle, '\\a'].join(' '));
            }
        })
    .catch(error => {
        console.error('Failed to fetch video data:', error);
        vidPlayerTitle.textContent = "Failed to load title";
        vidPlayerAuthor.textContent = "Failed to load author";
    });

    const vidDataURL = `https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`
    fetch(vidDataURL)
        .then(response => response.json())
        .then(data => {
            vidPlayerLikeCount.textContent = `${data.likes} likes – ${data.dislikes} dislikes`
            vidPlayerDate.textContent = `${data.viewCount} views`;
            
        })
    .catch(error => {
        console.error('Failed to fetch video date:', error);
        vidPlayerDate.textContent = "Failed to load date created";
    });

    const vidDescURL = `https://corsproxy.io/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${videoId}`;

    fetch(vidDescURL)
    .then(response => response.text())
    .then(data => {
        let pattern, match = "";

        pattern = /"attributedDescriptionBodyText":{"content":"((?:[^"\\]|\\.)*)"/;
        match = data.match(pattern);
        
        if (match) {
            vidPlayerDescription.textContent = match[1].replace(/\\n/g, "\n");
        } else {
            vidPlayerDescription.textContent = "Description not found";
        }


    })
    .catch(error => {
        console.error('Failed to fetch video description:', error);
        vidPlayerDescription.textContent = "Failed to load description";
    });

    // Class adding
    vidPlayerExtraInfoContainer.classList.add("vidPlayerInfoContainer");
    vidPlayerDate.classList.add("descText");
    vidPlayerDescription.classList.add("authorText");
    vidPlayerTitle.classList.add("titleText");
    vidPlayerAuthor.classList.add("descText");
    vidPlayerLikeCount.classList.add("descText");

    // Appending
    videoPlayerPage.append(vidPlayerTitle);
    videoPlayerPage.append(vidPlayerAuthor);
    videoPlayerPage.append(vidPlayerLikeCount)
    videoPlayerPage.append(vidPlayerExtraInfoContainer);
    vidPlayerExtraInfoContainer.append(vidPlayerDate);
    vidPlayerExtraInfoContainer.append(vidPlayerDescription);

    // Load fix (goofy ik)
    sleep(650).then(() => { 
        videoPlayer.remove(); 
    })
    
    sleep(750).then(() => { 
        videoPlayer.style.display = "block";
        videoContainer.append(videoPlayer); 
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
