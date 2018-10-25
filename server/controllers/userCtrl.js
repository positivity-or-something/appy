function getUsers(req, res) {
  const db = req.app.get("db");
  db.get_users()
    .then(response =>
      res.status(200).send(response)
    )
    .catch(err => console.log("ERROR IN CONTROLLER", err));
}

function getUser(req, res) {
  const db = req.app.get("db");
  if (req.body.email !== "Email" || req.body.firstName !== "First Name") {
    db.register_user([
      req.body.userName,
      req.body.passWord,
      req.body.firstName,
      req.body.email,
      req.body.photoUrl,
      req.body.interests
    ])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  } else {
    db.get_user(req.body.userName)
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  }
}

function getUserById(req, res){
  const db = req.app.get("db")
  db.get_user_by_id(req.body.id)
  .then(response => res.status(200).send(response))
  .catch(err => console.log(err))
}

module.exports = {
  getUsers,
  getUser,
  getUserById
};
