import React from 'react';
import axios from 'axios';

class DefenseSingle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

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
    var chosen = false;
    for (var i = 0; i < this.props.chosen.length; i++) {

      if (this.props.pokemon[0] === this.props.chosen[i]) {
        chosen = true;
      }
    }

    if (chosen) {
      return (
        <div>
          {this.props.pokemon[0]} Defense: {this.props.pokemon[1]}, {this.props.pokemon[2]}, {this.props.pokemon[3]} <button onClick={() => {this.removePokemon(this.props.pokemon[0])}}>Chosen. Click to undo</button>
          <br></br>
        </div>
      )
    } else {
      return (
        <div>
          {this.props.pokemon[0]} Defense: {this.props.pokemon[1]}, {this.props.pokemon[2]}, {this.props.pokemon[3]} <button onClick={() => {this.choosePokemon(this.props.pokemon[0])}}>Add Pokemon</button>
          <br></br>
        </div>
      )
    }
  }
}

module.exports = DefenseSingle;