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
      teamId: -1,
      defense: {},
      view: 'landing'
    }

    this.postTeam = this.postTeam.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.changeView = this.changeView.bind(this);
    this.selectTeam = this.selectTeam.bind(this);
  }

  postTeam(name, id) {
    axios.post('/api/team', {
      name: name,
      teamId: id
    })
    .then((response) => {
      this.setState({
        teamName: name,
        teamId: id
      });
      this.changeView('home');
    })
    .catch((err) => {
      console.error(err);
    })
  }

  selectTeam(name, id) {
    this.setState({
      teamName: name,
      teamId: id
    });
    this.changeView('home');
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
          <Landing postTeam={this.postTeam} handleInput={this.handleInput} changeView={this.changeView} selectTeam={this.selectTeam}/>
        </div>
      )
    }
    else if (this.state.view === 'home') {
      console.log(this.state.teamId);
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