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
      view: 'landing'
    }

    this.postTeam = this.postTeam.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  postTeam(name) {
    axios.post('/api/team', {
      name: name
    })
    .then((response) => {
      this.changeView('home');
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

  changeView(newView) {
    this.setState({
      view: newView
    })
  }

  render() {
    if (this.state.view === 'landing') {
      return (
        <div>
          <Landing postTeam={this.postTeam} handleInput={this.handleInput} changeView={this.changeView}/>
        </div>
      )
    }
    else if (this.state.view === 'home') {
      return (
        <div>
          <TeamHome />
        </div>
      )
    } else {
      return (
        <div>huh</div>
      )
    }
  }
}

export default App;