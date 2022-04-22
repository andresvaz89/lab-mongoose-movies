const express = require('express');
const { redirect } = require('express/lib/response');
const moviesRouter = express.Router();

// Handle GET request for website root
const Movie = require('./../models/movie');

moviesRouter.get('/', (req, res, next) => {
  res.render('index');
});

moviesRouter.get('/movies', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render('movies/index', { movies });
    })
    .catch((error) => {
      //Sending error to the catch all error handler
      next(error);
    });
});

moviesRouter.get('/movies/create', (req, res, next) => {
  res.render('movies/create');
}); //needs to be before /movies/:id or there will be a conflict

moviesRouter.get('/movies/:id', (req, res, next) => {
  console.log('Single movie was created');
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      res.render('movies/show', { movie });
    })
    .catch((error) => {
      //Sending error to the catch all error handler
      next(error);
    });
});

moviesRouter.post('/movies', (req, res, next) => {
  const { title, genre, plot } = req.body;
  Movie.create({ title, genre, plot })
    .then((movie) => {
      res.redirect('/movies');
    })
    .catch((error) => {
      res.render('/movies/create');
    });
});

moviesRouter.post('/movies/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = moviesRouter;
