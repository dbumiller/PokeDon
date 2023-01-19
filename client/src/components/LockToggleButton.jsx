import React from 'react';
import axios from 'axios';

class LockToggleButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locked: false
    }

    this.lockPokemon = this.lockPokemon.bind(this);
    this.unlockPokemon = this.unlockPokemon.bind(this);
  }

  componentDidMount() {
    this.setState({
      locked: this.props.pokemon.locked
    })
  }

  lockPokemon() {
    axios.put(`/api/pokemon/lock/${this.props.pokemon.name}`)
    .then(() => {
      this.setState({
        locked: true
      })
    })
  }

  unlockPokemon() {
    axios.put(`/api/pokemon/unlock/${this.props.pokemon.name}`)
    .then(() => {
      this.setState({
        locked: false
      })
    })
  }

  render() {
    if (this.state.locked) {
      return (
        <span>
          <button onClick={this.unlockPokemon}>Locked. Click to unlock</button>
        </span>
      )
    } else {
      return (
        <span>
          <button onClick={this.lockPokemon}>Unlocked. Click to lock</button>
        </span>
      )
    }
  }
}

module.exports = LockToggleButton;