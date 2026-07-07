const db = require('./index.js');

// Creates a variable 'teams' that contains API calls for teams
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
  // Assigns a pokemon to a team
  choosePokemon: (pokeId, id) => {
    if (isNaN(pokeId)) {
      return db.Pokemon.update({teamId: id}, {
        where: {
          name: pokeId
        }
      });
    } else {
      return db.Pokemon.update({teamId: id}, {
        where: {
          id: pokeId
        }
      });
    }

  },
  getRoster: (id) => {
    return db.Pokemon.findAll({

      where: {
        teamId: id
      }
    });
  },
  getAll: () => {
    return db.Pokemon.findAll();
  },
  // Causes a pokemon to no longer show up in the choose pokemon page
  lock: (name) => {
    return db.Pokemon.update({locked: true}, {
      where: {
        name: name
      }
    });
  },
  // Causes a previously unavailable pokemon to show up in the choose pokemon page
  unlock: (name) => {
    return db.Pokemon.update({locked: false}, {
      where: {
        name: name
      }
    });
  }
}

module.exports = {
  teams: teams,
  pokemon: pokemon
};