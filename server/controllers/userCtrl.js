function getUsers(req, res){
  const db = req.app.get('db')
  db.get_users().then(response => console.log("RESPONSE FROM DB", response) || res.status(200)
  .send(response)).catch(err => console.log("ERROR IN CONTROLLER" , err))
}

module.exports = {
  getUsers
}