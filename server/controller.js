

const controller = {
  get: (req, res) => {
    res.status(200).send('GET');
  },
  post: (req, res) => {
    res.status(200).send('POST');
  },
  put: (req, res) => {
    res.status(200).send(`updated ${req.params.id}`);
  },
  delete: (req, res) => {
    res.status(200).send(`deleted ${req.params.id}`);
  }
}

module.exports = controller;