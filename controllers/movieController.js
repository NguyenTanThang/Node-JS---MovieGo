const Movie = require("../models/Movie");
const View = require("../models/View");
const Rate = require("../models/Rate");
const {nullHandlersMany} = require("../utils/validation");
const {getOMDBMovie} = require("../requests/omdbRequest");
const ROUTE_NAME = "movie";
const A_OR_AN = "a";

const reformAllMovies = async (req, res) => {
    try {
        let movies = await Movie.find().sort([['created_date', 'ascending']]);

        /*
        for (let index = 0; index < movies.length; index++) {
            const movie = movies[index];
            const {_id} = movie;
            
            await Movie.findByIdAndUpdate(_id, {
                rating: 0
            })
        }
        */

       for (let index = 0; index < movies.length; index++) {
            const movie = movies[index];
            const {_id} = movie;
        
            await Movie.findByIdAndUpdate(_id, {
                rating: 0
            })
        }

        movies = await Movie.find().sort([['created_date', 'ascending']]);
        
        /*
        var obj = {
            movies: []
         };
        for (let index = 0; index < movies.length; index++) {
            const movie = movies[index];
            obj.movies.push(movie._doc);
        }
        var json = JSON.stringify(obj);
        var fileURL = `E:/Test Things Out/Test Movies Website (refined) (act 2)/1. Official/sever/seeders/jsonFiles/movies.json`
        var exists = fs.existsSync(fileURL);
        if (exists) {
            fs.unlinkSync(fileURL);
        }
        fs.writeFileSync(fileURL, json, 'utf8');
        */

        res.status(200).json({
            success: true,
            data: movies,
            length: movies.length,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const getRandomInArray = (arr, numberOfElements) => {
    // Shuffle array
    const shuffled = arr.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, numberOfElements);
    
    return selected;
}

const getAllMovies = async (req, res) => {
    try {
        let movies = await Movie.find();
        let views = await View.find();
        let listOfNumberOfViews = [];

        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];
            console.log(views);
            let correctViews = views.filter(viewItem => {
                return viewItem.movieID == movie._id;
            });
            listOfNumberOfViews = [
                ...listOfNumberOfViews,
                correctViews.length
            ]
            /*
            const IMDBObject = await getOMDBMovie(movie.IMDB_ID);
            await Movie.findByIdAndUpdate(movie._id, {
                IMDBObject
            });
            */
        }

        return res.json({
            status: 200,
            data: {
                movies,
                listOfNumberOfViews
            },
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Internal Server Error",
            data: null,
            success: false
        })
    }
}

const getAllMoviesForRecommendation  = async (req, res) => {
    try {
        let movies = await Movie.find();
        let views = await View.find();
        let listOfNumberOfViews = {};

        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];
            let correctViews = views.filter(viewItem => {
                return viewItem._doc.movieID == movie._id;
            });
            listOfNumberOfViews = {
                ...listOfNumberOfViews,
                [movie._id]: {
                    movie: movie,
                    numberOfViews: correctViews.length
                }
            }
            /*
            const IMDBObject = await getOMDBMovie(movie.IMDB_ID);
            await Movie.findByIdAndUpdate(movie._id, {
                IMDBObject
            });
            */
        }

        let recMoviesObject = {};
        /*
            Trending: most viewed,
            Top Rating: highest rated,
            New Release: newly added,
            Random: randomize
        */
        let trendingMovies = [];

        var sortable = [];
        for (let listOfNumberOfViewItem in listOfNumberOfViews) {
            sortable.push([listOfNumberOfViewItem, listOfNumberOfViews[listOfNumberOfViewItem]]);
        }

        sortable = sortable.sort(function(a, b) {
            return b[1].numberOfViews - a[1].numberOfViews;
        }).splice(0, 15);

        for (let i = 0; i < sortable.length; i++) {
            trendingMovies.push(sortable[i][1].movie);
        }

        let topRatingMovies = movies.sort((a, b) => b._doc.rating - a._doc.rating).splice(0, 15);
        let newReleaseMovies = movies.sort((a, b) => new Date(b._doc.created_date).getTime() - new Date(a._doc.created_date).getTime()).splice(0, 15);
        let randomMovies = getRandomInArray(movies, 15);

        recMoviesObject = {
            trendingMovies,
            topRatingMovies,
            newReleaseMovies,
            randomMovies
        }

        return res.json({
            status: 200,
            data: {
                listOfNumberOfViews,
                recMoviesObject
            },
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Internal Server Error",
            data: null,
            success: false
        })
    }
}


