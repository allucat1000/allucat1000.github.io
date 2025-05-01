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
    const patchNotesData = "v0.61 — Name change & Mobile Changes \n\n• Changed name to be unshortened (YT Client to YouTube Client). \n• Made top search bar align to the right on mobile.\\e v0.6 — Added patch notes. \n\n• Added way to view updates on homepage. \n• Small bugfixes. \\e v0.5 — Mobile improvements & Fixes \n\n• Made mobile layout better. \n• Fixed some small bugs. \\e v0.49 - 0.1 — I'm too lazy to check my commits for the older patch notes, sorry! \n\nAlso thanks for taking the time to go look at the patch notes!"
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