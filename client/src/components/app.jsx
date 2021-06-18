import React from 'react';
import Landing from './Landing.jsx';
import TeamHome from './TeamHome.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pokemon: [],
      teamName: '',
      defense: {},
      view: ''
    }

    this.postTeam = this.postTeam.bind(this);
    this.handleInput.bind(this);
  }

  postTeam(name) {
    console.log(name);
    axios.post('/api/team', {
      name: name
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Landing postTeam={this.postTeam} handleInput={this.handleInput}/>
      </div>
    )
  }
}

export default App;