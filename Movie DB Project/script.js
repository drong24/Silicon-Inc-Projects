
// Model

MOVIE_DETAILS = ""
NOW_PLAYING = ""
POPULAR = "https://api.themoviedb.org/3/movie/popular"
TOP_RATED = ""
UPCOMING = ""


const state = {
    movies: [],
    liked: [],
    activeFilter: 'popular'
};

//Controller

function fetchPopular(pageNum = 1) {
    return fetch (`${POPULAR}?api_key=124471754942997e76b157aefcfb80c2&page=${pageNum}`)
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
const select = document.querySelector(".filter_select");

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

function checkActive() {
    if (select.value == "popular") {
        fetchPopular();
    }
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

function onLoad() {
    fetchPopular().then(() => {
        renderHome();
    });
}

onLoad();