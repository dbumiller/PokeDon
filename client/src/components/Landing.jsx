import React from 'react';
import axios from 'axios';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      name: '',
      selectedName: ''
    };

    this.getTeams = this.getTeams.bind(this);
    this.postTeam = this.postTeam.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.selectTeam = this.selectTeam.bind(this);
  }

  getTeams() {
    axios.get('/api/team')
    .then((results) => {
      this.setState({
        teams: results.data,
        selectedName: results.data[0].name
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

  handleSelect(e) {
    this.setState({
      selectedName: e.target.value
    })
  }

  selectTeam(e) {
    e.preventDefault();
    var id;
    for (var i = 0; i < this.state.teams.length; i++) {
      if (this.state.selectedName === this.state.teams[i].name) {
        id = this.state.teams[i].teamId;
      }
    }

    this.props.selectTeam(this.state.selectedName, id);
  }

  postTeam(e) {
    e.preventDefault();
    this.props.postTeam(this.state.name, this.state.teams.length + 1);
  }

  componentDidMount() {
    this.getTeams();
  }

  render() {
    return (
      <div>
        <form>
          <label>Choose an existing team: </label>
          <select name="teams" id="teams" onChange={this.handleSelect}>
            {this.state.teams.map((team, index) => {
              return (
                <option value={team.name} key={index}>{team.name}</option>
              )
            })}
          </select>
          <button onClick={this.selectTeam}>Select Team</button>
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