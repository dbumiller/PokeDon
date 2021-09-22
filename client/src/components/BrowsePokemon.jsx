import React from 'react';
import axios from 'axios';
import BrowseElement from './BrowseElement.jsx';

class BrowsePokemon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      currentPokemon: [],
      search: ''
    }

    this.getPokemon = this.getPokemon.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  getPokemon() {
    axios.get('/api/pokemon')
      .then((results) => {
        this.setState({
          pokemon: results.data,
          currentPokemon: results.data
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

  handleInput(e) {
    if (e.target.value === '') {
      this.setState({
        search: '',
        currentPokemon: this.state.pokemon
      })
    } else {
      var search = e.target.value[0].toUpperCase() + e.target.value.substring(1);
      this.setState({
        search: search
      })
        var matches = [];
        var len = search.length;
        for (var i = 0; i < this.state.pokemon.length; i++) {
          if (this.state.pokemon[i].name.substring(0, len) === search) {
            matches.push(this.state.pokemon[i]);
          }
        }
        this.setState({
          currentPokemon: matches
        })
    }
  }

  render() {
    return (
      <div>
        browse
        <br></br>
        <button onClick={this.goBack}>Back</button>
        <label>Search
          <input onChange={this.handleInput} value={this.state.search}></input>
        </label>
        <ul className="pokemon">
          {this.state.currentPokemon.map((pokemon, index) => {
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