const model = require('../models/player')

function getAll (req, res, next) {
  const data = model.getAll()
  res.status(200).json({ data })
}

function getOne (req, res, next) {
  const { id }  = req.params
  if (!id) return next({ status: 400, message: `ID required` })

  const player = model.getOne(id)[0]
  if (player === undefined) return next({ status: 404, message: `No player with ID ${id}` })

  res.status(200).json({ player })
}

function create (req, res, next) {
  const { name, position, nationality, number } = req.body
  if (!name || !position || !nationality || !number) return next({ status: 400, message: `Player name, position, nationality, number are all required.` })

  const player = model.create(name, position, nationality, number)
  res.status(201).json({ player })
}

function update (req, res, next) {
  const { id } = req.params
  if (!id) return next({ status: 400, message: `ID required` })
  const { name, position, nationality, number } = req.body
  if (!name || !position || !nationality || !number) return next({ status: 400, message: `Player name, position, nationality, number are all required.` })

  let player = model.getOne(id)
  if (player === undefined) return next({ status: 404, message: `No player with ID ${id}` })

  player = model.update(player[0], name, position, nationality, number)
  res.status(200).json({ player })
}
``
function remove (req, res, next) {
  const { id } = req.params
  if (!id) return next({ status: 400, message: `ID required` })

  let player = model.getOne(id)
  if (player === undefined) return next({ status: 404, message: `No player with ID ${id}` })

  model.remove(player[0])
  res.status(204).json()
}

module.exports = { getAll, getOne, create, update, remove }
