import React from 'react';
import axios from 'axios';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      name: ''
    };

    this.getTeams = this.getTeams.bind(this);
    this.postTeam = this.postTeam.bind(this);
    this.handleInput = this.handleInput.bind(this);
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

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  postTeam(e) {
    e.preventDefault();
    this.props.postTeam(this.state.name);
  }

  componentDidMount() {
    this.getTeams();
  }

  render() {
    return (
      <div>
        <form>
          <label>Choose an existing team: </label>
          <select name="teams" id="teams">
            {this.state.teams.map((team, index) => {
              return (
                <option value={team.name} key={index}>{team.name}</option>
              )
            })}
          </select>
        </form>
        <form>
          <label>Make a new team
            <input name="name" onChange={this.handleInput} value = {this.state.name} />
          </label>
          <button onClick= {this.postTeam}>Create Team</button>
        </form>
      </div>
    )
  }
}

module.exports = Landing;