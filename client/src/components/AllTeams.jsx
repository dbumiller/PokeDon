import React from 'react';
import axios from 'axios';
import AllTeamsElement from './AllTeamsElement.jsx';

class AllTeams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: []
    }
    this.getTeams = this.getTeams.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  getTeams() {
    axios.get('/api/team')
    .then((results) => {
      this.setState({
        teams: results.data
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  componentDidMount() {
    this.getTeams();
  }

  goBack(e) {
    e.preventDefault();
    this.props.changeView('home');
  }

  render() {
    return (
      <div>
        <button onClick={this.goBack}>Back</button>
        <br></br>
        <br></br>
        <div>All Teams</div>
        <ul className="teams">
        {this.state.teams.map((team, index) => {
              return (
                <AllTeamsElement team={team} key={index} lockStatuses={this.props.lockStatuses}/>
              )
          })}
        </ul>
        <button onClick={this.goBack}>Back</button>
      </div>
    )
  }
}

module.exports = AllTeams;