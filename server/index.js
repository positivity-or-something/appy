require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const cors = require("cors");
const session = require("express-session");
const app = express();
const { getUsers, getUser, getUserById } = require("./controllers/userCtrl");
const {
  post,
  getPost,
  upVote,
  downVote,
  getContent,
  deletePost,
  findWords
} = require("./controllers/Post_controller");
const { postComment, getComments } = require('./controllers/Comment_controller')

app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => console.log("Massive", err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  })
);

//-------------------USER-----------------------------
app.get("/api/users", getUsers);
app.post(`/api/user`, getUser);
app.post("/api/getuser", getUserById);
//-------------------POSTING ENDPOINTS------------------------
app.post("/api/post", post);
app.get("/api/post/:id", getPost);
app.delete("/api/deletepost/:id", deletePost);
//----------------------Content-----------------------
app.get("/api/content", getContent);
app.post("/api/upvote/:id", upVote);
app.post("/api/downvote/:id", downVote);
app.post("/api/upvote/:id", upVote);
app.post("/api/downvote/:id", downVote);
//----------------------Comment-----------------------
app.post('/api/comment', postComment)
app.get('/api/comments/:id', getComments)
//---------------------SEARCH------------------------
app.post("/api/words", findWords);



app.listen(process.env.SERVER_PORT, () =>
  console.log(`listening on port ${process.env.SERVER_PORT}`)
);
