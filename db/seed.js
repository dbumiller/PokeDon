const db = require('./index.js');
const metagame = require('./typingAnalyzer');

fire = ['fire'].join(',');

charmander = {
  no: 7,
  name: "charmander",
  typing: fire
};

const seed = () => {
  db.Pokemon.create(charmander);
}

seed();