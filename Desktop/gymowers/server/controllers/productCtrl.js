function getAllMowers(req, res){
  const db = req.app.get('db')
  db.get_all_mowers().then(response => res.status(200).send(response))
  .catch(err => res.status(500)
  .send(err => console.log('something went wrong', err)))
}
function getAllBlades(req, res){
  const db = req.app.get('db')
  db.get_all_blades().then(response => res.status(200).send(response))
  .catch(err => res.status(500)
  .send(err => console.log('something went wrong', err)))
}


module.exports = {
  getAllMowers,
  getAllBlades
}