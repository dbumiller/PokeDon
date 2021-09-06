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
        <button>My Team</button>
        <br></br>
        <button>Offense</button>
        <br></br>
        <button>Defense</button>
      </div>
    )
  }
}

module.exports = TeamHome;