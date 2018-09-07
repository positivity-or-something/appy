require('dotenv').config()
const express = require('express')
const {json} = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const passport = require('passport');
const strategy = require('./strategy')
const port = 3001;
const {getAllMowers, getAllBlades} = require('./controllers/productCtrl')

const app = express()
app.use(json())


massive(process.env.CONNECTION_STRING)
.then(db => {app.set('db', db)})
.catch(err => console.log(err))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use( passport.initialize() );
app.use( passport.session() );
passport.use(strategy)

passport.serializeUser((profile, done) => {
  const db = app.get('db');
  db.get_user_by_authid(profile.id).then(user => {
    if (!user[0]) {
      db.add_user_by_authid(profile.id, profile.displayName)
        .then(response => {
          return done(null, response[0]);
        })
        .catch(err => console.log(err));
    } else {
      return done(null, user[0]);
    }
  });
});


passport.deserializeUser((user, done) => {
  done(null, user);
});


app.use((req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  next();
});



app.get('/api/mowers', getAllMowers)
app.get('/api/blades', getAllBlades)

app.listen(port, ()=> console.log(`listening on port ${port}`))

