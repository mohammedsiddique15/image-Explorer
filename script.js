const accessKey = "DFE2lJqZWYJDve39LM__6fc9MV9urcnlIXXHsSOhpDY";

const  formElements = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){

    if(inputElement.value === ''){
        alert("Type in search Bar to see result");
        return;
    }

    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json();

    const results = data.results

    if(page === 1){
        searchResults.innerHTML = ""
    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");

        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });

    page++;
    if(page>1){
        showMore.style.display = "block";
    }

    
}

// Submit the form to get response fromm api
formElements.addEventListener('submit',(event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
});

// Show More button to show more images to display
showMore.addEventListener('click',()=>{
    searchImages();
});