const getMovieByID = async (req, res) => {
    try {
        const {id} = req.params;
        let movie = await Movie.findById(id);

        if (!movie) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        let views = await View.find();

        let correctViews = views.filter(viewItem => {
            return viewItem._doc.movieID == movie._id;
        });

        const IMDBObject = await getOMDBMovie(movie.IMDB_ID);
        await Movie.findByIdAndUpdate(movie._id, {
            IMDBObject
        });
        movie = await Movie.findById(id);

        return res.json({
            status: 200,
            data: {
                movie,
                view: correctViews.length
            },
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Internal Server Error",
            data: null,
            success: false
        })
    }
}

const addMovie = async (req, res) => {
    try {
        const {
            name,
            IMDB_ID,
            genres,
            imageURL,
            streamTapeCode
        } = req.body;

        const nullChecker = nullHandlersMany([
            [name, "name cannot be null"],
            [IMDB_ID, "desc cannot be null"],
            [genres, "genres cannot be null"],
            [imageURL, "imageURL cannot be null"],
            [streamTapeCode, "streamTapeCode cannot be null"],
        ])

        if (nullChecker) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: nullChecker
            }) 
        }

        const IMDBOject = await getOMDBMovie(IMDB_ID);

        const movie = await new Movie({
            name,
            IMDB_ID,
            IMDBOject,
            genres,
            imageURL,
            streamTapeCode,
            rating: 0,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        return res.json({
            status: 200,
            data: {
                movie
            },
            success: true,
            message: `Successfully created ${A_OR_AN} ${ROUTE_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Internal Server Error",
            data: null,
            success: false
        })
    }
}

const editMovie = async (req, res) => {
    try {
        const {id} = req.params;

        const movie = await Movie.findById(id);

        if (!movie) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const {
            name,
            IMDB_ID,
            genres,
            imageURL,
            streamTapeCode
        } = req.body;

        const nullChecker = nullHandlersMany([
            [name, "name cannot be null"],
            [IMDB_ID, "desc cannot be null"],
            [genres, "genres cannot be null"],
            [imageURL, "imageURL cannot be null"],
            [streamTapeCode, "streamTapeCode cannot be null"],
        ])

        if (nullChecker) {
            return res.json({
                status: 400,
                data: null,
                success: false,
                message: nullChecker
            }) 
        }

        const IMDBOject = await getOMDBMovie(IMDB_ID);

        const updatedMovie = await Movie.findByIdAndUpdate(id, {
            name,
            IMDB_ID,
            IMDBOject,
            genres,
            imageURL,
            streamTapeCode,
            created_date: Date.now(),
            last_modified_date: Date.now()
        });

        return res.json({
            status: 200,
            data: {
                updatedMovie
            },
            success: true,
            message: `Successfully created ${A_OR_AN} ${ROUTE_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Internal Server Error",
            data: null,
            success: false
        })
    }
}

const deleteMovie = async (req, res) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);

        if (!movie) {
            return res.json({
                status: 200,
                data: null,
                success: true,
                message: "There is no record which matches the ID"
            })
        }

        const deletedMovie = await Movie.findByIdAndDelete(id);

        return res.json({
            status: 200,
            data: {
                deletedMovie
            },
            success: true,
            message: `Successfully deleted ${A_OR_AN} ${ROUTE_NAME}`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Internal Server Error",
            data: null,
            success: false
        })
    }
}

module.exports = {
    getAllMovies,
    getMovieByID,
    addMovie,
    editMovie,
    deleteMovie,
    getAllMoviesForRecommendation,
    reformAllMovies
}