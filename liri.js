// Artist(s)

// The song's name

// A preview link of the song from Spotify

// The album that the song is from

// concert-this

// spotify-this-song

// movie-this

// do-what-it-says

// NEED 2 more case statements 

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.


require("dotenv").config();
var keys = require("./keys");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var searchTerm = process.argv.slice(3).join(" ");

var command = process.argv[2]
var axios = require("axios")

commandInput()

function commandInput(){
    switch(command){
        case "spotify-this-song":
            spotifySearch() 
            break;

        case "movie-this":
            movieSearch()
            break; 
    }
}

function movieSearch() {
    axios.get("http://www.omdbapi.com/?t="+ searchTerm +"&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log(response.data);
    console.log("\nMovietitle:", response.data.Title);


    console.log("rottentomatoes.ratings.",response.data.Ratings[1].Value);

    
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

}

function spotifySearch() {
    spotify.search({ type: 'track', query: searchTerm }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (let i = 0; i < data.tracks.items.length; i++) {

            console.log("\nArtist Name:", data.tracks.items[i].artists[0].name);

            console.log("Song Name:", data.tracks.items[i].name);

            console.log("URL Link:", data.tracks.items[i].preview_url);

            console.log("Album Name:", data.tracks.items[i].album.name);

            console.log("_____________________________________________________________________________");

        }

    })

}
