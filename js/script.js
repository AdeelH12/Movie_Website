const apiKey = '16976e24285718de9cf53cefd970a182';

// this below fetch method, displays the movies on the home page. 
fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => {
        console.log(data);  
        displayMovies(data.results);
    })
    .catch(error => {
        console.error('Error fetching movies:', error);
    });


// this function is used when we want to search for a movie using the search bar.
function getData() {

    const query = document.getElementById('movie_name').value;
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayMovies(data.results);
        })
        .catch(error => {
            console.error('Error:', error);
        })




}

// release date was initially set like this 2024 - 10 - 22 but I wanted it to display like 22-10-2024
function formatReleaseDate(dateString) {
    const date = new Date(dateString); // Convert the string to a Date object
    const day = String(date.getDate()).padStart(2, '0'); // Get the day, ensuring two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (month is 0-indexed)
    const year = date.getFullYear(); // Get the full year

    return `${day} - ${month} - ${year}`; // Return the formatted date string
}


// Function to display the movies in the grid

function displayMovies(movies) {
    const movieGrid = document.getElementById('movie_grid');

    // Clear the grid before adding new content
    movieGrid.innerHTML = '';

    // Iterate over the movie results and create elements

    movies.forEach(movie => {
        // Create a container for each movie
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const movieLink = document.createElement('a');
        movieLink.href = `movie.html?id=${movie.id}`;

        // Add the poster image
        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Ensure poster_path exists
        moviePoster.alt = movie.title;

        movieLink.appendChild(moviePoster);

        // Add the movie title
        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;

        //release date

        const releaseDate = document.createElement('h4');
        releaseDate.textContent = formatReleaseDate(movie.release_date);

        // Append the poster and title to the movie element

        movieElement.appendChild(movieLink);
        movieElement.appendChild(movieTitle);
        movieElement.appendChild(releaseDate);

        // Append the movie element to the grid
        movieGrid.appendChild(movieElement);
    });
}


//function below is for the nav bar, so the movies will update based on what the user clicks.
function fetchAndDisplayMovies(endpoint) {

    const url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}&language=en-US&page=1`

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.results) {

                displayMovies(data.results)

            } else {

                console.error("No movies found: ", data);
            }
        })

        .catch(error => {

            console.error('Error fetching movies:', error);
        });
}

document.getElementById('popular-movies').addEventListener('click', (e) => {

    e.preventDefault(); // Prevents page from reloading
    fetchAndDisplayMovies('popular');

    document.getElementById('heading').innerHTML = "Popular";
});

document.getElementById('now-playing').addEventListener('click', (e) => {

    e.preventDefault(); // Prevents page from reloading
    fetchAndDisplayMovies('now_playing');

    document.getElementById('heading').innerHTML = "Now Playing";
});

document.getElementById('upcoming-movies').addEventListener('click', (e) => {

    e.preventDefault(); // Prevents page from reloading
    fetchAndDisplayMovies('upcoming');

    document.getElementById('heading').innerHTML = "Upcoming";
});

document.getElementById('top-rated').addEventListener('click', (e) => {

    e.preventDefault(); // Prevents page from reloading
    fetchAndDisplayMovies('top_rated');

    document.getElementById('heading').innerHTML = "Top Rated";
});



// This is for the input field, so when you press enter on the keyboard the search will be carried out. 
document.getElementById('movie_name').addEventListener('keypress', function (event) {

    if (event.key === 'Enter') {

        event.preventDefault();
        getData();
    }
})