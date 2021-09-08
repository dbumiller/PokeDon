import React from 'react';

class OffensiveSynergySingle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
        {this.props.pokemon.name} Offensive Synergy
        <ul>
          {this.props.pokemon.offensiveSynergy.map((pokemon, index) => {
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

module.exports = OffensiveSynergySingle;