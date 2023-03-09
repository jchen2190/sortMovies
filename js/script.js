const movieHolder = document.querySelector('.movie-holder');

// for (let i = 0; i < movies.length; i++) {
movies.forEach(movie => {

    let mins = movie.mins;
    let hours = Math.floor(mins / 60); // Math.floor(131 / 60) = 2
    mins = mins % 60; // 131 % 60 = 11
    movie.hm = `${hours}h ${mins}m`;

    let imgFile = movie.name.toLowerCase();
    imgFile = imgFile.replaceAll(" ", "-");
    // imgFile = imgFile.replaceAll("'", "");
    // imgFile = imgFile.replaceAll(":", "");
    // imgFile = imgFile.replaceAll(",", "");
    // imgFile = imgFile.replaceAll(".", "");
    imgFile = imgFile
        .replace(/[':,.;*'@$]/g, "")
        .replace(/\s{2,}/g, " ");
    imgFile += '.jpg';
    movie.image = imgFile; // use for obtaining image in folder

    let name2 = movie.name.replace("A ", "");
    name2 = name2.replace("The ", "");
    movie.name2 = name2; // add name2 as a new property of movies

}) 


renderMovies();

function renderMovies() {

    movieHolder.innerHTML = ""; // empty out the movie holder to make way for a fresh

    // Set up a loop to iterate the movies array and simplify the current movie by passing it to a variable:
    for (let i = 0; i < movies.length; i++) {

        const movie = movies[i];

        // Next in the loop, make a div, give it its class and output it to movieHolder:
        const divvy = document.createElement('div');
        divvy.className = "divvy";
        movieHolder.appendChild(divvy);

        // make an image object, set its source to the movie's jpg and output it to the div:
        const moviePoster = new Image();
        moviePoster.src = `images/${movie.image}`;
        divvy.appendChild(moviePoster);

        // Below the image, output the text info for the movie:
        divvy.innerHTML += `${movie.name}<br>${movie.year} - ${movie.hm}`;
    };
}

// sorting movies

// Get the select menu and have it call the **sortMovies** function:
const sortMenu = document.getElementById('sort-menu');
sortMenu.addEventListener('change', sortMovies);

// Get the checkbox. When a change occurs (check/uncheck), run an inline function that reverses the order of the movies and calls the renderMovies() to refresh the display::
const descCB = document.getElementById('desc');

// refactor using => callback function instead of regular function
// descCB.addEventListener('change', function() {
descCB.addEventListener('change', () => {
    movies.reverse();
    renderMovies();
});

// function reverseSort() {
//     movies.reverse();
//     renderMovies();
// }

// 34. Define the sortMovies() function and get the menu choice, which is the sort key:
function sortMovies() {

    // If sortKey == "name", do the string sort on the noAThe key, which is the name of the movie with no leading "A" or "The":
    let sortKey = this.value; // sortMenu.value

    if (sortKey == "name") {

        movies.sort((a,b) => a.name2 > b.name2 ? 1 : -1 )

        // movies.sort(function(a,b) {
        //     if(a.name2 > b.name2) {
        //         return 1;
        //     } else {
        //         return -1;
        //     }
        // return a.name2 > b.name2 ? 1 : -1; // above if else as ternary
        // })

    // If key is not "name", do the number sort. Use the dynamic property access syntax, the square bracket, with **sortKey**, which is either "year" or "mins":
    } else {
        movies.sort((a,b) => a[sortKey] - b[sortKey])
    }

    // If the Duration checkbox is checked, reverse the sort:
    if(descCB.checked) movies.reverse();

    renderMovies(); // call function
}

