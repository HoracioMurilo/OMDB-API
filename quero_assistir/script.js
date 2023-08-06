const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");
const movieListContainer = document.getElementById("movie-list");

let movieList = [];

async function searchButtonClickHandler() {
  try {
    let url = `http://omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieYearParameterGenerator()}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.Error) {
      throw new Error("Movie not found");
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

function addToList(data) {
  if (isFilmAlreadyOnTheList(data.imdbID)) {
    notie.alert({ type: "error", text: "Filme já está na lista" });
    return;
  };
  movieList.push(data);
  updateUI(data);
  overlay.classList.remove('open')
}

function updateUI(data) {
  movieListContainer.innerHTML += `<article id='movie-card-${data.imdbID}'>
  <img
    src=${data.Poster}
    alt="Poster do ${data.Title}."
  />
  <button class="remove-button">
    <i class="bi bi-trash"></i> Remover
  </button>
</article>`;
}

function isFilmAlreadyOnTheList(imdbId) {
  function isThisIdFromThisMovie(movie) {
    return movie.imdbID === imdbId;
  }
  return movieList.find(isThisIdFromThisMovie);
}

searchButton.addEventListener("click", searchButtonClickHandler);
