import React from 'react';
import Landing from './Landing.jsx';
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
        <Landing />
      </div>
    )
  }
}

export default App;