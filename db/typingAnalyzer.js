var sampleLeague = require('../sampleLeague.json');

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
              if (!pokemon.additionalResistances) {
                if (pokemon.defensiveEffectiveness[key] > 1) {
                  pokemon.defensiveWeak.push(key);
                } else if (pokemon.defensiveEffectiveness[key] <= .5) {
                  pokemon.defensiveResist.push(key);
                }
              } else {
                for (var h = 0; h < pokemon.additionalResistances.length; h++) {
                  if (pokemon.additionalResistances[h][1] === 0 && pokemon.additionalResistances[h][0] === key)
                  pokemon.defensiveResist.push(pokemon.additionalResistances[h][0]);
                }

                if (pokemon.defensiveEffectiveness[key] > 1) {
                  var found = false;
                  for (var g = 0; g < pokemon.additionalResistances.length; g++) {
                    if (key === pokemon.additionalResistances[g][0]) {
                      found = true;
                    }
                  }
                  if (!found) {
                    pokemon.defensiveWeak.push(key);
                  }
                }

                if (pokemon.defensiveEffectiveness[key] <= .5) {
                  pokemon.defensiveResist.push(key);
                }
              }
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


var names = ['Tauros', 'Charizard', 'Venusaur', 'Blastoise', 'Sylveon', 'Haxorus', 'Copperajah', 'Krookodile', 'Machamp', 'Scyther', 'Gigalith', 'Rotom-W', 'Metagross', 'Ninetales-A', 'Torkoal', 'Nidoqueen', 'Slowking', 'Vanilluxe', 'Umbreon', 'Sandaconda', 'Espeon', 'Tangrowth', 'Raikou', 'Pinsir', 'Tornadus', 'Muk', 'Dusclops', 'Pangoro', 'Heliolisk', 'Swampert', 'Heracross', 'Dragalge', 'Kingdra', 'Slowking-G', 'Chandelure', 'Klefki', 'Doublade', 'Obstagoon', 'Rhyperior'];
var typings = [['normal'], ['fire', 'flying'], ['grass', 'poison'], ['water'], ['fairy'], ['dragon'], ['steel'], ['dark', 'ground'], ['fighting'], ['bug', 'flying'], ['rock'], ['electric', 'water'], ['steel', 'psychic'], ['ice', 'fairy'], ['fire'], ['ground', 'poison'], ['water', 'psychic'], ['ice'], ['dark'], ['ground'], ['psychic'], ['grass'], ['electric'], ['bug'], ['flying'], ['poison'], ['ghost'], ['dark', 'fighting'], ['electric', 'normal'], ['water', 'ground'], ['bug', 'fighting'], ['dragon', 'poison'], ['water', 'dragon'], ['poison', 'psychic'], ['ghost', 'fire'], ['steel', 'fairy'], ['ghost', 'steel'], ['dark', 'normal'], ['rock', 'ground']];





var metagame = [];

// for (var l = 0; l < names.length; l++) {
//   var currentObj = {};
//   currentObj.name = names[l];
//   currentObj.typing = typings[l];
//   currentObj.offensiveEffectiveness = {};
//   currentObj.defensiveEffectiveness = {};
//   currentObj.offensiveSE = [];
//   currentObj.offensiveNVE = [];
//   currentObj.defensiveResist = [];
//   currentObj.defensiveWeak = [];
//   currentObj.offensiveSynergy = [];
//   currentObj.offensiveCompliment = [];
//   currentObj.defensiveSynergy = [];
//   calculator(currentObj);
//   metagame.push(currentObj);
// }

