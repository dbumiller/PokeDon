const db = require('./index.js');
const metagame = require('./typingAnalyzer');

// fire = ['fire'].join(',');

// charmander = {
//   no: 7,
//   name: "charmander",
//   typing: fire
// };

const seed = () => {
  for (var i = 0; i < metagame.length; i++) {
    db.Pokemon.create(metagame[i]);
  }
}

seed();