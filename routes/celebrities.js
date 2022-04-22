const express = require('express');
const { redirect } = require('express/lib/response');
const celebritiesRouter = express.Router();

// Handle GET request for website root
const Celebrity = require('./../models/celebrity');

celebritiesRouter.get('/', (req, res, next) => {
  res.render('index');
});

celebritiesRouter.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      //Sending error to the catch all error handler
      next(error);
    });
});

celebritiesRouter.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/create');
}); //needs to be before /celebrities/:id or there will be a conflict

celebritiesRouter.get('/celebrities/:id', (req, res, next) => {
  console.log('Single celebrity was created');
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/show', { celebrity });
    })
    .catch((error) => {
      //Sending error to the catch all error handler
      next(error);
    });
});

celebritiesRouter.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      res.render('/celebrities/create');
    });
});

celebritiesRouter.post('/celebrities/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = celebritiesRouter;
