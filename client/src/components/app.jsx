import React from 'react';
import Landing from './Landing.jsx';
import TeamHome from './TeamHome.jsx';
import BrowsePokemon from './BrowsePokemon.jsx';
import DefensiveSynergy from './DefensiveSynergy.jsx';
import Momentum from './Momentum.jsx';
import OffensiveSynergy from './OffensiveSynergy.jsx';
import OffensiveCompliment from './OffensiveCompliment.jsx';
import MyTeam from './MyTeam.jsx';
import Speed from './Speed.jsx';
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
    this.getRoster = this.getRoster.bind(this);
  }

  postTeam(name, id, defense) {
    axios.post('/api/team', {
      name: name,
      teamId: id
    })
      .then((response) => {
        this.setState({
          teamName: name,
          teamId: id,
          defense: defense
        });
        this.changeView('home');
      })
      .catch((err) => {
        console.error(err);
      })
  }

  selectTeam(name, id, defense) {
    this.setState({
      teamName: name,
      teamId: id,
      defense: defense
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

  getRoster(teamId) {
    axios.get(`/api/team/${teamId}`)
      .then((results) => {
        this.setState({
          pokemon: results.data
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    if (this.state.view === 'landing') {
      return (
        <div>
          <Landing postTeam={this.postTeam} handleInput={this.handleInput} changeView={this.changeView} selectTeam={this.selectTeam} />
        </div>
      )
    }
    else if (this.state.view === 'home') {
      return (
        <div>
          <TeamHome teamName={this.state.teamName} teamId={this.state.teamId} getRoster={this.getRoster} changeView={this.changeView} />
        </div>
      )
    } else if (this.state.view === 'browsePokemon') {
      return (
        <BrowsePokemon teamName={this.state.teamName} teamId={this.state.teamId} changeView={this.changeView} team={this.state.pokemon} getRoster={this.getRoster}/>
      )
    } else if (this.state.view === 'offensiveCompliment') {
      return (
        <OffensiveCompliment teamName={this.state.teamName} teamId={this.state.teamId} pokemon={this.state.pokemon} changeView={this.changeView} getRoster={this.getRoster}/>
      )
    } else if (this.state.view === 'offensiveSynergy') {
      return (
        <OffensiveSynergy teamName={this.state.teamName} teamId={this.state.teamId} pokemon={this.state.pokemon} changeView={this.changeView} getRoster={this.getRoster}/>
      )
    } else if (this.state.view === 'momentumFollowup') {
      return (
        <Momentum teamName={this.state.teamName} teamId={this.state.teamId} pokemon={this.state.pokemon} changeView={this.changeView} getRoster={this.getRoster}/>
      )
    } else if (this.state.view === 'defense') {
      return (
        <DefensiveSynergy teamName={this.state.teamName} teamId={this.state.teamId} team={this.state.pokemon} defense={this.state.defense} changeView={this.changeView} pokemon={this.state.pokemon} getRoster={this.getRoster}/>
      )
    } else if (this.state.view ==='myTeam') {
      return (
        <MyTeam teamName={this.state.teamName} teamId={this.state.teamId} pokemon={this.state.pokemon} changeView={this.changeView}/>
      )
    } else if (this.state.view = 'speed') {
      return (
        <Speed teamName={this.state.speed} teamId={this.state.teamId} pokemon={this.state.pokemon} changeView={this.changeView}/>
      )
    } else {
      return (
        <div>huh</div>
      )
    }
  }
}

export default App;