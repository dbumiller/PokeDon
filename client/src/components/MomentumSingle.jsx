import React from 'react';

class MomentumSingle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    if (!this.props.pokemon.momentum) {
      return (
        <div>
          {this.props.pokemon.name} does not provide momentum
          <br></br>
          <br></br>
        </div>
      )
    }
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
  }
}

module.exports = MomentumSingle;