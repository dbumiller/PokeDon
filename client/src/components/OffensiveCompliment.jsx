import React from 'react';
import OffensiveComplimentSingle from './OffensiveComplimentSingle.jsx';

class OffensiveCompliment extends React.Component {
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
        offensive compliment
        <br></br>
        <button onClick={this.goBack}>Back</button>
        <ul className="teamRoster">
          {this.props.pokemon.map((pokemon, index) => {
            return (
              <OffensiveComplimentSingle pokemon={pokemon} key={index} teamId={this.props.teamId}/>
            )
          })}
        </ul>
      </div>
    )
  }
}

module.exports = OffensiveCompliment;