function post(req, res) {
  const db = req.app.get("db");
  db.add_post([
    req.body.id,
    req.body.subject,
    req.body.postBody,
    req.body.timeStamp,
    req.body.category
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
  console.log("HIT CONTROLLER");
  db.get_All_Post()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(err));
}
<<<<<<< HEAD
module.exports = {
  post,
  getPost,
  getContent
};
=======

function upVote(req, res){
  console.log('HIT UPVOTE CTRL METHOD', req.body)
  const db = req.app.get('db')
  db.upvote([parseInt(req.params.id, 10), req.body.userId])
  .then(res => console.log('UPVOTE:', res) || res.sendStatus(200))
  .catch((err) => console.log(err) || db.update_vote([parseInt(req.params.id, 10), req.body.userId, 1, 0])
  .then(response => res.sendStatus(200))
  .catch(error => console.log(error)))
}

function downVote(req, res){
  const db = req.app.get('db')
  db.downvote([parseInt(req.params.id, 10), req.body.userId])
  .then(res => console.log('DOWNVOTE:', res) || res.sendStatus(200))
  .catch((err) => console.log(err) || db.update_vote([parseInt(req.params.id, 10), req.body.userId, 0, 1])
  .then(response => res.sendStatus(200))
  .catch(error => console.log(error)))
}

module.exports = {
  post,
  getPost,
  upVote,
  downVote
}
>>>>>>> master
