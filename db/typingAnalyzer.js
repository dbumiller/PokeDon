var typeChart = {
  top: ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'],
  bug: [1, 2, 1, 1, .5, .5, .5, .5, .5, 2, 1, 1, 1, .5, 2, 1, .5, 1],
  dark: [1, .5, 1, 1, .5, .5, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1],
  dragon: [1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, .5, 1],
  electric: [1, 1, .5, .5, 1, 1, 1, 2, 1, .5, 0, 1, 1, 1, 1, 1, 1, 2],
  fairy: [1, 2, 2, 1, 1, 2, .5, 1, 1, 1, 1, 1, 1, .5, 1, 1, .5, 1],
  fighting: [.5, 2, 1, 1, .5, 1, 1, .5, 0, 1, 1, 2, 2, .5, .5, 2, 2, 1],
  fire: [2, 1, .5, 1, 1, 1, .5, 1, 1, 2, 1, 2, 1, 1, 1, .5, 2, .5],
  flying: [2, 1, 1, .5, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, .5, .5, 1],
  ghost: [1, .5, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 2, 1, 1, 1],
  grass: [.5, 1, .5, 1, 1, 1, .5, .5, 1, .5, 2, 1, 1, .5, 1, 2, .5, 2],
  ground: [.5, 1, 1, 2, 1, 1, 2, 0, 1, .5, 1, 1, 1, 2, 1, 2, 2, 1],
  ice: [1, 1, 2, 1, 1, 1, .5, 2, 1, 2, 2, .5, 1, 1, 1, 1, .5, .5],
  normal: [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, .5, .5, 1],
  poison: [1, 1, 1, 1, 2, 1, 1, 1, .5, 2, .5, 1, 1, .5, 1, .5, 0, 1],
  psychic: [1, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, .5, 1, .5, 1],
  rock: [2, 1, 1, 1, 1, .5, 2, 2, 1, 1, .5, 2, 1, 1, 1, 1, .5, 1],
  steel: [1, 1, 1, .5, 2, 1, .5, 1, 1, 1, 1, 2, 1, 1, 1, 2, .5, .5],
  water: [1, 1, .5, 1, 1, 1, 2, 1, 1, .5, 2, 1, 1, 1, 1, 2, 1, .5]
};


var names = ['Snorlax', 'Charizard', 'Venusaur', 'Blastoise', 'Sylveon', 'Haxorus', 'Copperajah', 'Krookodile', 'Machamp', 'Scyther'];
var typings = [['normal'], ['fire', 'flying'], ['grass', 'poison'], ['water'], ['fairy'], ['dragon'], ['steel'], ['dark', 'ground'], ['fighting'], ['bug', 'flying']];


var name = 'Snorlax';
var typing = ['normal'];

var metagame = [];

for (var l = 0; l < names.length; l++) {
  var currentObj = {};
  currentObj.name = names[l];
  currentObj.typing = typings[l];
  currentObj.offensiveEffectiveness = {};
  currentObj.defensiveEffectiveness = {};
  currentObj.offensiveSE = [];
  currentObj.offensiveNVE = [];
  currentObj.defensiveResist = [];
  currentObj.defensiveWeak = [];
  metagame.push(currentObj);
}




var calculator = function(pokemon) {
  var current;
  for (var i = 0; i < typeChart['top'].length; i++) {
    current = typeChart['top'][i];
    offensiveEffectiveness[current] = 1;
    defensiveEffectiveness[current] = 1;
  }

  for (var j = 0; j < typing.length; j++) {
    var currentTyping = typing[j];
    var currentTarget;

    for (k = 0; k <= typeChart.top.length; k++) {
      currentTarget = typeChart.top[k];

      if (currentTarget === currentTyping) {
        for (key in typeChart) {
          if (key !== 'top') {
            defensiveEffectiveness[key] *= typeChart[key][k];

            if (j === typing.length - 1) {
              if (defensiveEffectiveness[key] > 1) {
                defensiveWeak.push(key);
              } else if (defensiveEffectiveness[key] <= .5) {
                defensiveResist.push(key);
              }
              /* else if (defensiveEffectiveness[key] < .5) {
                defensiveResist.push(key.toUpperCase());
              }
              */
            }
          }
        }
      }

      if (typeChart[currentTyping][k] === 2) {
        offensiveEffectiveness[currentTarget] += 1;
      } else if (typeChart[currentTyping][k] <= .5) {
        offensiveEffectiveness[currentTarget] -= .5;
      }

      if (j === typing.length - 1) {
        if (offensiveEffectiveness[currentTarget] > 1) {
          offensiveSE.push(currentTarget);
        } else if (offensiveEffectiveness[currentTarget] === .5) {
          offensiveNVE.push(currentTarget);
        } else if (offensiveEffectiveness[currentTarget] === 0) {
          offensiveNVE.push(currentTarget.toUpperCase());
        }
      }
    }
  }

  console.log(name + ' is super effective against ' + offensiveSE.join(', '));
  console.log(name + ' is not very effective against ' + offensiveNVE.join(', '));
  console.log(name + ' is resistant to ' + defensiveResist.join(', '));
  console.log(name + ' is weak to ' + defensiveWeak.join(', '));
}