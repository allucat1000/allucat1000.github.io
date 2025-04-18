function clickerActivate() {
    const siteDiv = document.getElementById("site"); 
    siteDiv.innerHTML = "";

    let Score = 0

    const clickerButton = document.createElement("button");
    const backButton = document.createElement("button");
    const newTitle = document.createElement("h1");
    const scoreTitle = document.createElement("h3");

    scoreTitle.classList.add("semi-title");
    scoreTitle.style.setProperty("clip-path", "inset(0 0 0 0)");
    newTitle.classList.add("title");
    newTitle.style.setProperty("clip-path", "inset(0 0 0 0)");
    clickerButton.classList.add("clicker-button");
    backButton.classList.add("clicker-back-button");

    const currentYear = new Date().getFullYear();
    newTitle.textContent = `Button Clicker ${currentYear}`;
    scoreTitle.textContent = `Score: ${Score}`;

    clickerButton.textContent = "Epic Button";

    backButton.textContent = "<- Back";
    scoreTitle.id = "clicker-scoreTitle"

    

    siteDiv.appendChild(newTitle);
    siteDiv.appendChild(scoreTitle);
    siteDiv.appendChild(clickerButton);
    siteDiv.appendChild(backButton);


    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });

    backButton.onclick = function() {
        location.reload();
    };    

    clickerButton.onclick = function() {
        Score += 1;
        if (Score >= 100 && checkPOT(Score)) {
            scoreTitle.textContent = `Congrats on ${Score} clicks!`;
        } else {
            scoreTitle.textContent = `Score: ${Score}`;
        }
        
        function checkPOT(n) {
            return n.toString().match(/^1(0+)$/);
        }        
        
    };    

}
