const db = require('./index.js');
const metagame = require('./typingAnalyzer');

const seed = () => {
  for (var i = 0; i < metagame.length; i++) {
    db.Pokemon.create(metagame[i]);
  }

  var typing = {
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
  }

  var teams = ["New Bark Town Knights", "Vermillion City Veterans", "Viridian Forest Caterpie Carnage"];

  for (var i = 0; i < teams.length; i++) {
    var current = {
      name: teams[i],
      defense: typing
    };
    db.Team.create(current);
  }
}

seed();