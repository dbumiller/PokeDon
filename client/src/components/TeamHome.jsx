import React from 'react';

class TeamHome extends React.Component {
  constructor() {
    super();

  this.state = {

  }
}

  render() {
    return (
      <div>
        <button>My Team</button>
        <br></br>
        <button>Add / Remove a Pokemon</button>
        <br></br>
        <button>Offensive Synergies</button>
        <br></br>
        <button>Offensive Compliments</button>
        <br></br>
        <button>Defensive Synergy</button>
      </div>
    )
  }
}

module.exports = TeamHome;