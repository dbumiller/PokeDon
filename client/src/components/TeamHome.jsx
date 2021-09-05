import React from 'react';

class TeamHome extends React.Component {
  constructor(props) {
    super(props);

  this.state = {

  }
}

  render() {
    return (
      <div>
        <div>{this.props.teamName}</div>
        <button>Add / Remove a Pokemon</button>
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