for (key in sampleLeague) {
  var currentObj = {};
  currentObj.name = key;
  currentObj.typing = sampleLeague[key].typing;
  currentObj.additionalResistances = sampleLeague[key].additionalResistances;
  currentObj.offensiveEffectiveness = {};
  currentObj.defensiveEffectiveness = {};
  currentObj.offensiveSE = [];
  currentObj.offensiveNVE = [];
  currentObj.defensiveResist = [];
  currentObj.defensiveWeak = [];
  currentObj.offensiveSynergy = [];
  currentObj.offensiveCompliment = [];
  currentObj.defensiveSynergy = [];
  currentObj.momentumFollowup = [];
  currentObj.trSetter = sampleLeague[key].trSetter;
  currentObj.defensiveUtility = sampleLeague[key].defensiveUtility;
  currentObj.wallbreaker = sampleLeague[key].wallbreaker;
  currentObj.sweeper = sampleLeague[key].sweeper;
  currentObj.hazardControl = sampleLeague[key].hazardControl;
  currentObj.rocker = sampleLeague[key].rocker;
  currentObj.spiker = sampleLeague[key].spiker;
  currentObj.tSpiker = sampleLeague[key].tSpiker;
  currentObj.webber = sampleLeague[key].webber;
  currentObj.screener = sampleLeague[key].screener;
  currentObj.priority = sampleLeague[key].priority;
  currentObj.momentum = sampleLeague[key].momentum;
  currentObj.speedControl = sampleLeague[key].speedControl;
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
          if ((metagame[m].sweeper && metagame[n].wallbreaker) || (metagame[m].wallbreaker && metagame[n].sweeper)) {
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
          }



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

          if ((metagame[m].sweeper || metagame[m].wallbreaker) && (metagame[n].wallbreaker || metagame[n].sweeper)) {


                      var countComplimentM = 0;
                      for (var z = 0; z < metagame[m].offensiveNVE.length; z++) {
                        for (var a = 0; a < metagame[n].offensiveSE.length; a++) {
                          if (metagame[m].offensiveNVE[z] === metagame[n].offensiveSE[a]) {
                            countComplimentM++;
                          } else if (metagame[m].offensiveNVE[z].toLowerCase() === metagame[n].offensiveSE[a]) {
                            countComplimentM += 1.3;
                          }
                        }
                      }

                      var countComplimentN = 0;
                      for (var b = 0; b < metagame[n].offensiveNVE.length; b++) {
                        for (var c = 0; c < metagame[m].offensiveSE.length; c++) {
                          if (metagame[n].offensiveNVE[b] === metagame[m].offensiveSE[c]) {
                            countComplimentN++;
                          } else if (metagame[n].offensiveNVE[b].toLowerCase() === metagame[m].offensiveSE[c]) {
                            countComplimentN += 1.3;
                          }
                        }
                      }

                      var averageCompliment = (countComplimentM / metagame[m].offensiveNVE.length) + (countComplimentN / metagame[n].offensiveNVE.length);
                      averageCompliment /= 2;
                      averageCompliment = averageCompliment.toFixed(2);
                      metagame[m].offensiveCompliment.push([averageCompliment, metagame[n].name]);

          }

          if (metagame[m].momentum && (metagame[n].wallbreaker || metagame[n].sweeper)) {
            var countMomentumFollowup = 0;

            var combinedNVEDefensiveWeak = [];
            for (var b = 0; b < metagame[m].offensiveNVE.length; b++) {
              combinedNVEDefensiveWeak.push(metagame[m].offensiveNVE[b]);
            }

            for (var c = 0; c < metagame[m].defensiveWeak.length; c++) {
              var found = false;
              for (var d = 0; d < combinedNVEDefensiveWeak.length; d++) {
                if (metagame[m].defensiveWeak[c] === combinedNVEDefensiveWeak[d].toLowerCase()) {
                  found = true;
                }
              }
              if (!found) {
                combinedNVEDefensiveWeak.push(metagame[m].defensiveWeak[c]);
              }
            }

            for (var z = 0; z < combinedNVEDefensiveWeak.length; z++) {
              for (var a = 0; a < metagame[n].offensiveSE.length; a++) {
                if (combinedNVEDefensiveWeak[z] === metagame[n].offensiveSE[a]) {
                  countMomentumFollowup++;
                } else if (combinedNVEDefensiveWeak[z].toLowerCase() === metagame[n].offensiveSE[a]) {
                  countMomentumFollowup += 1.3;
                }
              }
            }

            var averageFollowup = (countMomentumFollowup / combinedNVEDefensiveWeak.length);
            averageFollowup = averageFollowup.toFixed(2);
            metagame[m].momentumFollowup.push([averageFollowup, metagame[n].name]);
          }

        }
      }
    }

    metagame[m].offensiveSynergy.sort(function(a, b) {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    });

    metagame[m].defensiveSynergy.sort(function(a, b) {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    });

    metagame[m].offensiveCompliment.sort(function(a, b) {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    });

    metagame[m].momentumFollowup.sort(function(a, b) {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    })

    metagame[m].defensiveResist = metagame[m].defensiveResist.join('||||');
    metagame[m].defensiveWeak = metagame[m].defensiveWeak.join('||||');
    metagame[m].offensiveSynergy = metagame[m].offensiveSynergy.join('||||');
    metagame[m].offensiveCompliment = metagame[m].offensiveCompliment.join('||||');
    metagame[m].momentumFollowup = metagame[m].momentumFollowup.join('||||');


    // if (metagame[m].offensiveSynergy[0][0] >= metagame[m].defensiveSynergy[0][0] && metagame[m].offensiveSynergy[0][0] >= metagame[m].offensiveCompliment[0][0]) {
    //   metagame[m].comparisonMultiplier = 1 / metagame[m].offensiveSynergy[0][0];
    // } else if (metagame[m].offensiveCompliment[0][0] >= metagame[m].defensiveSynergy[0][0] && metagame[m].offensiveCompliment[0][0] >= metagame[m].offensiveSynergy[0][0]) {
    //   metagame[m].comparisonMultiplier = 1 / metagame[m].offensiveCompliment[0][0];
    // } else {
    //   metagame[m].comparisonMultiplier = 1 / metagame[m].defensiveSynergy[0][0];
    // }

    // var currentMon;
    // metagame[m].comparisonTotalsObject = {};
    // for (var i = 0; i < metagame[m].offensiveSynergy.length; i++) {
    //   currentMon = metagame[m].offensiveSynergy[i][1];
    //   if (metagame[m].comparisonTotalsObject[currentMon] === undefined) {
    //     metagame[m].comparisonTotalsObject[currentMon] = metagame[m].offensiveSynergy[i][0] * metagame[m].comparisonMultiplier;
    //   } else {
    //     metagame[m].comparisonTotalsObject[currentMon] += metagame[m].offensiveSynergy[i][0] * metagame[m].comparisonMultiplier;
    //   }
    //   currentMon = metagame[m].defensiveSynergy[i][1];
    //   if (metagame[m].comparisonTotalsObject[currentMon] === undefined) {
    //     metagame[m].comparisonTotalsObject[currentMon] = metagame[m].defensiveSynergy[i][0] * metagame[m].comparisonMultiplier;
    //   } else {
    //     metagame[m].comparisonTotalsObject[currentMon] += metagame[m].defensiveSynergy[i][0] * metagame[m].comparisonMultiplier;
    //   }
    //   currentMon = metagame[m].offensiveCompliment[i][1];
    //   if (metagame[m].comparisonTotalsObject[currentMon] === undefined) {
    //     metagame[m].comparisonTotalsObject[currentMon] = metagame[m].offensiveCompliment[i][0] * metagame[m].comparisonMultiplier;
    //   } else {
    //     metagame[m].comparisonTotalsObject[currentMon] += metagame[m].offensiveCompliment[i][0] * metagame[m].comparisonMultiplier;
    //   }
    // }

    // metagame[m].comparisonTotalsArray = [];
    // for (key in metagame[m].comparisonTotalsObject) {
    //   metagame[m].comparisonTotalsArray.push([metagame[m].comparisonTotalsObject[key].toFixed(2), key]);
    // }

    // metagame[m].comparisonTotalsArray.sort(function(a, b) {
    //   if (a > b) {
    //     return -1;
    //   } else if (a > b) {
    //     return 1;
    //   } else {
    //     return 0;
    //   }
    // });

  }
}

analyzer(metagame);


// for (var i = 0; i < metagame.length; i++) {
//   if (metagame[i].name === 'Blissey') {
//   console.log(metagame[i].name + ' offensive synergy: \n', metagame[i].offensiveSynergy.slice(0, 10));
//     console.log(metagame[i].name + ' offensive compliment: \n', metagame[i].offensiveCompliment.slice(0, 10));
//     console.log(metagame[i].name + ' defensive synergy: \n', metagame[i].defensiveSynergy.slice(0, 10));
//     console.log(metagame[i].name + ' momentum followup: \n', metagame[i].momentumFollowup.slice(0, 10));
//   }
// }

module.exports = metagame;