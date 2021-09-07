import React from 'react';
import axios from 'axios';
import BrowseElement from './BrowseElement.jsx';

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
          pokemon: results.data
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
        <ul className="pokemon">
          {this.state.pokemon.map((pokemon, index) => {
            return (
              <BrowseElement pokemon={pokemon} key={index} teamId={this.props.teamId}/>
            )
          })}
        </ul>
      </div>
    )
  }
}

module.exports = BrowsePokemon;