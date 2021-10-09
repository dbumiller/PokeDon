import React from 'react';
import OffensiveComplimentSingle from './OffensiveComplimentSingle.jsx';

class OffensiveCompliment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chosen: []
    }
    this.goBack = this.goBack.bind(this);
    this.addToChosen = this.addToChosen.bind(this);
    this.removeFromChosen = this.removeFromChosen.bind(this);
  }

  goBack(e) {
    e.preventDefault();
    this.props.changeView('home');
  }

  addToChosen(name) {
    var newChosen = [];
    for (var i = 0; i < this.state.chosen.length; i++) {
      newChosen.push(this.state.chosen[i]);
    }

    newChosen.push(name);
    this.setState({
      chosen: newChosen
    })
  }

  removeFromChosen(name) {
    var newChosen = [];
    for (var i = 0; i < this.state.chosen.length; i++) {
      if (this.state.chosen[i] !== name) {
        newChosen.push(this.state.chosen[i]);
      }
    }

    this.setState({
      chosen: newChosen
    })
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
              <OffensiveComplimentSingle pokemon={pokemon} key={index} teamId={this.props.teamId} getRoster={this.props.getRoster} addToChosen={this.addToChosen} removeFromChosen={this.removeFromChosen} chosen={this.state.chosen} lockStatuses={this.props.lockStatuses}/>
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