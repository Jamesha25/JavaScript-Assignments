const movies = [];

function favouriteMovie(operation, movie) {
    // Write your code here
    switch(movie){
        case undefined:
            movies.pop()
            return movies

        default: 
            movies.push(movie);
            return movies
    }
}

module.exports = favouriteMovie;
