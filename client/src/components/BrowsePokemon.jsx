import React from 'react';
import axios from 'axios';

class BrowsePokemon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: []
    }

    this.getPokemon = this.getPokemon.bind(this);
  }

  getPokemon() {
    axios.get('/api/pokemon')
    .then((results) => {
      this.setState({
        pokemon: results
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  componentDidMount() {
    this.getPokemon();
  }

  render() {
    return (
      <div>
        browse
      </div>
    )
  }
}

module.exports = BrowsePokemon;