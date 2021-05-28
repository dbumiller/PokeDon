import React from 'react';
import Login from './Login.jsx';
import TeamHome from './TeamHome.jsx';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pokemon: [],
      team: [],
      view: ''
    }
  }

  render() {
    return (
      <div>
        <TeamHome />
      </div>
    )
  }
}

export default App;