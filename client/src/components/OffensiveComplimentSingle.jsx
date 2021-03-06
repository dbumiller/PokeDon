import React from 'react';
import axios from 'axios';

class OffensiveComplimentSingle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chosen: false
    }

    this.choosePokemon = this.choosePokemon.bind(this);
    this.removePokemon = this.removePokemon.bind(this);
  }

  choosePokemon(name) {
    this.props.addToChosen(name);
    axios.put(`/api/pokemon/${name}`, {
      "id": this.props.teamId
    })
      .then((results) => {
        this.setState({
          chosen: true
        })
        this.props.getRoster(this.props.teamId);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  removePokemon(name) {
    this.props.removeFromChosen(name);
    axios.put(`/api/pokemon/${name}`, {
      "id": null
    })
      .then((results) => {
        this.setState({
          chosen: false
        })
        this.props.getRoster(this.props.teamId);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    if (!this.props.pokemon.wallbreaker && !this.props.pokemon.sweeper) {
      return (
        <div>
          {this.props.pokemon.name} has limited offensive utility
          <br></br>
          <br></br>
        </div>
      )
    }

    return (
      <div>
        {this.props.pokemon.name} Offensive Compliment
        <ul>
          {this.props.pokemon.offensiveCompliment.map((pokemon, index) => {
            if (Number(pokemon[0]) > 0 && (!this.props.lockStatuses[pokemon[1]][0] || this.props.lockStatuses[pokemon[1]][1] === this.props.teamId)) {

              var chosen = false;
              for (var i = 0; i < this.props.chosen.length; i++) {
                if (pokemon[1] === this.props.chosen[i]) {
                  chosen = true;
                }
              }

              if (chosen) {
                return (
                  <div key={index}>{pokemon[0]} {pokemon[1]} {pokemon[2].toUpperCase()} <button onClick={() => {this.removePokemon(pokemon[1])}}>Chosen. Click to undo</button> </div>
                )
              } else {
                return (
                  <div key={index}>{pokemon[0]} {pokemon[1]} {pokemon[2].toUpperCase()} <button onClick={() => {this.choosePokemon(pokemon[1])}}>Add Pokemon</button> </div>
                )
              }
            }
          })}
        </ul>
        <br></br>
      </div>
    )
  }
}

module.exports = OffensiveComplimentSingle;