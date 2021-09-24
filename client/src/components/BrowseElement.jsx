import React from 'react';
import axios from 'axios';

class BrowseElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chosen: false
    }

    this.choosePokemon = this.choosePokemon.bind(this);
    this.removePokemon = this.removePokemon.bind(this);
  }

  choosePokemon(e) {
    e.preventDefault();
    this.props.addToChosen(this.props.pokemon.name);
    axios.put(`/api/pokemon/${this.props.pokemon.id}`, {
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

  removePokemon(e) {
    e.preventDefault();
    this.props.removeFromChosen(this.props.pokemon.name);
    axios.put(`/api/pokemon/${this.props.pokemon.id}`, {
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

    var chosen = false;
    for (var i = 0; i < this.props.chosen.length; i++) {
      if (this.props.pokemon.name === this.props.chosen[i]) {
        chosen = true;
      }
    }

    if (chosen) {
      return (
        <div>
          {infoString} <button onClick={this.removePokemon}>Chosen. Click to undo</button>
        </div>
      )
    } else {
      return (
        <div>
          {infoString} <button onClick={this.choosePokemon}>Add Pokemon</button>
        </div>
      )
    }

    // if (!this.state.chosen) {
    //   return (
    //     <div>
    //       {infoString} <button onClick={this.choosePokemon}>Add Pokemon</button>
    //     </div>
    //   )
    // } else {
    //   return (
    //     <div>
    //       {infoString} <button onClick={this.removePokemon}>Chosen. Click to undo</button>
    //     </div>
    //   )
    // }

  }
}

module.exports = BrowseElement;