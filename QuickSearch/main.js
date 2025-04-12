function searchButton(){
    let inputElement = document.getElementById("searchinput");
    let search = inputElement.value;
    if (search != null && search.trim() !== "") {
        let url = `https://api.duckduckgo.com/?q=${encodeURIComponent(search)}&format=json`;

        try {
            fetch(url)
            .then(res => res.json())
            .then(data => {
            let infoArray = data.RelatedTopics;
            if (infoArray.length > 0) {
                let answer = infoArray[0].Text
                alert(answer);
                inputElement=""
              } else {
                alert(['Nothing found from search:',search].join(' '));
              }

            });
        } catch (error) {
            alert(['Failed to fetch with error:',error].join(' '));
        }
            
    } else {
        alert('Input something to search!');
    }      

}
