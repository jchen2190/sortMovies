const movieHolder = document.querySelector('.movie-holder');

movies.forEach(movie => {
    let mins = movie.mins;
    let hours = Math.floor(mins / 60);
    mins = mins % 60;
    movie.hm = `${hours}h ${mins}m`;

    let imgFile = movie.name.toLowerCase();
    imgFile = imgFile.replaceAll(" ", "-");
    imgFile = imgFile
        .replace(/[':,.;*'@$]/g, "")
        .replace(/\s{2,}/g, " ");
    imgFile += '.jpg';
    movie.image = imgFile;

    let name2 = movie.name.replace("A ", "");
    name2 = name2.replace("The ", "");
    movie.name2 = name2;
}) 

renderMovies();

function renderMovies() {
    movieHolder.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        const divvy = document.createElement('div');
        divvy.className = "divvy";
        movieHolder.appendChild(divvy);
        const moviePoster = new Image();
        moviePoster.src = `images/${movie.image}`;
        divvy.appendChild(moviePoster);
        divvy.innerHTML += `${movie.name}<br>${movie.year} - ${movie.hm}`;
    };
}

const sortMenu = document.getElementById('sort-menu');
sortMenu.addEventListener('change', sortMovies);
const descCB = document.getElementById('desc');
descCB.addEventListener('change', () => {
    movies.reverse();
    renderMovies();
});

function sortMovies() {
    let sortKey = this.value;
    if (sortKey == "name") {
        movies.sort((a,b) => a.name2 > b.name2 ? 1 : -1 )
    } else {
        movies.sort((a,b) => a[sortKey] - b[sortKey])
    }

    if(descCB.checked) movies.reverse();
    renderMovies();
}