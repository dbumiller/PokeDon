import React from 'react';

class TeamHome extends React.Component {
  constructor(props) {
    super(props);

  this.state = {

  }
  this.editView = this.editView.bind(this);
}

editView(e) {
  e.preventDefault();
  this.props.changeView(e.target.name);
}

componentDidMount() {
  this.props.getRoster(this.props.teamId);
}

  render() {
    return (
      <div>
        <div>{this.props.teamName}</div>
        <button name="browsePokemon" onClick={this.editView}>Browse Pokemon</button>
        <br></br>
        <button name="myTeam" onClick={this.editView}>My Team</button>
        <br></br>
        <button name="offensiveSynergy" onClick={this.editView}>Offensive Synergy</button>
        <br></br>
        <button name="offensiveCompliment" onClick={this.editView}>Offensive Compliment</button>
        <br></br>
        <button name="momentumFollowup" onClick={this.editView}>Momentum Followup</button>
        <br></br>
        <button name="defense" onClick={this.editView}>Defense</button>
        <br></br>
        <button name="speed" onClick={this.editView}>Speed</button>
      </div>
    )
  }
}

module.exports = TeamHome;