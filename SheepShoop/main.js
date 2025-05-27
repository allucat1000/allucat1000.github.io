if (screen.width < 1000) {
    const tableDiv = document.getElementById("tableDiv")
    tableDiv.innerHTML = "";
    const html = document.createElement("h3")
    html.innerHTML = marked.parse("## Verbs \nPrimary verb: Take (singular) is took (plural).\n \n Plural: replace the first vowel with two \"O\"s.  \n\n Past tense: add an \"S\" to the end of a word \n\n **Keep in mind, that these rules don't apply to \"can\" and \"have\".** \n Example: Pick is poock (current tense), poocks (past tense). \n\n ## Words \n Primary words: Sheep (singular) is shoop (plural). Flower (singular), floweroot (plural). \n\n Plural: if you have a word with two same vowels next to each other, replace them with \"O\"s. If they are \"O\"s, replace them with \"E\"s. \n\n Otherwise, add \"oot\" to the end. If the original verb ends with a vowel, add a ' before the \"oot\". If the original verb ends with \"oot\" already, don't add \"oot\" again. \n Example: Plain is ploon, company is companyoot.")
    tableDiv.append(html);
}

let answersDone = 0

async function checkAnswer(elementID) {
    const input = document.getElementById(elementID)
    const div = document.getElementById(`${elementID}Div`)
    const checkTextAnswer = document.createElement("p")
    checkTextAnswer.id = `checkText${elementID}`
    const checkTextAnswerElement = document.getElementById(`checkText${elementID}`)
    if (checkTextAnswerElement) {
        checkTextAnswerElement.remove();
    }
    div.append(checkTextAnswer)

    if (elementID === "roadInput") {
        const answerID = 1;
        if (answersDone + 1 < answerID) { checkTextAnswer.textContent = "Answer the previous question(s) first!"; return;}
        if (input.value) {
            if (input.value.toLowerCase() === "rood") {
                if (answersDone + 1 === answerID) { answersDone++; }
                checkTextAnswer.textContent = "Well done!"
                await new Promise(resolve => setTimeout(resolve, 2000));
                checkTextAnswer.remove()
            } else {
                checkTextAnswer.textContent = "Incorrect answer!"
                await new Promise(resolve => setTimeout(resolve, 2000));
                checkTextAnswer.remove()
            }
        } else {
            checkTextAnswer.textContent = "Enter something in!"
            await new Promise(resolve => setTimeout(resolve, 2000));
            checkTextAnswer.remove()
        }
        
    } else if (elementID === "playInput") {
        const answerID = 2;
        if (answersDone + 1 < answerID) { checkTextAnswer.textContent = "Answer the previous question(s) first!"; return;}
        if (input.value) {
            if (input.value.toLowerCase() === "plays") {
                if (answersDone + 1 === answerID) { answersDone++; }
                checkTextAnswer.textContent = "Well done!"
                await new Promise(resolve => setTimeout(resolve, 2000));
                checkTextAnswer.remove()
            } else {
                checkTextAnswer.textContent = "Incorrect answer!"
                await new Promise(resolve => setTimeout(resolve, 2000));
                checkTextAnswer.remove()
            }
        } else {
            checkTextAnswer.textContent = "Enter something in!"
            await new Promise(resolve => setTimeout(resolve, 2000));
            checkTextAnswer.remove()
        }
        
    } else if (elementID === "bootInput") {
        const answerID = 3;
        if (answersDone + 1 < answerID) { checkTextAnswer.textContent = "Answer the previous question(s) first!"; return;}
        if (input.value) {
            if (input.value.toLowerCase() === "boot") {
                if (answersDone + 1 === answerID) { answersDone++; }
                checkTextAnswer.textContent = "Well done!"
                await new Promise(resolve => setTimeout(resolve, 2000));
                checkTextAnswer.remove()
            } else {
                checkTextAnswer.textContent = "Incorrect answer!"
                await new Promise(resolve => setTimeout(resolve, 2000));
                checkTextAnswer.remove()
            }
        } else {
            checkTextAnswer.textContent = "Enter something in!"
            await new Promise(resolve => setTimeout(resolve, 2000));
            checkTextAnswer.remove()
        }
        
    } else if (elementID === "motorboatInput") {
        const answerID = 4;
        if (answersDone + 1 < answerID) { checkTextAnswer.textContent = "Answer the previous question(s) first!"; return;}
        if (input.value) {
            if (input.value.toLowerCase() === "motorboatoot") {
                if (answersDone + 1 === answerID) { answersDone++; }
                checkTextAnswer.textContent = "Well done!"
                await new Promise(resolve => setTimeout(resolve, 2000));
                checkTextAnswer.remove()
            } else {
                checkTextAnswer.textContent = "Incorrect answer!"
                await new Promise(resolve => setTimeout(resolve, 2000));
                checkTextAnswer.remove()
            }
        } else {
            checkTextAnswer.textContent = "Enter something in!"
            await new Promise(resolve => setTimeout(resolve, 2000));
            checkTextAnswer.remove()
        }
        
    }

}