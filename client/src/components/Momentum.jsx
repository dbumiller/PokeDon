import React from 'react';
import MomentumSingle from './MomentumSingle.jsx';

class Momentum extends React.Component {
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
              <MomentumSingle pokemon={pokemon} key={index} teamId={this.props.teamId}/>
            )
          })}
        </ul>
      </div>
    )
  }
}

module.exports = Momentum;