const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');

const indexRoutes = require('./routes/index');
const dashboardRoutes = require('./routes/dashboard');

app.set('port', process.env.PORT || 3000);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(flash());
app.use(methodOverride('_method'));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

// MongoDB Configuration
const mongoURI =
  process.env.MONGODB_URI ||
  'mongodb+srv://timeskip:timeskip@cluster0.ykk77.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Passport CONFIGURATION
// app.use(
//   require('express-session')({
//     secret: 'The quick brown fox jumps over the lazy dog',
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function (req, res, next) {
//   res.locals.currentUser = req.user;
//   res.locals.error = req.flash('error');
//   res.locals.success = req.flash('success');
//   next();
// });

app.use(indexRoutes);
app.use('/dashboard', dashboardRoutes);

let port = app.get('port');

app.listen(port, function () {
  console.log('Timeskip running on port', port);
});
