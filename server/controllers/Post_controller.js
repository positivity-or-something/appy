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
module.exports = {
  post,
  getPost,
  getContent
};
