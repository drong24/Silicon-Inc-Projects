
// Model

BASE_URL = "https://api.themoviedb.org/3/movie/"


const state = {
    movies: [],
    liked: [],
    activeFilter: 'popular'
};

//Controller

function fetchMovies(pageNum = 1) {
    const activeFilter = document.querySelector(".filter_select").value;
    console.log(activeFilter);

    return fetch (`${BASE_URL}${activeFilter}?api_key=124471754942997e76b157aefcfb80c2&page=${pageNum}`)
    .then((resp) => {
        if (resp.ok) {
            return resp.json();
        }
    })
    .then((data) => {
        state.movies = data.results;
        console.log(state.movies);
    })
    .catch((e) => {
        console.log("error!", e);
    });   
}

//View

const homeContainer = document.getElementById("home_container");
const likeContainer = document.getElementById("liked_container");
const selectFilter = document.querySelector(".filter_select");

function renderHome() {
    homeContainer.innerHTML = '';
    let movieList = state.movies;

    movieList.forEach(function (movie) {
        const li = createMovieNode(movie);
        homeContainer.append(li);
      });
}

function renderLiked() {
    likeContainer.innerHTML = '';
}


function createMovieNode(movie) {
    const movieContainer = document.createElement("div");
    const imgContainer = document.createElement("div");
    const movieInfo = document.createElement("div");
    const imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    movieContainer.classList.add("movie_container");
    imgContainer.classList.add("movie_img_container");
    movieInfo.classList.add("movie_info_container");
    
    imgContainer.innerHTML = `<img src=${imgSrc}></img>`;
    movieInfo.innerHTML = 
    `<h4>${movie.title}</h4>
    <div>
        <i class="ion-star"></i>
        <span>${movie.popularity}</span>
        <i class="ion-ios-heart-outline"></i>
    </div> `;
    
    movieContainer.append(imgContainer, movieInfo);    
    return movieContainer;
}

selectFilter.addEventListener("change", () => {
    fetchMovies().then(() => {
        renderHome();
    });
});

function onLoad() {
    fetchMovies().then(() => {
        renderHome();
    });
}

onLoad();