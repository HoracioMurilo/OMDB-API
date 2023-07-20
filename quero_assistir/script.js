const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");

async function searchButtonClickHandler() {
  try {
    let url = `http://omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}&y=${movieYearParameterGenerator()}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    overlay.classList.add("open");
  } catch (error) {
    console.error(error.message);
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
    throw new Error("Movie year is empty");
  }

  if (movieYear.value.length !== 4 || isNaN(movieYear.value)) {
    throw new Error("Movie year is invalid");
  }

  return movieYear.value;
}

searchButton.addEventListener("click", searchButtonClickHandler);
