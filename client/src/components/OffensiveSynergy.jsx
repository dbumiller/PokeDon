import React from 'react';
import OffensiveSynergySingle from './OffensiveSynergySingle.jsx';

class OffensiveSynergy extends React.Component {
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
        Offensive Synergy: How much the checks and counters to a pair of pokemon overlap. The higher the number, the more the overlap. This tool is to help you find pokemon that will wear down checks for each other. Think of a wallbreaker wearing a defensive pokemon down so that a sweeper can sweep through the opposing team.
        <br></br>
        <button onClick={this.goBack}>Back</button>
        <ul className="teamRoster">
          {this.props.pokemon.map((pokemon, index) => {
            return (
              <OffensiveSynergySingle pokemon={pokemon} key={index} teamId={this.props.teamId} getRoster={this.props.getRoster} addToChosen={this.addToChosen} removeFromChosen={this.removeFromChosen} chosen={this.state.chosen}/>
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