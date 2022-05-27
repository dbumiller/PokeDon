import React from 'react';
import axios from 'axios';
import BrowseElement from './BrowseElement.jsx';
import {Typography} from '@material-ui/core'

class BrowsePokemon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      currentPokemon: [],
      search: '',
      chosen: []
    }

    this.getPokemon = this.getPokemon.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addToChosen = this.addToChosen.bind(this);
    this.removeFromChosen = this.removeFromChosen.bind(this);
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

  addToChosen(name) {
    var newChosen = [];
    for (var i = 0; i < this.state.chosen.length; i++) {
      newChosen.push(this.state.chosen[i]);
    }

    newChosen.push(name);
    this.setState({
      chosen: newChosen
    })
  }

  removeFromChosen(name) {
    var newChosen = [];
    for (var i = 0; i < this.state.chosen.length; i++) {
      if (this.state.chosen[i] !== name) {
        newChosen.push(this.state.chosen[i]);
      }
    }

    this.setState({
      chosen: newChosen
    })
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
        <Typography
        variant="h3"
        color="primary"
        align="center"
        >
        browse
        </Typography>
        <br></br>
        <button onClick={this.goBack}>Back</button>
        <br></br>
        <ul className="roster">
          {this.props.team.map((pokemon, index) => {
            return (
              <li key={index}>{pokemon.name}</li>
            )
          })}
        </ul>
        <br></br>
        <label>Search
          <input onChange={this.handleInput} value={this.state.search}></input>
        </label>
        <ul className="pokemon">
          {this.state.currentPokemon.map((pokemon, index) => {
            if (!this.props.lockStatuses[pokemon.name][0]) {
              return (
                <BrowseElement pokemon={pokemon} key={index} teamId={this.props.teamId} addToChosen={this.addToChosen} chosen={this.state.chosen} removeFromChosen={this.removeFromChosen} getRoster={this.props.getRoster}/>
              )
            }
          })}
        </ul>
        <button onClick={this.goBack}>Back</button>
      </div>
    )
  }
}

module.exports = BrowsePokemon;