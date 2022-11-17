import fetch from "node-fetch"
async function getDirectors(){
    return await fetch('https://dhekumar.github.io/asynchronous-javascript/directors.json')
            .then(res=>res.json())
}

async function getIDByDirectorName(directorName){
    let directors = await getDirectors();
    for (var element of directors){
        if(element.name === directorName){
           return element.id
        }
    }
}

async function getMoviesByDirectorName(directorName){
    let id = await getIDByDirectorName(directorName)
    return await fetch(`https://dhekumar.github.io/asynchronous-javascript/directors/${id}/movies.json`)
    .then(res=>res.json())
}

async function getReviewsByMovieID(movieID){
    return await fetch(`https://dhekumar.github.io/asynchronous-javascript/movies/${movieID}/reviews.json`)
    .then(res=>res.json())
}

async function calculateRatingByMovieID(movieID){
    let reviews= await getReviewsByMovieID(movieID);
    let ratings=0;
    for(var review of reviews){
        ratings=ratings+review.rating
    }
    return ratings;
}

async function bestMovieByDirectorName(directorName){
    var highestRating =0
    var bestMovie
    let movies = await getMoviesByDirectorName(directorName)
    for(var movie of movies){
        let rating = await calculateRatingByMovieID(movie.id)
        if (rating>highestRating){
            highestRating=rating
            bestMovie=movie.title
        }
    }
    return bestMovie
}

let bestMovie = await bestMovieByDirectorName('Stanley Kubrick')
console.log('Best Movie By Stanley Kubrick is: '+ '"'+bestMovie+'"')

