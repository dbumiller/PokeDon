import React from 'react';
import OffensiveSynergySingle from './OffensiveSynergySingle.jsx';

class OffensiveSynergy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
    this.goBack = this.goBack.bind(this);
  }

  goBack(e) {
    e.preventDefault();
    this.props.changeView('home');
  }

  render() {
    return (
      <div>
        offensive synergy
        <br></br>
        <button onClick={this.goBack}>Back</button>
        <ul className="teamRoster">
          {this.props.pokemon.map((pokemon, index) => {
            return (
              <OffensiveSynergySingle pokemon={pokemon} key={index} teamId={this.props.teamId}/>
            )
          })}
        </ul>
        <br></br>
        <button onClick={this.goBack}>Back</button>
      </div>
    )
  }
}

module.exports = OffensiveSynergy;