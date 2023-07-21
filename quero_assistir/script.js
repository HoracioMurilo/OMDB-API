const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");

async function searchButtonClickHandler() {
  try {
    let url = `http://omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieYearParameterGenerator()}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if(data.Error){
        throw new Error('Movie not found');
    }
    createModal(data);
    overlay.classList.add("open");
} catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
}

function movieNameParameterGenerator() {
  if (movieName.value === "") {
    throw new Error("Movie name is empty");
  }
  return movieName.value.split(" ").join("+");
}

function movieYearParameterGenerator() {
  if (movieYear.value === "") {
    return "";
  }

  if (movieYear.value.length !== 4 || isNaN(movieYear.value)) {
    throw new Error("Movie year is invalid");
  }

  return `&y=${movieYear.value}`;
}

searchButton.addEventListener("click", searchButtonClickHandler);
