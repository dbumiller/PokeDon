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
        Momentum Followup: How much the checks to your momentum-mon are likely to be threatened out by the paired pokemon. The higher the number, the more likely the paired pokemon will have a type advantage after you use your momentum move. Think of Abomasnow coming in off of a Vaporeon's Flip Turn. It would having a type advantage against the Grass, Dragon, and Water types that want to switch into Vaporeon. Momentum Leadin is the other side of this coin, how well certain pokemon set this one up to start its offense.
        <br></br>
        <button onClick={this.goBack}>Back</button>
        <ul className="teamRoster">
          {this.props.pokemon.map((pokemon, index) => {
            return (
              <MomentumSingle pokemon={pokemon} key={index} teamId={this.props.teamId}/>
            )
          })}
        </ul>
        <br></br>
        <button onClick={this.goBack}>Back</button>
      </div>
    )
  }
}

module.exports = Momentum;