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
  lock: (name) => {
    console.log('hey')
    return db.Pokemon.update({locked: true}, {
      where: {
        name: name
      }
    });
  },
  unlock: (name) => {
    console.log('you')
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