import React from 'react';
import MyTeamElement from './MyTeamElement.jsx';

class MyTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: this.props.pokemon
    }
    this.goBack = this.goBack.bind(this);
  }

  goBack(e) {
    e.preventDefault();
    this.props.changeView('home');
  }

  render() {
    var teamProperties = {
      rocker: false,
      hazardControl: false,
      speedControl: false,
      groundedPoison: false,
      priority: false,
      wallbreaker: false,
      sweeper: false
    };
    for (var i = 0; i < this.props.pokemon.length; i++) {
      if (this.props.pokemon[i].rocker) {
        teamProperties.rocker = true;
      }
      if (this.props.pokemon[i].hazardControl) {
        teamProperties.hazardControl = true;
      }if (this.props.pokemon[i].speedControl) {
        teamProperties.speedControl = true;
      }if (this.props.pokemon[i].priority) {
        teamProperties.priority = true;
      }if (this.props.pokemon[i].wallbreaker) {
        teamProperties.wallbreaker = true;
      }if (this.props.pokemon[i].sweeper) {
        teamProperties.sweeper = true;
      }
      for (var j = 0; j < this.props.pokemon[i].typing.length; j++) {
        if (this.props.pokemon[i].typing[j] === "poison") {
          var grounded = true;
          for (var k = 0; k < this.props.pokemon[i].defensiveResist.length; k++) {
            if (this.props.pokemon[i].defensiveResist[k] === "ground") {
              grounded = false;
            }
          }
          if (grounded) {
            teamProperties.groundedPoison = true;
          }
        }
      }
    }
    var infoString = '';
    for (var property in teamProperties) {
      if (!teamProperties[property]) {
        infoString += 'You may want to work on getting a ' + property + ' pokemon. ';
      }
    }


    return (
      <div>
        {this.props.teamName}
        <br></br>
        myteam
        <br></br>
        <button onClick={this.goBack}>Back</button>
        <ul className="pokemon">
          {this.state.pokemon.map((pokemon, index) => {
            return (
              <MyTeamElement pokemon={pokemon} key={index} teamId={this.props.teamId} />
            )
          })}
        </ul>
        {infoString}
        <button onClick={this.goBack}>Back</button>
        <br></br>
      </div>
    )
  }
}

module.exports = MyTeam;