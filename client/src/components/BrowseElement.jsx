import React from 'react';
import axios from 'axios';

class BrowseElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.choosePokemon = this.choosePokemon.bind(this);
  }

  choosePokemon(e) {
    e.preventDefault();
    axios.put(`/api/pokemon/${this.props.pokemon.id}`, {
      "id": this.props.teamId
    })
    .then((results) => {
      console.log(results);
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

    return (
      <div>
        {infoString} <button onClick={this.choosePokemon}>Add Pokemon</button>
      </div>
    )
  }
}

module.exports = BrowseElement;