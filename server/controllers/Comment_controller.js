function postComment(req, res) {
  const db = req.app.get("db");
  // console.log("POST COMMENT:", req.body, req.params);
  if (req.body.comment === "") {
    res.status(400).send("Please add comment");
  }
  db.post_comment([+req.params.userId, req.body.postId, req.body.newComment])
    .then(response => res.status(200).send(response))
    .catch(err => console.log("ERROR IN CONTROLLER", err));
}

module.exports = {
  postComment
};
