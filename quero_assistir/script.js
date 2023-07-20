const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");

function searchButtonClickHandler() {
    overlay.classList.add('open');
    const movieNameValue = movieName.value.split(' ').join('+');
    const movieYearValue = movieYear.value;
    console.log(movieNameValue);
    console.log(movieYearValue);
}

searchButton.addEventListener('click', searchButtonClickHandler); 


