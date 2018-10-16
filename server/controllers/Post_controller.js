function post(req, res){
  const db = req.app.get("db")
  db.add_post([req.body.id, req.body.subject, req.body.postBody, req.body.timeStamp, req.body.category])
  .then(response => res.status(200).send(response))
  .catch(err => console.log(err))
}

module.exports = {
  post
}