const apiKey = '16976e24285718de9cf53cefd970a182';
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
  .then(response => response.json())
  .then(movie => {
    displayMovieDetails(movie)

    fetchMovieTrailer(movieId,apiKey);
  
  })
  .catch (error => console.error("Error fetching movie details:", error));


  function displayMovieDetails(movie){
    
    document.title = movie.title;
    
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    document.getElementById('movie-synopsis').textContent = movie.overview;
    document.getElementById('movie-rating').textContent = movie.vote_average.toFixed(2);
  }


  function fetchMovieTrailer (movieId, apiKey){

    const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`


    fetch(trailerUrl)
    .then(response => response.json())
    .then(data =>{

      const trailerContainer = document.getElementById('movie-trailer');

      if (data.results.length > 0){

        const trailer = data.results.find(trailer => trailer.name.toLowerCase().includes("trailer"));
        const trailerKey = trailer.key;
        const iframe = document.createElement('iframe');

        iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
       
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;

        trailerContainer.appendChild(iframe);
      }else{

        trailerContainer.textContent = "Trailer Not Available"
      }
    })

    .catch(error => console.error("Error fetching trailer: ", error));
  }
