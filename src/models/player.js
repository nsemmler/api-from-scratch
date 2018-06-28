const players = require('../../data/players')
const fs = require('fs')
const uuid = require('uuid/v4')

function getAll () {
  return players.roster
}

function getOne (id) {
  return players.roster.filter(player => player.id === id)
}

function create (name, position, nationality, number) {
  const player = { id: uuid().slice(0, 8), name, position, nationality, number }

  const playersFile = fs.readFileSync('./data/players.json')
  const team = JSON.parse(playersFile)
  team.roster.push(player)

  fs.writeFileSync('./data/players.json', JSON.stringify(team), 'utf-8')

  return player
}

function update (player, name, position, nationality, number) {
  const playersFile = fs.readFileSync('./data/players.json')
  let team = JSON.parse(playersFile)
  let updatedTeam = []

  team.roster.forEach(person => {
    if (person.id === player.id) {
      person.name = name
      person.position = position
      person.nationality = nationality
      person.number = number
    }
    updatedTeam.push(person)
  })

  team.roster = updatedTeam
  fs.writeFileSync('./data/players.json', JSON.stringify(team), 'utf-8')

  return player
}

function remove (player) {
  const playersFile = fs.readFileSync('./data/players.json')
  let team = JSON.parse(playersFile)
  let updatedTeam = []

  team.roster.forEach(person => { if (person.id !== player.id) updatedTeam.push(person) })

  team.roster = updatedTeam
  fs.writeFileSync('./data/players.json', JSON.stringify(team), 'utf-8')

  return player
}

module.exports = { getAll, getOne, create, update, remove }
