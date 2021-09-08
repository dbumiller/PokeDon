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
        Offensive Compliment: How little the checks to any pair of pokemon overlap. The higher the number, the less of an overlap. This tool is to help you find pairs of pokemon that will pull an opposing team in opposite directions. This way your team can force the opponent to prepare against multiple angles of attack, causing them to either bring a variety of defensive pokemon or risk getting spread too thin.
        <br></br>
        <button onClick={this.goBack}>Back</button>
        <ul className="teamRoster">
          {this.props.pokemon.map((pokemon, index) => {
            return (
              <OffensiveComplimentSingle pokemon={pokemon} key={index} teamId={this.props.teamId}/>
            )
          })}
        </ul>
        <br></br>
        <button onClick={this.goBack}>Back</button>
      </div>
    )
  }
}

module.exports = OffensiveCompliment;