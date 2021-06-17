const db = require('./index.js');

const teams = {
  get: () => {
    return db.Team.findAll();
  },
  post: (newTeam) => {
    newTeam.defense = {
      'bug': 0,
      'dark': 0,
      'dragon': 0,
      'electric': 0,
      'fairy': 0,
      'fighting': 0,
      'fire': 0,
      'flying': 0,
      'ghost': 0,
      'grass': 0,
      'ground': 0,
      'ice': 0,
      'normal': 0,
      'poison': 0,
      'psychic': 0,
      'rock': 0,
      'steel': 0,
      'water': 0
    };
    return db.Team.create(newTeam);
  }
}

const pokemon = {

}

module.exports = {
  teams: teams,
  pokemon: pokemon
};