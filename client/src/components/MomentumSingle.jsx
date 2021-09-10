import React from 'react';

class MomentumSingle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    if (!this.props.pokemon.momentum && !this.props.pokemon.wallbreaker && !this.props.pokemon.sweeper) {
      return (
        <div>
          {this.props.pokemon.name} provides neither momentum nor offensive utilty
          <br></br>
          <br></br>
        </div>
      )
    } else if (this.props.pokemon.momentum && this.props.pokemon.momentousLeadIn === []) {
      return (
        <div>
          {this.props.pokemon.name} Momentum Followup
          <ul>
            {this.props.pokemon.momentumFollowup.map((pokemon, index) => {
              if (Number(pokemon[0]) > 0) {
                return (
                  <div key={index}>{pokemon[0]} {pokemon[1]}</div>
                )
              }
            })}
          </ul>
          <br></br>
        </div>
      )
    } else if (!this.props.pokemon.momentum && this.props.pokemon.momentousLeadIn !== []) {
      return (
        <div>
          {this.props.pokemon.name} Momentum Lead-in
          <ul>
            {this.props.pokemon.momentousLeadIn.map((pokemon, index) => {
              if (Number(pokemon[0]) > 0) {
                return (
                  <div key={index}>{pokemon[0]} {pokemon[1]}</div>
                )
              }
            })}
          </ul>
          <br></br>
        </div>
      )
    } else {
      return (
        <div>
          {this.props.pokemon.name} Momentum Lead-in
          <ul>
            {this.props.pokemon.momentousLeadIn.map((pokemon, index) => {
              if (Number(pokemon[0]) > 0) {
                return (
                  <div key={index}>{pokemon[0]} {pokemon[1]}</div>
                )
              }
            })}
          </ul>
          <br></br>
          {this.props.pokemon.name} Momentum Followup
          <ul>
            {this.props.pokemon.momentumFollowup.map((pokemon, index) => {
              if (Number(pokemon[0]) > 0) {
                return (
                  <div key={index}>{pokemon[0]} {pokemon[1]}</div>
                )
              }
            })}
          </ul>
          <br></br>
        </div>
      )
    }
  }
}

module.exports = MomentumSingle;