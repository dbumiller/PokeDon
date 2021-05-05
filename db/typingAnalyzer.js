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


var names = ['Tauros', 'Charizard', 'Venusaur', 'Blastoise', 'Sylveon', 'Haxorus', 'Copperajah', 'Krookodile', 'Machamp', 'Scyther', 'Gigalith', 'Rotom-W', 'Metagross', 'Ninetales-A', 'Torkoal', 'Nidoqueen', 'Slowking', 'Vanilluxe', 'Umbreon', 'Sandaconda', 'Espeon', 'Tangrowth', 'Raikou', 'Pinsir', 'Tornadus', 'Muk', 'Dusclops', 'Pangoro', 'Heliolisk', 'Swampert', 'Heracross', 'Dragalge', 'Kingdra', 'Slowking-G', 'Chandelure', 'Klefki', 'Doublade', 'Obstagoon', 'Rhyhorn'];
var typings = [['normal'], ['fire', 'flying'], ['grass', 'poison'], ['water'], ['fairy'], ['dragon'], ['steel'], ['dark', 'ground'], ['fighting'], ['bug', 'flying'], ['rock'], ['electric', 'water'], ['steel', 'psychic'], ['ice', 'fairy'], ['fire'], ['ground', 'poison'], ['water', 'psychic'], ['ice'], ['dark'], ['ground'], ['psychic'], ['grass'], ['electric'], ['bug'], ['flying'], ['poison'], ['ghost'], ['dark', 'fighting'], ['electric', 'normal'], ['water', 'ground'], ['bug', 'fighting'], ['dragon', 'poison'], ['water', 'dragon'], ['poison', 'psychic'], ['ghost', 'fire'], ['steel', 'fairy'], ['ghost', 'steel'], ['dark', 'normal'], ['rock', 'ground']];





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
  currentObj.offensiveCompliment = [];
  currentObj.defensiveSynergy = [];
  calculator(currentObj);
  metagame.push(currentObj);
}

var analyzer = function(metagame) {

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
                countNVE += 1.3;
              }
            }
          }

          var averageNVE = (countNVE / metagame[m].offensiveNVE.length) + (countNVE / metagame[n].offensiveNVE.length);
          averageNVE /= 2;
          averageNVE = averageNVE.toFixed(2);
          metagame[m].offensiveSynergy.push([averageNVE, metagame[n].name]);


          var countDefenseM = 0;
          for (var u = 0; u < metagame[m].defensiveWeak.length; u++) {
            for (var w = 0; w < metagame[n].defensiveResist.length; w++) {
              if (metagame[m].defensiveWeak[u] === metagame[n].defensiveResist[w]) {
                countDefenseM++;
              }
            }
          }
          var countDefenseN = 0;
          for (var x = 0; x < metagame[n].defensiveWeak.length; x++) {
            for (var y = 0; y < metagame[m].defensiveResist.length; y++) {
              if (metagame[n].defensiveWeak[x] === metagame[m].defensiveResist[y]) {
                countDefenseN++;
              }
            }
          }

          var averageDefense = (countDefenseM / metagame[m].defensiveWeak.length) + (countDefenseN / metagame[n].defensiveWeak.length);
          averageDefense /= 2;
          averageDefense = averageDefense.toFixed(2);
          metagame[m].defensiveSynergy.push([averageDefense, metagame[n].name]);


          var countComplimentM = 0;
          for (var z = 0; z < metagame[m].offensiveNVE.length; z++) {
            for (var a = 0; a < metagame[n].offensiveSE.length; a++) {
              if (metagame[m].offensiveNVE[z] === metagame[n].offensiveSE[a]) {
                countComplimentM++;
              }
            }
          }

          var countComplimentN = 0;
          for (var b = 0; b < metagame[n].offensiveNVE.length; b++) {
            for (var c = 0; c < metagame[m].offensiveSE.length; c++) {
              if (metagame[n].offensiveNVE[b] === metagame[m].offensiveSE[c]) {
                countComplimentN++;
              }
            }
          }

          var averageCompliment = (countComplimentM / metagame[m].offensiveNVE.length) + (countComplimentN / metagame[n].offensiveNVE.length);
          averageCompliment /= 2;
          averageCompliment = averageCompliment.toFixed(2);
          metagame[m].offensiveCompliment.push([averageCompliment, metagame[n].name]);

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

    metagame[m].defensiveSynergy.sort(function(a, b) {
      if (a > b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });

    metagame[m].offensiveCompliment.sort(function(a, b) {
      if (a > b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });

    if (metagame[m].offensiveSynergy[0][0] >= metagame[m].defensiveSynergy[0][0] && metagame[m].offensiveSynergy[0][0] >= metagame[m].offensiveCompliment[0][0]) {
      metagame[m].comparisonMultiplier = 1 / metagame[m].offensiveSynergy[0][0];
    } else if (metagame[m].offensiveCompliment[0][0] >= metagame[m].defensiveSynergy[0][0] && metagame[m].offensiveCompliment[0][0] >= metagame[m].offensiveSynergy[0][0]) {
      metagame[m].comparisonMultiplier = 1 / metagame[m].offensiveCompliment[0][0];
    } else {
      metagame[m].comparisonMultiplier = 1 / metagame[m].defensiveSynergy[0][0];
    }
  }


}

analyzer(metagame);

// var monoTypeCount = 0;
// var dualTypeCount = 0;
// for (var s = 0; s < metagame.length; s++) {
//   var currentTopSynergy = metagame[s].defensiveSynergy.slice(0, 5);
//   for (var t = 0; t < 5; t++) {
//     if (currentTopSynergy[t][2].length === 1) {
//       monoTypeCount++;
//     } else {
//       dualTypeCount++;
//     }
//   }
// }
// console.log('mono type count: ' + monoTypeCount + '\ndual type count: ' + dualTypeCount);

// console.log('Krookodile offensive synergy: \n', metagame[7].offensiveSynergy.slice(0, 15));
// console.log('Krookodile defensive synergy: \n', metagame[7].defensiveSynergy.slice(0, 15));

// console.log('Doublade offensive synergy: \n', metagame[metagame.length - 2].offensiveSynergy.slice(0, 15));
// console.log('Doublade defensive synergy: \n', metagame[metagame.length - 2].defensiveSynergy.slice(0, 15));

// ['Tauros', 'Charizard', 'Venusaur', 'Blastoise', 'Sylveon', 'Haxorus', 'Copperajah', 'Krookodile', 'Machamp', 'Scyther', 'Gigalith', 'Rotom-W', 'Metagross', 'Ninetales-A', 'Torkoal', 'Nidoqueen', 'Slowking', 'Vanilluxe', 'Umbreon', 'Sandaconda', 'Espeon', 'Tangrowth', 'Raikou', 'Pinsir', 'Tornadus', 'Muk', 'Dusclops', 'Pangoro', 'Heliolisk', 'Swampert', 'Heracross', 'Dragalge', 'Kingdra', 'Slowking-G', 'Chandelure', 'Klefki', 'Doublade', 'Obstagoon', 'Rhyhorn']

// for (var i = 0; i < metagame.length; i++) {
//   if (metagame[i].name === 'Sylveon') {
//     console.log(metagame[i].name + ' offensive compliment: \n', metagame[i].offensiveCompliment.slice(0, 10));
//   }
// }

console.log(metagame[0].comparisonMultiplier);