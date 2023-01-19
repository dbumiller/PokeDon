import React from 'react';
import axios from 'axios';
import LockToggleButton from './LockToggleButton.jsx';

class AllTeamsElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teamRoster: []
    }

    this.getRoster = this.getRoster.bind(this);
  }

  getRoster(teamId) {
    axios.get(`/api/team/${teamId}`)
      .then((results) => {
        this.setState({
          teamRoster: results.data
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  componentDidMount() {
    this.getRoster(this.props.team.teamId);
  }

  render() {
    return (
      <div>
        {this.props.team.name}
        <ul className="lockedPokemon">
        {this.state.teamRoster.map((pokemon, index) => {
          if (pokemon.locked) {
            return (
              <div key={index}>
                {pokemon.name} <LockToggleButton pokemon={pokemon} />
              </div>
            )
          }
          })}
        </ul>
        <br></br>
      </div>
    )
  }
}

module.exports = AllTeamsElement;