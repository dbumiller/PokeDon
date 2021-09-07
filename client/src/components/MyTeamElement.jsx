import React from 'react';
import axios from 'axios';

class MyTeamElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      removed: false
    }

    this.removePokemon = this.removePokemon.bind(this);
    this.choosePokemon = this.choosePokemon.bind(this);
  }

  choosePokemon(e) {
    e.preventDefault();
    axios.put(`/api/pokemon/${this.props.pokemon.id}`, {
      "id": this.props.teamId
    })
    .then((results) => {
      this.setState({
        removed: false
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  removePokemon(e) {
    e.preventDefault();
    axios.put(`/api/pokemon/${this.props.pokemon.id}`, {
      "id": null
    })
      .then((results) => {
        this.setState({
          removed: true
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    var infoString = '';
    infoString += this.props.pokemon.name + '   ';
    for (var i = 0; i < this.props.pokemon.typing.length; i++) {
      infoString += ' ' + (this.props.pokemon.typing[i]).toUpperCase();
    }
    for (var key in this.props.pokemon) {
      if (this.props.pokemon[key] === true) {
        infoString += ' ' + key;
      }
    }

    if (this.state.removed === false) {
      return (
        <div>
          {infoString} <button onClick={this.removePokemon}>Remove Pokemon</button>
        </div>
      )
    } else {
      return (
        <div>
          {infoString} <button onClick={this.choosePokemon}>Removed. Click to undo</button>
        </div>
      )
    }

  }
}

module.exports = MyTeamElement;