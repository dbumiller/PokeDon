import React from 'react';
import axios from 'axios';

class LockToggleButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locked: false
    }

  }

  render() {
    console.log(this.props.pokemon.locked)
    return (
      <span>
        <button>{this.props.pokemon.locked}</button>
      </span>
    )
  }
}

module.exports = LockToggleButton;