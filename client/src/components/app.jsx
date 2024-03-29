import React from 'react';
import Landing from './Landing.jsx';
import TeamHome from './TeamHome.jsx';
import BrowsePokemon from './BrowsePokemon.jsx';
import DefensiveSynergy from './DefensiveSynergy.jsx';
import Momentum from './Momentum.jsx';
import OffensiveSynergy from './OffensiveSynergy.jsx';
import OffensiveCompliment from './OffensiveCompliment.jsx';
import AllTeams from './AllTeams.jsx';
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
      view: 'landing',
      lockStatuses: {}
    }

    this.postTeam = this.postTeam.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.changeView = this.changeView.bind(this);
    this.selectTeam = this.selectTeam.bind(this);
    this.getRoster = this.getRoster.bind(this);
    this.getPokemon = this.getPokemon.bind(this);
  }

  // allows the client to create a new team in the database
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

  // allows client to set the current team to one already in the database
  selectTeam(name, id, defense) {
    this.setState({
      teamName: name,
      teamId: id,
      defense: defense
    });
    this.changeView('home');
  }

  // allows the client to edit a text field and make the new text actionable
  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // allows the client to move between different pages
  changeView(newView) {
    this.setState({
      view: newView
    })
    this.getPokemon();
  }

  // allows the client to get access to all pokemon in the metagame
  getPokemon() {
    axios.get('/api/pokemon')
      .then((results) => {
        var locksObject = {};
        for (var i = 0; i < results.data.length; i++) {
          var name = results.data[i].name;
          locksObject[name] = [results.data[i].locked, results.data[i].teamId];
        }
        // allows the client to have an array of the lock status of all pokemon
        this.setState({
          lockStatuses: locksObject
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  // allows the client to get all relevant data for the selected team
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
          <TeamHome teamName={this.state.teamName} teamId={this.state.teamId} getRoster={this.getRoster} changeView={this.changeView}  lockStatuses={this.state.lockStatuses}/>
        </div>
      )
    } else if (this.state.view === 'browsePokemon') {
      return (
        <BrowsePokemon teamName={this.state.teamName} teamId={this.state.teamId} changeView={this.changeView} team={this.state.pokemon} getRoster={this.getRoster} lockStatuses={this.state.lockStatuses}/>
      )
    } else if (this.state.view === 'offensiveCompliment') {
      return (
        <OffensiveCompliment teamName={this.state.teamName} teamId={this.state.teamId} pokemon={this.state.pokemon} changeView={this.changeView} getRoster={this.getRoster} lockStatuses={this.state.lockStatuses}/>
      )
    } else if (this.state.view === 'offensiveSynergy') {
      return (
        <OffensiveSynergy teamName={this.state.teamName} teamId={this.state.teamId} pokemon={this.state.pokemon} changeView={this.changeView} getRoster={this.getRoster} lockStatuses={this.state.lockStatuses}/>
      )
    } else if (this.state.view === 'momentumFollowup') {
      return (
        <Momentum teamName={this.state.teamName} teamId={this.state.teamId} pokemon={this.state.pokemon} changeView={this.changeView} getRoster={this.getRoster} lockStatuses={this.state.lockStatuses}/>
      )
    } else if (this.state.view === 'defense') {
      return (
        <DefensiveSynergy teamName={this.state.teamName} teamId={this.state.teamId} team={this.state.pokemon} defense={this.state.defense} changeView={this.changeView} pokemon={this.state.pokemon} getRoster={this.getRoster} lockStatuses={this.state.lockStatuses}/>
      )
    } else if (this.state.view ==='myTeam') {
      return (
        <MyTeam teamName={this.state.teamName} teamId={this.state.teamId} pokemon={this.state.pokemon} changeView={this.changeView}/>
      )
    } else if (this.state.view === 'speed') {
      return (
        <Speed teamName={this.state.speed} teamId={this.state.teamId} pokemon={this.state.pokemon} changeView={this.changeView} lockStatuses={this.state.lockStatuses}/>
      )
    } else if (this.state.view === 'allTeams') {
      return (
        <AllTeams changeView={this.changeView} lockStatuses={this.state.lockStatuses}/>
      )
    } else {
      return (
        <div>huh</div>
      )
    }
  }
}

export default App;