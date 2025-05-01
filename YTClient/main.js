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
    const patchNotesData = "v0.6 - Added patch notes. \n\n• Added way to view updates on homepage. \n• Small bugfixes. \\e v0.5 - Mobile improvements & Fixes \n\n• Made mobile layout better \n• Fixed some small bugs."
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