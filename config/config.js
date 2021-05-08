const getOMDBURL = (IMDB_ID) => {
    return `https://www.omdbapi.com/?i=${IMDB_ID}&apikey=a8ef1841`
}

module.exports = {
    getOMDBURL
}