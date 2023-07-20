const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");

async function searchButtonClickHandler() {
  overlay.classList.add("open");
  let url = `http://omdbapi.com/?apikey=${key}&t=${movieName.value
    .split(" ")
    .join("+")}&${movieYear.value}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    
}

searchButton.addEventListener("click", searchButtonClickHandler);
