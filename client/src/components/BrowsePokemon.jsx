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
    this.goBack = this.goBack.bind(this);
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

  goBack(e) {
    e.preventDefault();
    this.props.changeView('home');
  }

  render() {
    return (
      <div>
        browse
        <br></br>
        <button onClick={this.goBack}>Back</button>
        <ul className="pokemon">
          {this.state.pokemon.map((pokemon, index) => {
            return (
              <BrowseElement pokemon={pokemon} key={index} teamId={this.props.teamId}/>
            )
          })}
        </ul>
        <button onClick={this.goBack}>Back</button>
      </div>
    )
  }
}

module.exports = BrowsePokemon;