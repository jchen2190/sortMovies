
const movieHolder = document.querySelector('.movie-holder');
let movie;

for(let i = 0; i < movies.length; i++) {

    // movie time
    movie = movies[i];
    let mins = movie.mins;
    let h = Math.floor(mins / 60);
    let m = mins % 60; 
    movie.hm = `${h}h ${m}m`; 

    let imgFile = movie.name.toLowerCase();
    imgFile = imgFile.replaceAll(' ', '-');

    // imgFile = imgFile.replaceAll(',', '');
    // imgFile = imgFile.replaceAll(':', '');
    // imgFile = imgFile.replaceAll("'", '');
    // imgFile = imgFile.replaceAll('.', '');
    // ReGex for get file name
    imgFile = imgFile
        .replace(/[':,.;*'@$]/g, "")
        .replace(/\s{2,}/g, " ");

    imgFile += '.jpg';
    movie.imgFile = imgFile;

    let noAThe = movie.name;
    noAThe = noAThe.replace("The ", ""); // delete leading "The"
    noAThe = noAThe.replace("A ", ""); // delete leading "A "
    movie.noAThe = noAThe;

    // keep track of likes and dislikes
    movie._likes = 0;
    movie._dislikes = 0;

    renderMovies();
}


function renderMovies() {

    movieHolder.innerHTML = ""; // empty movie holder of all content (to reset)

    // Set up a loop to iterate the movies array and simplify the current movie by passing it to a variable:
    for(let i = 0; i < movies.length; i++) {

        let movie = movies[i];

        // make a div, give it its class and output it to movieHolder:
        let divvy = document.createElement('div');
        divvy.className = "divvy";
        movieHolder.appendChild(divvy);

        // make an image object, set its source to the movie's jpg and output it to the div:
        let pic = new Image();
        pic.src = './images/' + movie.imgFile;
        // pic.title = movie.name;
        // pic.mins = movie.mins;
        // pic.hm = movie.hm;
        // pic.year = movie.year;
        let id = 'movie-' + i;
        pic.id = id;
        pic.addEventListener('click', onMovieClick);
        pic.onclick = function() {
            alert('movie ' + movie.name + ' clicked');
        };

        divvy.appendChild(pic);

        // Below the image, output the text info for the movie:
        divvy.innerHTML += `<p id="movie-name">${movie.name}<br>
        <span id="year-hm">${movie.year} - ${movie.hm}</span></p>`;
        divvy.innerHTML += `<p style="font-size:0.9rem;"><span id="th-up-${i}" class="thumb" onclick="like('th-up-${i}')">&#128077;</span> <span id="tot-th-up-${i}">0</span> &nbsp; &nbsp; <span id="th-down-${i}" class="thumb" onclick="dislike('th-down-${i}')">&#128078;</span> <span id="tot-th-down-${i}">0</span> </p>`;
    } 
}


// Get the select menu
const sortMenu = document.getElementById('sort-menu');
sortMenu.addEventListener('change', sortMovies);

// Get the checkbox. When a change occurs (check/uncheck), run an inline function that reverses the order of the movies and calls the renderMovies() to refresh the display:
const descCB = document.getElementById('desc');
descCB.addEventListener('change', function() {
    movies.reverse(); // reverse the order of the movies
    renderMovies(); // re-render the movies
});


// Define the sortMovies() function and get the menu choice, which is the sort key:
function sortMovies() {
    let sortKey = this.value;
    if(sortKey == "name") {
        movies.sort(function(a,b) {
            return a.name > b.name ? 1 : -1; // ternary for order
        });
    } else {
        movies.sort(function(a,b) {
            return a[sortKey] - b[sortKey];
        });
    }
    // if checkbox is checked, reverse sort:
    if(descCB.checked) {
        movies.reverse();
    }

    renderMovies();
}


const mainMovie = document.getElementById('main-movie');

let totLikes = 0;
let totDislikes = 0;

function like(id) {
    console.log("like", id);
    let num = Number(id.slice(-1));
    console.log('num:', num);
    let movie = movies[num];
    movie._likes++;
    let thTot = document.getElementById('tot-'+id);thTot.textContent = movie._likes;
    totLikes++;
    // log all movies every 10 thumbs up clicks
    if(totLikes % 10 == 0) {
        console.log(movies);
    }
}

function dislike(id) {
    console.log("dislike", id);
    let num = Number(id.slice(-1));
    console.log('num:', num);
    let movie = movies[num];
    movie._dislikes++;
    let thTot = document.getElementById('tot-'+id);thTot.textContent = movie._dislikes;
    totDislikes++;
    // log all movies every 10 thumbs up clicks
    if(totDislikes % 10 == 0) {
        console.log(movies);
    }
}