
// Model

BASE_URL = "https://api.themoviedb.org/3/movie/"
MOVIE_DETAIL_URL = "https://api.themoviedb.org/3/keyword/"

const state = {
    movies: [],
    liked: [],
    pageNum: 1,
    totalPages: 0,
    currMovieData: null,
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
        state.totalPages = data.total_pages;
        console.log(data);
    })
    .catch((e) => {
        console.log("error!", e);
    });   
}

function fetchMovieData(target) {
    const id = target.closest(".movie_container").id;
    return fetch (`${BASE_URL}${id}?api_key=124471754942997e76b157aefcfb80c2`)
    .then((resp) => {
        if (resp.ok) {
            return resp.json();
        }
    })
    .then((data) => {
        state.currMovieData = data;
        console.log(data);        
    })
    .catch((e) => {
        console.log("error!", e);
    });   
}

function handleLike(target) {
    console.log(target);
    const id = Number(target.closest(".movie_container").id);
    const liked = state.liked.some((movie) => movie.id == id);
    if (liked) {
        target.classList.remove("ion-ios-heart");
        target.classList.add("ion-ios-heart-outline");
        state.liked = state.liked.filter((movie) => movie.id !== id);
    } else {
        target.classList.remove("ion-ios-heart-outline");
        target.classList.add("ion-ios-heart");
        const movieData = state.movies.find((movie) => movie.id === id);
        console.log(movieData);
        state.liked.push(movieData);
    }
    console.log(state.liked);
    renderLiked();
}

//View

const homeContainer = document.getElementById("home_container");
const likeContainer = document.getElementById("liked_container");
const tabContainer = document.querySelector(".tab_bar");
const homeTab = document.getElementById("home");
const likedTab = document.getElementById("liked");
const selectFilter = document.querySelector(".filter_select");
const navigationContainer = document.querySelector(".navigation_contianer");
const currentPageNode = document.getElementById("currentPage");
const modalBg = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal_container");

function renderNavBar() {
    currentPageNode.innerHTML = `${state.pageNum} / ${state.totalPages}`;
}

function renderHome() {
    homeContainer.innerHTML = '';
    const movieList = state.movies;

    movieList.forEach(function (movie) {
        const li = createMovieNode(movie);
        homeContainer.append(li);
      });
}

function renderLiked() {
    likeContainer.innerHTML = '';
    const likedList = state.liked;

    likedList.forEach(function (movie) {
        const li = createMovieNode(movie);
        likeContainer.append(li);
      });
}

function createMovieNode(movie) {
    const movieContainer = document.createElement("div");
    const imgContainer = document.createElement("div");
    const movieInfo = document.createElement("div");
    const imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    movieContainer.classList.add("movie_container");
    movieContainer.id = movie.id;
    imgContainer.classList.add("movie_img_container");
    movieInfo.classList.add("movie_info_container");
    
    imgContainer.innerHTML = `<img src=${imgSrc}></img>`;
    movieInfo.innerHTML = 
    `<h4 class="movie_title">${movie.title}</h4>
    <div>
        <i class="ion-star"></i>
        <span>${movie.popularity}</span>
        <i class="like_btn ion-ios-heart-outline"></i>
    </div> `;
    movieContainer.append(imgContainer, movieInfo);    
    return movieContainer;
}

function displayModal() {
    const movie = state.currMovieData;
    const imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    modalBg.classList.add("modal_active");

    const exitButton = document.createElement("button");
    const modalContent = document.createElement("div");
    const modalImgContainer = document.createElement("div");
    const modalInfoContainer = document.createElement("div");
    let genreHTMLList = "";
    let companiesHTMLList = "";

    exitButton.classList.add("exit_button");
    modalContent.classList.add("modal_content");
    modalImgContainer.classList.add("modal_img_container");
    modalInfoContainer.classList.add("modal_info");
    
    movie.genres.forEach(genre => {
        genreHTMLList += `<li>${genre}</li>`;
    });
    movie.production_companies.forEach(company => {
        companiesHTMLList += `<li><img src=https://image.tmdb.org/t/p/w500${company.logo_path}></img></li>`
    });

    exitButton.innerHTML = `<i class="icon ion-close-round"></i>`;
    modalImgContainer.innerHTML = `<img src=${imgSrc}></img>`;
    modalInfoContainer.innerHTML = 
        `<h2>${movie.title}</h2>
        <h3>Overview</h3>
        <p>${movie.overview}</p>
        <h3>Genres</h3>
        <ul class="genre_list">${genreHTMLList}</ul>
        <h3>Rating</h3>
        <p>${movie.popularity}</p>
        <h3>Production companies</h3>
        <ul class="company_list">${companiesHTMLList}</ul>`;
    
        modalContent.append(modalImgContainer, modalInfoContainer);
        modalContainer.append(exitButton, modalContent);
}

tabContainer.addEventListener("click", (e) => {
    if(e.target.id === "home") {
        homeContainer.classList.add("active_tab");
        homeTab.classList.add("active");
        likeContainer.classList.remove("active_tab");
        likedTab.classList.remove("active");
    } else if (e.target.id === "liked") {
        homeContainer.classList.remove("active_tab");
        homeTab.classList.remove("active");
        likeContainer.classList.add("active_tab");
        likedTab.classList.add("active");
    } 
});
selectFilter.addEventListener("change", () => {
    state.pageNum = 1;
    fetchMovies().then(() => {
        renderHome();
        renderNavBar();
    });
});
navigationContainer.addEventListener("click", (e) => {
    if (e.target.id === 'prevButton') {
        state.pageNum = (state.pageNum <= 1) ? 1 : state.pageNum - 1;
    } else if (e.target.id === 'nextButton') {
        state.pageNum = (state.pageNum >= state.totalPages) ? 1 : state.pageNum + 1;
    }
    fetchMovies(state.pageNum).then(() => {
        renderHome();
        renderNavBar();
    });
});
homeContainer.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.classList.contains("like_btn")) {
        handleLike(e.target);
    }
    if (e.target.classList.contains("movie_title")) {
        fetchMovieData(e.target).then(() => {
            console.log(state.currMovieData);
            displayModal();
        });
    }
});
likeContainer.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.classList.contains("like_btn")) {
        handleLike(e.target);
    }
    if (e.target.classList.contains("movie_title")) {
        console.log("name clicked!")
        displayModal(e.target.id, "liked");
    }
});

function onLoad() {
    fetchMovies().then(() => {
        renderHome();
        renderNavBar();
    });
}

onLoad();