class Movie {
    constructor(id, title, releaseDate, rating, voteCount, posterPath) {
      this.id = id;
      this.title = title;
      this.releaseDate = releaseDate;
      this.rating = rating;
      this.voteCount = voteCount;
      this.posterPath = posterPath;
      this.favoutir
    }
  
    createMovieCard() {
      const card = document.createElement('div');
      card.classList.add('card');
      const imgSrc = this.posterPath
        ? `https://image.tmdb.org/t/p/original/${this.posterPath}`
        : 'https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png';
      card.innerHTML = `
      <div>
          <div class="card-image">
              <img src=${imgSrc} alt="${this.title}">
          </div>
          <h3 class="card-name">${this.title}</h3>
          <button id="${this.id}-btn" onClick="showMore(${this.id}, ${true})">Show more</button>
      </div>
      <div id="${this.id}-details" style="display:none">
          <h4>Release Date - ${this.releaseDate}</h4>
          <h5>Avg Rating - ${this.rating}</h5>
          <h5>Number of Ratings - ${this.voteCount}</h5>
          <button onClick="showMore(${this.id}, ${false})">Show less</button>
      </div>`;
      return card;
    }
}

const showMore = (id, show) => {
    var showMoreButton = document.getElementById(`${id}-btn`);
    var cardDetails = document.getElementById(`${id}-details`);
    if (show) {
        showMoreButton.style.display = 'none';
        cardDetails.style.display = 'block';
    } else {
        showMoreButton.style.display = 'block';
        cardDetails.style.display = 'none';
    }
};
  
const url =
'https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=1';
let movieList = [];
  
function displayMovies(movieList) {
    const cardDisplay = document.getElementById('card-display');
    cardDisplay.innerHTML = '';
    if (movieList.length === 0) {
        const noResultMessage = document.createElement('p');
        noResultMessage.innerText = 'No results found.';
        cardDisplay.appendChild(noResultMessage);
    } else {
        movieList.forEach((movie) => {
        const card = movie.createMovieCard();
        cardDisplay.appendChild(card);
        });
    }
}

const fetchMovies = async () => {
    const data = await fetch(url);
    const jsonData = await data.json();
    movieList = jsonData.results.map(
        (movie) =>
        new Movie(
            movie.id,
            movie.title,
            movie.release_date,
            movie.vote_average,
            movie.vote_count,
            movie.poster_path
        )
    );
    displayMovies(movieList);
};

function sortMovies(array, order) {
    if (order === "rating-asc") {
      return array.sort((a, b) => a.rating - b.rating);
    } else if (order === "rating-desc") {
      return array.sort((a, b) => b.rating - a.rating);
    } else if (order === "release-asc"){
      return array.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
    } else {
      return array.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
    }
}

function handleSortChange(event) {
	  const sortBy = event.target.value;
    movieList = sortMovies(movieList, sortBy)
    displayMovies(movieList)
}

function handleSearchInput(event) {
    const searchText = event.target.value;
    const filteredMovies = movieList.filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase()));
    displayMovies(filteredMovies);
}

function init () {
    const sortBySelect = document.getElementById('sort-by');
    sortBySelect.addEventListener('change', handleSortChange);
    const searchBox = document.getElementById('search-box');
    searchBox.addEventListener('input', handleSearchInput);
    fetchMovies();
}
init();