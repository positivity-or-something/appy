function post(req, res) {
  const db = req.app.get("db");
  db.add_post([
    req.body.id,
    req.body.subject,
    req.body.postBody,
    req.body.timeStamp,
    req.body.category,
    req.body.image,
    req.body.interest
  ])
    .then(response => res.status(200).send(response))
    .catch(err => console.log(err));
}

function getPost(req, res) {
  let comments = [];
  const db = req.app.get("db");
  db.get_comments(parseInt(req.params.id, 10))
    .then(resp => (comments = resp))
    .then(() => db.get_post(parseInt(req.params.id, 10)))
    .then(response =>
      res.status(200).send({ post: response, comments: comments })
    )
    .catch(err => console.log(err) || res.status(500));
}

function getContent(req, res) {
  const db = req.app.get("db");
  db.get_All_Post()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => console.log(err));
}

function upVote(req, res) {
  const db = req.app.get("db");
  db.upvote([parseInt(req.params.id, 10), req.body.userId])
    .then(res => res.sendStatus(200))
    .catch(
      err =>
        console.log(err) ||
        db
          .update_vote([parseInt(req.params.id, 10), req.body.userId, 1, 0])
          .then(response => res.sendStatus(200))
          .catch(error => console.log(error))
    );
}

function downVote(req, res) {
  const db = req.app.get("db");
  db.downvote([parseInt(req.params.id, 10), req.body.userId])
    .then(res => res.sendStatus(200))
    .catch(
      err =>
        console.log(err) ||
        db
          .update_vote([parseInt(req.params.id, 10), req.body.userId, 0, 1])
          .then(response => res.Status(200).send(response))
          .catch(error => console.log(error))
    );
}

function deletePost(req, res) {
  const db = req.app.get("db");
  db.delete_post(parseInt(req.params.id, 10))
    .then(response => res.status(200).send(response))
    .catch(err => console.log(err));
}

function findWords(req, res) {
  console.log("HERE LIES REQ.BODY", req.body);
  const db = req.app.get("db");
  let { text } = req.body;
  if (text.includes("#")) {
    text = text.slice(1);
  }

  db.search_post([text])
    .then(response => {
      console.log("HERE IS FIND WORDS", response);
      res.status(200).send(response);
    })
    .catch(err => console.log(err));
}

module.exports = {
  post,
  getPost,
  upVote,
  downVote,
  getContent,
  deletePost,
  findWords
};
