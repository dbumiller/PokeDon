import React from 'react';
import Login from './Login.jsx';


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
        <Login />
      </div>
    )
  }
}

export default App;