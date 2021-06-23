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