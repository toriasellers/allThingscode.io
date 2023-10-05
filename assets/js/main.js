// VARIABLES
let keywordSearchInput = "tesla";
let sortByInput = "publishedAt";
let setLanguageInput = "en";
let articleCountText = document.querySelector("#article-count-num");

// FUNCTIONS
let clearArticlesSection = () => {
  document.querySelector("main").innerHTML = "";
};

let scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

let getSearchValues = () => {
  keywordSearchInput = document.querySelector("#keyword-search").value;
  sortByInput = document.querySelector("#sort-by").value;
  setLanguageInput = document.querySelector("#set-language").value;
  if (keywordSearchInput.length === 0) {
    keywordSearchInput = "tesla";
  }
  document.querySelector("#keyword-search").value = "";
};

let writeHtml = (articles) => {
    clearArticlesSection();
    scrollToTop();
    articleCountText.innerText = articles.length;
  
    const mainElement = document.querySelector("main");
  
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
  
      // Create elements for the article
      const articleWrapperElement = document.createElement("article");
      const articleTitleElement = document.createElement("h2");
      const articleDescriptionElement = document.createElement("p");
      const articleSourceElement = document.createElement("p"); // This line is inside the loop
  
      // Set content and attributes for the elements
      articleTitleElement.textContent = article.title;
      articleDescriptionElement.textContent = article.description;
      articleSourceElement.textContent = "Source: " + (article.source ? article.source.name : "Unknown");
      
      const articleLinkElement = document.createElement("a");
  
      // Set content and attributes for the link element
      articleLinkElement.textContent = "Read More";
      articleLinkElement.href = article.url;
      articleLinkElement.target = "_blank";
  
      // Append elements to the article wrapper
      articleWrapperElement.appendChild(articleTitleElement);
      articleWrapperElement.appendChild(articleDescriptionElement);
      articleWrapperElement.appendChild(articleSourceElement);
      articleWrapperElement.appendChild(articleLinkElement);
  
      // Append the article wrapper to the main element
      mainElement.appendChild(articleWrapperElement);
    }
  };
  
let showNews = (keywordSearchInput, sortByInput, setLanguageInput) => {
//   const apiUrl = `https://news-api14.p.rapidapi.com/top-headlines?country=us&language=${setLanguageInput}&pageSize=10&q=${keywordSearchInput}`;
  const apiUrl = `https://news-api14.p.rapidapi.com/search?q=${keywordSearchInput}&country=us&language=${setLanguageInput}&pageSize=10&publisher=geeksforgeeks.org%2Ccomputerscience.org%2Cstackoverflow.com%2Cw3schools.com%2Ccode.org%2Ccodecademy.com%2Ccodewars.com%2Cgithub.com%2Ctldr.tech%2Ctechdevguide.withgoogle.com`;  
  
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "185be2d59cmshe0aa8e2ae1c4a6fp10c836jsn974c25ef4572",
      "X-RapidAPI-Host": "news-api14.p.rapidapi.com",
    },
  };

  fetch(apiUrl, options)
    .then((response) => response.json())
    .then((data) => {
      writeHtml(data.articles);
    })
    .catch((error) => {
      console.error(error);
    });
};

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  getSearchValues();
  showNews(keywordSearchInput, sortByInput, setLanguageInput);
});

document.querySelectorAll("select").forEach((select) => {
  select.addEventListener("change", (event) => {
    event.preventDefault();
    getSearchValues();
    showNews(keywordSearchInput, sortByInput, setLanguageInput);
  });
});

// Clear the keyword input on document load
// clearKeywordInput();
