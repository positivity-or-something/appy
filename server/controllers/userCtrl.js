function getUsers(req, res){
  const db = req.app.get('db')
  console.log('HIT CONTROLLER')
  db.get_users().then(response => console.log("RESPONSE FROM DB", response) || res.status(200)
  .send(response)).catch(err => console.log("ERROR IN CONTROLLER" , err))
}

function getUser(req, res){
  const db = req.app.get('db')
  if(req.body.email && req.body.firstName){
    db.register_user([req.body.userName, req.body.passWord, req.body.firstName, req.body.email, req.body.photoUrl])
    .then(response => res.status(200).send(response)).catch(err => console.log(err))
  } else {db.get_user(req.body.userName).then(response => res.status(200).send(response)).catch(err => console.log(err))
  }
}

module.exports = {
  getUsers,
  getUser
}