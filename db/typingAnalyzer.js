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







var calculator = function(pokemon) {
  var current;
  for (var i = 0; i < typeChart['top'].length; i++) {
    current = typeChart['top'][i];
    pokemon.offensiveEffectiveness[current] = 1;
    pokemon.defensiveEffectiveness[current] = 1;
  }

  for (var j = 0; j < pokemon.typing.length; j++) {
    var currentTyping = pokemon.typing[j];
    var currentTarget;

    for (k = 0; k <= typeChart.top.length; k++) {
      currentTarget = typeChart.top[k];

      if (currentTarget === currentTyping) {
        for (key in typeChart) {
          if (key !== 'top') {
            pokemon.defensiveEffectiveness[key] *= typeChart[key][k];

            if (j === pokemon.typing.length - 1) {
              if (pokemon.defensiveEffectiveness[key] > 1) {
                pokemon.defensiveWeak.push(key);
              } else if (pokemon.defensiveEffectiveness[key] <= .5) {
                pokemon.defensiveResist.push(key);
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
        pokemon.offensiveEffectiveness[currentTarget] += 1;
      } else if (typeChart[currentTyping][k] <= .5) {
        pokemon.offensiveEffectiveness[currentTarget] -= .5;
      }

      if (j === pokemon.typing.length - 1) {
        if (pokemon.offensiveEffectiveness[currentTarget] > 1) {
          pokemon.offensiveSE.push(currentTarget);
        } else if (pokemon.offensiveEffectiveness[currentTarget] === .5) {
          pokemon.offensiveNVE.push(currentTarget);
        } else if (pokemon.offensiveEffectiveness[currentTarget] === 0) {
          pokemon.offensiveNVE.push(currentTarget.toUpperCase());
        }
      }
    }
  }
}


var names = ['Tauros', 'Charizard', 'Venusaur', 'Blastoise', 'Sylveon', 'Haxorus', 'Copperajah', 'Krookodile', 'Machamp', 'Scyther', 'Gigalith', 'Rotom-W', 'Metagross', 'Ninetales-A', 'Torkoal', 'Nidoqueen', 'Slowking', 'Vanilluxe', 'Umbreon', 'Sandaconda', 'Espeon', 'Tangrowth', 'Raikou', 'Pinsir', 'Tornadus', 'Muk', 'Dusclops', 'Pangoro', 'Heliolisk', 'Swampert', 'Heracross', 'Dragalge', 'Kingdra', 'Hatterene', 'Chandelure', 'Klefki'];
var typings = [['normal'], ['fire', 'flying'], ['grass', 'poison'], ['water'], ['fairy'], ['dragon'], ['steel'], ['dark', 'ground'], ['fighting'], ['bug', 'flying'], ['rock'], ['electric', 'water'], ['steel', 'psychic'], ['ice', 'fairy'], ['fire'], ['ground', 'poison'], ['water', 'psychic'], ['ice'], ['dark'], ['ground'], ['psychic'], ['grass'], ['electric'], ['bug'], ['flying'], ['poison'], ['ghost'], ['dark', 'fighting'], ['electric', 'normal'], ['water', 'ground'], ['bug', 'fighting'], ['dragon', 'poison'], ['water', 'dragon'], ['fairy', 'psychic'], ['ghost', 'fire'], ['steel', 'fairy']];



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
  currentObj.offensiveSynergy = [];
  calculator(currentObj);
  metagame.push(currentObj);
}


for (var m = 0; m < metagame.length; m++) {
  for (var n = 0; n < metagame.length; n++) {
    if (m !== n) {
      var sameType = false;
      for (var q = 0; q < metagame[m].typing.length; q++) {
        for (var r = 0; r < metagame[n].typing.length; r++) {
          if (metagame[m].typing[q] === metagame[n].typing[r]) {
            sameType = true;
          }
        }
      }
      if (!sameType) {
        var countNVE = 0;
        for (var o = 0; o < metagame[m].offensiveNVE.length; o++) {
          for (var p = 0; p < metagame[n].offensiveNVE.length; p++) {
            if (metagame[m].offensiveNVE[o] === metagame[n].offensiveNVE[p]) {
              countNVE++;
            } else if (metagame[m].offensiveNVE[o].toLowerCase() === metagame[n].offensiveNVE[p].toLowerCase()) {
              countNVE += 2;
            }
          }
        }

        var averageNVE = (countNVE / metagame[m].offensiveNVE.length) + (countNVE / metagame[n].offensiveNVE.length);
        averageNVE /= 2;
        averageNVE = averageNVE.toFixed(2);
        metagame[m].offensiveSynergy.push([averageNVE, metagame[n].name, metagame[n].typing]);
      }
    }
  }

  metagame[m].offensiveSynergy.sort(function(a, b) {
    if (a > b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
}

var monoTypeCount = 0;
var dualTypeCount = 0;
for (var s = 0; s < metagame.length; s++) {
  var currentTopSynergy = metagame[s].offensiveSynergy.slice(0, 5);
  for (var t = 0; t < 5; t++) {
    if (currentTopSynergy[t][2].length === 1) {
      monoTypeCount++;
    } else {
      dualTypeCount++;
    }
  }
}

console.log('mono type count: ' + monoTypeCount + '\ndual type count: ' + dualTypeCount);
//console.log('Tauros offensive synergy: \n', metagame[0].offensiveSynergy);