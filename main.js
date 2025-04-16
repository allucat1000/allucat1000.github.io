function clickerActivate() {
    const oldElems = document.getElementById("site");
    oldElems.innerHTML = "";

    let Score = 0

    const siteDiv = document.getElementById("site"); 
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

    backButton.onclick = function() {
        location.reload();
    };    

    clickerButton.onclick = function() {
        Score += 1;
        scoreTitle.textContent = `Score: ${Score}`;
        switch (Score) {
            case 100:
                
                break;
        
            default:

                break;
        }
    };    

}