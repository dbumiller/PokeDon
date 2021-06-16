const db = require('./index.js');

const teams = {
  get: () => {
    return db.Team.findAll();
  },
  post: (newTeam) => {
    return db.Team.create(newTeam);
  }
}

const pokemon = {

}

module.exports = {
  teams: teams,
  pokemon: pokemon
};