const express = require("express")
const app = express()
const port = 4000

let Movies = [
    {
        id: 1,
        name: "Thor",
        directed_by: "Taika Waititi",
        produced_by: "Marvel Cinematic Universe",
        release_date: "3 Nov 2017",
        box_office: "44.93 crores",
    },
    {
        id: 2,
        name: "The end game marvel",
        directed_by: "Joe Russo",
        produced_by: "Marvel Cinematic Universe",
        release_date: "April 26, 2019",
        box_office: "$2.797 billion",
    },
]

app.use(express.json())

// Get all Moves
app.get('/movies', function (req, res) {
    res.send(Movies);
})

// Get one Movie by ID
app.get('/movies/:moviesId', (req, res) => {
    // const foundmovies = Movies.find(m => m.id === req.params.moviesId);
    let foundmovies = null;
    for (let i = 0; i < Movies.length; i++) {
        if (Movies[i].id === parseInt(req.params.moviesId)) {
            foundmovies = Movies[i];
            break;
        }
    }

    if (foundmovies) {
        res.send(foundmovies);
    } else {
        res.status(404).send('Movies not found');
    }
})

//Add new movies
app.post("/new_movies", (req, res) => {
    const newMovies = req.body

    newMovies.id = Math.random()
    Movies.push(newMovies)
    res.status(201).send('Test new movies')
})

// Delete one movies by id
app.delete('/movies_delete/:id', (req, res) => {
    // const foundMoviesIndex = Movies.findIndex(m => m.id.toString() === req.params.id)
    const movieIdToDelete = req.params.id;
    let movieIndexToDelete = -1;

    for (let i = 0; i < Movies.length; i++) {
        if (Movies[i].id.toString() === movieIdToDelete) {
            movieIndexToDelete = i;
            break;
        }
    }

    if (movieIndexToDelete !== -1) {
        const updatedMovies = [];
        for (let i = 0; i < Movies.length; i++) {
            if (i !== movieIndexToDelete) {
                updatedMovies.push(Movies[i]);
            }
        }
        Movies = updatedMovies;
        res.send('Movie deleted successfully.');
    } else {
        res.status(404).send('Movie not found.');
    }
})

// update the particular movies list
app.patch('/movies-patch/:id', (req, res) => {
    const data = req.body

    let foundMoviesIndex = -1

    for (let i = 0; i < Movies.length; i++) {
        if (Movies[i].id.toString() === req.params.id) {
            foundMoviesIndex = i;
            break;
        }
    }
    if (foundMoviesIndex > -1) {
        const oldMovies = Movies[foundMoviesIndex]
        Movies[foundMoviesIndex] = {
            ...oldMovies,
            ...data
        }
        res.send('updated')
    } else {
        res.status(404).send('not found')
    }
})

// put method for updating all movies by list
app.put('/movies-put/:id', (req, res) => {
    const data = req.body

    let foundMoviesIndex = -1

    for (let i = 0; i < Movies.length; i++) {
        if (Movies[i].id.toString() === req.params.id) {
            foundMoviesIndex = i;
            break;
        }
    }
    if (foundMoviesIndex !== -1) {

        Movies[foundMoviesIndex] = {
            id: Movies[foundMoviesIndex].id,
            ...data
        }
        res.send('updated movies')
    } else {
        res.status(404).send('not found')
    }
})


app.listen(port, () => {
    console.log(`listening on ${port}`)
})