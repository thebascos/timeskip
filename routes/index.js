const express = require('express');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');

router.get('/', function (req, res) {
  if (req.user) {
    // if user is logged in
    // redirect to dashboard
    res.redirect('/dashboard');
  } else {
    // if user is not logged in
    // render login page
    res.render('login');
  }
});

router.post('/signup', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: req.body.username }, function (_err, user) {
    if (user) {
      res.redirect('/');
    } else {
      const userData = { username: username };
      const newUser = new User(userData);

      User.register(newUser, password, function (err, _user) {
        if (err) {
          res.redirect('/');
        } else {
          const authenticateFunction = passport.authenticate('local');
          authenticateFunction(req, res, function () {
            res.redirect('/dashboard');
          });
        }
      });
    }
  });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
  }),
  function (_req, _res) {}
);

router.post('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
