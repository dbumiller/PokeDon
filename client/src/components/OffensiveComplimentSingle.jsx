import React from 'react';

class OffensiveComplimentSingle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
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

module.exports = OffensiveComplimentSingle;