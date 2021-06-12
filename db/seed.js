const db = require('./index.js');
const metagame = require('./typingAnalyzer');

const seed = () => {
  db.Pokemon.bulkCreate(metagame);
}